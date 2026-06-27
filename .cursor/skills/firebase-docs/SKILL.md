---
name: firebase-docs
description: >-
  Teaches Firebase using official firebase.google.com/docs patterns with
  plain-language explanations before code. Use when setting up Firebase,
  implementing Auth or Firestore, writing Security Rules, debugging Firebase
  errors, deploying with Hosting, or when the user asks Firebase questions.
---

# Firebase Documentation Guide

Follow [firebase.google.com/docs](https://firebase.google.com/docs) as the authoritative source. This skill shapes *how* you explain and write Firebase code for this project — not generic backend tutorials.

## Teaching workflow

When helping with Firebase (setup, code, rules, or bugs), use this order:

1. **Explain first** — In plain language, say what we are building or fixing and why, before any code.
2. **Show code** — Use the **modular SDK** (`import { ... } from 'firebase/...'`), never the legacy namespaced API (`firebase.auth()`).
3. **Walk through it** — After the code, explain what the important lines do.
4. **Say why** — Prefer "we do X because Y" over "do X".
5. **Simplest first** — Recommend the simplest correct approach first, then mention tradeoffs.

Keep explanations accessible. Do not assume the user already knows Firestore, Security Rules, or auth flows.

## When to consult firebase.google.com/docs

For API details, security patterns, or uncertain behavior, fetch the relevant doc page rather than guessing. Start with the table in [reference.md](reference.md).

High-priority pages for this app:

| Topic | URL |
|-------|-----|
| Docs home | https://firebase.google.com/docs |
| Add Firebase to Web | https://firebase.google.com/docs/web/setup |
| Web config object | https://firebase.google.com/docs/web/learn-more#config-object |
| Auth — email/password | https://firebase.google.com/docs/auth/web/start |
| Auth state observer | https://firebase.google.com/docs/auth/web/manage-users |
| Firestore — get started | https://firebase.google.com/docs/firestore/quickstart |
| Firestore — read/write data | https://firebase.google.com/docs/firestore/manage-data/add-data |
| Security Rules | https://firebase.google.com/docs/rules |
| Emulator Suite | https://firebase.google.com/docs/emulator-suite |
| Official agent skills | https://firebase.google.com/docs/ai-assistance/agent-skills |

## This project's Firebase layout

Match existing conventions in this repo:

| File | Responsibility |
|------|----------------|
| `src/firebase/config.js` | `initializeApp`, export `app`, `auth`, `db` |
| `src/firebase/auth.js` | Register, login, logout, auth helpers |
| `src/firebase/firestore.js` | Save/load audit sessions and checklist progress |
| `src/hooks/useAuth.js` | React hook wrapping auth state for components |

**Never put Firebase SDK calls directly inside page or UI components.** Components call hooks or helpers; Firebase logic stays in `src/firebase/`.

### Environment variables (Vite)

Config values come from `.env.local` — never hardcode API keys:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Access in code: `import.meta.env.VITE_FIREBASE_API_KEY`

Never commit `.env.local`. Warn the user if they try to push secrets.

## Core patterns (modular SDK)

### Initialize once (`config.js`)

```js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

- `initializeApp` runs **once** — creates the shared Firebase App container.
- `getAuth` / `getFirestore` attach services to that app.
- Export `auth` and `db` so other files import them instead of re-initializing.

### Authentication (`auth.js`)

Use `async/await`, not `.then()` chains:

```js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from './config';

export const registerUser = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logoutUser = async () => {
  await signOut(auth);
};

export const subscribeToAuth = (callback) => {
  return onAuthStateChanged(auth, callback);
};
```

- `onAuthStateChanged` returns an **unsubscribe** function — call it in a React `useEffect` cleanup.
- Map `error.code` (e.g. `auth/email-already-in-use`) to user-friendly messages in the UI.

### Firestore for audit sessions (`firestore.js`)

Suggested data shape for this app:

```
users/{userId}/audits/{auditId}
  - url: string
  - completedItems: string[]   // checklist item IDs
  - score: number
  - updatedAt: timestamp
```

```js
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  orderBy,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';

export const saveAuditProgress = async (userId, auditId, data) => {
  const auditRef = doc(db, 'users', userId, 'audits', auditId);
  await setDoc(
    auditRef,
    { ...data, updatedAt: serverTimestamp() },
    { merge: true }
  );
};

export const loadAudit = async (userId, auditId) => {
  const auditRef = doc(db, 'users', userId, 'audits', auditId);
  const snapshot = await getDoc(auditRef);
  return snapshot.exists() ? snapshot.data() : null;
};
```

- Use `serverTimestamp()` for `updatedAt` so times are consistent across clients.
- Use `{ merge: true }` on `setDoc` to update partial fields without wiping the document.
- Always scope data under `users/{userId}` so Security Rules can enforce ownership.

### React auth hook (`useAuth.js`)

```js
import { useState, useEffect } from 'react';
import { subscribeToAuth } from '../firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuth((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { user, loading };
};
```

- Start with `loading: true` — auth state is unknown until the first `onAuthStateChanged` fires.
- Show a loading spinner while `loading` is true; don't flash the login page for signed-in users.

## Security Rules (required before production)

Every Firestore path needs rules. For this app's user-scoped audits:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/audits/{auditId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

- `request.auth.uid == userId` ensures users can only access their own data.
- Test rules in the Firebase Console Rules Playground before deploying.
- Docs: https://firebase.google.com/docs/firestore/security/get-started

## Console setup checklist

When the user is setting up Firebase for the first time:

1. Create a project in [Firebase Console](https://console.firebase.google.com/)
2. Register a **Web** app and copy config values into `.env.local`
3. Enable **Authentication → Email/Password**
4. Create **Firestore Database** (start in test mode for local dev, then lock down rules)
5. Paste Security Rules and publish
6. (Optional) Install [Emulator Suite](https://firebase.google.com/docs/emulator-suite) for offline testing

## Explaining bugs

When the user reports a Firebase bug:

1. Ask what they **expected** vs what **actually** happened.
2. Ask them to open **DevTools → Console** and share red errors (include `error.code` if present).
3. Check common causes: missing env vars, rules denying access (`permission-denied`), auth not ready, wrong collection path.
4. Walk through fixes step by step.
5. Explain **why** the bug happened.

### Common Firebase error codes

| Code | Likely cause |
|------|----------------|
| `auth/invalid-credential` | Wrong email or password |
| `auth/email-already-in-use` | Register with existing email |
| `permission-denied` | Security Rules block the read/write |
| `failed-precondition` | Firestore index missing (follow link in error) |
| `unavailable` | Network issue or emulator not running |

## Code style defaults

Unless the project overrides these:

- Modular imports only (`firebase/auth`, `firebase/firestore`)
- `const` + arrow functions
- `async/await` for all Firebase calls
- Handle **loading** and **error** states in UI
- Firebase logic in `src/firebase/` — never inline in components

## Response shape for teaching

```markdown
## What we're doing
[1–2 sentences in plain language]

## Why this approach
[Reason tied to Firebase docs / security / project layout]

## Code
[Minimal, working example]

## How it works
- Line/pattern 1: ...
- Line/pattern 2: ...

## What to try next
[Optional single follow-up if natural]
```

## Complementary tools (optional)

Firebase publishes **official agent skills** that go deeper on specific products. They complement this guide:

```bash
npx skills add firebase/agent-skills --agent=cursor
npx skills update --all
```

Relevant official skills for this app: `firebase-basics`, `firebase-auth-basics`, `firebase-firestore-standard`, `firestore-security-rules-auditor`.

For AI-assisted project management (deploy rules, list projects), also configure the [Firebase MCP server](https://firebase.google.com/docs/ai-assistance/mcp-server) in `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "firebase": {
      "command": "npx",
      "args": ["-y", "firebase-tools@latest", "mcp"]
    }
  }
}
```

Skills = *how* to use Firebase. MCP = *tools* to interact with your Firebase project.

## Extended reference

For the full doc map (Hosting, Functions, AI Logic, CLI, and more), see [reference.md](reference.md).
