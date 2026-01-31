import { Row, Col, Card, Statistic, Skeleton } from 'antd';
import { DollarOutlined, ClockCircleOutlined, CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../../invoice/utils/invoiceCalculations';

const OverviewRow = ({ dashboard, loading }: any) => {
    const { t, i18n } = useTranslation();
    const locale = i18n.language === 'es' ? 'es-ES' : 'en-US';
    const currency = 'EUR'; // Default currency for dashboard overview

    return (
        <>
            {!loading ? (
                <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                    <Col xs={24} sm={12} lg={6} style={{ display: 'flex' }}>
                        <Card bordered={false} style={{ width: '100%' }}>
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
                                From {dashboard.invoiceCounts?.paid || 0} paid invoices
                            </p>
                        </Card>
                    </Col>

                    <Col xs={24} sm={12} lg={6} style={{ display: 'flex' }}>
                        <Card bordered={false} style={{ width: '100%' }}>
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
                                {(dashboard.invoiceCounts?.draft || 0) + (dashboard.invoiceCounts?.overdue || 0)} unpaid invoices
                            </p>
                        </Card>
                    </Col>

                    <Col xs={24} sm={12} lg={6} style={{ display: 'flex' }}>
                        <Card bordered={false} style={{ width: '100%' }}>
                            <Statistic
                                title={t('dashboard.paidInvoices')}
                                value={dashboard.invoiceCounts?.paid || 0}
                                valueStyle={{ color: '#52c41a' }}
                                suffix={
                                    <CheckCircleOutlined style={{ fontSize: 24, color: '#52c41a', opacity: 0.6 }} />
                                }
                            />
                        </Card>
                    </Col>

                    <Col xs={24} sm={12} lg={6} style={{ display: 'flex' }}>
                        <Card bordered={false} style={{ width: '100%' }}>
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
                    </Col>
                </Row>
            ) : (
                <>
                    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                        {[1, 2, 3, 4].map((i) => (
                            <Col xs={24} sm={12} lg={6} key={i}>
                                <Card>
                                    <Skeleton active paragraph={{ rows: 2 }} />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </>
            )
            }

        </>
    )

};

export default OverviewRow;