# Joyouth Organization Website

A futuristic, modern, and fully responsive website for Joyouth Organization, a forward-thinking NGO.

## Tech Stack
- Frontend: React 19, Tailwind CSS (v4), Motion (Framer Motion)
- Routing: React Router v6
- Icons: Lucide React
- Theme: Futuristic blue/purple glow with glassmorphism UI

## 🚀 DEPLOYMENT GUIDE

### 1. Vercel (Recommended)
1. Push your repository to GitHub.
2. Sign up/Log in to [Vercel](https://vercel.com).
3. Click "Add New..." -> "Project".
4. Import your GitHub repository.
5. Vercel will auto-detect Vite. Ensure the Build Command is `npm run build` and Output Directory is `dist`.
6. Click **Deploy**.

### 2. Netlify
1. Push your repository to GitHub.
2. Sign in to [Netlify](https://netlify.com).
3. Go to "Sites" -> "Add new site" -> "Import an existing project".
4. Connect GitHub and select the repo.
5. Build settings: `npm run build` and publish directory `dist`.
6. Click **Deploy Site**.

### 3. Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Run `firebase login` and authenticate.
3. Run `firebase init hosting`.
   - Select your Firebase Project.
   - Set the public directory to `dist`.
   - Select "Yes" for "Configure as a single-page app".
4. Build the app: `npm run build`.
5. Deploy: `firebase deploy --only hosting`.

### 4. cPanel (Traditional Shared Hosting)
1. Run `npm run build` locally. This creates a `dist` folder.
2. Zip the contents of the `dist` folder (not the folder itself, but what is inside).
3. Go to your cPanel File Manager -> `public_html`.
4. Upload the zip file and extract it.
5. Create a `.htaccess` file in `public_html` for React Router support:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 🔧 BACKEND INTEGRATION GUIDE

### Firebase Firestore Integration
Currently, the Volunteer Registration saves data to `localStorage`. To connect this to a real database:

1. **Setup Firebase Project**: Go to [Firebase Console](https://console.firebase.google.com), create a project, and enable Firestore Database.
2. **Setup AI Studio tool**: Use the tool `set_up_firebase` from the AI platform if instructed.
3. **Add Firebase config**: Create `src/lib/firebase.ts`. Add your API keys from Firebase.
   ```typescript
   import { initializeApp } from 'firebase/app';
   import { getFirestore, collection, addDoc, getDocs, onSnapshot } from 'firebase/firestore';
   // your config here
   ```
4. **Update `src/lib/store.ts`**: Replace `localStorage.setItem` with Firestore `addDoc(collection(db, "volunteers"), formData)`.
5. **Real-time listeners**: Replace `window.addEventListener("volunteersUpdated")` with Firestore `onSnapshot` inside `Conference.tsx` to automatically pull new registrations in real-time.

### Supabase Integration
1. Create a Supabase project at [Supabase Dashboard](https://database.new).
2. Install client: `npm install @supabase/supabase-js`.
3. Create a table called `volunteers`.
4. Run `supabase.from('volunteers').insert([formData])` inside `handleSubmit` of the Volunteer page.
5. Query `supabase.from('volunteers').select('*')` on the Conference page.

---

## 🌐 DOMAIN CONNECTION GUIDE

To connect your custom domain `joyouth.org.gh`:

1. Log in to your Domain Registrar (where you bought `joyouth.org.gh`).
2. Go to DNS / Name Server Settings.
3. Depending on your host (e.g., Vercel):
   - In Vercel, go to your project Settings -> Domains.
   - Add `joyouth.org.gh`.
   - Vercel will provide an **A Record** (e.g., `76.76.21.21`) or **Nameservers**.
4. In your Registrar's DNS settings, add the **A Record** pointing to Vercel's IP. 
   - Also add a **CNAME** for `www` pointing to `cname.vercel-dns.com`.
5. Wait for DNS propagation (can take a few hours), and TLS/SSL will be generated automatically.

---
© 2026 Joyouth Organization.
