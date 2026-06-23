import CategoryBadge from '../common/CategoryBadge';
import Loader from '../common/Loader';

function formatDate(str) {
  return new Date(str).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function getInitials(email) {
  if (!email) return '?';
  return email.charAt(0).toUpperCase();
}

const AVATAR_COLORS = ['#DBEAFE', '#FFEDD5', '#FCE7F3', '#DCFCE7', '#F3E8FF'];

function highlightText(text, highlight) {
  if (!highlight || !highlight.trim()) return text;
  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escapedHighlight})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} style={{ backgroundColor: '#DBEAFE', color: '#5B5BF0', padding: '2px 4px', borderRadius: '4px', fontWeight: 700 }}>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default function RecentSubmissions({ data, loading, error, onPageChange, keyword = '' }) {
  if (loading) return <Loader lines={6} height={40} />;
  if (error)   return <div className="alert-error" role="alert">{error}</div>;
  if (!data || data.rows.length === 0) return <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)', fontSize: 14 }}>No feedback entries found.</div>;

  const { rows, total, page, limit } = data;
  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <div style={{ overflowX: 'auto' }}>
        <table className="data-table" aria-label="Feedback submissions">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Comment</th>
              <th>User</th>
              <th>Submitted</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const truncated = row.comment.length > 60 ? row.comment.slice(0, 60) + '…' : row.comment;
              return (
              <tr key={row.id}>
                <td style={{ color: 'var(--text-muted)', fontWeight: 500 }}>#{highlightText(row.id.toString(), keyword)}</td>
                <td><CategoryBadge category={row.category} /></td>
                <td style={{ maxWidth: 300 }}>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: 14 }}>
                     {highlightText(truncated, keyword)}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: AVATAR_COLORS[i % AVATAR_COLORS.length], display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111827', fontSize: 13, fontWeight: 600 }}>
                      {getInitials(row.email)}
                    </div>
                    <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{highlightText(row.email || 'Anonymous', keyword)}</span>
                  </div>
                </td>
                <td style={{ whiteSpace: 'nowrap', color: 'var(--text-secondary)', fontSize: 14 }}>{formatDate(row.created_at)}</td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, fontSize: 13, color: 'var(--text-muted)' }}>
          <span>Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button id="pagination-prev-btn" className="btn-secondary" style={{ padding: '6px 14px', borderRadius: '10px' }} disabled={page <= 1} onClick={() => onPageChange(page - 1)} type="button">← Prev</button>
            <button id="pagination-next-btn" className="btn-secondary" style={{ padding: '6px 14px', borderRadius: '10px' }} disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} type="button">Next →</button>
          </div>
        </div>
      )}
    </div>
  );
}
