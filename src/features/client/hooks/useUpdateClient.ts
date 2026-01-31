import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { clientService } from '../../../services/client.service';
import type { UpdateClientDto } from '../../../types';

export const useUpdateClient = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateClientDto }) =>
      clientService.update(id, data),
    onSuccess: () => {
      message.success(t('clients.updateSuccess'));
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
    onError: () => {
      message.error(t('clients.updateError'));
    },
  });
};
