import api from './api';
import axios from 'axios';

export const getSummary = () => api.get('/analytics/summary');
export const getHealth  = () => axios.get('/health');
