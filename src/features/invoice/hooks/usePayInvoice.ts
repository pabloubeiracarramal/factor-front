import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { invoiceService } from '../../../services/invoice.service';
import { useTranslation } from 'react-i18next';

export const usePayInvoice = () => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (id: string) => invoiceService.pay(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['invoice'] });
      message.success(t('invoices.paySuccess', { number: `${response.data.invoiceSeries}-${response.data.invoiceNumber}` }));
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || t('invoices.payError'));
    },
  });
};
