import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Layout, 
  Card, 
  Form, 
  Button,
  Space
} from 'antd';
import { 
  ArrowLeftOutlined,
  SaveOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import AppHeader from '../../../components/AppHeader';
import type { CreateInvoiceDto } from '../../../types';
import PageHeader from '../../../components/PageHeader';
import InvoiceForm from '../components/invoice-form/InvoiceForm';
import { useCreateInvoice } from '../hooks';

const { Content } = Layout;

const CURRENT_YEAR = new Date().getFullYear().toString();
const DEFAULT_CURRENCY = 'EUR';
const DEFAULT_TAX_RATE = 21.0;

export default function CreateInvoicePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { mutate: createInvoice, isPending } = useCreateInvoice();

  useEffect(() => {
    form.setFieldsValue({
      status: 'DRAFT',
      invoiceSeries: CURRENT_YEAR,
      currency: DEFAULT_CURRENCY,
      dueDays: 30,
      emissionDate: dayjs(),
      operationDate: dayjs(),
      paymentMethod: 'BANK_TRANSFER',
      items: [{ name: '', description: '', quantity: 1, price: 0, taxRate: DEFAULT_TAX_RATE }],
    });
  }, [form]);

  const handleSubmit = async () => {
    try {
      
      await form.validateFields();
      const values = form.getFieldsValue();
      console.log('Form values before mapping:', values);

      const invoiceData: CreateInvoiceDto = {
        clientId: values.clientId,
        description: values.description?.trim() || undefined,
        dueDays: Number(values.dueDays) || 30,
        emissionDate: values.emissionDate?.toISOString(),
        operationDate: values.operationDate?.toISOString(),
        invoiceSeries: values.invoiceSeries?.trim(),
        reference: values.reference?.trim() || undefined,
        currency: values.currency,
        status: 'DRAFT',
        paymentMethod: values.paymentMethod || undefined,
        observations: values.observations?.trim() || undefined,
        items: values.items.map((item: any) => ({
          name: item.name,
          description: item.description?.trim() || undefined,
          quantity: Number(item.quantity) || 0,
          price: Number(item.price) || 0,
          taxRate: Number(item.taxRate) || 0,
        })),
      };

      createInvoice(invoiceData);

    } catch (info: any) {
      console.log('Validation Failed:', info);
    } 
  };

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
            title={t('invoice.createTitle')}
            subtitle={t('invoice.createSubtitle')}
          />

          <InvoiceForm
            form={form}
            disableInvoiceSeries
          />
          
          <Space size="large" style={{ marginTop: 24 }}>
            <Button 
              type="primary" 
              onClick={handleSubmit} 
              loading={isPending}
              icon={<SaveOutlined />}
              size="large"
            >
              {t('invoice.saveDraft')}
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
