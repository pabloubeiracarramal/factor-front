import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { Card, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../../invoice/utils/invoiceCalculations';
import type { MonthlyRevenue } from '../../../../types';

echarts.use([BarChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

const MONTH_KEYS = [
    'months.jan', 'months.feb', 'months.mar', 'months.apr',
    'months.may', 'months.jun', 'months.jul', 'months.aug',
    'months.sep', 'months.oct', 'months.nov', 'months.dec',
];

interface MonthlyRevenueChartProps {
    data: MonthlyRevenue[];
    loading: boolean;
    currency?: string;
}

const MonthlyRevenueChart = ({ data, loading, currency = 'EUR' }: MonthlyRevenueChartProps) => {
    const { t, i18n } = useTranslation();
    const locale = i18n.language === 'es' ? 'es-ES' : 'en-US';

    // Build full 12-month array, filling missing months with 0
    const monthLabels = MONTH_KEYS.map((key) => t(key));
    const monthData = Array(12).fill(0);
    data?.forEach((entry) => {
        const monthIndex = parseInt(entry.month, 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
            monthData[monthIndex] = entry.revenue;
        }
    });

    const option: echarts.EChartsCoreOption = {
        tooltip: {
            trigger: 'axis',
            formatter: (params: any) => {
                const item = params[0];
                return `${item.name}<br/>${item.marker} ${formatCurrency(item.value, currency, locale)}`;
            },
        },
        grid: {
            left: 12,
            right: 12,
            top: 12,
            bottom: 0,
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            data: monthLabels,
            axisTick: { show: false },
            axisLine: { lineStyle: { color: '#d9d9d9' } },
            axisLabel: { color: '#8c8c8c', fontSize: 11 },
        },
        yAxis: {
            type: 'value',
            splitLine: { lineStyle: { color: '#f0f0f0' } },
            axisLabel: {
                color: '#8c8c8c',
                fontSize: 11,
                formatter: (value: number) => {
                    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                    return String(value);
                },
            },
        },
        series: [
            {
                type: 'bar',
                data: monthData,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#52c41a' },
                        { offset: 1, color: '#95de64' },
                    ]),
                    borderRadius: [4, 4, 0, 0],
                },
                barMaxWidth: 32,
                emphasis: {
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#389e0d' },
                            { offset: 1, color: '#52c41a' },
                        ]),
                    },
                },
            },
        ],
    };

    return (
        <Card
            bordered={false}
            title={t('dashboard.monthlyRevenue')}
            style={{ height: '100%' }}
            styles={{ body: { padding: '12px 16px', height: 'calc(100% - 56px)' } }}
        >
            {loading ? (
                <Skeleton active paragraph={{ rows: 6 }} />
            ) : (
                <ReactEChartsCore
                    echarts={echarts}
                    option={option}
                    style={{ height: '100%', minHeight: 260 }}
                    opts={{ renderer: 'canvas' }}
                    notMerge
                />
            )}
        </Card>
    );
};

export default MonthlyRevenueChart;
