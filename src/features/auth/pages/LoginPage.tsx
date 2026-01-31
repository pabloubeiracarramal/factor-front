import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, Button, Typography, Flex, theme } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { useAuth } from '../../../contexts/AuthContext';
import { authService } from '../../../services/auth.service';
import LanguageSwitcher from '../../../components/LanguageSwitcher';

const { Title, Text } = Typography;
const { useToken } = theme;

export default function LoginPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation();
  const { token } = useToken();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth endpoint
    authService.loginWithGoogle();
  };

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{
        minHeight: '100vh',
        padding: '16px',
        position: 'relative',
        backgroundColor: token.colorBgLayout,
      }}
    >
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
      }}>
        <LanguageSwitcher />
      </div>
      <Card
        style={{
          textAlign: 'center',
          maxWidth: '420px',
          width: '100%',
        }}
      >
        <Flex vertical gap="large" style={{ marginBottom: '24px' }}>
          <Title level={2}>{t('login.title')}</Title>
          <Text type="secondary">
            {t('login.subtitle')}
          </Text>
        </Flex>
        <Button
          type="default"
          size="large"
          icon={<GoogleOutlined />}
          onClick={handleGoogleLogin}
          block
        >
          {t('login.signInWithGoogle')}
        </Button>
      </Card>
    </Flex>
  );
}
