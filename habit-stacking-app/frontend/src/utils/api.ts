import axios from 'axios';
import { Habit, HabitFormValues, Completion, HabitStats, OverallStats } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Habit API
export const habitApi = {
  getAll: async (): Promise<Habit[]> => {
    const response = await api.get('/habits/');
    return response.data;
  },

  getById: async (id: number): Promise<Habit> => {
    const response = await api.get(`/habits/${id}`);
    return response.data;
  },

  create: async (habit: HabitFormValues): Promise<Habit> => {
    const response = await api.post('/habits/', habit);
    return response.data;
  },

  update: async (id: number, habit: Partial<HabitFormValues>): Promise<Habit> => {
    const response = await api.put(`/habits/${id}`, habit);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/habits/${id}`);
  },

  getChain: async (id: number): Promise<Habit[]> => {
    const response = await api.get(`/habits/${id}/chain`);
    return response.data;
  },

  complete: async (id: number, date?: string): Promise<Completion> => {
    const response = await api.post(`/habits/${id}/complete`, {
      completed_date: date,
    });
    return response.data;
  },

  getCompletions: async (id: number): Promise<Completion[]> => {
    const response = await api.get(`/habits/${id}/completions`);
    return response.data;
  },

  deleteCompletion: async (id: number, date: string): Promise<void> => {
    await api.delete(`/habits/${id}/completions/${date}`);
  },

  getStats: async (id: number): Promise<HabitStats> => {
    const response = await api.get(`/habits/${id}/stats`);
    return response.data;
  },
};

// Statistics API
export const statsApi = {
  getOverall: async (): Promise<OverallStats> => {
    const response = await api.get('/stats/overall');
    return response.data;
  },
};

export default api;
