import { Modal, Form, Input, Button, type FormInstance } from 'antd';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import ModalHeader from '../../../../components/ModalHeader';
import type { Client } from '../../../../types';

type EditClientModalProps = {
    isModalOpen: boolean;
    closeModalCallback: () => void;
    submitCallback: (values: any) => void;
    loading: boolean;
    form: FormInstance;
    client: Client | null;
};

const EditClientModal = ({ isModalOpen, closeModalCallback, submitCallback, loading, form, client }: EditClientModalProps) => {
    const { t } = useTranslation();

    useEffect(() => {
        if (isModalOpen && client) {
            form.setFieldsValue({
                name: client.name,
                email: client.email,
                phone: client.phone,
                street: client.street,
                city: client.city,
                postalCode: client.postalCode,
                state: client.state,
                country: client.country,
                vatNumber: client.vatNumber,
            });
        }
    }, [isModalOpen, client, form]);

    return (
        <Modal
            open={isModalOpen}
            onCancel={closeModalCallback}
            footer={null}
            width={600}
        >

            <ModalHeader
                title={t('clients.editTitle')}
                subtitle={t('clients.editSubtitle')}
            />

            <Form
                form={form}
                layout="vertical"
                onFinish={submitCallback}
                autoComplete="off"
            >
                <Form.Item
                    label={t('clients.name')}
                    name="name"
                    rules={[{ required: true, message: t('clients.validation.nameRequired') }]}
                >
                    <Input
                        placeholder={t('clients.namePlaceholder')}
                    />
                </Form.Item>

                <Form.Item
                    label={t('clients.email')}
                    name="email"
                    rules={[
                        { type: 'email', message: t('clients.validation.emailInvalid') }
                    ]}
                >
                    <Input
                        placeholder={t('clients.emailPlaceholder')}
                        type="email"
                    />
                </Form.Item>

                <Form.Item
                    label={t('clients.phone')}
                    name="phone"
                >
                    <Input
                        placeholder={t('clients.phonePlaceholder')}
                    />
                </Form.Item>

                <Form.Item
                    label={t('clients.street')}
                    name="street"
                >
                    <Input.TextArea
                        placeholder={t('clients.streetPlaceholder')}
                        rows={2}
                    />
                </Form.Item>

                <div style={{ display: 'flex', gap: 16 }}>
                    <Form.Item
                        label={t('clients.city')}
                        name="city"
                        style={{ flex: 1 }}
                    >
                        <Input
                            placeholder={t('clients.cityPlaceholder')}
                        />
                    </Form.Item>

                    <Form.Item
                        label={t('clients.postalCode')}
                        name="postalCode"
                        style={{ flex: 1 }}
                    >
                        <Input
                            placeholder={t('clients.postalCodePlaceholder')}
                        />
                    </Form.Item>
                </div>

                <div style={{ display: 'flex', gap: 16 }}>
                    <Form.Item
                        label={t('clients.state')}
                        name="state"
                        style={{ flex: 1 }}
                    >
                        <Input
                            placeholder={t('clients.statePlaceholder')}
                        />
                    </Form.Item>

                    <Form.Item
                        label={t('clients.country')}
                        name="country"
                        style={{ flex: 1 }}
                    >
                        <Input
                            placeholder={t('clients.countryPlaceholder')}
                        />
                    </Form.Item>
                </div>

                <Form.Item
                    label={t('clients.vatNumber')}
                    name="vatNumber"
                >
                    <Input
                        placeholder={t('clients.vatNumberPlaceholder')}
                    />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                    >
                        {t('clients.updateButton')}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )

};

export default EditClientModal;
