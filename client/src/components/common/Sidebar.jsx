import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, FileText, HelpCircle, Box } from 'lucide-react';

const NAV_LINKS = [
  { to: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={20} />, public: false },
  { to: '/admin/submissions', label: 'Submissions', icon: <FileText size={20} />, public: false },
];

export default function Sidebar() {
  const { isAuthed } = useAuth();
  const { pathname } = useLocation();

  return (
    <aside style={{ width: 220, background: 'var(--color-card-bg)', height: '100vh', position: 'fixed', left: 0, top: 0, borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', padding: '24px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 8px', marginBottom: 32 }}>
        <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>Acowale_Satyam</span>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        {NAV_LINKS.filter(l => l.public || isAuthed).map(link => {
          const active = pathname === link.to || (link.to !== '/admin' && pathname.startsWith(link.to));
          return (
            <Link
              key={link.to}
              to={link.to}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: '12px',
                textDecoration: 'none', fontSize: 14, fontWeight: 500,
                background: active ? 'var(--color-primary)' : 'transparent',
                color: active ? '#fff' : 'var(--text-secondary)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--text-primary)' }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--text-secondary)' }}
            >
              {link.icon}
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Avatar" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>Admin User</span>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>admin@acowale.com</span>
        </div>
      </div>
    </aside>
  );
}
