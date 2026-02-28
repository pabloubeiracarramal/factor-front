import { useMemo } from 'react';
import { Tag, Button, Tooltip, Space } from 'antd';
import { EyeOutlined, FilePdfOutlined, EditOutlined, DeleteOutlined, CheckCircleOutlined, DollarOutlined, WarningOutlined } from '@ant-design/icons';
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
  handleConfirmInvoice: (invoice: Invoice) => void;
  handlePayInvoice: (invoice: Invoice) => void;
  clientOptions: Array<{ label: string; value: string }>;
};

export const useInvoicesTableColumns = ({
  filters,
  handleFilterChange,
  handlePreviewPDF,
  handleDownloadPDF,
  handleEditInvoice,
  handleDeleteInvoice,
  handleConfirmInvoice,
  handlePayInvoice,
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
      case 'DRAFT':
        return 'warning';
      case 'PENDING':
        return 'default';
      case 'OVERDUE':
        return 'error';
      default:
        return 'default';
    }
  };

  const isOverdue = (record: Invoice) => {
    return record.status === 'PENDING' && new Date(record.dueDate) < new Date();
  };

  return useMemo(
    () => [
      {
        title: t('dashboard.invoiceNumber', { number: '' }).split('#')[0] + '#',
        dataIndex: 'invoiceNumber',
        key: 'invoiceNumber',
        width: '5%',
        render: (_: string, record: Invoice) => (
          record.status === 'DRAFT'
            ? <span style={{ color: '#999', fontStyle: 'italic' }}>{t('invoice.draft')}</span>
            : <strong>{record.invoiceSeries}-{record.invoiceNumber}</strong>
        ),
      },
      {
        title: t('invoice.reference'),
        dataIndex: 'reference',
        key: 'reference',
        width: '15%',
        render: (text: string) => text || '-',
        ...createTextFilter('reference', t('invoice.searchReference'), filters, handleFilterChange),
      },
      {
        title: t('dashboard.client'),
        dataIndex: ['client', 'name'],
        key: 'client',
        width: '30%',
        render: (text: string) => text || 'N/A',
        ...createClientFilter(filters, handleFilterChange, t('dashboard.searchClient'), clientOptions),
      },
      {
        title: t('dashboard.emissionDate'),
        dataIndex: 'emissionDate',
        key: 'emissionDate',
        width: '15%',
        render: (_: string, record: Invoice) => {
          const overdue = isOverdue(record);
          return (
            <span style={overdue ? { color: '#ff4d4f' } : undefined}>
              {formatDate(record.emissionDate)}
              {overdue && (
                <Tooltip title={t('status.overdue')}>
                  <WarningOutlined style={{ color: '#ff4d4f', marginLeft: 6 }} />
                </Tooltip>
              )}
            </span>
          );
        },
        ...createDateRangeFilter(filters, handleFilterChange),
      },
      {
        title: t('dashboard.amount'),
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        width: '7.5%',
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
        width: '7.5%',
        render: (_: string, record: Invoice) => {
          const overdue = isOverdue(record);
          const displayStatus = overdue ? 'OVERDUE' : record.status;
          return (
            <Tag color={getStatusColor(displayStatus)}>
              {t(`status.${displayStatus}`)}
            </Tag>
          );
        },
        ...createStatusFilter(
          filters,
          handleFilterChange,
          t('dashboard.selectStatus'),
          [
            { label: t('status.PAID'), value: 'PAID' },
            { label: t('status.PENDING'), value: 'PENDING' },
            { label: t('status.DRAFT'), value: 'DRAFT' },
          ]
        ),
      },
      {
        key: 'actions',
        width: '20%',
        render: (_: any, record: Invoice) => (
          <Space size="small" style={{ display: 'flex', justifyContent: 'flex-end' }}>

            {record.status === 'DRAFT' && (
              <Tooltip title={t('invoices.confirmInvoice')}>
                <Button
                  type="text"
                  style={{ color: '#52c41a' }}
                  icon={<CheckCircleOutlined />}
                  onClick={() => handleConfirmInvoice(record)}
                />
              </Tooltip>
            )}
            {record.status === 'PENDING' && (
              <Tooltip title={t('invoices.payInvoice')}>
                <Button
                  type="text"
                  style={{ color: '#1677ff' }}
                  icon={<DollarOutlined />}
                  onClick={() => handlePayInvoice(record)}
                />
              </Tooltip>
            )}
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
                disabled={record.status === 'DRAFT'}
                onClick={() => handleDownloadPDF(record)}
              />
            </Tooltip>
            <Tooltip title={t('invoices.edit')}>
              <Button
                type="text"
                icon={<EditOutlined />}
                disabled={record.status !== 'DRAFT'}
                onClick={() => handleEditInvoice(record)}
              />
            </Tooltip>
            <Tooltip title={t('invoices.delete')}>
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                disabled={record.status !== 'DRAFT'}
                onClick={() => handleDeleteInvoice(record.invoiceNumber, record.id)}
              />
            </Tooltip>
          </Space>
        ),
      },
    ],
    [t, i18n.language, filters, handleFilterChange, handlePreviewPDF, handleDownloadPDF, handleEditInvoice, handleDeleteInvoice, handleConfirmInvoice, handlePayInvoice]
  );
};
