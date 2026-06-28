# Firebase + React Production Blueprint

> A battle-tested blueprint for building React SPAs with Firebase Auth, Firestore, and Vite.
> Every item here is a hard-won lesson from production debugging — follow it to skip straight to a working stack.

---

## 1. Architecture Overview

### Stack
| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | React 19 + TypeScript | StrictMode enabled |
| Bundler | Vite 7.x | HMR, fast builds |
| Styling | Tailwind v4 | Loaded via `@import "tailwindcss"` |
| Animation | Motion v12 (formerly Framer Motion) | Import from `'motion/react'` |
| Routing | React Router DOM v7 | Lazy-loaded pages, `AnimatePresence` |
| Auth | Firebase Auth (Email/Password) | `signInWithEmailAndPassword` |
| Database | Firestore | Collections: `users`, `properties` |
| Deployment | Vercel (primary) / cPanel (secondary) | SPA routing, single-file build |

### Path Aliases
```jsonc
// tsconfig.json / vite.config.ts
"@": "src/"
```

### No Backend
This is a pure SPA. All data is read/written directly from the browser to Firebase. Form submissions use Formspree (not Firebase).

---

## 2. Firebase Setup — Must-Do Checklist

### 2.1 Create Project
```
Firebase Console → Add Project → (name) → Create
```

### 2.2 Enable Authentication
- **Provider**: Email/Password (enable)
- **Authorized domains**: Add your production domain + localhost

### 2.3 Create Firestore Database
- Location: choose closest region
- Start in **production mode** (rules are deployed separately)
- Database ID: `(default)`

### 2.4 Register Web App
```
Project Settings → General → Your Apps → Add App → Web
→ Copy config values → save to .env
```

### 2.5 Deploy Firestore Rules
The security rules must be deployed via `firebase deploy --only firestore:rules` or the Firebase Console.

**Required Rules** (from production):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isAdmin() {
      return request.auth != null
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    match /properties/{propertyId} {
      allow read: if true;
      allow create: if isAdmin()
        && request.resource.data.keys().hasAll(['title', 'price', 'location', 'image', 'description'])
        && request.resource.data.title is string
        && request.resource.data.price is string
        && request.resource.data.location is string
        && request.resource.data.image is string
        && request.resource.data.description is string;
      allow update: if isAdmin()
        && request.resource.data.title is string
        && request.resource.data.price is string
        && request.resource.data.location is string
        && request.resource.data.image is string
        && request.resource.data.description is string;
      allow delete: if isAdmin();
    }

    match /users/{userId} {
      allow read: if request.auth != null && (request.auth.uid == userId || isAdmin());
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null && (
        (request.auth.uid == userId && request.resource.data.role == data.role)
        || isAdmin()
      );
      allow delete: if isAdmin();
    }
  }
}
```

**⚠️ CRITICAL**: The `isAdmin()` function reads from Firestore. This means **the admin user MUST have a document in the `users/{uid}` collection BEFORE they can write to Firestore**. Create it via `AdminSetup` page or manually:

```
Collection: users
Document ID: <user's Firebase Auth UID>
Fields: { email: string, role: "admin", createdAt: timestamp }
```

---

## 3. Environment Configuration

### 3.1 .env File
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123

# Formspree (optional — for contact forms)
VITE_FORMSPREE_CONTACT_URL=https://formspree.io/f/xxxx
VITE_FORMSPREE_BOOKING_URL=https://formspree.io/f/xxxx
```

### 3.2 Content Security Policy (CSP) — index.html
**This is the #1 cause of silent failures.** Firebase Auth needs multiple endpoints that MUST be in the CSP `connect-src` directive.

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' fonts.gstatic.com data:;
  img-src 'self' data: i.ibb.co images.pexels.com;
  frame-src https://www.youtube.com;
  connect-src 'self'
    https://*.firebaseio.com
    https://identitytoolkit.googleapis.com
    https://securetoken.googleapis.com
    https://firestore.googleapis.com
    https://formspree.io;
  base-uri 'self'
