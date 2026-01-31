import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, Card, Form, message, Button, theme } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { clientService } from '../../../services/client.service';
import AppHeader from '../../../components/AppHeader';
import ClientsTable from '../components/clients-table/ClientsTable';
import type { CreateClientDto } from '../../../types';
import CreateClientModal from '../components/create-client-modal/CreateClientModal';
import PageHeader from '../../../components/PageHeader';

const { Content } = Layout;

const ClientsPage = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSubmit = async (values: CreateClientDto) => {
    try {
      setLoading(true);
      await clientService.create(values);
      message.success(t('clients.createSuccess'));
      handleCloseModal();
      window.location.reload(); // Refresh the table
    } catch (err: any) {
      message.error(err.response?.data?.message || t('clients.createError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: token.colorBgLayout }}>
      <AppHeader />

      <Content style={{ padding: '24px', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          <PageHeader
            title={t('clients.title')}
            subtitle={t('clients.description')}
          />

          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleOpenModal}
            size="large"
          >
            {t('clients.createClient')}
          </Button>
        </div>
        
        <Card>
          <ClientsTable />
        </Card>

        <CreateClientModal
          isModalOpen={isModalOpen}
          closeModalCallback={handleCloseModal}
          submitCallback={handleSubmit}
          loading={loading}
          form={form}
        />

      </Content>
    </Layout>
  );
};

export default ClientsPage;
