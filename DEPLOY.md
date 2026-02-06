# Deploy to Git & Vercel

## What’s already done

- **`vercel.json`** – Added for your Vite SPA so all routes are served by `index.html`.
- **`.gitignore`** – Updated to ignore `.cursor/` and Vite timestamp files.

---

## 1. Fix Git lock (if needed)

If you see “Unable to create index.lock” or “Another git process seems to be running”:

1. Close any other Git tools (VS Code/Cursor source control, GitHub Desktop, etc.).
2. Delete the lock file (PowerShell from project root):
   ```powershell
   Remove-Item -Force "c:\Users\Sharif\OneDrive - Working Solutions\Documents\cw\project\.git\index.lock" -ErrorAction SilentlyContinue
   ```

---

## 2. Commit and push to Git

From the project folder in PowerShell:

```powershell
cd "c:\Users\Sharif\OneDrive - Working Solutions\Documents\cw\project"

# Stage all changes (respects .gitignore)
git add .

# Commit
git commit -m "Add Vercel config and project updates"

# Push to your remote (e.g. GitHub)
git push origin main
```

If your default branch is different (e.g. `master`), use that name instead of `main`.

---

## 3. Deploy to Vercel

### Option A: Deploy via Vercel dashboard (recommended)

1. Go to [vercel.com](https://vercel.com) and sign in (GitHub/GitLab/Bitbucket).
2. Click **Add New…** → **Project**.
3. **Import** your Git repository (the one you pushed in step 2).
4. Vercel will detect Vite and use:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Framework:** Vite  
   (These are also set in `vercel.json`.)
5. Click **Deploy**. Later pushes to `main` will trigger automatic deploys.

### Option B: Deploy with Vercel CLI

1. Install the CLI (one time):
   ```powershell
   npm i -g vercel
   ```
2. From the project folder:
   ```powershell
   cd "c:\Users\Sharif\OneDrive - Working Solutions\Documents\cw\project"
   vercel
   ```
3. Log in if asked and follow the prompts. Use **Y** to link to an existing Vercel project or create a new one.

---

## Environment variables

If the app needs env vars (e.g. from `.env.example`):

- **Local:** Copy `.env.example` to `.env` and fill in values (`.env` is gitignored).
- **Vercel:** In the project on Vercel → **Settings** → **Environment Variables**, add the same names and values.

---

## Optional: Custom domain

In Vercel: **Project** → **Settings** → **Domains** → add your domain and follow the DNS instructions.
