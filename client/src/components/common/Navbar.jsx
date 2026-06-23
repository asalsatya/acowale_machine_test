import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FileText, Zap, Target, LogOut, Lock } from 'lucide-react';

const NAV_LINKS = [
  { to: '/',      label: 'Submit Feedback', icon: <FileText size={18} />, public: true },
  { to: '/admin', label: 'Admin Dashboard', icon: <Zap size={18} />, public: false },
];

export default function Navbar() {
  const { isAuthed, logout } = useAuth();
  const { pathname } = useLocation();

  return (
    <header id="main-navbar" style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--glass-bg)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border-color)' }}>
      <nav style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, var(--brand-500), var(--brand-400))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: 'var(--shadow-glow)' }}>
            <Target size={20} />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>Acowale CRM</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.5px' }}>BY SATYAM</div>
          </div>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {NAV_LINKS.filter((l) => l.public || isAuthed).map((link) => {
            const active = pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: active ? 600 : 500, color: active ? 'var(--text-primary)' : 'var(--text-secondary)', background: active ? 'rgba(61,94,240,0.15)' : 'transparent', border: active ? '1px solid rgba(61,94,240,0.3)' : '1px solid transparent', transition: 'all 0.2s ease' }}
                onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = 'var(--surface-2)'; e.currentTarget.style.color = 'var(--text-primary)'; } }}
                onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; } }}
              >
                {link.icon}
                {link.label}
              </Link>
            );
          })}

          {isAuthed && (
            <button id="logout-btn" onClick={logout} className="btn-secondary" style={{ marginLeft: 8, padding: '8px 16px' }}>
              <LogOut size={16} /> Logout
            </button>
          )}

          {/* Login link removed as requested */}
        </div>
      </nav>
    </header>
  );
}
