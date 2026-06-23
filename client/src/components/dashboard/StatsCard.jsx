import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatsCard({ label, value, loading = false, trend, trendUp = true, trendText = "From Last Month" }) {
  return (
    <div className="stat-card" style={{ flex: '1 1 200px', minWidth: 260, padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{label}</h2>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ fontSize: loading ? undefined : 32, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
          {loading ? <div className="skeleton" style={{ width: 80, height: 32 }} /> : value}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          {trend !== undefined && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: trendUp ? 'var(--color-success)' : 'var(--color-error)', fontSize: 13, fontWeight: 600 }}>
                {trendUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {trend}%
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{trendText}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
