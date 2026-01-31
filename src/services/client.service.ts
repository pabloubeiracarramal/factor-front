import api from './api';
import type { Client, CreateClientDto, UpdateClientDto, ClientQueryParams } from '../types';

export const clientService = {
  create: (data: CreateClientDto) => 
    api.post<Client>('/clients', data),
  
  findAll: (params?: ClientQueryParams) => 
    api.get<Client[]>('/clients', { params }),
  
  findOne: (id: string) => 
    api.get<Client>(`/clients/${id}`),
  
  update: (id: string, data: UpdateClientDto) => 
    api.patch<Client>(`/clients/${id}`, data),
  
  remove: (id: string) => 
    api.delete(`/clients/${id}`),
};
