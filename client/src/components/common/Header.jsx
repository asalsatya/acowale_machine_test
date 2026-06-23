import { useAuth } from '../../context/AuthContext';
import { Search, Bell, LogOut } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

export default function Header() {
  const { isAuthed, logout } = useAuth();
  const { pathname } = useLocation();
  
  const title = pathname === '/admin' ? 'Dashboard' : pathname === '/' ? 'Submit Feedback' : pathname === '/admin/login' ? 'Admin Login' : '';

  return (
    <header style={{ height: 80, padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--color-page-bg)' }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{title}</h1>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {/* Search and Language hidden as requested */}
        
        {/* Notifications hidden as requested */}

        {isAuthed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src="https://i.pravatar.cc/150?u=admin" alt="Admin" style={{ width: 40, height: 40, borderRadius: '10px' }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>Andrew Starlin</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Admin</div>
            </div>
            <button onClick={logout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', padding: 4 }}><LogOut size={18} /></button>
          </div>
        )}
      </div>
    </header>
  );
}
