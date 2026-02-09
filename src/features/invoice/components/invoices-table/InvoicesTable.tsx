import { useState } from 'react';
import { Table, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Invoice } from '../../../../types';
import { useInvoices, useInvoiceFilters, useInvoicesTableColumns, useInvoicePdfActions, useDeleteInvoice, useClients, useConfirmInvoice, usePayInvoice } from '../../hooks';
import PdfPreviewModal from '../pdf-preview-modal/PdfPreviewModal';

interface InvoicesTableProps {
  limit?: number;
}

export default function InvoicesTable({ limit }: InvoicesTableProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { filters, handleFilterChange } = useInvoiceFilters();
  const { data: invoices = [], isLoading, error } = useInvoices(filters);
  const { clientOptions } = useClients();
  const {
    isPreviewModalOpen,
    pdfUrl,
    handlePreviewPDF,
    handleClosePreview,
    handleDownloadPDF,
  } = useInvoicePdfActions();
  const { confirmDelete } = useDeleteInvoice();
  const { mutate: confirmInvoice } = useConfirmInvoice();
  const { mutate: payInvoice } = usePayInvoice();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [invoiceToConfirm, setInvoiceToConfirm] = useState<Invoice | null>(null);
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [invoiceToPay, setInvoiceToPay] = useState<Invoice | null>(null);

  const displayedInvoices = limit ? invoices.slice(0, limit) : invoices;

  const handleEditInvoice = (invoice: Invoice) => {
    navigate(`/invoices/${invoice.id}/edit`);
  };

  const handleConfirmInvoice = (invoice: Invoice) => {
    setInvoiceToConfirm(invoice);
    setConfirmModalOpen(true);
  };

  const handleConfirmOk = () => {
    if (invoiceToConfirm) {
      confirmInvoice(invoiceToConfirm.id);
    }
    setConfirmModalOpen(false);
    setInvoiceToConfirm(null);
  };

  const handleConfirmCancel = () => {
    setConfirmModalOpen(false);
    setInvoiceToConfirm(null);
  };

  const handlePayInvoice = (invoice: Invoice) => {
    setInvoiceToPay(invoice);
    setPayModalOpen(true);
  };

  const handlePayOk = () => {
    if (invoiceToPay) {
      payInvoice(invoiceToPay.id);
    }
    setPayModalOpen(false);
    setInvoiceToPay(null);
  };

  const handlePayCancel = () => {
    setPayModalOpen(false);
    setInvoiceToPay(null);
  };

  const columns = useInvoicesTableColumns({
    filters,
    handleFilterChange,
    handlePreviewPDF,
    handleDownloadPDF,
    handleEditInvoice,
    handleDeleteInvoice: confirmDelete,
    handleConfirmInvoice,
    handlePayInvoice,
    clientOptions,
  });

  return (
    <>
      <Table
        columns={columns}
        dataSource={displayedInvoices}
        rowKey="id"
        pagination={false}
        loading={isLoading}
        locale={{ emptyText: error ? t('dashboard.failedToLoad') : t('dashboard.noInvoices') }}
      />
      <PdfPreviewModal
        isOpen={isPreviewModalOpen}
        pdfUrl={pdfUrl}
        onClose={handleClosePreview}
      />
      <Modal
        title={
          <span>
            <ExclamationCircleOutlined style={{ color: '#faad14', marginRight: 8 }} />
            {t('invoices.confirmModalTitle')}
          </span>
        }
        open={confirmModalOpen}
        onOk={handleConfirmOk}
        onCancel={handleConfirmCancel}
        okText={t('invoices.confirmModalOk')}
        cancelText={t('common.cancel')}
        okButtonProps={{ danger: false }}
      >
        <p>{t('invoices.confirmModalWarning')}</p>
      </Modal>
      <Modal
        title={
          <span>
            <ExclamationCircleOutlined style={{ color: '#faad14', marginRight: 8 }} />
            {t('invoices.payModalTitle')}
          </span>
        }
        open={payModalOpen}
        onOk={handlePayOk}
        onCancel={handlePayCancel}
        okText={t('invoices.payModalOk')}
        cancelText={t('common.cancel')}
        okButtonProps={{ danger: false }}
      >
        <p>{t('invoices.payModalWarning')}</p>
      </Modal>
    </>
  );
}
