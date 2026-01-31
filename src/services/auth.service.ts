import api from './api';
import type { User } from '../types';
import { config } from '../config';

export const authService = {
  getProfile: () => api.get<User>('/auth/profile'),
  
  loginWithGoogle: () => {
    window.location.href = `${config.apiBaseUrl}/auth/google`;
  },
};
