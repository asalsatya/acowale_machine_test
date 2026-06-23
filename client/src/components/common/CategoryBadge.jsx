import { Bug, Sparkles, MessageCircle, CreditCard, LifeBuoy, FileText } from 'lucide-react';

const COLORS = {
  bug: { bg: 'var(--color-badge-pink-bg)', color: 'var(--color-badge-pink-icon)' },
  feature: { bg: 'var(--color-badge-blue-bg)', color: 'var(--color-badge-blue-icon)' },
  general: { bg: 'var(--color-badge-green-bg)', color: 'var(--color-badge-green-icon)' },
  billing: { bg: 'var(--color-badge-orange-bg)', color: 'var(--color-badge-orange-icon)' },
  support: { bg: '#F3E8FF', color: '#A855F7' }
};

const icons = { 
  bug: <Bug size={14} />, 
  feature: <Sparkles size={14} />, 
  general: <MessageCircle size={14} />, 
  billing: <CreditCard size={14} />, 
  support: <LifeBuoy size={14} /> 
};

export default function CategoryBadge({ category }) {
  const style = COLORS[category] || COLORS.general;
  const icon = icons[category] || <FileText size={14} />;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 10px 4px 4px', background: '#F9FAFB', borderRadius: '20px', border: '1px solid var(--color-border)' }}>
      <div style={{ width: 24, height: 24, borderRadius: '50%', background: style.bg, color: style.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </div>
      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', textTransform: 'capitalize' }}>{category}</span>
    </div>
  );
}
