import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Lock, Key } from 'lucide-react';

import { AuthProvider, useAuth } from './context/AuthContext';
import UserWindow   from './pages/UserWindow';
import AdminConsole from './pages/AdminConsole';
import Layout       from './components/common/Layout';
import Button       from './components/common/Button';

import { Mail } from 'lucide-react'; // Make sure to add this to the top imports if not present, but I will just use existing Lock, Key, or Target. Actually let me use standard input styles with icons.

const CORPORATE_QUOTES = [
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "The secret of change is to focus all of your energy, not on fighting the old, but on building the new.", author: "Socrates" },
  { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
  { text: "Opportunities don't happen. You create them.", author: "Chris Grosser" },
  { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" }
];

function AdminLogin() {
  const { login, isAuthed } = useAuth();
  const [key, setKey] = useState('');
  const [err, setErr] = useState('');
  
  // Pick a random quote on initial render
  const [quote] = useState(() => CORPORATE_QUOTES[Math.floor(Math.random() * CORPORATE_QUOTES.length)]);

  if (isAuthed) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!key.trim()) { setErr('Please enter the Admin API Key.'); return; }
    const result = await login(key.trim());
    if (!result.success) {
      setErr(result.error);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      {/* Left Form Side */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', background: 'var(--color-page-bg)' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 24, color: 'var(--color-primary)' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <Lock size={20} />
              </div>
              <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>Acowale CRM</span>
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 10px', color: 'var(--text-primary)' }}>Welcome back!</h1>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>Please enter your details to access the dashboard</p>
          </div>

          {err && <div className="alert-error" style={{ marginBottom: 24, fontSize: 13, textAlign: 'center' }}>{err}</div>}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 24 }}>
              <label htmlFor="admin-api-key" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Admin API Key</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', display: 'flex' }}>
                  <Key size={18} />
                </div>
                <input id="admin-api-key" type="password" value={key} onChange={(e) => { setKey(e.target.value); setErr(''); }} placeholder="Enter API Key..." className="input-field" style={{ paddingLeft: 42, height: 48, fontSize: 14, letterSpacing: '1px' }} />
              </div>
            </div>

            <button id="admin-login-btn" type="submit" className="btn-primary" style={{ width: '100%', height: 48, borderRadius: '10px', fontSize: 15, fontWeight: 600 }}>
              Sign In
            </button>
          </form>
        </div>
      </div>

      {/* Right Image Side */}
      <div className="admin-login-image" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.65)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10%', color: '#fff', textAlign: 'center' }}>
          <div style={{ maxWidth: 600 }}>
            <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, lineHeight: 1.4 }}>
              "{quote.text}"
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255, 255, 255, 0.8)', fontStyle: 'italic' }}>— {quote.author}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import SubmissionsPage from './pages/SubmissionsPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"            element={<UserWindow />} />
          <Route path="/admin"       element={<AdminConsole />} />
          <Route path="/admin/submissions" element={<SubmissionsPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="*"            element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
