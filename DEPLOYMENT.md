# Deployment Guide

## Overview

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Vercel | `https://intersitesdigital.in` |
| Backend | Render | `https://api.intersitesdigital.in` |
| Database | MongoDB Atlas | AWS Mumbai (ap-south-1) |

---

## Step 1 — Push to GitHub

```bash
# From D:/copyisd
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Make sure your `.gitignore` includes:
```
node_modules/
.env
server/.env
client/.env
dist/
client/dist/
```

---

## Step 2 — Deploy Backend on Render

### 2a. Create Web Service
1. Go to [render.com](https://render.com) → **New** → **Web Service**
2. Connect your GitHub repo
3. Render auto-detects `render.yaml` — confirm:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

### 2b. Add Environment Variables
Go to **Environment** tab → add each variable:

```
NODE_ENV              = production
PORT                  = 5000
MONGODB_URI           = mongodb+srv://intersitesdigital_db_user:YOUR_PASS@intersites-cluster.7hai9qq.mongodb.net/?appName=Intersites-cluster
MONGODB_URI_DIRECT    = mongodb://intersitesdigital_db_user:YOUR_PASS@ac-w1jiwys-shard-00-00.7hai9qq.mongodb.net:27017,ac-w1jiwys-shard-00-01.7hai9qq.mongodb.net:27017,ac-w1jiwys-shard-00-02.7hai9qq.mongodb.net:27017/?ssl=true&authSource=admin&replicaSet=atlas-at6g2f-shard-0
JWT_SECRET            = (generate below)
ADMIN_USER            = your_admin_username
ADMIN_PASS            = your_admin_password
ADMIN_EMAIL           = intersitesdigital@gmail.com
SMTP_EMAIL            = intersitesdigital@gmail.com
SMTP_PASS             = (Gmail App Password — see below)
CLIENT_URL            = https://intersitesdigital.in
ALLOWED_ORIGIN        = https://intersitesdigital.in
```

**Generate JWT_SECRET** (run in PowerShell):
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 48 | % {[char]$_})
```

**Get Gmail App Password:**
1. [myaccount.google.com](https://myaccount.google.com) → Security → 2-Step Verification (must be ON)
2. Search "App Passwords" → App: Mail → Device: Other → name it "Render"
3. Copy the 16-character password → paste as `SMTP_PASS`

### 2c. Deploy
Click **Save Changes** → Render auto-deploys. Copy your Render URL:
`https://intersites-digital-server.onrender.com`

---

## Step 3 — Deploy Frontend on Vercel

### 3a. Create Project
1. Go to [vercel.com](https://vercel.com) → **New Project** → Import your GitHub repo
2. Set:
   - **Root Directory:** `client`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### 3b. Add Environment Variable
```
VITE_API_URL = https://api.intersitesdigital.in
```
Tick all three: ✅ Production ✅ Preview ✅ Development

### 3c. Deploy
Click **Deploy** → copy your Vercel URL.

---

## Step 4 — Custom Domain Setup

### Frontend → `intersitesdigital.in` (Vercel)

**On Vercel:**
1. Project → **Settings** → **Domains**
2. Add `intersitesdigital.in` and `www.intersitesdigital.in`

**On your domain registrar:**
```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

### Backend → `api.intersitesdigital.in` (Render)

**On Render:**
1. Web Service → **Settings** → **Custom Domains** → **Add Custom Domain**
2. Type `api.intersitesdigital.in` → Render shows a CNAME value

**On your domain registrar:**
```
Type     Name    Value
CNAME    api     your-service.onrender.com
```

Wait 10–30 minutes for DNS propagation. SSL is auto-issued on both platforms.

---

## Step 5 — Verify

Check these in your browser:

```
https://api.intersitesdigital.in/health
→ { "status": "ok", "timestamp": "..." }

https://intersitesdigital.in
→ Frontend loads correctly
```

---

## Step 6 — Keep Backend Awake (Free Tier)

Render free tier sleeps after 15 min of inactivity. Use UptimeRobot to prevent this:

1. Go to [uptimerobot.com](https://uptimerobot.com) → Sign up free
2. **Add New Monitor:**
   - Type: HTTP(s)
   - Name: Intersites Backend
   - URL: `https://api.intersitesdigital.in/health`
   - Interval: Every 5 minutes
3. **Create Monitor**

Backend now stays awake 24/7 at no cost.

---

## Step 7 — Future Deployments

Every `git push` to `main` auto-triggers:
- ✅ Vercel rebuilds and redeploys frontend
- ✅ Render rebuilds and redeploys backend

No manual steps needed.

---

## Common Issues

### CORS error after deployment
`ALLOWED_ORIGIN` on Render must exactly match your frontend URL — no trailing slash.
```
ALLOWED_ORIGIN = https://intersitesdigital.in   ✅
ALLOWED_ORIGIN = https://intersitesdigital.in/  ❌
```

### MongoDB connection fails on Render
Render runs in the cloud so the Windows DNS issue does not apply — your `MONGODB_URI` (SRV) works fine on Render. If it still fails, check:
- Atlas IP whitelist has `0.0.0.0/0`
- Password has no unencoded special characters

### Environment variables not taking effect
After updating env vars on Render, you must **manually redeploy**:
Render → your service → **Manual Deploy** → **Deploy Latest Commit**

After updating env vars on Vercel:
Deployments → `...` on latest → **Redeploy**

---

## Deployment Checklist

```
✅ Code pushed to GitHub
✅ Render env variables filled in
✅ Gmail App Password generated and added as SMTP_PASS
✅ Vercel VITE_API_URL = https://api.intersitesdigital.in
✅ MongoDB Atlas IP whitelist has 0.0.0.0/0
✅ DNS records added for intersitesdigital.in (Vercel)
✅ DNS records added for api.intersitesdigital.in (Render)
✅ Both services redeployed after env changes
✅ https://api.intersitesdigital.in/health returns { status: ok }
✅ https://intersitesdigital.in loads the frontend
✅ UptimeRobot monitor created
```
