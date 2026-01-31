import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Invoice } from '../../../../types';
import { useInvoices, useInvoiceFilters, useInvoicesTableColumns, useInvoicePdfActions, useDeleteInvoice, useClients } from '../../hooks';
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

  const displayedInvoices = limit ? invoices.slice(0, limit) : invoices;

  const handleEditInvoice = (invoice: Invoice) => {
    navigate(`/invoices/${invoice.id}/edit`);
  };

  const columns = useInvoicesTableColumns({
    filters,
    handleFilterChange,
    handlePreviewPDF,
    handleDownloadPDF,
    handleEditInvoice,
    handleDeleteInvoice: confirmDelete,
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
    </>
  );
}
