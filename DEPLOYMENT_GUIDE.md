# Complete Deployment Guide - Welled Foundation

## 🚀 Overview

This guide covers deploying both **Frontend (React)** and **Backend (Node.js/Express)** to make your NGO website fully live.

---

## 📋 Table of Contents

1. [Frontend Deployment (Vercel)](#frontend-deployment)
2. [Backend Deployment Options](#backend-deployment)
3. [Database Setup](#database-setup)
4. [Environment Variables](#environment-variables)
5. [Connecting Frontend to Backend](#connecting-frontend-to-backend)
6. [Domain Configuration](#domain-configuration)
7. [Testing & Verification](#testing--verification)

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend for Production

1. **Ensure all dependencies are installed:**
   ```bash
   npm install
   ```

2. **Test the build locally:**
   ```bash
   npm run build
   npm run preview
   ```

3. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

### Step 2: Deploy to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com)** and sign in with GitHub

2. **Click "Add New..." → "Project"**

3. **Import your repository:**
   - Select `well-ed_foundation` repository
   - Click "Import"

4. **Configure Project Settings:**
   - **Framework Preset:** Vite (auto-detected)
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

5. **Add Environment Variables** (if needed):
   - Click "Environment Variables"
   - Add: `VITE_API_URL=https://your-backend-url.com`
   - Add any other frontend environment variables

6. **Click "Deploy"**

7. **Wait for deployment** (1-2 minutes)

8. **Your site is live!** 
   - URL: `https://well-ed-foundation.vercel.app`
   - Or custom domain if configured

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# For production
vercel --prod
```

### Step 3: Automatic Deployments

- ✅ Every push to `main` branch = automatic deployment
- ✅ Pull requests = preview deployments
- ✅ Zero downtime updates

---

## ⚙️ Backend Deployment

### Recommended: Railway (Easiest & Free Tier Available)

#### Step 1: Prepare Backend Code

1. **Create backend folder structure:**
   ```
   backend/
   ├── server.js
   ├── package.json
   ├── .env.example
   ├── routes/
   ├── models/
   ├── controllers/
   └── middleware/
   ```

2. **Create `package.json` for backend:**
   ```json
   {
     "name": "welled-foundation-backend",
     "version": "1.0.0",
     "type": "module",
     "main": "server.js",
     "scripts": {
       "start": "node server.js",
       "dev": "nodemon server.js"
     },
     "dependencies": {
       "express": "^4.18.2",
       "cors": "^2.8.5",
       "dotenv": "^16.3.1",
       "mongoose": "^7.5.0",
       "razorpay": "^2.9.2",
       "nodemailer": "^6.9.7"
     }
   }
   ```

3. **Create basic `server.js`:**
   ```javascript
   import express from 'express';
   import cors from 'cors';
   import dotenv from 'dotenv';
   
   dotenv.config();
   
   const app = express();
   const PORT = process.env.PORT || 3000;
   
   app.use(cors());
   app.use(express.json());
   
   app.get('/api/health', (req, res) => {
     res.json({ status: 'OK', message: 'Server is running' });
   });
   
   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });
   ```

4. **Create `.env.example`:**
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

#### Step 2: Deploy to Railway

1. **Go to [railway.app](https://railway.app)** and sign in with GitHub

2. **Click "New Project" → "Deploy from GitHub repo"**

3. **Select your repository** (or create a new one for backend)

4. **Configure:**
   - **Root Directory:** `backend` (if backend is in a folder)
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

5. **Add Environment Variables:**
   - Click on your project → "Variables"
   - Add all variables from `.env.example`
   - Railway will automatically restart the service

6. **Get your backend URL:**
   - Railway provides: `https://your-project.railway.app`
   - Copy this URL for frontend configuration

#### Alternative Backend Hosting Options:

### Option 2: Render (Free Tier)

1. Go to [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect GitHub repository
4. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variables
6. Deploy

### Option 3: Heroku (Paid, but reliable)

1. Install Heroku CLI: `npm install -g heroku`
2. Login: `heroku login`
3. Create app: `heroku create welled-foundation-api`
4. Set config vars: `heroku config:set KEY=value`
5. Deploy: `git push heroku main`

### Option 4: AWS/Google Cloud/Azure (Enterprise)

- More complex setup
- Better for high traffic
- Requires more configuration
- Higher costs

---

## 🗄️ Database Setup

### Option 1: MongoDB Atlas (Recommended - Free Tier)

1. **Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)**

2. **Create Free Account**

3. **Create a Cluster:**
   - Choose "Free" tier (M0)
   - Select region closest to your backend
   - Click "Create Cluster"

4. **Create Database User:**
   - Go to "Database Access"
   - Add new user
   - Save username and password

5. **Whitelist IP Address:**
   - Go to "Network Access"
   - Add IP: `0.0.0.0/0` (for development)
   - Or add Railway/Render IPs for production

6. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database password

7. **Add to Backend Environment Variables:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/welled-foundation?retryWrites=true&w=majority
   ```

### Option 2: Railway PostgreSQL (If using PostgreSQL)

1. In Railway dashboard
2. Click "New" → "Database" → "Add PostgreSQL"
3. Railway provides connection string automatically
4. Add to environment variables

### Option 3: Supabase (Free PostgreSQL)

1. Go to [supabase.com](https://supabase.com)
2. Create project
3. Get connection string from Settings → Database
4. Add to backend environment variables

---

## 🔐 Environment Variables

### Frontend Environment Variables (Vercel)

Add these in Vercel Dashboard → Settings → Environment Variables:

```env
VITE_API_URL=https://your-backend-url.railway.app
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_SITE_URL=https://your-frontend-url.vercel.app
```

### Backend Environment Variables (Railway/Render)

Add these in your backend hosting platform:

```env
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
JWT_SECRET=your_random_secret_key
FRONTEND_URL=https://your-frontend-url.vercel.app
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

**Important:** 
- Never commit `.env` files to GitHub
- Use `.env.example` as a template
- Add `.env` to `.gitignore`

---

## 🔗 Connecting Frontend to Backend

### Step 1: Update Frontend API Configuration

Create `src/config/api.js`:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const apiConfig = {
  baseURL: API_URL,
  endpoints: {
    donations: `${API_URL}/api/donations`,
    campaigns: `${API_URL}/api/campaigns`,
    contact: `${API_URL}/api/contact`,
  }
};

export default apiConfig;
```

### Step 2: Create API Service

Create `src/services/api.js`:

```javascript
import apiConfig from '../config/api';

export const apiService = {
  async post(endpoint, data) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  
  async get(endpoint) {
    const response = await fetch(endpoint);
    return response.json();
  }
};
```

### Step 3: Update CORS in Backend

In your backend `server.js`:

```javascript
import cors from 'cors';

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://your-frontend-url.vercel.app',
    process.env.FRONTEND_URL
  ],
  credentials: true,
};

app.use(cors(corsOptions));
```

### Step 4: Test Connection

1. Deploy backend first
2. Test backend health: `https://your-backend.railway.app/api/health`
3. Update frontend `VITE_API_URL` in Vercel
4. Redeploy frontend
5. Test from frontend

---

## 🌐 Domain Configuration

### Step 1: Get a Domain

- Purchase from: Namecheap, GoDaddy, Google Domains, etc.
- Example: `welledfoundation.org`

### Step 2: Configure Frontend Domain (Vercel)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain: `welledfoundation.org`
3. Add `www.welledfoundation.org` (optional)
4. Vercel provides DNS records to add:
   - Type: `A` or `CNAME`
   - Value: Vercel's IP or domain
5. Add these records in your domain provider's DNS settings
6. Wait for DNS propagation (5-30 minutes)

### Step 3: Configure Backend Subdomain (Optional)

1. Add subdomain: `api.welledfoundation.org`
2. Point to your backend URL (Railway/Render)
3. Update frontend `VITE_API_URL` to use subdomain

---

## ✅ Testing & Verification

### Checklist:

- [ ] Frontend loads correctly
- [ ] Backend health check works
- [ ] API calls from frontend work
- [ ] CORS is configured correctly
- [ ] Database connection works
- [ ] Payment gateway integration works (test mode)
- [ ] Email sending works
- [ ] Forms submit correctly
- [ ] Mobile responsive
- [ ] SSL certificates active (HTTPS)
- [ ] Environment variables set correctly

### Test Commands:

```bash
# Test frontend build
npm run build
npm run preview

# Test backend locally
cd backend
npm install
npm run dev

# Test API
curl https://your-backend.railway.app/api/health
```

---

## 📊 Monitoring & Maintenance

### Recommended Tools:

1. **Uptime Monitoring:**
   - UptimeRobot (free)
   - Pingdom
   - StatusCake

2. **Error Tracking:**
   - Sentry (free tier)
   - LogRocket

3. **Analytics:**
   - Google Analytics
   - Vercel Analytics (built-in)

4. **Logs:**
   - Railway: Built-in logs
   - Vercel: Built-in logs
   - Or use external service

---

## 🚨 Common Issues & Solutions

### Issue 1: CORS Errors
**Solution:** Update backend CORS to include frontend URL

### Issue 2: Environment Variables Not Working
**Solution:** 
- Restart deployment after adding variables
- Check variable names (case-sensitive)
- Frontend variables must start with `VITE_`

### Issue 3: Database Connection Failed
**Solution:**
- Check MongoDB Atlas IP whitelist
- Verify connection string
- Check database user permissions

### Issue 4: Build Failures
**Solution:**
- Check build logs in deployment platform
- Ensure all dependencies in `package.json`
- Check Node.js version compatibility

---

## 📝 Quick Deployment Summary

### Frontend (Vercel):
1. Push code to GitHub
2. Import to Vercel
3. Deploy (automatic)

### Backend (Railway):
1. Create backend folder
2. Push to GitHub
3. Import to Railway
4. Add environment variables
5. Deploy

### Database (MongoDB Atlas):
1. Create free cluster
2. Get connection string
3. Add to backend environment variables

### Connect:
1. Update frontend `VITE_API_URL`
2. Configure CORS in backend
3. Test API calls

---

## 🎯 Next Steps After Deployment

1. ✅ Set up monitoring
2. ✅ Configure custom domain
3. ✅ Set up email service
4. ✅ Integrate payment gateway
5. ✅ Add analytics
6. ✅ Set up backup strategy
7. ✅ Document API endpoints
8. ✅ Set up staging environment

---

## 💡 Pro Tips

1. **Use separate branches:**
   - `main` = production
   - `develop` = staging
   - `feature/*` = new features

2. **Test locally first:**
   - Always test before deploying
   - Use `.env.local` for local development

3. **Monitor costs:**
   - Free tiers have limits
   - Set up billing alerts

4. **Backup regularly:**
   - Database backups
   - Code backups (GitHub)

5. **Security:**
   - Use HTTPS everywhere
   - Never expose secrets
   - Keep dependencies updated

---

## 📞 Need Help?

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com

---

**Your website will be live at:**
- Frontend: `https://your-project.vercel.app`
- Backend: `https://your-project.railway.app`

Good luck with your deployment! 🚀

