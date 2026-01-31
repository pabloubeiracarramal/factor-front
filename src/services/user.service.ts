import api from './api';
import type { User, CreateUserDto, UpdateUserDto } from '../types';

export const userService = {
  create: (data: CreateUserDto) => 
    api.post<User>('/users', data),
  
  findAll: () => 
    api.get<User[]>('/users'),
  
  findOne: (id: string) => 
    api.get<User>(`/users/${id}`),
  
  update: (id: string, data: UpdateUserDto) => 
    api.patch<User>(`/users/${id}`, data),
  
  remove: (id: string) => 
    api.delete(`/users/${id}`),
};
