import { theme } from 'antd';

interface ModalHeaderProps {
    title?: string;
    subtitle?: string;
}

const ModalHeader = ({ title, subtitle }: ModalHeaderProps) => {
    const { token } = theme.useToken();

    return (
        <>
            <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, color: token.colorText }}>
                    {title}
                </h2>
                <p style={{ color: token.colorTextSecondary, fontSize: '0.875rem' }}>
                    {subtitle}
                </p>
            </div>
        </>
    );
};

export default ModalHeader;