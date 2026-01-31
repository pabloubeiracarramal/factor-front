import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { useTranslation } from 'react-i18next';
import { invoiceService } from '../../../services/invoice.service';
import { ExclamationCircleFilled } from '@ant-design/icons';

export const useDeleteInvoice = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { modal, message } = App.useApp();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => invoiceService.remove(id),
    onSuccess: () => {
      message.success(t('invoices.deleteSuccess'));
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
    onError: () => {
      message.error(t('invoices.deleteError'));
    },
  });

  const confirmDelete = (invoiceNumber: string, invoiceId: string) => {
    modal.confirm({
      title: t('invoices.deleteConfirmTitle'),
      icon: <ExclamationCircleFilled />,
      content: t('invoices.deleteConfirmContent', { number: invoiceNumber }),
      okText: t('common.delete'),
      okType: 'danger',
      cancelText: t('common.cancel'),
      onOk() {
        deleteMutation.mutate(invoiceId);
      },
    });
  };

  return {
    deleteMutation,
    confirmDelete,
  };
};
