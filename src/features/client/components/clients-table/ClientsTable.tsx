import { Table } from 'antd';
import { useTranslation } from 'react-i18next';
import EditClientModal from '../edit-client-modal/EditClientModal';
import {
  useClients,
  useClientFilters,
  useClientEditModal,
  useDeleteClient,
  useClientsTableColumns,
} from '../../hooks';

export default function ClientsTable() {
  const { t } = useTranslation();
  const { filters, handleFilterChange } = useClientFilters();
  const { data: clients = [], isLoading, error } = useClients(filters);
  
  const {
    isEditModalOpen,
    selectedClient,
    editForm,
    updateClientMutation,
    handleEditClient,
    handleCloseEditModal,
    handleEditSubmit,
  } = useClientEditModal();

  const { confirmDelete } = useDeleteClient();

  const columns = useClientsTableColumns({
    filters,
    handleFilterChange,
    handleEditClient,
    handleDeleteClient: confirmDelete,
  });

  return (
    <>
      <Table
        columns={columns}
        dataSource={clients}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} ${t('clients.of')} ${total} ${t('clients.clients')}`,
        }}
        loading={isLoading}
        locale={{ emptyText: error ? t('clients.failedToLoad') : t('clients.noClients') }}
      />
      <EditClientModal
        isModalOpen={isEditModalOpen}
        closeModalCallback={handleCloseEditModal}
        submitCallback={handleEditSubmit}
        loading={updateClientMutation.isPending}
        form={editForm}
        client={selectedClient}
      />
    </>
  );
}
