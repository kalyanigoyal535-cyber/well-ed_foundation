# Complete Google Cloud Deployment Guide
## Full-Stack Deployment (React Frontend + Node.js Backend)

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Architecture Overview](#architecture-overview)
3. [Backend Deployment (Node.js)](#backend-deployment)
4. [Frontend Deployment (React)](#frontend-deployment)
5. [Database Setup](#database-setup)
6. [Connecting Frontend to Backend](#connecting-frontend-to-backend)
7. [Environment Variables](#environment-variables)
8. [Domain & SSL Configuration](#domain--ssl-configuration)
9. [Testing & Verification](#testing--verification)

---

## 🔧 Prerequisites

1. **Google Cloud Account**
   - Sign up at [cloud.google.com](https://cloud.google.com)
   - Get $300 free credits (valid for 90 days)

2. **Install Google Cloud SDK (gcloud CLI)**
   ```bash
   # Windows (PowerShell as Administrator)
   (New-Object Net.WebClient).DownloadFile("https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe", "$env:Temp\GoogleCloudSDKInstaller.exe")
   & $env:Temp\GoogleCloudSDKInstaller.exe
   
   # Or download from: https://cloud.google.com/sdk/docs/install
   ```

3. **Initialize gcloud**
   ```bash
   gcloud init
   # Login and select your project
   ```

4. **Enable Required APIs**
   ```bash
   gcloud services enable cloudbuild.googleapis.com
   gcloud services enable run.googleapis.com
   gcloud services enable sqladmin.googleapis.com
   gcloud services enable storage-api.googleapis.com
   ```

---

## 🏗️ Architecture Overview

**Recommended Setup:**
- **Frontend:** Cloud Run or Firebase Hosting
- **Backend:** Cloud Run (Node.js/Express)
- **Database:** Cloud SQL (PostgreSQL/MySQL) or Firestore
- **Storage:** Cloud Storage (for images/files)

**Why Cloud Run?**
- ✅ Auto-scaling (scales to zero when not in use)
- ✅ Pay only for what you use
- ✅ Easy deployment with Docker
- ✅ Supports both frontend and backend

---

## ⚙️ Backend Deployment (Node.js)

### Option 1: Cloud Run (Recommended) ⭐

#### Step 1: Create Backend Structure

Create a `backend` folder in your project:

```
backend/
├── server.js
├── package.json
├── Dockerfile
├── .dockerignore
├── .env.example
├── .gcloudignore
├── routes/
│   └── donations.js
├── controllers/
│   └── donationController.js
├── models/
│   └── Donation.js
└── middleware/
    └── cors.js
```

#### Step 2: Create Backend Files

**`backend/package.json`:**
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
    "pg": "^8.11.3",
    "razorpay": "^2.9.2",
    "nodemailer": "^6.9.7",
    "express-validator": "^7.0.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  },
  "engines": {
    "node": "18.x"
  }
}
```

**`backend/server.js`:**
```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.get('/api', (req, res) => {
  res.json({ message: 'Welled Foundation API' });
});

// Donations endpoint (placeholder)
app.post('/api/donations', async (req, res) => {
  try {
    // TODO: Add donation processing logic
    res.json({ 
      success: true, 
      message: 'Donation received',
      data: req.body 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
```

**`backend/Dockerfile`:**
```dockerfile
# Use official Node.js runtime
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 8080

# Start the application
CMD ["node", "server.js"]
```

**`backend/.dockerignore`:**
```
node_modules
npm-debug.log
.env
.env.local
.git
.gitignore
README.md
```

**`backend/.gcloudignore`:**
```
node_modules/
.env
.env.local
.git/
*.log
```

**`backend/.env.example`:**
```env
PORT=8080
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.run.app

# Database (Cloud SQL)
DB_HOST=your-cloud-sql-ip
DB_PORT=5432
DB_NAME=welled_foundation
DB_USER=your-db-user
DB_PASSWORD=your-db-password

# Or MongoDB Atlas
MONGODB_URI=mongodb+srv://...

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

# JWT
JWT_SECRET=your_jwt_secret_key

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

#### Step 3: Deploy Backend to Cloud Run

**Method A: Using gcloud CLI (Recommended)**

```bash
# Navigate to backend directory
cd backend

# Build and deploy to Cloud Run
gcloud run deploy welled-foundation-api \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --set-env-vars NODE_ENV=production

# After deployment, you'll get a URL like:
# https://welled-foundation-api-xxxxx-uc.a.run.app
```

**Method B: Using Cloud Build (CI/CD)**

1. **Create `cloudbuild.yaml` in backend folder:**
```yaml
steps:
  # Build the container image
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/welled-foundation-api', '.']
  
  # Push the container image
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/welled-foundation-api']
  
  # Deploy container image to Cloud Run
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args:
      - 'run'
      - 'deploy'
      - 'welled-foundation-api'
      - '--image'
      - 'gcr.io/$PROJECT_ID/welled-foundation-api'
      - '--region'
      - 'us-central1'
      - '--platform'
      - 'managed'
      - '--allow-unauthenticated'

images:
  - 'gcr.io/$PROJECT_ID/welled-foundation-api'
```

2. **Deploy:**
```bash
gcloud builds submit --config cloudbuild.yaml
```

#### Step 4: Set Environment Variables

```bash
# Set environment variables for Cloud Run service
gcloud run services update welled-foundation-api \
  --region us-central1 \
  --set-env-vars "FRONTEND_URL=https://your-frontend-url.run.app" \
  --set-env-vars "DB_HOST=your-cloud-sql-ip" \
  --set-env-vars "DB_NAME=welled_foundation" \
  --set-env-vars "DB_USER=your-db-user" \
  --set-env-vars "DB_PASSWORD=your-db-password" \
  --set-env-vars "RAZORPAY_KEY_ID=your_key" \
  --set-env-vars "RAZORPAY_KEY_SECRET=your_secret" \
  --set-env-vars "JWT_SECRET=your_jwt_secret"

# Or use Secret Manager for sensitive data (recommended)
gcloud secrets create razorpay-key-secret --data-file=-
# Then reference in Cloud Run
```

**Get your backend URL:**
```bash
gcloud run services describe welled-foundation-api \
  --region us-central1 \
  --format 'value(status.url)'
```

---

### Option 2: App Engine (Alternative)

**Create `backend/app.yaml`:**
```yaml
runtime: nodejs18

env_variables:
  NODE_ENV: production
  PORT: 8080

automatic_scaling:
  min_instances: 0
  max_instances: 10
```

**Deploy:**
```bash
cd backend
gcloud app deploy
```

---

## 🎨 Frontend Deployment (React)

### Option 1: Cloud Run (Recommended) ⭐

#### Step 1: Create Dockerfile for Frontend

**`Dockerfile` (in root directory):**
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files to nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

**`nginx.conf`:**
```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Handle React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**`.dockerignore`:**
```
node_modules
dist
.git
.env
.env.local
*.log
```

#### Step 2: Deploy Frontend to Cloud Run

```bash
# From project root
gcloud run deploy welled-foundation-frontend \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 80 \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --set-env-vars "VITE_API_URL=https://welled-foundation-api-xxxxx-uc.a.run.app"

# You'll get a URL like:
# https://welled-foundation-frontend-xxxxx-uc.a.run.app
```

---

### Option 2: Firebase Hosting (Easier Alternative)

#### Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

#### Step 2: Initialize Firebase

```bash
firebase init hosting

# Select:
# - Use existing project or create new
# - Public directory: dist
# - Single-page app: Yes
# - Overwrite index.html: No
```

#### Step 3: Build and Deploy

```bash
# Build your React app
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

**Your site will be at:** `https://your-project-id.web.app`

---

### Option 3: Cloud Storage + Cloud CDN

```bash
# Build the app
npm run build

# Create bucket
gsutil mb -p your-project-id -c STANDARD -l us-central1 gs://welled-foundation-frontend

# Upload files
gsutil -m cp -r dist/* gs://welled-foundation-frontend/

# Make bucket public
gsutil iam ch allUsers:objectViewer gs://welled-foundation-frontend

# Enable static website hosting
gsutil web set -m index.html gs://welled-foundation-frontend
```

---

## 🗄️ Database Setup

### Option 1: Cloud SQL (PostgreSQL/MySQL) - Recommended

#### Step 1: Create Cloud SQL Instance

```bash
# Create PostgreSQL instance
gcloud sql instances create welled-foundation-db \
  --database-version=POSTGRES_14 \
  --tier=db-f1-micro \
  --region=us-central1 \
  --root-password=your-secure-password

# Or MySQL
gcloud sql instances create welled-foundation-db \
  --database-version=MYSQL_8_0 \
  --tier=db-f1-micro \
  --region=us-central1 \
  --root-password=your-secure-password
```

#### Step 2: Create Database and User

```bash
# Get instance connection name
gcloud sql instances describe welled-foundation-db \
  --format='value(connectionName)'

# Create database
gcloud sql databases create welled_foundation \
  --instance=welled-foundation-db

# Create user
gcloud sql users create dbuser \
  --instance=welled-foundation-db \
  --password=your-user-password
```

#### Step 3: Connect from Cloud Run

```bash
# Get instance IP
gcloud sql instances describe welled-foundation-db \
  --format='value(ipAddresses[0].ipAddress)'

# Add Cloud Run service account to Cloud SQL
gcloud projects add-iam-policy-binding your-project-id \
  --member="serviceAccount:your-service-account@your-project.iam.gserviceaccount.com" \
  --role="roles/cloudsql.client"

# Update Cloud Run to connect to Cloud SQL
gcloud run services update welled-foundation-api \
  --region us-central1 \
  --add-cloudsql-instances=your-project-id:us-central1:welled-foundation-db \
  --set-env-vars "DB_HOST=/cloudsql/your-project-id:us-central1:welled-foundation-db"
```

---

### Option 2: Firestore (NoSQL) - Easier Setup

```bash
# Firestore is automatically available
# Just use Firebase Admin SDK in your backend

# Install in backend
npm install firebase-admin
```

**In your backend:**
```javascript
import admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const db = admin.firestore();
```

---

## 🔗 Connecting Frontend to Backend

### Step 1: Update Frontend API Configuration

**Create `src/config/api.js`:**
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const apiConfig = {
  baseURL: API_URL,
  endpoints: {
    donations: `${API_URL}/api/donations`,
    health: `${API_URL}/api/health`,
  }
};

export default apiConfig;
```

### Step 2: Update Donate.jsx to Use API

**In `src/pages/Donate.jsx`, update handleSubmit:**
```javascript
import apiConfig from '../config/api';

const handleSubmit = useCallback(async (e) => {
  e.preventDefault();
  
  const isValid = validateForm()
  if (!isValid) {
    return;
  }
  
  setIsSubmitting(true);
  
  try {
    const response = await fetch(apiConfig.endpoints.donations, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        amount: parseInt(donationAmount || customAmount),
        donationType: activeTab,
        donorType: donorType
      }),
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Redirect to payment gateway or show success
      alert('Thank you for your donation! Redirecting to payment...');
      // window.location.href = data.paymentUrl;
    } else {
      throw new Error(data.error || 'Something went wrong');
    }
  } catch (error) {
    console.error('Error submitting donation:', error);
    alert('An error occurred. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
}, [validateForm, formData, activeTab, donationAmount, customAmount, donorType]);
```

### Step 3: Set Environment Variable

**In Cloud Run frontend deployment:**
```bash
gcloud run services update welled-foundation-frontend \
  --region us-central1 \
  --set-env-vars "VITE_API_URL=https://welled-foundation-api-xxxxx-uc.a.run.app"
```

**Or create `.env.production`:**
```env
VITE_API_URL=https://welled-foundation-api-xxxxx-uc.a.run.app
```

---

## 🔐 Environment Variables

### Backend Environment Variables (Cloud Run)

```bash
# Set all at once
gcloud run services update welled-foundation-api \
  --region us-central1 \
  --update-env-vars "NODE_ENV=production,FRONTEND_URL=https://your-frontend-url.run.app,DB_HOST=your-db-host,DB_NAME=welled_foundation,DB_USER=dbuser,DB_PASSWORD=your-password"
```

### Frontend Environment Variables

**For Cloud Run:**
```bash
gcloud run services update welled-foundation-frontend \
  --region us-central1 \
  --update-env-vars "VITE_API_URL=https://your-backend-url.run.app"
```

**For Firebase Hosting:**
```bash
# Create .env.production file
echo "VITE_API_URL=https://your-backend-url.run.app" > .env.production

# Rebuild and redeploy
npm run build
firebase deploy --only hosting
```

---

## 🌐 Domain & SSL Configuration

### Step 1: Map Custom Domain to Cloud Run

```bash
# Map domain to backend
gcloud run domain-mappings create \
  --service welled-foundation-api \
  --domain api.welledfoundation.org \
  --region us-central1

# Map domain to frontend
gcloud run domain-mappings create \
  --service welled-foundation-frontend \
  --domain welledfoundation.org \
  --region us-central1
```

### Step 2: Update DNS Records

Add the provided DNS records to your domain provider:
- Type: `CNAME`
- Name: `api` (for backend) or `@` (for frontend)
- Value: Provided by Google Cloud

SSL certificates are automatically provisioned by Google Cloud!

---

## ✅ Testing & Verification

### Test Backend

```bash
# Health check
curl https://welled-foundation-api-xxxxx-uc.a.run.app/api/health

# Should return:
# {"status":"OK","message":"Backend is running","timestamp":"..."}
```

### Test Frontend

1. Visit your frontend URL
2. Open browser console (F12)
3. Check for API connection errors
4. Test donation form submission

### Test Full Flow

1. Fill donation form on frontend
2. Submit form
3. Check backend logs:
   ```bash
   gcloud run services logs read welled-foundation-api \
     --region us-central1 \
     --limit 50
   ```
4. Verify database entry (if implemented)

---

## 📊 Monitoring & Logs

### View Logs

```bash
# Backend logs
gcloud run services logs read welled-foundation-api \
  --region us-central1 \
  --limit 100

# Frontend logs
gcloud run services logs read welled-foundation-frontend \
  --region us-central1 \
  --limit 100
```

### Cloud Console

- Visit [console.cloud.google.com](https://console.cloud.google.com)
- Navigate to Cloud Run → Your Services
- View metrics, logs, and configure settings

---

## 💰 Cost Estimation

**Free Tier (Always Free):**
- Cloud Run: 2 million requests/month
- Cloud SQL: db-f1-micro instance (limited hours)
- Cloud Storage: 5GB storage
- Network egress: 1GB/month

**Estimated Monthly Cost (Low Traffic):**
- Cloud Run: $0-5 (with free tier)
- Cloud SQL: $7-10 (db-f1-micro)
- Cloud Storage: $0-1
- **Total: ~$8-16/month**

---

## 🚀 Quick Deployment Commands

### Backend
```bash
cd backend
gcloud run deploy welled-foundation-api \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```

### Frontend
```bash
# Option 1: Cloud Run
gcloud run deploy welled-foundation-frontend \
  --source . \
  --region us-central1 \
  --allow-unauthenticated

# Option 2: Firebase
npm run build
firebase deploy --only hosting
```

---

## 🎯 Next Steps

1. ✅ Set up database schema
2. ✅ Implement payment gateway (Razorpay)
3. ✅ Add email notifications
4. ✅ Set up monitoring alerts
5. ✅ Configure custom domain
6. ✅ Set up CI/CD pipeline
7. ✅ Add error tracking (Sentry)
8. ✅ Implement backup strategy

---

## 📞 Resources

- [Cloud Run Docs](https://cloud.google.com/run/docs)
- [Cloud SQL Docs](https://cloud.google.com/sql/docs)
- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)
- [Google Cloud Pricing](https://cloud.google.com/pricing)

---

**Your deployed URLs:**
- Frontend: `https://welled-foundation-frontend-xxxxx-uc.a.run.app`
- Backend: `https://welled-foundation-api-xxxxx-uc.a.run.app`

Good luck with your deployment! 🚀




