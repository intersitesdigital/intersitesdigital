# Deployment Guide

## Frontend Deployment (Vercel)

1. **Connect Repository**
   - Go to [Vercel](https://vercel.com)
   - Import your Git repository
   - Select the `client` folder as the root directory

2. **Configure Build Settings**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables**
   - Add `VITE_API_BASE_URL` pointing to your backend API

4. **Deploy**
   - Click Deploy
   - Vercel will automatically deploy on every push to main branch

## Backend Deployment (Railway)

1. **Connect Repository**
   - Go to [Railway](https://railway.app)
   - New Project → Deploy from GitHub repo
   - Select your repository

2. **Configure Service**
   - Root Directory: `server`
   - Start Command: `npm start`
   - Build Command: `npm install`

3. **Environment Variables**
   - Add all variables from `.env.example`
   - Set `NODE_ENV=production`
   - Set `CORS_ORIGIN` to your Vercel frontend URL
   - Add MongoDB Atlas connection string

4. **MongoDB Atlas Setup**
   - Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster
   - Create database user
   - Whitelist Railway IP (or use 0.0.0.0/0 for development)
   - Copy connection string to Railway env vars

5. **Deploy**
   - Railway will automatically deploy
   - Copy the generated URL and update frontend `VITE_API_BASE_URL`

## Post-Deployment Checklist

- [ ] Test all API endpoints
- [ ] Verify CORS settings
- [ ] Check environment variables
- [ ] Test contact form submission
- [ ] Verify MongoDB connection
- [ ] Check error logging
- [ ] Test rate limiting
- [ ] Verify SEO meta tags
- [ ] Test dark mode
- [ ] Mobile responsiveness check
