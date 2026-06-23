import { RotateCcw } from 'lucide-react';

const CATEGORIES = ['', 'bug', 'feature', 'general', 'billing', 'support'];

export default function FilterBar({ filters, onChange, onReset }) {
  const handle = (e) => onChange({ ...filters, [e.target.name]: e.target.value, page: 1 });

  return (
    <div style={{ marginBottom: 24 }}>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
        <select name="category" value={filters.category || ''} onChange={handle} className="input-field" style={{ width: 160, padding: '10px 16px', borderRadius: '10px' }}>
          <option value="">All categories</option>
          {CATEGORIES.filter(Boolean).map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
        </select>

        <input type="text" name="keyword" value={filters.keyword || ''} onChange={handle} placeholder="Search keyword…" className="input-field" style={{ width: 220, padding: '10px 16px', borderRadius: '10px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="date" name="from" value={filters.from || ''} onChange={handle} className="input-field" style={{ width: 140, padding: '10px 16px', borderRadius: '10px' }} />
          <span style={{ color: 'var(--text-muted)' }}>-</span>
          <input type="date" name="to" value={filters.to || ''} onChange={handle} className="input-field" style={{ width: 140, padding: '10px 16px', borderRadius: '10px' }} />
        </div>

        <button onClick={onReset} className="btn-secondary" style={{ padding: '10px 16px', borderRadius: '10px', background: '#F9FAFB' }} type="button">
          <RotateCcw size={14} /> Reset
        </button>
      </div>
    </div>
  );
}
