import { Layout, theme, Spin, Space } from "antd";
import PageHeader from "../../../components/PageHeader";
import AppHeader from "../../../components/AppHeader";
import { useUserCompany } from "../hooks/useUserCompany";
import CompanyForm from "../components/company-form/CompanyForm";
import UsersList from "../components/users-list/UsersList";
import { useTranslation } from "react-i18next";

const { Content } = Layout;

export default function SettingsPage() {
    const { token } = theme.useToken();
    const { t } = useTranslation();
    const { data: company, isLoading } = useUserCompany();

    return (
        <Layout style={{minHeight: '100vh', backgroundColor: token.colorBgLayout}}>
            <AppHeader />
            <Content style={{ padding: '24px', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
                <PageHeader
                    title={t('settings.title')}
                />
                {isLoading ? (
                    <Spin size="large" />
                ) : company ? (
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <CompanyForm company={company} />
                        <UsersList company={company} />
                    </Space>
                ) : (
                    <p>{t('common.error')}</p>
                )}
            </Content>
        </Layout>
    );

}