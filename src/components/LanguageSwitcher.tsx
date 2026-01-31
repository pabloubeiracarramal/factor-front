import { useTranslation } from 'react-i18next';
import { Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const languages = [
    {
      key: 'en',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '1.2rem' }}>🇺🇸</span>
          <span>English</span>
        </div>
      ),
    },
    {
      key: 'es',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '1.2rem' }}>🇪🇸</span>
          <span>Español</span>
        </div>
      ),
    },
  ];

  const handleLanguageChange: MenuProps['onClick'] = ({ key }) => {
    i18n.changeLanguage(key);
  };

  const currentLanguage = languages.find(lang => lang.key === i18n.language);
  const currentFlag = i18n.language === 'en' ? '🇺🇸' : '🇪🇸';

  return (
    <Dropdown
      menu={{
        items: languages,
        onClick: handleLanguageChange,
        selectedKeys: [i18n.language],
      }}
      trigger={['click']}
    >
      <div style={{ cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center' }}>
        <GlobalOutlined />
      </div>
    </Dropdown>
  );
}
