import { useState } from 'react';
import { Form } from 'antd';
import type { Client, UpdateClientDto } from '../../../types';
import { useUpdateClient } from './useUpdateClient';

export const useClientEditModal = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [editForm] = Form.useForm();
  const updateClientMutation = useUpdateClient();

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedClient(null);
    editForm.resetFields();
  };

  const handleEditSubmit = (values: UpdateClientDto) => {
    if (selectedClient) {
      updateClientMutation.mutate(
        { id: selectedClient.id, data: values },
        {
          onSuccess: () => {
            handleCloseEditModal();
          },
        }
      );
    }
  };

  return {
    isEditModalOpen,
    selectedClient,
    editForm,
    updateClientMutation,
    handleEditClient,
    handleCloseEditModal,
    handleEditSubmit,
  };
};
