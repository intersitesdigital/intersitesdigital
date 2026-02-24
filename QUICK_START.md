# Quick Start Guide

## 🚀 Get Running in 5 Minutes

### 1. Install Dependencies

```bash
# Frontend
cd client && npm install

# Backend
cd server && npm install
```

### 2. Set Up Environment Variables

**Backend** (`server/.env`):
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://intersitesdigital_db_user:YOUR_PASS@intersites-cluster.7hai9qq.mongodb.net/?appName=Intersites-cluster
MONGODB_URI_DIRECT=mongodb://intersitesdigital_db_user:YOUR_PASS@ac-w1jiwys-shard-00-00.7hai9qq.mongodb.net:27017,ac-w1jiwys-shard-00-01.7hai9qq.mongodb.net:27017,ac-w1jiwys-shard-00-02.7hai9qq.mongodb.net:27017/?ssl=true&authSource=admin&replicaSet=atlas-at6g2f-shard-0
JWT_SECRET=your_random_32_char_string
ADMIN_USER=your_admin_username
ADMIN_PASS=your_admin_password
ADMIN_EMAIL=intersitesdigital@gmail.com
SMTP_EMAIL=intersitesdigital@gmail.com
SMTP_PASS=your_gmail_app_password
CLIENT_URL=http://localhost:5173
ALLOWED_ORIGIN=http://localhost:5173
```

**Frontend** (`client/.env`):
```env
VITE_API_URL=http://localhost:5000
```

### 3. Start Development Servers

```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm run dev
```

### 4. Open Your Browser

| URL | What it is |
|-----|-----------|
| `http://localhost:5173` | Frontend |
| `http://localhost:5173/admin-login` | Admin panel |
| `http://localhost:5000/health` | Backend health check |

---

## 🐛 Troubleshooting

### MongoDB `querySrv ECONNREFUSED`
Your Windows DNS can't resolve Atlas SRV records. Two fixes:

**Option A — Change DNS (permanent, recommended):**
1. Settings → Network & Internet → Change adapter options
2. Right-click active connection → Properties → IPv4 → Properties
3. Set DNS to `8.8.8.8` / `1.1.1.1`

**Option B — Use direct connection (already in updated code):**
Make sure `MONGODB_URI_DIRECT` is set in `server/.env` — the app auto-falls back to it.

### `bad auth: authentication failed`
Your MongoDB password has special characters breaking the URI. Go to Atlas → Database Access → Edit user → set a simple alphanumeric password (no `@`, `#`, `$`, `/`).

### CORS errors
Make sure `ALLOWED_ORIGIN` in `server/.env` exactly matches your frontend URL — no trailing slash.

### Port already in use
Change `PORT` in `server/.env` and update `VITE_API_URL` in `client/.env` to match.

### Admin login not working
Check `ADMIN_USER` and `ADMIN_PASS` are set in `server/.env`. JWT auth is credential-based, not database-based.

---

## 📦 What's Included

- React frontend with Tailwind CSS + dark mode
- Express backend with MongoDB
- Contact form, lead capture, newsletter APIs
- Reviews module (local + Google)
- Admin dashboard with JWT auth + password reset
- MongoDB SRV/direct connection fallback
- Rate limiting + security middleware
- Render + Vercel deployment config
- Custom domain support (`intersitesdigital.in`)
