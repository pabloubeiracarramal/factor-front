import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { App } from 'antd';
import { useTranslation } from 'react-i18next';
import { invoiceService } from '../../../services/invoice.service';
import type { CreateInvoiceDto } from '../../../types';

export const useCreateInvoice = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {message} = App.useApp();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: (invoiceData: CreateInvoiceDto) => invoiceService.create(invoiceData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invoices'] });
            message.success(t('invoice.draftSaved'));
            navigate('/invoices');
        },
        onError: (err: any) => {
            message.error(err.response?.data?.message || t('invoice.createError'));
        },
    });
};