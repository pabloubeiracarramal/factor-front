import { useQuery } from '@tanstack/react-query';
import { clientService } from '../../../services/client.service';

export const useClients = () => {
  const { data: clients = [], isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const response = await clientService.findAll();
      return response.data;
    },
  });

  const clientOptions = clients.map(client => ({
    label: client.name,
    value: client.id,
  }));

  return {
    clients,
    clientOptions,
    isLoading,
  };
};
