import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout, Button, Avatar, Menu, theme, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { 
  PlusOutlined, 
  LogoutOutlined, 
  UserOutlined,
  DashboardOutlined,
  TeamOutlined,
  FileTextOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

const { Header } = Layout;

export default function AppHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: user?.name || 'User',
    },
    {
      type: 'divider',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: t('common.settings'),
      onClick: handleSettings,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('common.logout'),
      onClick: handleLogout,
    },
  ];

  // Determine selected menu key based on current route
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === '/') return 'dashboard';
    if (path.startsWith('/invoices')) return 'invoices';
    if (path.startsWith('/clients')) return 'clients';
    return '';
  };

  return (
    <Header style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      background: token.colorBgElevated,
      padding: '0 24px',
      borderBottom: `1px solid ${token.colorBorder}`,
      position: 'sticky',
      top: 0,
      zIndex: 10,
      boxShadow: token.boxShadowSecondary,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <h1 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 700,
          background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: 0,
        }}>Factor</h1>
        
        <Menu
          mode="horizontal"
          selectedKeys={[getSelectedKey()]}
          style={{ border: 'none', background: 'transparent', minWidth: 0, flex: 'none' }}
          overflowedIndicator={null}
          items={[
            {
              key: 'dashboard',
              icon: <DashboardOutlined />,
              label: t('nav.dashboard'),
              onClick: () => navigate('/')
            },
            {
              key: 'invoices',
              icon: <FileTextOutlined />,
              label: t('nav.invoices'),
              onClick: () => navigate('/invoices')
            },
            {
              key: 'quotes',
              icon: <FileTextOutlined />,
              label: t('nav.quotes'),
              onClick: () => navigate('/quotes')
            },
            {
              key: 'clients',
              icon: <TeamOutlined />,
              label: t('nav.clients'),
              onClick: () => navigate('/clients')
            }
          ]}
        />
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <ThemeSwitcher />
        <LanguageSwitcher />
        
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => navigate('/invoices/create')}
        >
          {t('dashboard.createInvoice')}
        </Button>
        
        <Dropdown 
          menu={{ items: userMenuItems, style: { marginTop: 32 } }} 
          trigger={['click']}
          placement="bottomRight"
        >
          <Avatar 
            src={user?.avatarUrl} 
            icon={!user?.avatarUrl && <UserOutlined />}
            size="default"
            style={{ cursor: 'pointer' }}
          />
        </Dropdown>
      </div>
    </Header>
  );
}
