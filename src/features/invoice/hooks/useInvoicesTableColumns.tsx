import { useMemo } from 'react';
import { Tag, Button, Tooltip, Space } from 'antd';
import { EyeOutlined, FilePdfOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import type { InvoiceQueryParams, Invoice } from '../../../types';
import {
  createTextFilter,
  createDateRangeFilter,
  createPriceRangeFilter,
  createStatusFilter,
  createClientFilter,
} from '../utils/filterFactories';
import { calculateInvoiceTotal, formatCurrency } from '../utils/invoiceCalculations';

type UseInvoicesTableColumnsParams = {
  filters: InvoiceQueryParams;
  handleFilterChange: (key: keyof InvoiceQueryParams, value: any) => void;
  handlePreviewPDF: (invoice: Invoice) => void;
  handleDownloadPDF: (invoice: Invoice) => void;
  handleEditInvoice: (invoice: Invoice) => void;
  handleDeleteInvoice: (invoiceNumber: string, invoiceId: string) => void;
  clientOptions: Array<{ label: string; value: string }>;
};

export const useInvoicesTableColumns = ({
  filters,
  handleFilterChange,
  handlePreviewPDF,
  handleDownloadPDF,
  handleEditInvoice,
  handleDeleteInvoice,
  clientOptions,
}: UseInvoicesTableColumnsParams) => {
  const { t, i18n } = useTranslation();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      i18n.language === 'es' ? 'es-ES' : 'en-US',
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'success';
      case 'OVERDUE':
        return 'error';
      case 'DRAFT':
        return 'warning';
      default:
        return 'default';
    }
  };

  return useMemo(
    () => [
      {
        title: t('dashboard.invoiceNumber', { number: '' }).split('#')[0] + '#',
        dataIndex: 'invoiceNumber',
        key: 'invoiceNumber',
        render: (_: string, record: Invoice) => (
          <strong>{record.invoiceSeries}-{record.invoiceNumber}</strong>
        ),
      },
      {
        title: t('invoice.reference'),
        dataIndex: 'reference',
        key: 'reference',
        render: (text: string) => text || '-',
        ...createTextFilter('reference', t('invoice.searchReference'), filters, handleFilterChange),
      },
      {
        title: t('dashboard.client'),
        dataIndex: ['client', 'name'],
        key: 'client',
        render: (record: Invoice) => record.client?.name || 'N/A',
        ...createClientFilter(filters, handleFilterChange, t('dashboard.searchClient'), clientOptions),
      },
      {
        title: t('dashboard.amount'),
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        render: (_: any, record: Invoice) => {
          const total = calculateInvoiceTotal(record);
          const currency = record.currency || 'EUR';
          const locale = i18n.language === 'es' ? 'es-ES' : 'en-US';
          return <strong>{formatCurrency(total, currency, locale)}</strong>;
        },
        ...createPriceRangeFilter(
          filters,
          handleFilterChange,
          t('dashboard.minPrice'),
          t('dashboard.maxPrice')
        ),
      },
      {
        title: t('dashboard.status'),
        dataIndex: 'status',
        key: 'status',
        render: (status: string) => (
          <Tag color={getStatusColor(status)}>
            {t(`status.${status}`)}
          </Tag>
        ),
        ...createStatusFilter(
          filters,
          handleFilterChange,
          t('dashboard.selectStatus'),
          [
            { label: t('status.PAID'), value: 'PAID' },
            { label: t('status.OVERDUE'), value: 'OVERDUE' },
            { label: t('status.DRAFT'), value: 'DRAFT' },
          ]
        ),
      },
      {
        title: t('dashboard.dueDate'),
        dataIndex: 'dueDate',
        key: 'dueDate',
        render: (date: string, record: Invoice) => {
          const isOverdue = record.status === 'OVERDUE';
          return (
            <span style={{ color: isOverdue ? '#ff4d4f' : undefined, fontWeight: isOverdue ? 600 : 400 }}>
              {formatDate(date)}
            </span>
          );
        },
        ...createDateRangeFilter(filters, handleFilterChange),
      },
      {
        key: 'actions',
        width: 200,
        render: (_: any, record: Invoice) => (
          <Space size="small">
            <Tooltip title={t('dashboard.previewPDF')}>
              <Button
                type="text"
                icon={<EyeOutlined />}
                onClick={() => handlePreviewPDF(record)}
              />
            </Tooltip>
            <Tooltip title={t('dashboard.downloadPDF')}>
              <Button
                type="text"
                icon={<FilePdfOutlined />}
                onClick={() => handleDownloadPDF(record)}
              />
            </Tooltip>
            <Tooltip title={t('invoices.edit')}>
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => handleEditInvoice(record)}
              />
            </Tooltip>
            <Tooltip title={t('invoices.delete')}>
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteInvoice(record.invoiceNumber, record.id)}
              />
            </Tooltip>
          </Space>
        ),
      },
    ],
    [t, i18n.language, filters, handleFilterChange, handlePreviewPDF, handleDownloadPDF, handleEditInvoice, handleDeleteInvoice]
  );
};
