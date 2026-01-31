import { useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Layout, 
  Card, 
  Form, 
  Button, 
  Spin,
  Space
} from 'antd';
import { 
  ArrowLeftOutlined,
  SaveOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import AppHeader from '../../../components/AppHeader';
import type { UpdateInvoiceDto } from '../../../types';
import PageHeader from '../../../components/PageHeader';
import InvoiceForm from '../components/invoice-form/InvoiceForm';
import { useInvoice, useUpdateInvoice } from '../hooks';

const { Content } = Layout;

export default function ModifyInvoicePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { data: invoice, isLoading, isError } = useInvoice(id);
  const { mutate: updateInvoice, isPending: isSaving } = useUpdateInvoice(id);

  const initialValues = useMemo(() => {
    if (!invoice) return undefined;
    return {
      invoiceSeries: invoice.invoiceSeries || new Date().getFullYear().toString(),
      reference: invoice.reference || undefined,
      emissionDate: invoice.emissionDate ? dayjs(invoice.emissionDate) : dayjs(),
      operationDate: invoice.operationDate ? dayjs(invoice.operationDate) : undefined,
      currency: invoice.currency || 'EUR',
      clientId: invoice.clientId,
      description: invoice.description,
      dueDate: dayjs(invoice.dueDate),
      status: invoice.status,
      paymentMethod: invoice.paymentMethod || undefined,
      observations: invoice.observations || undefined,
      items: invoice.items?.map(item => ({
        name: item.name,
        description: item.description || undefined,
        quantity: item.quantity,
        price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
        taxRate: item.taxRate,
      })) || [{ name: '', description: '', quantity: 1, price: 0 }],
    };
  }, [invoice]);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleSubmit = async () => {
    try {

      await form.validateFields();
      const values = form.getFieldsValue();

      const invoiceData: UpdateInvoiceDto = {
        invoiceSeries: values.invoiceSeries,
        reference: values.reference?.trim() || undefined,
        emissionDate: values.emissionDate ? values.emissionDate.toISOString() : undefined,
        operationDate: values.operationDate ? values.operationDate.toISOString() : undefined,
        currency: values.currency,
        clientId: values.clientId,
        dueDate: values.dueDate.toISOString(),
        status: values.status,
        paymentMethod: values.paymentMethod || undefined,
        observations: values.observations?.trim() || undefined,
        description: values.description,
        items: values.items.map((item: any) => ({
          name: item.name,
          description: item.description?.trim() || undefined,
          quantity: Number(item.quantity) || 0,
          price: Number(item.price) || 0,
          taxRate: Number(item.taxRate) || 0,
        })),
      };

      updateInvoice(invoiceData);
    } catch (info: any) {
      console.log('Validation Failed:', info);
    }
  };

  if (isLoading) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <AppHeader />
        <Content style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Spin size="large" />
        </Content>
      </Layout>
    );
  }

  if (isError || !invoice) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <AppHeader />
        <Content style={{ padding: '24px', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <Card>
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <h2>{t('invoice.notFound')}</h2>
              <Button type="primary" onClick={() => navigate('/invoices')}>
                {t('common.back')}
              </Button>
            </div>
          </Card>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader />

      <Content style={{ padding: '24px', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <Button 
          type="link" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/invoices')}
          style={{ marginBottom: 16, paddingLeft: 0 }}
        >
          {t('common.back')}
        </Button>

        <Card>
          <PageHeader
            title={t('invoices.editTitle')}
            subtitle={t('invoices.editSubtitle')}
          />

          <InvoiceForm
            form={form}
          />
          
          <Space size="large" style={{ marginTop: 24 }}>
            <Button 
              type="primary" 
              onClick={handleSubmit} 
              loading={isSaving}
              icon={<SaveOutlined />}
              size="large"
            >
              {t('invoices.updateButton')}
            </Button>
            <Button 
              onClick={() => navigate('/invoices')}
              size="large"
            >
              {t('common.cancel')}
            </Button>
          </Space>
        </Card>
      </Content>
    </Layout>
  );
}