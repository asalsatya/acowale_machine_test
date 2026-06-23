import api from './api';

export const submitFeedback = (body)      => api.post('/feedback', body);
export const getFeedback = (params = {}) => {
  const cleanParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== ''));
  return api.get('/feedback', { params: cleanParams });
};
