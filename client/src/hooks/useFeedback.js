  import { useState, useCallback, useEffect } from 'react';
import { submitFeedback, getFeedback } from '../services/feedbackService';

const INITIAL_FORM = { category: '', comment: '', email: '' };

export function useFeedbackForm() {
  const [form,    setForm]    = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
  const [success, setSuccess] = useState(false);
  const [coolDown, setCoolDown] = useState(() => {
    const lastSub = localStorage.getItem('last_feedback_time');
    if (!lastSub) return 0;
    const diff = Math.floor((Date.now() - parseInt(lastSub, 10)) / 1000);
    return diff < 60 ? 60 - diff : 0;
  });

  useEffect(() => {
    if (coolDown <= 0) return;
    const timer = setInterval(() => {
      setCoolDown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [coolDown]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const resetSuccess = useCallback(() => setSuccess(false), []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setSuccess(false);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!form.category) {
      setError('Please pick a category');
      setLoading(false);
      return;
    }
    if (!form.comment || form.comment.length < 10) {
      setError('Write a longer feedback');
      setLoading(false);
      return;
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Type a real email');
      setLoading(false);
      return;
    }

    try {
      await submitFeedback(form);
      setSuccess(true);
      setForm(INITIAL_FORM);
      localStorage.setItem('last_feedback_time', Date.now().toString());
      setCoolDown(60);
    } catch (err) {
      const details = err.response?.data?.details;
      if (details) {
        if (details.category) setError('Please pick a category');
        else if (details.comment) setError('Write a longer feedback');
        else if (details.email) setError('Type a real email');
        else setError('Please fix the form');
      } else {
        setError('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  }, [form]);

  return { form, loading, error, success, coolDown, handleChange, handleSubmit, resetSuccess };
}

export function useFeedbackList(filters) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const fetch = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getFeedback({ ...filters, ...params });
      setData(res.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load feedback');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  return { data, loading, error, fetch };
}
