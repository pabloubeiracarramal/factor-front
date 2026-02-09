import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';

type PdfPreviewModalProps = {
  isOpen: boolean;
  pdfUrl: string | null;
  onClose: () => void;
};

export default function PdfPreviewModal({ isOpen, pdfUrl, onClose }: PdfPreviewModalProps) {
  const { t } = useTranslation();

  return (
    <Modal
      title={t('dashboard.pdfPreview')}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width="80%"
      style={{ top: 20 }}
      destroyOnClose
    >
      {pdfUrl && (
        <iframe
          src={`${pdfUrl}#toolbar=0`}
          style={{ width: '100%', height: '80vh', border: 'none' }}
          title="PDF Preview"
        />
      )}
    </Modal>
  );
}