" />
```

**Required `connect-src` endpoints:**

| Endpoint | Used By |
|----------|---------|
| `https://identitytoolkit.googleapis.com` | Firebase Auth — sign in, sign up |
| `https://securetoken.googleapis.com` | **Firebase Auth — token refresh** (⚠️ most commonly forgotten) |
| `https://firestore.googleapis.com` | Firestore CRUD operations |
| `https://*.firebaseio.com` | Firebase Realtime DB / Firestore fallback channels |

**Troubleshooting CSP:** Open browser DevTools Console. Any Firebase operation silently failing? Look for:
```
Refused to connect to 'https://securetoken.googleapis.com/...'
  because it violates the document's Content Security Policy
```
Add the missing endpoint to `connect-src` and **restart the dev server** (Vite does NOT hot-reload `index.html` changes).

### 3.3 cPanel / Alternate Hosting
If deploying to cPanel, update BOTH HTML files:
- Root `index.html` (Vite dev + build source)
- `public_html/index.html` (cPanel deployment target, if used)

The `.htaccess` file for SPA routing:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [QSA,L]
</IfModule>
```

---

## 4. Firebase Client Setup

### 4.1 Initialize Firebase (src/lib/firebase.ts)
```typescript
import { initializeApp, type FirebaseOptions } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

### 4.2 Auth Context (src/context/AuthContext.tsx)
**Key pattern — the `onAuthStateChanged` callback is ASYNC** (it fetches the user role from Firestore). This creates a race condition if not handled correctly.

```typescript
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface AuthContextValue {
  user: User | null;
  userRole: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const ref = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(ref);
          if (userDoc.exists()) {
            const data = userDoc.data();
            const role = data.role ?? data.Role ?? null;
            setUserRole(role);
          } else {
            setUserRole(null);
          }
        } catch (e) {
          console.error('AuthContext: Failed to fetch user role from Firestore', e);
          setUserRole(null);
        }
      } else {
        setUserRole(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, userRole, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
```

### 4.3 Login Redirect — Race Condition Fix
**DO NOT call `navigate('/admin')` immediately after `signIn()` resolves.** The `onAuthStateChanged` callback is async (Firestore role fetch), so React context hasn't updated yet.

**✅ CORRECT pattern:**
```typescript
// In login page component
const { user, userRole, loading: authLoading, signIn } = useAuth();

useEffect(() => {
  if (!authLoading && user) {
    if (userRole === 'admin') {
      navigate('/admin');
    } else {
      setError('You do not have admin access.');
    }
  }
}, [user, userRole, authLoading, navigate]);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  try {
    await signIn(email, password);
    // DON'T navigate here — let the useEffect do it
  } catch (err) {
    // handle error
    setLoading(false);
  }
};
```

**❌ WRONG pattern (causes redirect loop):**
```typescript
await signIn(email, password);
navigate('/admin'); // Race condition! Context may still have null user/role
```

### 4.4 Protected Route Guard
```typescript
function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, userRole, loading } = useAuth();

  if (loading) return <PageLoader />;   // Show spinner while fetching role

  if (!user || userRole !== 'admin') {
    return <Navigate to="/adminlogin" replace />;
  }

  return <>{children}</>;
}
```

---

## 5. Firestore Data Operations — Critical Patterns

### 5.1 Property Service (src/lib/propertyService.ts)
```typescript
import {
  collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc,
  query, orderBy, writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION = 'properties';

export async function getProperties() { /* ... */ }
export async function getProperty(id: string) { /* ... */ }

export async function addProperty(property) {
  const docRef = await addDoc(collection(db, COLLECTION), { ...property, id: '' });
  const newId = docRef.id;
  await updateDoc(docRef, { id: newId });
  return newId;
}

export async function updateProperty(id: string, data) {
  const ref = doc(db, COLLECTION, id);
  await updateDoc(ref, data);
}
```

