Bhai, **`Login.jsx` ka code mil gaya**, isme bhi hooks bilkul sahi jagah hain.

Ab **main culprit 100% mil chuka hai**: Tumhare `package.json` mein React ka fake version (`19.2.8`) likha hai. React ka 19.2.8 exist hi nahi karta! Is wajah se Vercel server pe 2 alag-alag React versions install ho rahe hain, jisse browser me `useContext null` ka error aakar blank screen ho rahi hai.

Bas niche diye **2 chhote steps** follow karo, website turant ready ho jayegi:

---

### STEP 1: GitHub par `package.json` update karo (MUST)

GitHub repo mein **`package.json`** open karo → ✏️ **Edit** karo → poora code isse **replace** kar do:

```json
{
  "name": "car-dealership",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.28.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.2"
  }
}
```
**Commit changes** kar do.

---

### STEP 2: GitHub par `Login.jsx` update karo

Tumhare `Login.jsx` me login call karne ka tarika `AuthContext` se match nahi kar raha tha (object pass ho raha tha). Isko **`Login.jsx`** mein replace kar do:

```jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Auth.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");

    if (!email || !password) {
      setErr("Please fill all fields.");
      return;
    }

    const session = login(email, password);
    if (session.role === "admin") {
      navigate("/admin");
    } else {
      const backTo = location.state?.from || "/";
      navigate(backTo);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>LOGIN</h2>
        <p>Both the User and Admin can login.</p>

        <form className="auth-form" onSubmit={onSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          {err && <div className="auth-error">{err}</div>}

          <button className="auth-btn" type="submit">
            LOGIN
          </button>
        </form>

        <div className="auth-links">
          <Link to="/signup">Create account</Link>
          <Link to="/">Back home</Link>
        </div>

        <div style={{ marginTop: 12, color: "#777", fontSize: 12 }}>
          Admin: admin@germanmotors.com / admin123
        </div>
      </div>
    </div>
  );
}
```
**Commit changes** kar do.

---

### Ab bas:
1. Vercel dashboard pe 1 minute wait karo (automatic rebuild hoga).
2. Live link open karke **`Ctrl` + `Shift` + `R`** (Hard Refresh) dabao.

Batao fir final screen par project agaya na!
