import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--color-page-bg)' }}>
      <Sidebar />
      <div style={{ marginLeft: 220, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ padding: '0 32px 32px 32px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
