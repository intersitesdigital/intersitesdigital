# Getting Started Guide

## Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (or local MongoDB)
- Git

## Installation Steps

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd intersites-digital
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 3. Set Up Environment Variables

**Frontend (.env in client folder):**
```bash
cd client
cp .env.example .env
# Edit .env with your API URL
```

**Backend (.env in server folder):**
```bash
cd server
cp .env.example .env
# Edit .env with your MongoDB URI and other configs
```

### 4. Set Up MongoDB

**Option A: MongoDB Atlas (Recommended)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create database user
4. Whitelist your IP (or 0.0.0.0/0 for development)
5. Copy connection string to `server/.env`

**Option B: Local MongoDB**
1. Install MongoDB locally
2. Update `MONGODB_URI` in `server/.env` to `mongodb://localhost:27017/intersites-digital`

### 5. Add Your Logo

Replace `client/public/logo.svg` with your actual logo file.

### 6. Start Development Servers

**Option A: Run Both Together (Root)**
```bash
# From root directory
npm run dev
```

**Option B: Run Separately**
```bash
# Terminal 1 - Frontend
cd client
npm run dev

# Terminal 2 - Backend
cd server
npm run dev
```

### 7. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/health

## Development Workflow

1. **Frontend Changes**: Edit files in `client/src/`
2. **Backend Changes**: Edit files in `server/src/`
3. **Shared Code**: Edit files in `shared/`
4. **Hot Reload**: Both frontend and backend support hot reload

## Project Structure

```
intersites-digital/
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Shared constants
└── docs/            # Documentation
```

## Common Tasks

### Adding a New Page
1. Create component in `client/src/pages/`
2. Add route in `client/src/App.jsx`
3. Update navigation in `client/src/components/layout/Navbar.jsx`

### Adding a New API Endpoint
1. Create model in `server/src/modules/[feature]/[feature].model.js`
2. Create controller in `server/src/modules/[feature]/[feature].controller.js`
3. Create routes in `server/src/modules/[feature]/[feature].routes.js`
4. Register routes in `server/src/server.js`

### Adding a New Service
1. Update `shared/constants/services.js`
2. Service will automatically appear in Services page

## Troubleshooting

### MongoDB Connection Issues
- Check MongoDB URI in `.env`
- Verify IP whitelist in MongoDB Atlas
- Check network connectivity

### CORS Errors
- Verify `CORS_ORIGIN` in `server/.env` matches frontend URL
- Check browser console for specific error

### Port Already in Use
- Change `PORT` in `server/.env`
- Update `VITE_API_BASE_URL` in `client/.env`

## Next Steps

- Review [Architecture Documentation](./ARCHITECTURE.md)
- Check [API Documentation](./API.md)
- Read [Deployment Guide](./DEPLOYMENT.md)
