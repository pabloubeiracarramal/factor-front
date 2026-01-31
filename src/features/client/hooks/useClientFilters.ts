import { useState } from 'react';
import type { ClientQueryParams } from '../../../types';

export const useClientFilters = () => {
  const [filters, setFilters] = useState<ClientQueryParams>({});

  const handleFilterChange = (key: keyof ClientQueryParams, value: any) => {
    setFilters(prev => {
      if (value === null || value === undefined || value === '') {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: value };
    });
  };

  const clearFilters = () => setFilters({});

  return {
    filters,
    handleFilterChange,
    clearFilters,
  };
};
