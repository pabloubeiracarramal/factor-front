import { Card, Statistic, Skeleton } from 'antd';
import { DollarOutlined, ClockCircleOutlined, CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../../invoice/utils/invoiceCalculations';

const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    gap: 16,
    height: '100%',
};

const OverviewRow = ({ dashboard, loading }: any) => {
    const { t, i18n } = useTranslation();
    const locale = i18n.language === 'es' ? 'es-ES' : 'en-US';
    const currency = 'EUR';

    if (loading) {
        return (
            <div style={gridStyle}>
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                        <Skeleton active paragraph={{ rows: 2 }} />
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div style={gridStyle}>
            <Card bordered={false}>
                <Statistic
                    title={t('dashboard.totalRevenue')}
                    value={formatCurrency(dashboard.totalRevenue || 0, currency, locale).replace(/[^\d.,]/g, '')}
                    precision={2}
                    prefix={formatCurrency(0, currency, locale).replace(/[\d.,]/g, '').trim()}
                    valueStyle={{ color: '#52c41a' }}
                    suffix={
                        <DollarOutlined style={{ fontSize: 24, color: '#52c41a', opacity: 0.6 }} />
                    }
                />
                <p style={{ fontSize: '0.75rem', color: '#8c8c8c', marginTop: 8, marginBottom: 0 }}>
                    {t('dashboard.fromPaidInvoices', { count: dashboard.invoiceCounts?.paid || 0 })}
                </p>
            </Card>

            <Card bordered={false}>
                <Statistic
                    title={t('dashboard.pendingInvoices')}
                    value={formatCurrency(dashboard.outstandingAmount || 0, currency, locale).replace(/[^\d.,]/g, '')}
                    precision={2}
                    prefix={formatCurrency(0, currency, locale).replace(/[\d.,]/g, '').trim()}
                    valueStyle={{ color: '#faad14' }}
                    suffix={
                        <ClockCircleOutlined style={{ fontSize: 24, color: '#faad14', opacity: 0.6 }} />
                    }
                />
                <p style={{ fontSize: '0.75rem', color: '#8c8c8c', marginTop: 8, marginBottom: 0 }}>
                    {(dashboard.invoiceCounts?.draft || 0) + (dashboard.invoiceCounts?.overdue || 0)} {t('dashboard.unpaidInvoices')}
                </p>
            </Card>

            <Card bordered={false} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Statistic
                    title={t('dashboard.paidInvoices')}
                    value={dashboard.invoiceCounts?.paid || 0}
                    valueStyle={{ color: '#52c41a' }}
                    suffix={
                        <CheckCircleOutlined style={{ fontSize: 24, color: '#52c41a', opacity: 0.6 }} />
                    }
                />
            </Card>

            <Card bordered={false} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Statistic
                    title={t('dashboard.overdueInvoices')}
                    value={dashboard.invoiceCounts?.overdue || 0}
                    valueStyle={{ color: (dashboard.invoiceCounts?.overdue || 0) > 0 ? '#ff4d4f' : undefined }}
                    suffix={
                        <WarningOutlined style={{
                            fontSize: 24,
                            color: (dashboard.invoiceCounts?.overdue || 0) > 0 ? '#ff4d4f' : '#8c8c8c',
                            opacity: 0.6
                        }} />
                    }
                />
            </Card>
        </div>
    );
};

export default OverviewRow;