import { useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { useFeedbackList } from '../hooks/useFeedback';

import Layout from '../components/common/Layout';
import RecentSubmissions from '../components/dashboard/RecentSubmissions';
import FilterBar from '../components/dashboard/FilterBar';

const EMPTY_FILTERS = { category: '', keyword: '', from: '', to: '', page: 1, limit: 20 };

export default function SubmissionsPage() {
  const { isAuthed } = useAuth();
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const { data: feedbackData, loading: feedbackLoading, error: feedbackError, fetch: fetchFeedback } = useFeedbackList(filters);

  useEffect(() => { fetchFeedback(filters); }, [filters, fetchFeedback]);

  const handlePageChange = useCallback((newPage) => setFilters((prev) => ({ ...prev, page: newPage })), []);
  const handleReset = useCallback(() => setFilters(EMPTY_FILTERS), []);

  if (!isAuthed) return <Navigate to="/admin/login" replace />;

  return (
    <Layout>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 8px' }}>Feedback Submissions</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>View, filter, and manage all user feedback submissions.</p>
      </div>

      <div style={{ background: 'var(--color-card-bg)', borderRadius: 'var(--radius-xl)', padding: 24, boxShadow: 'var(--shadow-card)' }}>
        <FilterBar filters={filters} onChange={setFilters} onReset={handleReset} />
        <RecentSubmissions data={feedbackData} loading={feedbackLoading} error={feedbackError} onPageChange={handlePageChange} keyword={filters.keyword} />
      </div>
    </Layout>
  );
}
