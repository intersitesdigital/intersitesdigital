# Intersites Digital — Project Summary v2.1

## ✅ Project Status: Production Ready

## 📁 Project Structure

```
copyisd/
├── client/          ← React Frontend (Vite)
├── server/          ← Express Backend
├── shared/          ← Shared constants (BRAND, SOCIAL_LINKS)
├── render.yaml      ← Render deployment config
└── .gitignore
```

## 🎨 Features

### Frontend
- React 18 + Vite + Tailwind CSS
- Dark/light mode with persistent preference
- Responsive mobile-first design
- Framer Motion animations
- SEO optimized (Helmet, meta tags, sitemap)
- 6 pages: Home, Services, Portfolio, About, Contact, 404
- 3 legal pages: Privacy, Terms, Sitemap
- Admin dashboard with JWT auth

### Backend
- Express.js modular architecture
- MongoDB + Mongoose with SRV/direct connection fallback
- 5 modules: contact, leads, newsletter, reviews, admin
- Security: Helmet, CORS, rate limiting, input validation
- JWT admin authentication + password reset via email

### Infrastructure
- Frontend → Vercel → `intersitesdigital.in`
- Backend → Render → `api.intersitesdigital.in`
- Database → MongoDB Atlas (AWS Mumbai ap-south-1)
- Uptime monitoring → UptimeRobot (pings `/health` every 5 min)

## 🔧 Environment Variables

### server/.env
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://...
MONGODB_URI_DIRECT=mongodb://...   ← fallback for DNS SRV failures
JWT_SECRET=...
ADMIN_USER=...
ADMIN_PASS=...
ADMIN_EMAIL=intersitesdigital@gmail.com
SMTP_EMAIL=intersitesdigital@gmail.com
SMTP_PASS=...                      ← Gmail App Password
CLIENT_URL=https://intersitesdigital.in
ALLOWED_ORIGIN=https://intersitesdigital.in
```

### client/.env
```
VITE_API_URL=http://localhost:5000
```

## 🐛 Known Issues Fixed

| Issue | Fix |
|-------|-----|
| `querySrv ECONNREFUSED` on Windows | `MONGODB_URI_DIRECT` fallback in `database.js` |
| CORS errors after deployment | `ALLOWED_ORIGIN` set to exact Vercel/custom domain URL |
| Render free tier sleeping | UptimeRobot pings `/health` every 5 minutes |

## 📝 Remaining Customization

- [ ] Replace placeholder logo (`client/public/logo.svg`)
- [ ] Add real portfolio projects
- [ ] Update testimonials with real client feedback
- [ ] Add Google Reviews API key for live reviews

## 🔧 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion |
| Backend | Node.js 18+, Express, MongoDB, Mongoose |
| Auth | JWT (jsonwebtoken) |
| Email | Nodemailer + Gmail App Password |
| Deployment | Vercel + Render |
| Domain | intersitesdigital.in |
| DB | MongoDB Atlas (AWS Mumbai) |

---

**Version**: 2.1.0
**Last Updated**: February 2026
