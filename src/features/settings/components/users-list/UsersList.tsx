import { Card, Table, Avatar, Tag, Button, message, Modal } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { companyService } from '../../../../services';
import type { Company } from '../../../../types';
import type { ColumnsType } from 'antd/es/table';

interface UsersListProps {
  company: Company;
}

interface UserWithStats {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  role: 'ADMIN' | 'USER';
  createdAt: string;
}

export default function UsersList({ company }: UsersListProps) {
  const { t } = useTranslation();
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [modal, contextHolder] = Modal.useModal();

  const handleDeleteUser = async (userId: string, userName: string | null, userEmail: string) => {
    const confirmed = await modal.confirm({
      title: t('settings.users.deleteConfirm.title'),
      icon: <ExclamationCircleOutlined />,
      content: t('settings.users.deleteConfirm.content', { name: userName || userEmail }),
      okText: t('settings.users.deleteConfirm.ok'),
      okType: 'danger',
      cancelText: t('settings.users.deleteConfirm.cancel'),
    });

    if (!confirmed) return;

    setDeletingUserId(userId);
    try {
      await companyService.removeUser(company.id, userId);
      message.success(t('settings.users.deleteSuccess'));
      // Reload the page to refresh the user list
      window.location.reload();
    } catch (error) {
      console.error('Error deleting user:', error);
      message.error(t('settings.users.deleteError'));
    } finally {
      setDeletingUserId(null);
    }
  };

  const columns: ColumnsType<UserWithStats> = [
    {
      title: t('settings.users.avatar'),
      dataIndex: 'avatarUrl',
      key: 'avatarUrl',
      width: 80,
      render: (avatarUrl: string | null, record) => (
        <Avatar src={avatarUrl} size={40}>
          {record.name?.[0]?.toUpperCase() || record.email[0].toUpperCase()}
        </Avatar>
      ),
    },
    {
      title: t('settings.users.name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('settings.users.email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('settings.users.role'),
      dataIndex: 'role',
      key: 'role',
      width: 100,
      render: (role: 'ADMIN' | 'USER') => (
        <Tag color={role === 'ADMIN' ? 'green' : 'default'}>
          {role}
        </Tag>
      ),
    },
    {
      title: t('settings.users.joinedAt'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: t('settings.users.actions'),
      key: 'actions',
      width: 100,
      render: (_, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          loading={deletingUserId === record.id}
          onClick={() => handleDeleteUser(record.id, record.name, record.email)}
        />
      ),
    },
  ];

  const users = company.users || [];

  return (
    <>
      {contextHolder}
      <Card 
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{t('settings.users.title')}</span>
            <Tag color="blue">{users.length} {t('settings.users.members')}</Tag>
          </div>
        }
      >
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </>
  );
}
