import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Form,
    Input,
    Select,
    DatePicker,
    Button,
    InputNumber,
    Divider,
    Card,
    Statistic,
    Row,
    Col,
    type FormInstance
} from 'antd';
import {
    PlusOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { useClients } from '../../hooks';

interface InvoiceFormProps {
    form: FormInstance;
    initialValues?: Record<string, any>;
    disableInvoiceSeries?: boolean;
}

const DEFAULT_CURRENCY = 'EUR';
const DEFAULT_TAX_RATE = 21.0;

const CURRENCY_OPTIONS = [
    { label: 'EUR (€)', value: 'EUR' },
    { label: 'USD ($)', value: 'USD' },
];

const CURRENCY_SYMBOLS: Record<string, string> = {
    EUR: '€',
    USD: '$',
};

const PAYMENT_METHOD_OPTIONS = [
    { value: 'BANK_TRANSFER', labelKey: 'invoice.paymentMethods.BANK_TRANSFER' },
    { value: 'CASH', labelKey: 'invoice.paymentMethods.CASH' },
    { value: 'CREDIT_CARD', labelKey: 'invoice.paymentMethods.CREDIT_CARD' },
    { value: 'PAYPAL', labelKey: 'invoice.paymentMethods.PAYPAL' },
    { value: 'OTHER', labelKey: 'invoice.paymentMethods.OTHER' },
];

export default function InvoiceForm({
    form,
    initialValues,
    disableInvoiceSeries = false,
}: InvoiceFormProps) {
    const { t } = useTranslation();
    const { clientOptions } = useClients();
    const items = Form.useWatch('items', form);
    const currency = Form.useWatch('currency', form) || DEFAULT_CURRENCY;

    const currencySymbol = CURRENCY_SYMBOLS[currency] || currency;

    const { subtotal, totalTax, total } = useMemo(() => {
        if (!items || !Array.isArray(items)) return { subtotal: 0, totalTax: 0, total: 0 };
        
        let subtotal = 0;
        let totalTax = 0;

        items.forEach((item: any) => {
            const quantity = item?.quantity || 0;
            const price = item?.price || 0;
            const taxRate = item?.taxRate || 0;
            
            const itemSubtotal = quantity * price;
            const itemTax = itemSubtotal * (taxRate / 100);
            
            subtotal += itemSubtotal;
            totalTax += itemTax;
        });

        return {
            subtotal,
            totalTax,
            total: subtotal + totalTax
        };
    }, [items]);

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={initialValues}
        >
            <Form.Item
                label={t('invoice.clientName')}
                name="clientId"
                rules={[{ required: true, message: t('invoice.validation.clientNameRequired') }]}
            >
                <Select
                    showSearch={{ optionFilterProp: "label" }}
                    size="large"
                    placeholder={t('invoice.clientNamePlaceholder')}
                    options={clientOptions}
                />
            </Form.Item>

            <Form.Item
                label={t('invoice.description')}
                name="description"
            >
                <Input.TextArea
                    size="large"
                    placeholder={t('invoice.descriptionPlaceholder')}
                    rows={3}
                    maxLength={500}
                    showCount
                />
            </Form.Item>

            <Row gutter={16}>
                <Col xs={24} sm={12} md={6}>
                    <Form.Item
                        label={t('invoice.invoiceSeries')}
                        name="invoiceSeries"
                        rules={[{ required: true, message: t('invoice.validation.invoiceSeriesRequired') }]}
                    >
                        <Input size="large" placeholder={t('invoice.invoiceSeriesPlaceholder')} disabled={disableInvoiceSeries} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Form.Item
                        label={t('invoice.reference')}
                        name="reference"
                    >
                        <Input size="large" placeholder={t('invoice.referencePlaceholder')} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Form.Item
                        label={t('invoice.currency')}
                        name="currency"
                        rules={[{ required: true, message: t('invoice.validation.currencyRequired') }]}
                    >
                        <Select size="large" placeholder={t('invoice.currencyPlaceholder')} options={CURRENCY_OPTIONS} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Form.Item
                        label={t('invoice.emissionDate')}
                        name="emissionDate"
                    >
                        <DatePicker style={{ width: '100%' }} size="large" placeholder={t('invoice.emissionDatePlaceholder')} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={12} md={6}>
                    <Form.Item
                        label={t('invoice.operationDate')}
                        name="operationDate"
                    >
                        <DatePicker style={{ width: '100%' }} size="large" placeholder={t('invoice.operationDatePlaceholder')} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Form.Item
                        label={t('invoice.dueDays')}
                        name="dueDays"
                        rules={[{ required: true, message: t('invoice.validation.dueDaysRequired') }]}
                    >
                        <InputNumber style={{ width: '100%' }} size="large" min={1} addonAfter={t('invoice.days')} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Form.Item
                        label={t('invoice.status')}
                        name="status"
                    >
                        <Select size="large" disabled>
                            <Select.Option value="DRAFT">{t('invoice.draft')}</Select.Option>
                            <Select.Option value="PENDING">{t('invoice.pending')}</Select.Option>
                            <Select.Option value="PAID">{t('invoice.paid')}</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Form.Item
                        label={t('invoice.paymentMethod')}
                        name="paymentMethod"
                        rules={[{ required: true }]}
                    >
                        <Select 
                            size="large" 
                            placeholder={t('invoice.paymentMethodPlaceholder')}
                        >
                            {PAYMENT_METHOD_OPTIONS.map(option => (
                                <Select.Option key={option.value} value={option.value}>
                                    {t(option.labelKey)}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                label={t('invoice.observations')}
                name="observations"
            >
                <Input.TextArea
                    size="large"
                    placeholder={t('invoice.observationsPlaceholder')}
                    rows={3}
                    maxLength={1000}
                    showCount
                />
            </Form.Item>

            <Divider>{t('invoice.items')}</Divider>

            <Form.List
                name="items"
                rules={[
                    {
                        validator: async (_, items) => {
                            if (!items || items.length === 0) {
                                return Promise.reject(new Error(t('invoice.validation.itemsRequired')));
                            }
                        },
                    },
                ]}
            >
                {(fields, { add, remove }) => (
                    <>
                        {fields.map((field) => (
                            <div key={field.key} style={{ marginBottom: 16 }}>
                                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                    <Form.Item
                                        name={[field.name, 'name']}
                                        rules={[{ required: true, message: t('invoice.validation.nameRequired') }]}
                                        style={{ flex: 1, marginBottom: 0 }}
                                    >
                                        <Input
                                            placeholder={t('invoice.itemNamePlaceholder')}
                                            size="large"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name={[field.name, 'quantity']}
                                        rules={[
                                            { required: true, message: t('invoice.validation.quantityRequired') },
                                            { 
                                                validator: (_, value) => {
                                                    const num = Number(value);
                                                    if (isNaN(num) || num < 0) {
                                                        return Promise.reject(new Error(t('invoice.validation.quantityRequired')));
                                                    }
                                                    return Promise.resolve();
                                                }
                                            }
                                        ]}
                                        normalize={(value) => value ? Number(value) : value}
                                        style={{ marginBottom: 0 }}
                                    >
                                        <InputNumber
                                            placeholder={t('invoice.quantity')}
                                            min={0}
                                            style={{ width: 100 }}
                                            size="large"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name={[field.name, 'price']}
                                        rules={[
                                            { required: true, message: t('invoice.validation.priceRequired') },
                                            { 
                                                validator: (_, value) => {
                                                    const num = Number(value);
                                                    if (isNaN(num) || num < 0) {
                                                        return Promise.reject(new Error(t('invoice.validation.priceRequired')));
                                                    }
                                                    return Promise.resolve();
                                                }
                                            }
                                        ]}
                                        normalize={(value) => value ? Number(value) : value}
                                        style={{ marginBottom: 0 }}
                                    >
                                        <InputNumber
                                            placeholder={t('invoice.price')}
                                            min={0}
                                            prefix={currencySymbol}
                                            style={{ width: 140 }}
                                            size="large"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name={[field.name, 'taxRate']}
                                        rules={[
                                            { required: true, message: t('invoice.validation.taxRateRequired') },
                                            { 
                                                validator: (_, value) => {
                                                    const num = Number(value);
                                                    if (isNaN(num) || num < 0 || num > 100) {
                                                        return Promise.reject(new Error(t('invoice.validation.taxRateRequired')));
                                                    }
                                                    return Promise.resolve();
                                                }
                                            }
                                        ]}
                                        normalize={(value) => value ? Number(value) : value}
                                        style={{ marginBottom: 0 }}
                                    >
                                        <InputNumber
                                            placeholder={t('invoice.taxRatePlaceholder')}
                                            min={0}
                                            max={100}
                                            suffix="%"
                                            style={{ width: 100 }}
                                            size="large"
                                        />
                                    </Form.Item>
                                    <Button
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() => remove(field.name)}
                                        disabled={fields.length === 1}
                                        size="large"
                                    />
                                </div>
                                <Form.Item
                                    name={[field.name, 'description']}
                                    style={{ marginTop: 8, marginBottom: 0 }}
                                >
                                    <Input.TextArea
                                        placeholder={t('invoice.itemDescriptionPlaceholder')}
                                        rows={2}
                                        maxLength={500}
                                    />
                                </Form.Item>
                            </div>
                        ))}

                        <Button
                            type="dashed"
                            onClick={() => add({ name: '', description: '', quantity: 1, price: 0, taxRate: DEFAULT_TAX_RATE })}
                            icon={<PlusOutlined />}
                            style={{ width: '100%', marginBottom: 24 }}
                            size="large"
                        >
                            {t('invoice.addItem')}
                        </Button>
                    </>
                )}
            </Form.List>

            <Card
                style={{ marginBottom: 32 }}
                styles={{ body: { textAlign: 'right' } }}
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <Statistic
                            title={t('invoice.subtotal')}
                            value={subtotal}
                            precision={2}
                            prefix={currencySymbol}
                        />
                    </Col>
                    <Col span={24}>
                        <Statistic
                            title={t('invoice.tax')}
                            value={totalTax}
                            precision={2}
                            prefix={currencySymbol}
                        />
                    </Col>
                    <Col span={24}>
                        <Divider style={{ margin: '12px 0' }} />
                        <Statistic
                            title={t('invoice.total')}
                            value={total}
                            precision={2}
                            prefix={currencySymbol}
                            styles={{
                                content: { fontSize: '1.5rem', fontWeight: 600 }
                            }}
                        />
                    </Col>
                </Row>
            </Card>
        </Form>
    );
}
