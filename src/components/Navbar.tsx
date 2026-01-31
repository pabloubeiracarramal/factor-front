import { Link, useLocation } from 'react-router-dom';
import { Layout, theme } from 'antd';
import ThemeSwitcher from './ThemeSwitcher';

const { Header } = Layout;

const Navbar = () => {
  const location = useLocation();
  const { token } = theme.useToken();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Header
      style={{
        backgroundColor: token.colorBgElevated,
        borderBottom: `1px solid ${token.colorBorder}`,
        padding: '0 2rem',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: token.boxShadowSecondary,
      }}
    >
      <div style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'center'
      }}>
        <Link
          to="/"
          style={{
            color: isActive('/') ? token.colorPrimary : token.colorTextSecondary,
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: isActive('/') ? '600' : '400',
            transition: 'color 0.2s',
          }}
        >
          Dashboard
        </Link>
        <Link
          to="/clients"
          style={{
            color: isActive('/clients') ? token.colorPrimary : token.colorTextSecondary,
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: isActive('/clients') ? '600' : '400',
            transition: 'color 0.2s',
          }}
        >
          Clients
        </Link>
      </div>
      <ThemeSwitcher />
    </Header>
  );
};

export default Navbar;
