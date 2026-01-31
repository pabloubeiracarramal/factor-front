import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, Button, Alert, theme } from 'antd';
import { useAuth } from '../../../contexts/AuthContext';
import { invoiceService } from '../../../services/invoice.service';
import AppHeader from '../../../components/AppHeader';
import RecentInvoicesTable from '../components/recent-invoices-table/RecentInvoicesTable';
import type { DashboardStats } from '../../../types';
import OverviewRow from '../components/overview-row/OverviewRow';
import PageHeader from '../../../components/PageHeader';

const { Content } = Layout;

export default function DashboardPage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { token } = theme.useToken();
  const [dashboard, setDashboard] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await invoiceService.getDashboard();
      setDashboard(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: token.colorBgLayout }}>
      <AppHeader />

      <Content style={{ padding: '24px', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
   
        <PageHeader
          title={t('dashboard.title')}
          subtitle={t('dashboard.welcome', { name: user?.name || '' })}
        />

        {error && (
          <Alert
            message={t('dashboard.failedToLoad')}
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: 24 }}
            action={
              <Button type="primary" onClick={fetchDashboard}>
                {t('common.retry')}
              </Button>
            }
          />
        )}

        <OverviewRow dashboard={dashboard} loading={loading} />
        <RecentInvoicesTable />

      </Content>
    </Layout>
  );
}
