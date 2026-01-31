import { useQuery } from '@tanstack/react-query';
import { clientService } from '../../../services/client.service';
import type { ClientQueryParams } from '../../../types';

export const useClients = (filters?: ClientQueryParams) => {
  return useQuery({
    queryKey: ['clients', filters],
    queryFn: async () => {
      const response = await clientService.findAll(filters);
      return response.data;
    },
  });
};
