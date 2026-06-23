import { Bug, Sparkles, MessageCircle, CreditCard, HelpCircle } from 'lucide-react';

const CATEGORIES = [
  { id: 'bug', label: 'Bug Report', icon: <Bug size={24} /> },
  { id: 'feature', label: 'Feature Request', icon: <Sparkles size={24} /> },
  { id: 'general', label: 'General', icon: <MessageCircle size={24} /> },
  { id: 'billing', label: 'Billing', icon: <CreditCard size={24} /> },
  { id: 'support', label: 'Support', icon: <HelpCircle size={24} /> },
];

export default function CategoryCards({ value, onChange }) {
  return (
    <div>
      <label style={{ display: 'block', marginBottom: 12, fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>
        Category <span style={{ color: 'var(--error)' }}>*</span>
      </label>
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: 12 }}>
        {CATEGORIES.map(cat => {
          const isSelected = value === cat.id;
          return (
            <div
              key={cat.id}
              className={`category-card ${isSelected ? 'selected' : ''}`}
              style={{ flex: '1 1 0', minWidth: 0, padding: '16px 8px' }}
              onClick={() => onChange({ target: { name: 'category', value: cat.id } })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onChange({ target: { name: 'category', value: cat.id } });
                }
              }}
            >
              <div style={{ color: isSelected ? 'var(--color-primary)' : 'var(--text-muted)' }}>
                {cat.icon}
              </div>
              <span style={{ fontSize: 12, fontWeight: isSelected ? 600 : 500, textAlign: 'center' }}>
                {cat.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
