import { useState } from 'react';
import { invoiceService } from '../../../services/invoice.service';
import type { Invoice } from '../../../types';

export const useInvoicePdfActions = () => {
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handlePreviewPDF = async (invoice: Invoice) => {
    try {
      const response = await invoiceService.previewPDF(invoice.id);
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      setPdfUrl(url);
      setIsPreviewModalOpen(true);
    } catch (error) {
      console.error('Failed to preview PDF:', error);
      // TODO: Show error notification to user
    }
  };

  const handleClosePreview = () => {
    setIsPreviewModalOpen(false);
    if (pdfUrl) {
      window.URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
  };

  const handleDownloadPDF = async (invoice: Invoice) => {
    try {
      const response = await invoiceService.downloadPDF(invoice.id);
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${invoice.invoiceSeries}-${invoice.invoiceNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download PDF:', error);
      // TODO: Show error notification to user
    }
  };

  return {
    isPreviewModalOpen,
    pdfUrl,
    handlePreviewPDF,
    handleClosePreview,
    handleDownloadPDF,
  };
};
