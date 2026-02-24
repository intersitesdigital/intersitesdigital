import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import contactRoutes from './modules/contact/contact.routes.js';
import leadsRoutes from './modules/leads/leads.routes.js';
import newsletterRoutes from './modules/newsletter/newsletter.routes.js';
import reviewRoutes from './modules/reviews/reviews.routes.js';
import adminRoutes from './modules/admin/admin.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

const allowedOrigins = [
  process.env.ALLOWED_ORIGIN,
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'https://intersitesdigital.in',
  'https://www.intersitesdigital.in',
  'https://intersitesdigital-web.vercel.app',
].filter(Boolean);

app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api', rateLimiter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── API Routes ────────────────────────────────────────────
app.use('/api/contact', contactRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/v1/admin', adminRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔒 Allowed origins: ${allowedOrigins.join(', ')}`);
});

export default app;