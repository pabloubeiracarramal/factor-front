import { Modal, Form, Input, Button, type FormInstance } from 'antd';
import { useTranslation } from 'react-i18next';
import ModalHeader from '../../../../components/ModalHeader';

type CreateClientModalProps = {
    isModalOpen: boolean;
    closeModalCallback: () => void;
    submitCallback: (values: any) => void;
    loading: boolean;
    form: FormInstance;
};

const CreateClientModal = ({ isModalOpen, closeModalCallback, submitCallback, loading, form }: CreateClientModalProps) => {
    const { t } = useTranslation();

    return (
        <Modal
            open={isModalOpen}
            onCancel={closeModalCallback}
            footer={null}
            width={600}
        >

            <ModalHeader
                title={t('clients.createTitle')}
                subtitle={t('clients.createSubtitle')}
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
                        {t('clients.createButton')}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )

};

export default CreateClientModal;