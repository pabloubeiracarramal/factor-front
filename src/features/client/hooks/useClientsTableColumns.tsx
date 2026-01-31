import { useMemo } from 'react';
import { Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import type { ClientQueryParams, Client } from '../../../types';
import { createTextFilter, createDateRangeFilter } from '../utils/filterFactories';

type UseClientsTableColumnsParams = {
  filters: ClientQueryParams;
  handleFilterChange: (key: keyof ClientQueryParams, value: any) => void;
  handleEditClient: (client: Client) => void;
  handleDeleteClient: (clientName: string, clientId: string) => void;
};

export const useClientsTableColumns = ({
  filters,
  handleFilterChange,
  handleEditClient,
  handleDeleteClient,
}: UseClientsTableColumnsParams) => {
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

  return useMemo(
    () => [
      {
        title: t('clients.name'),
        dataIndex: 'name',
        key: 'name',
        render: (text: string) => <strong>{text}</strong>,
        ...createTextFilter('name', t('clients.searchName'), filters, handleFilterChange),
      },
      {
        title: t('clients.email'),
        dataIndex: 'email',
        key: 'email',
        render: (email: string | null) => email || '-',
        ...createTextFilter('email', t('clients.searchEmail'), filters, handleFilterChange),
      },
      {
        title: t('clients.phone'),
        dataIndex: 'phone',
        key: 'phone',
        render: (phone: string | null) => phone || '-',
        ...createTextFilter('phone', t('clients.searchPhone'), filters, handleFilterChange),
      },
      {
        title: t('clients.vatNumber'),
        dataIndex: 'vatNumber',
        key: 'vatNumber',
        render: (vatNumber: string | null) => vatNumber || '-',
        ...createTextFilter('vatNumber', t('clients.searchVat'), filters, handleFilterChange),
      },
      {
        title: t('clients.createdAt'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date: string) => formatDate(date),
        ...createDateRangeFilter(filters, handleFilterChange),
      },
      {
        key: 'actions',
        width: 100,
        render: (_: any, record: Client) => (
          <Space size="small">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEditClient(record)}
            />
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteClient(record.name, record.id)}
            />
          </Space>
        ),
      },
    ],
    [t, i18n.language, filters, handleFilterChange, handleEditClient, handleDeleteClient]
  );
};