### 5.2 ⚠️ NEVER Send `undefined` to Firestore
**This is the #2 cause of runtime errors.** Firestore's `updateDoc` and `addDoc` reject `undefined` field values.

```typescript
// ❌ WRONG — sends undefined to Firestore, which throws:
const toPropertyData = (f: Form) => ({
  coordinates: f.coordinates || undefined,  // BUG: "" || undefined = undefined
  contact: f.contact || undefined,           // BUG: "" || undefined = undefined
});

// ✅ CORRECT — conditionally include optional fields:
const toPropertyData = (f: Form) => {
  const data: Record<string, unknown> = {
    title: f.title,
    // ... required fields always present
  };
  if (f.coordinates) data.coordinates = f.coordinates;
  if (f.tagline) data.tagline = f.tagline;
  if (f.contact) data.contact = f.contact;
  // ... only add when truthy
  return data;
};
```

### 5.3 Admin Setup Flow
When creating the first admin:
1. Query Firestore `users` collection for any doc with `role == 'admin'`
2. If none exists, show admin creation form
3. `createUserWithEmailAndPassword(auth, email, password)` creates the Firebase Auth account
4. `setDoc(doc(db, 'users', user.uid), { email, role: 'admin', createdAt })` creates the Firestore doc
5. **Both steps are required** — Auth account without Firestore doc = login loop

---

## 6. Common Pitfalls & Solutions

| # | Symptom | Root Cause | Fix |
|---|---------|------------|-----|
| 1 | Login screen reloads, stays on login | CSP blocks `securetoken.googleapis.com` | Add to `connect-src` + restart dev server |
| 2 | "Maximum update depth exceeded" | Auth redirect loop — AdminGuard rejects then Login redirects | Use `useEffect` that waits for `authLoading` + `userRole` |
| 3 | "Unsupported field value: undefined" | `|| undefined` passes `undefined` to Firestore | Conditionally include optional fields |
| 4 | Login works but immediately redirected | No Firestore `users/{uid}` doc with `role: 'admin'` | Create the document manually or via AdminSetup |
| 5 | Firestore "offline" errors | CSP blocking token refresh | Add `https://securetoken.googleapis.com` to CSP |
| 6 | "Failed to get document because client is offline" | Same as #5 | Same fix as #5 |
| 7 | New tab opens and closes (Popup sign-in) | Popup blocked by browser | Use redirect sign-in instead |
| 8 | CORS errors on Firestore | Missing `https://firestore.googleapis.com` in CSP | Add to `connect-src` |

---

## 7. App Structure (from production)

```
src/
├── main.tsx                    # Entry — StrictMode + App
├── App.tsx                     # Routes, AdminGuard, SiteRoutes
├── index.css                   # Tailwind v4 import + custom utilities
├── lib/
│   ├── firebase.ts             # Firebase init (auth + db)
│   └── propertyService.ts      # Firestore CRUD for properties
├── context/
│   └── AuthContext.tsx          # Auth provider + useAuth hook
├── components/
│   ├── AdminLayout.tsx          # Admin dashboard layout
│   ├── ErrorBoundary.tsx        # React error boundary
│   ├── Navbar.tsx               # Public site nav
│   ├── Footer.tsx               # Public site footer
│   ├── MobileBottomNav.tsx      # Mobile bottom nav
│   ├── ScrollToTop.tsx          # Scroll-to-top on route change
│   └── ScrollToTopButton.tsx    # Floating scroll-to-top button
├── pages/
│   ├── Home.tsx                 # Landing page
│   ├── About.tsx                # About page
│   ├── Properties.tsx           # Property listings
│   ├── PropertyDetail.tsx       # Single property view
│   ├── Contact.tsx              # Contact form (Formspree)
│   ├── AdminLogin.tsx           # Admin login page
│   ├── AdminDashboard.tsx       # Admin property management
│   ├── AdminPropertyForm.tsx    # Add / Edit property
│   └── AdminSetup.tsx           # First admin account creation
└── data/
    └── properties.ts            # Static fallback property data
```

