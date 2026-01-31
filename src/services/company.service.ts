import api from './api';
import type { Company, CreateCompanyDto, UpdateCompanyDto } from '../types';

export const companyService = {
  create: (data: CreateCompanyDto) => 
    api.post<Company>('/companies', data),
  
  findAll: () => 
    api.get<Company[]>('/companies'),

  findMyCompany: () => 
    api.get<Company>('/companies/me'),
  
  findOne: (id: string) => 
    api.get<Company>(`/companies/${id}`),
  
  update: (id: string, data: UpdateCompanyDto) => 
    api.patch<Company>(`/companies/${id}`, data),
  
  remove: (id: string) => 
    api.delete(`/companies/${id}`),

  removeUser: (companyId: string, userId: string) => 
    api.delete(`/companies/${companyId}/users/${userId}`),
};
