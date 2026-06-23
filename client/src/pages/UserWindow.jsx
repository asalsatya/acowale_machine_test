import Layout from '../components/common/Layout';
import FeedbackForm from '../components/feedback/FeedbackForm';

export default function UserWindow() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: 'var(--color-page-bg)' }}>
      <FeedbackForm />
    </div>
  );
}