---

## 8. Deployment

### Vercel
- **Build command**: `npm run build` (produces single-file `dist/index.html`)
- **Output directory**: `dist`
- **Framework preset**: Vite
- **No vercel.json needed** — auto-detects Vite
- SPA routing handled automatically by Vercel

### Build Output
The `vite-plugin-singlefile` inlines all JS/CSS into `dist/index.html`:
```
dist/
├── index.html    # self-contained, ~335 KB gzipped
└── .htaccess     # copied from public/ for cPanel
```

### Environment Variables
Must be set in Vercel project dashboard → Settings → Environment Variables:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FORMSPREE_CONTACT_URL` (if using Formspree)
- `VITE_FORMSPREE_BOOKING_URL` (if using Formspree)

---

## 9. Quick Start Checklist for New Projects

- [ ] Create Firebase project
- [ ] Enable Email/Password auth
- [ ] Create Firestore database
- [ ] Register web app, save config
- [ ] Set `.env` with Firebase config
- [ ] Create `src/lib/firebase.ts`
- [ ] Create `src/context/AuthContext.tsx` (with async onAuthStateChanged)
- [ ] Create `AdminGuard` component (waits for loading + checks role)
- [ ] Add ALL Firebase endpoints to CSP `connect-src` in `index.html`
- [ ] Create first admin via `AdminSetup.tsx` (creates Auth account + Firestore doc)
- [ ] Write Firestore security rules with `isAdmin()` function
- [ ] In login page: use `useEffect` to redirect, NOT immediate `navigate()` after `signIn`
- [ ] In form submissions: conditionally include optional fields (never `undefined`)
- [ ] Deploy rules: `firebase deploy --only firestore:rules`
- [ ] Build: `npm run build`
- [ ] Deploy to Vercel

---

## 10. Vite Configuration

```typescript
// vite.config.ts
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
```

## 11. Dependencies (package.json)

```json
{
  "dependencies": {
    "firebase": "^11.x",
    "motion": "^12.x",
    "lucide-react": "^0.x",
    "react": "^19.x",
    "react-dom": "^19.x",
    "react-router-dom": "^7.x",
    "clsx": "^2.x",
    "tailwind-merge": "^3.x"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.x",
    "@vitejs/plugin-react": "^4.x",
    "tailwindcss": "^4.x",
    "typescript": "^5.x",
    "vite": "^7.x",
    "vite-plugin-singlefile": "^2.x"
  }
}
```

---

## 12. AGENTS.md — Agent Instructions (for reuse)

Include this in your project's `AGENTS.md` to prevent the same errors in future sessions:

```markdown
# Firebase Project — Critical Rules

## CSP
The CSP in index.html MUST include these connect-src endpoints:
- https://identitytoolkit.googleapis.com  (Auth sign in/up)
- https://securetoken.googleapis.com       (Auth token refresh — commonly forgotten)
- https://firestore.googleapis.com         (Firestore CRUD)
- https://*.firebaseio.com                (Firestore fallback/long-polling)

If this is missing, ALL Firestore operations fail silently with "offline" errors.

## Firestore Admin Setup
- Admin user MUST have a Firestore document at users/{uid} with role: "admin"
- Without it, login immediately redirects back (AdminGuard checks role)
- Create via AdminSetup.tsx or manually in Firebase Console

## Auth Redirect Pattern
- DO NOT navigate() immediately after signIn() resolves
- Use useEffect to watch user + userRole + loading from AuthContext
- This prevents the race condition between Firebase resolving and React re-rendering

## Firestore Undefined Values
- NEVER pass undefined as a field value to updateDoc() or addDoc()
- Firestore throws "Unsupported field value: undefined"
- Use conditional object spread instead of `field || undefined`
```
