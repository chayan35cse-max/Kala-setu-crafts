# 🚀 Deployment Guide: KalaSetu Platform

This guide outlines how to deploy the **KalaSetu** Indian Traditional Crafts platform to popular free and production cloud providers.

---

## 🌟 Option 1: Render.com (Recommended Full-Stack Hosting)

Render provides free hosting for both the React frontend and Node.js/Express backend in a single unified service.

### Steps:
1. Push this project to **GitHub** (or drag-and-drop the folder to a new GitHub repository at [github.com/new](https://github.com/new)).
2. Go to **[render.com](https://render.com)** and sign in.
3. Click **"New +"** → **"Web Service"**.
4. Connect your GitHub repository.
5. Configure the build and start settings:
   - **Environment**: `Node`
   - **Build Command**: 
     ```bash
     npm install && cd client && npm install && npm run build && cd ../server && npm install
     ```
   - **Start Command**: 
     ```bash
     node server/server.js
     ```
6. (Optional) Under **Environment Variables**, add:
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = *(Your MongoDB Atlas connection string, or leave blank to use the built-in database)*
7. Click **"Create Web Service"**. Render will build and deploy your live URL (e.g. `https://kalasetu.onrender.com`).

---

## 🌟 Option 2: Vercel (Fast Global Edge Deployment)

1. Install the Vercel CLI or go to **[vercel.com](https://vercel.com)**:
   ```bash
   npx vercel
   ```
2. Or import your GitHub repository into Vercel.
3. Vercel will automatically detect `vercel.json` and build both the Vite frontend and the serverless Express API.

---

## 🌟 Option 3: Railway.app

1. Go to **[railway.app](https://railway.app)**.
2. Click **"New Project"** → **"Deploy from GitHub repo"**.
3. Railway will automatically detect the root `Procfile` and `package.json` and deploy the unified app.
4. Add a free MongoDB plugin directly in Railway for persistent cloud database storage.

---

## 🌟 Option 4: Docker / Cloud VPS (AWS / GCP / DigitalOcean)

If you have Docker installed on your VPS or cloud instance:

```bash
# Build and run containerized app with MongoDB
docker-compose up -d --build
```
The application will be live on port `5000` with MongoDB running in a isolated volume container.

---

## 🗄️ Setting Up Free MongoDB Atlas (Optional)

If you want a dedicated cloud database:
1. Create a free account at **[mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)**.
2. Create a free **M0 Shared Cluster**.
3. Under **Database Access**, create a database user and password.
4. Under **Network Access**, add IP `0.0.0.0/0` (allow access from anywhere).
5. Copy your connection URI:
   `mongodb+srv://<username>:<password>@cluster0.mongodb.net/kalasetu?retryWrites=true&w=majority`
6. Set this as `MONGODB_URI` in your hosting dashboard environment variables.
*(Note: KalaSetu also runs seamlessly out-of-the-box using its built-in memory datastore if no MongoDB URI is provided).*
