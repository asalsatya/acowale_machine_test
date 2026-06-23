import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Loader from '../common/Loader';

const CATEGORY_COLORS = { bug: 'var(--color-badge-pink-icon)', feature: 'var(--color-badge-blue-icon)', general: 'var(--color-badge-green-icon)', billing: 'var(--color-badge-orange-icon)', support: '#a78bfa' };

export default function CategoryChart({ data, loading }) {
  if (loading) return <Loader lines={5} height={30} />;
  if (!data || data.length === 0) return <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)', fontSize: 13 }}>No data yet.</div>;

  const chartData = data.map((d) => ({
    ...d,
    label: d.category.charAt(0).toUpperCase() + d.category.slice(1),
    fill:  CATEGORY_COLORS[d.category] || 'var(--color-primary)',
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={chartData} barSize={24} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
        <XAxis dataKey="label" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={{ stroke: '#E5E7EB' }} tickLine={false} />
        <YAxis allowDecimals={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ background: '#FFFFFF', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', borderRadius: 8, color: 'var(--text-primary)', fontSize: 13 }} cursor={{ fill: '#F3F4F6' }} />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          {chartData.map((entry, i) => <Cell key={i} fill={entry.fill} fillOpacity={1} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
