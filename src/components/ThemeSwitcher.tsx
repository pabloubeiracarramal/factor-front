import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import { Dropdown, type MenuProps } from 'antd';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, effectiveTheme, setTheme } = useTheme();

  const items: MenuProps['items'] = [
    {
      key: 'light',
      label: 'Light',
      onClick: () => setTheme('light'),
    },
    {
      key: 'dark',
      label: 'Dark',
      onClick: () => setTheme('dark'),
    },
    {
      key: 'system',
      label: 'System',
      onClick: () => setTheme('system'),
    },
  ];

  return (
    <Dropdown menu={{ items, selectedKeys: [theme] }} trigger={['click']}>
      <div style={{ cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center' }}>
        {effectiveTheme === 'dark' ? <BulbFilled /> : <BulbOutlined />}
      </div>
    </Dropdown>
  );
};

export default ThemeSwitcher;
