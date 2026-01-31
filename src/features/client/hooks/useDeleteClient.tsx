import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { useTranslation } from 'react-i18next';
import { clientService } from '../../../services/client.service';
import { ExclamationCircleFilled } from '@ant-design/icons';

export const useDeleteClient = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { modal, message } = App.useApp();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => clientService.remove(id),
    onSuccess: () => {
      message.success(t('clients.deleteSuccess'));
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
    onError: () => {
      message.error(t('clients.deleteError'));
    },
  });

  const confirmDelete = (clientName: string, clientId: string) => {
    modal.confirm({
      title: t('clients.deleteConfirmTitle'),
      icon: <ExclamationCircleFilled />,
      content: t('clients.deleteConfirmContent', { name: clientName }),
      okText: t('common.delete'),
      okType: 'danger',
      cancelText: t('common.cancel'),
      onOk() {
        deleteMutation.mutate(clientId);
      },
    });
  };

  return {
    deleteMutation,
    confirmDelete,
  };
};
