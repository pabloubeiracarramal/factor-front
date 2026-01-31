import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Layout, Card, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AppHeader from '../../../components/AppHeader';
import InvoicesTable from '../components/invoices-table/InvoicesTable';
import PageHeader from '../../../components/PageHeader';

const { Content } = Layout;

export default function InvoicesPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCreateInvoice = () => {
    navigate('/invoices/create');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader />

      <Content style={{ padding: '24px', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <PageHeader
            title={t('invoices.title')}
            subtitle={t('invoices.description')}
          />
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleCreateInvoice}
            size="large"
          >
            {t('invoices.createInvoice')}
          </Button>
        </div>

        <Card>
          <InvoicesTable />
        </Card>
      </Content>
    </Layout>
  );
}
