import mongoose from 'mongoose';
import dns from 'dns';
import { promisify } from 'util';

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 5000;

// DNS SRV errors — these mean the SRV URI won't work on this machine/network
const DNS_SRV_ERRORS = ['ECONNREFUSED', 'ENOTFOUND', 'EAI_AGAIN', 'ETIMEOUT', 'querySrv'];

function isSrvDnsError(err) {
  const msg = err.message || '';
  return DNS_SRV_ERRORS.some((e) => msg.includes(e)) || err.code === 'ECONNREFUSED';
}

/**
 * Convert a mongodb+srv:// URI to a direct mongodb:// URI.
 * Falls back to MONGODB_URI_DIRECT if set in env.
 *
 * Atlas direct connection strings look like:
 *   mongodb://cluster0-shard-00-00.abc12.mongodb.net:27017,...?ssl=true&authSource=admin
 *
 * The easiest fix is to set MONGODB_URI_DIRECT in your .env:
 *   Atlas → Connect → Drivers → toggle "Direct connection" → copy the string
 */
function getUris() {
  const srv = process.env.MONGODB_URI;
  const direct = process.env.MONGODB_URI_DIRECT;

  if (!srv && !direct) {
    console.error('❌ Neither MONGODB_URI nor MONGODB_URI_DIRECT is set in .env');
    console.error('   Add at least one of these to your server/.env file.');
    process.exit(1);
  }

  return { srv, direct };
}

const BASE_OPTIONS = {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  family: 4, // Force IPv4 — fixes most ECONNREFUSED issues on Windows/some ISPs
};

async function tryConnect(uri, label) {
  await mongoose.connect(uri, BASE_OPTIONS);
  console.log(`✅ MongoDB Connected [${label}]: ${mongoose.connection.host}`);
}

async function connectWithRetry(retries = 0) {
  const { srv, direct } = getUris();

  // ── Attempt 1: SRV URI (if provided) ─────────────────────────
  if (srv) {
    try {
      await tryConnect(srv, 'SRV');
      return; // success — done
    } catch (err) {
      console.error(`❌ MongoDB connection error: ${err.message}`);

      if (isSrvDnsError(err)) {
        console.warn('⚠️  SRV DNS lookup failed on this network.');
        console.warn('   This usually means your DNS server cannot resolve Atlas SRV records.');
        console.warn('   Common causes: VPN, corporate firewall, some ISPs, or Windows DNS quirks.');

        if (direct) {
          console.log('🔄 Falling back to MONGODB_URI_DIRECT (direct connection string)...');
          try {
            await tryConnect(direct, 'Direct');
            return; // success via direct URI
          } catch (directErr) {
            console.error(`❌ Direct connection also failed: ${directErr.message}`);
          }
        } else {
          console.warn('');
          console.warn('👉 ACTION REQUIRED — Add a direct connection string to fix this:');
          console.warn('   1. Go to Atlas → Your Cluster → Connect → Drivers');
          console.warn('   2. Toggle ON "Direct connection" and copy the URI');
          console.warn('   3. Add to server/.env:');
          console.warn('      MONGODB_URI_DIRECT=mongodb://your-direct-uri-here');
          console.warn('');
        }
      }
    }
  }

  // ── Attempt 2: Direct URI only (no SRV provided) ─────────────
  if (!srv && direct) {
    try {
      await tryConnect(direct, 'Direct');
      return;
    } catch (err) {
      console.error(`❌ MongoDB connection error: ${err.message}`);
    }
  }

  // ── Retry logic ───────────────────────────────────────────────
  if (retries < MAX_RETRIES) {
    console.log(`🔄 Retrying in ${RETRY_DELAY_MS / 1000}s... (attempt ${retries + 1}/${MAX_RETRIES})`);
    setTimeout(() => connectWithRetry(retries + 1), RETRY_DELAY_MS);
  } else {
    console.error('');
    console.error('💀 Could not connect to MongoDB after multiple attempts.');
    console.error('');
    console.error('Checklist:');
    console.error('  1. Atlas Network Access → Confirm 0.0.0.0/0 is saved and active');
    console.error('  2. Get a direct connection string (not mongodb+srv://):');
    console.error('     Atlas → Connect → Drivers → toggle "Direct connection" → copy URI');
    console.error('     Then add MONGODB_URI_DIRECT=<that URI> to server/.env');
    console.error('  3. Try changing your DNS to 8.8.8.8 (Google) or 1.1.1.1 (Cloudflare)');
    console.error('  4. If on VPN, disconnect and retry');
    console.error('  5. Check MONGODB_URI in server/.env has no spaces or hidden characters');
    console.error('');
    process.exit(1);
  }
}

// ── Connection event listeners ────────────────────────────────
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected');
  // Only auto-reconnect if we're not in the middle of a controlled shutdown
  if (process.env.NODE_ENV !== 'test') {
    console.warn('🔄 Attempting reconnect...');
    setTimeout(() => connectWithRetry(), RETRY_DELAY_MS);
  }
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB runtime error:', err.message);
});

export const connectDB = connectWithRetry;
