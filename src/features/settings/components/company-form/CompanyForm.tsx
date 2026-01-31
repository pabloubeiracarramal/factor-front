import { Form, Input, Button, Card, message } from 'antd';
import { useTranslation } from 'react-i18next';
import type { Company, UpdateCompanyDto } from '../../../../types';
import { useUpdateCompany } from '../../hooks/useUpdateCompany';
import { useAuth } from '../../../../contexts/AuthContext';

interface CompanyFormProps {
  company: Company;
}

export default function CompanyForm({ company }: CompanyFormProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [form] = Form.useForm();
  const updateCompanyMutation = useUpdateCompany();
  const isAdmin = user?.role === 'ADMIN';

  const handleSubmit = async (values: UpdateCompanyDto) => {
    try {
      await updateCompanyMutation.mutateAsync({
        id: company.id,
        data: values
      });
      message.success(t('settings.company.updateSuccess'));
    } catch (error) {
      message.error(t('settings.company.updateError'));
    }
  };

  return (
    <Card title={t('settings.company.title')}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          name: company.name,
          email: company.email,
          phone: company.phone,
          street: company.street,
          city: company.city,
          postalCode: company.postalCode,
          state: company.state,
          country: company.country,
          vatNumber: company.vatNumber,
          bankAccountNumber: company.bankAccountNumber
        }}
      >
        <Form.Item
          label={t('settings.company.name')}
          name="name"
          rules={[
            { required: true, message: t('settings.company.validation.nameRequired') }
          ]}
        >
          <Input placeholder={t('settings.company.namePlaceholder')} disabled={!isAdmin} />
        </Form.Item>

        <Form.Item
          label={t('settings.company.email')}
          name="email"
          rules={[
            { required: true, message: t('settings.company.validation.emailRequired') },
            { type: 'email', message: t('settings.company.validation.emailInvalid') }
          ]}
        >
          <Input placeholder={t('settings.company.emailPlaceholder')} disabled={!isAdmin} />
        </Form.Item>

        <Form.Item
          label={t('settings.company.phone')}
          name="phone"
        >
          <Input placeholder={t('settings.company.phonePlaceholder')} disabled={!isAdmin} />
        </Form.Item>

        <Form.Item
          label={t('settings.company.street')}
          name="street"
        >
          <Input placeholder={t('settings.company.streetPlaceholder')} disabled={!isAdmin} />
        </Form.Item>

        <div style={{ display: 'flex', gap: 16 }}>
          <Form.Item
            label={t('settings.company.city')}
            name="city"
            style={{ flex: 1 }}
          >
            <Input placeholder={t('settings.company.cityPlaceholder')} disabled={!isAdmin} />
          </Form.Item>

          <Form.Item
            label={t('settings.company.postalCode')}
            name="postalCode"
            style={{ flex: 1 }}
          >
            <Input placeholder={t('settings.company.postalCodePlaceholder')} disabled={!isAdmin} />
          </Form.Item>
        </div>

        <div style={{ display: 'flex', gap: 16 }}>
          <Form.Item
            label={t('settings.company.state')}
            name="state"
            style={{ flex: 1 }}
          >
            <Input placeholder={t('settings.company.statePlaceholder')} disabled={!isAdmin} />
          </Form.Item>

          <Form.Item
            label={t('settings.company.country')}
            name="country"
            style={{ flex: 1 }}
          >
            <Input placeholder={t('settings.company.countryPlaceholder')} disabled={!isAdmin} />
          </Form.Item>
        </div>

        <Form.Item
          label={t('settings.company.vatNumber')}
          name="vatNumber"
        >
          <Input placeholder={t('settings.company.vatNumberPlaceholder')} disabled={!isAdmin} />
        </Form.Item>

        <Form.Item
          label={t('settings.company.bankAccountNumber')}
          name="bankAccountNumber"
        >
          <Input placeholder={t('settings.company.bankAccountNumberPlaceholder')} disabled={!isAdmin} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={updateCompanyMutation.isPending}
            disabled={!isAdmin}
          >
            {t('settings.company.updateButton')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
