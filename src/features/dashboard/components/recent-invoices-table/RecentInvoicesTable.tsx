import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Card, Button } from 'antd';
import InvoicesTable from '../../../invoice/components/invoices-table/InvoicesTable';

const RecentInvoicesTable = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleViewAllClick = () => {
    navigate('/invoices');
  };

  return (
    <>
      <Card
        title={t('dashboard.recentInvoices')}
        extra={<Button onClick={handleViewAllClick}>{t('dashboard.viewAll')}</Button>}
      >
        <InvoicesTable limit={5} />
      </Card>
    </>
  )
}

export default RecentInvoicesTable;