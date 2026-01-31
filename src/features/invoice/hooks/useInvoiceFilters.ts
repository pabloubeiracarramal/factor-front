import { useState } from 'react';
import type { InvoiceQueryParams } from '../../../types';

export const useInvoiceFilters = () => {
  const [filters, setFilters] = useState<InvoiceQueryParams>({});

  const handleFilterChange = (key: keyof InvoiceQueryParams, value: any) => {
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
