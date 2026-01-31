import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { App } from 'antd';
import { invoiceService } from '../../../services/invoice.service';
import type { CreateInvoiceDto } from '../../../types';

export const useCreateInvoice = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {message} = App.useApp();

    return useMutation({
        mutationFn: (invoiceData: CreateInvoiceDto) => invoiceService.create(invoiceData),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['invoices'] });
            message.success(`Invoice ${response.data.invoiceNumber} created successfully`);
            navigate('/invoices');
        },
        onError: (err: any) => {
            message.error(err.response?.data?.message || 'Error creating invoice');
        },
    });
};