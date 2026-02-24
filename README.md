# Intersites Digital — Website v2.1

A modern, full-stack digital agency website built with React + Node.js + MongoDB.

## 🆕 What's New in v2.1

- **Render + Vercel deployment** (replaced Railway)
- **Custom domain**: `intersitesdigital.in` (frontend) + `api.intersitesdigital.in` (backend)
- **MongoDB direct connection fallback** — auto-switches to `MONGODB_URI_DIRECT` if SRV DNS fails (fixes `querySrv ECONNREFUSED` on Windows)
- **Reviews module** — local + Google reviews + submit form
- **Admin dashboard** — JWT auth, 4 tabs (Reviews, Leads, Contacts, Newsletter)

## 📁 Project Structure

```
copyisd/
├── client/                        # React Frontend (Vite + Tailwind)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── content/
│   │   │   │   └── LegalPage.jsx  # Privacy (0), Terms (1), Sitemap (2)
│   │   │   └── admin/
│   │   │       ├── AdminLogin.jsx
│   │   │       └── AdminDashboard.jsx
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   └── sections/
│   │   │       ├── ReviewsSection.jsx
│   │   │       └── NewsletterSection.jsx
│   │   ├── hooks/useDarkMode.js
│   │   └── lib/api.js
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                        # Node.js + Express Backend
│   └── src/
│       ├── config/
│       │   └── database.js        # SRV + direct connection fallback
│       ├── modules/
│       │   ├── contact/
│       │   ├── leads/
│       │   ├── newsletter/
│       │   ├── reviews/
│       │   └── admin/
│       ├── middleware/
│       │   ├── adminAuth.js
│       │   ├── errorHandler.js
│       │   ├── rateLimiter.js
│       │   └── validateRequest.js
│       └── server.js
│
├── shared/                        # Shared constants (client + server)
│   ├── branding/
│   │   └── constants.js           # BRAND, SOCIAL_LINKS, COMPANY_INFO
│   └── constants/
│       └── services.js
│
├── render.yaml                    # Render deployment config
└── .gitignore
```

## 🚀 Quick Start

### 1. Install dependencies

```bash
cd client && npm install
cd ../server && npm install
```

### 2. Set up environment variables

```bash
# Server — copy and fill in
cp server/.env.example server/.env
```

### 3. Run development servers

```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm run dev
```

### 4. Access

| URL | Description |
|-----|-------------|
| `http://localhost:5173` | Frontend |
| `http://localhost:5173/admin-login` | Admin panel |
| `http://localhost:5000/health` | Backend health check |

## 📊 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/contact` | Public | Submit contact form |
| GET | `/api/contact` | Admin | List all contacts |
| POST | `/api/leads` | Public | Capture lead |
| GET | `/api/leads` | Admin | List all leads |
| POST | `/api/newsletter/subscribe` | Public | Subscribe |
| POST | `/api/newsletter/unsubscribe` | Public | Unsubscribe |
| GET | `/api/newsletter` | Admin | List subscribers |
| GET | `/api/reviews` | Public | All reviews |
| POST | `/api/reviews` | Public | Submit review |
| DELETE | `/api/reviews/:id` | Admin | Delete review |
| POST | `/api/v1/admin/login` | Public | Admin login |
| POST | `/api/v1/admin/request-password-reset` | Admin | Request reset email |
| POST | `/api/v1/admin/reset-password` | Public | Reset password |

## 🌐 Live URLs

| | Local | Production |
|--|-------|------------|
| Frontend | `http://localhost:5173` | `https://intersitesdigital.in` |
| Backend | `http://localhost:5000` | `https://api.intersitesdigital.in` |
| Health | `http://localhost:5000/health` | `https://api.intersitesdigital.in/health` |

## 🔐 Admin Access

Set `ADMIN_USER` and `ADMIN_PASS` in `server/.env`. Login at `/admin-login`.

## 🔧 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion, React Router |
| Backend | Node.js, Express, MongoDB, Mongoose |
| Database | MongoDB Atlas |
| Deployment | Vercel (frontend), Render (backend) |
| Domain | intersitesdigital.in |
