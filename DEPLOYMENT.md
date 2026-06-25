# Deployment Guide: Next.js to Google Cloud Run

This document outlines the complete process used to deploy this Next.js application to Google Cloud Run, covering preparation, deployment commands, domain setup, and maintenance.

## Docker Deployment

Deploying with Docker means packaging your application and its entire environment into a single, portable unit called a **Container Image**.

### Key Concepts

1. **The Dockerfile (The Recipe):**
   This is a text file that contains instructions on how to build your application. It acts like a recipe:
   - "Start with a base Linux system with Node.js installed."
   - "Copy my project files into the folder."
   - "Run `npm install`."
   - "Run `npm run build`."

2. **The Image (The Package):**
   When you run the build command, Docker executes the recipe and creates a snapshotted file called an **Image**. This image contains your code, libraries, system tools, and settings. It is immutable—once built, it doesn't change.

3. **The Registry (The Warehouse):**
   This is a cloud location where you store your images. In this project, we use **Google Container Registry (GCR)**. It's like a private GitHub but for built binaries instead of source code.

4. **The Container (The Running Application):**
   When you deploy to Cloud Run, Google downloads your Image from the Registry and starts it up. This running instance is called a **Container**.
   - **Independence:** It doesn't matter if the server is Ubuntu, Mac, or Windows; the container has its own internal Linux file system.
   - **Consistency:** If it runs on your machine, it will run exactly the same way in the cloud.

### Why use this approach?

Unlike traditional hosting (like Vercel) where you push code and the platform figures out how to run it, Containerization gives you full control. You decide the OS, the Node version, and the exact files included. This reduces "it works on my machine" bugs and allows for highly scalable, serverless deployment on any cloud provider.

---

## 1. Project Preparation

The following changes were made to prepare the codebase for containerization:

1. **Next.js Configuration (`next.config.ts`)**:
   - Added `output: "standalone"` to `nextConfig`. This creates an optimized production build (roughly ~90MB) instead of copying the entire `node_modules`.

2. **Docker Configuration**:
   - **Dockerfile**: Created a multi-stage Dockerfile optimized for Next.js and PNPM.
   - **`.dockerignore`**: Created to exclude `node_modules`, `.git`, and `.next` from the build context.

3. **Cloud Build Configuration**:
   - **`.gcloudignore`**: Created specifically to **allow** the `.env` file to be uploaded during the build (so build-time environment variables work), while keeping other ignored files excluded.

---

## 2. Deployment Commands

The deployment is a two-step manual process (independent of Git):

### Step 1: Build & Push Container

This commands packages your local code into a Docker image and uploads it to Google Container Registry (GCR).

_Replace `[PROJECT_ID]` and `[APP_NAME]` with your specific values._

```bash
gcloud builds submit --tag gcr.io/[PROJECT_ID]/[APP_NAME] .
```

### Step 2: Deploy to Cloud Run

This command spins up the service using the image built in Step 1.

```bash
gcloud run deploy [APP_NAME] \
  --image gcr.io/[PROJECT_ID]/[APP_NAME] \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars DATABASE_URL='YOUR_NEON_DB_URL' \
  --set-env-vars NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY='YOUR_CLERK_KEY' \
  --set-env-vars CLERK_SECRET_KEY='YOUR_CLERK_SECRET' \
  --set-env-vars CLERK_WEBHOOK_SIGNING_SECRET='YOUR_WEBHOOK_SECRET'
```

---

## 3. Custom Domain Configuration

**Domain:** `https://www.yesecommerce.shop`
**Provider:** Hostinger

1. **Verification**: The domain ownership was verified via Google Search Console.
2. **Mapping Command**:

   ```bash
   gcloud beta run domain-mappings create --service [APP_NAME] --domain www.yesecommerce.shop --region us-central1
   ```

3. **DNS Update**:
   - Removed old Vercel records (`cname.vercel-dns.com` / `76.76.21.21`).
   - Added CNAME record pointing `www` to `ghs.googlehosted.com`.
4. **Status Check**:

   ```bash
   # Check Cloud Run mapping status
   gcloud beta run domain-mappings describe --domain www.yesecommerce.shop --region us-central1

   # Check DNS propagation
   dig www.yesecommerce.shop +short
   ```

---

## 4. Updates & Maintenance

Since this is a manual workflow, pushing to GitHub **will not** trigger a deployment. To update the live site:

1. Make changes to your code locally.
2. Run the **Build** command (Step 1).
3. Run the **Deploy** command (Step 2) - _Note: You do not need to pass the environment variables again; Cloud Run remembers them._

---

## 5. Cloud Run Billing Overview

- **Model**: Pay-as-you-go. You are billed only when the container is processing a request.
- **Idle Cost**: $0 (The container scales to 0 when not in use).
- **Free Tier** (Monthly):
  - First 2 Million requests: Free.
  - First 180,000 vCPU-seconds: Free.
  - First 360,000 GiB-seconds Memory: Free.
- **Recommendation**: Keep "Min Instances" set to `0` to maximize cost savings for low-traffic periods.
