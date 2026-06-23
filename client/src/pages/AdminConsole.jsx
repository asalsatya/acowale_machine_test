import { useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth }        from '../context/AuthContext';
import { useAnalytics }   from '../hooks/useAnalytics';
import { useFeedbackList } from '../hooks/useFeedback';

import Layout            from '../components/common/Layout';
import StatsCard         from '../components/dashboard/StatsCard';
import CategoryChart     from '../components/dashboard/CategoryChart';
import RecentSubmissions from '../components/dashboard/RecentSubmissions';
import FilterBar         from '../components/dashboard/FilterBar';

const EMPTY_FILTERS = { category: '', keyword: '', from: '', to: '', page: 1, limit: 20 };

export default function AdminConsole() {
  const { isAuthed } = useAuth();
  const { data: analytics, loading: analyticsLoading } = useAnalytics();

  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const { data: feedbackData, loading: feedbackLoading, error: feedbackError, fetch: fetchFeedback } = useFeedbackList(filters);

  useEffect(() => { fetchFeedback(filters); }, [filters, fetchFeedback]);

  const handlePageChange = useCallback((newPage) => setFilters((prev) => ({ ...prev, page: newPage })), []);
  const handleReset = useCallback(() => setFilters(EMPTY_FILTERS), []);

  if (!isAuthed) return <Navigate to="/admin/login" replace />;

  const total         = analytics?.total      ?? 0;
  const byCategory    = analytics?.byCategory ?? [];
  const thisWeekCount = analytics?.thisWeekCount ?? 0;
  const weekTrend     = analytics?.weekTrend ?? 0;
  const topCategory   = analytics?.topCategory ?? 'N/A';

  return (
    <Layout>
      <div style={{ display: 'flex', gap: 24, marginBottom: 24, flexWrap: 'wrap' }}>
        <StatsCard label="Total Feedback" value={total} loading={analyticsLoading} />
        <StatsCard label="This Week" value={thisWeekCount} loading={analyticsLoading} trend={Math.abs(weekTrend)} trendUp={weekTrend >= 0} trendText="vs previous 7 days" />
        <StatsCard label="Top Category" value={topCategory.charAt(0).toUpperCase() + topCategory.slice(1)} loading={analyticsLoading} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 24 }}>
        <div style={{ background: 'var(--color-card-bg)', borderRadius: 'var(--radius-xl)', padding: 24, boxShadow: 'var(--shadow-card)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 20px' }}>Category Breakdown</h2>
          <CategoryChart data={byCategory} loading={analyticsLoading} />
        </div>

        <div style={{ background: 'var(--color-card-bg)', borderRadius: 'var(--radius-xl)', padding: 24, boxShadow: 'var(--shadow-card)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 20px' }}>Recent Submissions</h2>
          <FilterBar filters={filters} onChange={setFilters} onReset={handleReset} />
          <RecentSubmissions data={feedbackData} loading={feedbackLoading} error={feedbackError} onPageChange={handlePageChange} keyword={filters.keyword} />
        </div>
      </div>
    </Layout>
  );
}
