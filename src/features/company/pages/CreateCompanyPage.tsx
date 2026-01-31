import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContext';
import { companyService } from '../../../services/company.service';
import LanguageSwitcher from '../../../components/LanguageSwitcher';
import type { CreateCompanyDto } from '../../../types';

export default function CreateCompanyPage() {
  const { user, fetchProfile } = useAuth();
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState<CreateCompanyDto>({
    name: user?.name ? `${user.name}'s Company` : '',
    street: '',
    city: '',
    postalCode: '',
    state: '',
    country: '',
    vatNumber: '',
    bankAccountNumber: '',
    adminEmail: user?.email || '',
    adminName: user?.name || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!formData.name.trim()) {
      setError(t('company.validation.nameRequired'));
      return;
    }
    if (!formData.adminEmail.trim()) {
      setError(t('company.validation.adminEmailRequired'));
      return;
    }
    if (!formData.adminName.trim()) {
      setError(t('company.validation.adminNameRequired'));
      return;
    }

    setIsLoading(true);

    try {
      await companyService.create({
        name: formData.name.trim(),
        street: formData.street?.trim() || undefined,
        city: formData.city?.trim() || undefined,
        postalCode: formData.postalCode?.trim() || undefined,
        state: formData.state?.trim() || undefined,
        country: formData.country?.trim() || undefined,
        vatNumber: formData.vatNumber?.trim() || undefined,
        bankAccountNumber: formData.bankAccountNumber?.trim() || undefined,
        adminEmail: formData.adminEmail.trim(),
        adminName: formData.adminName.trim(),
      });
      
      // Refresh user profile to get the new company
      await fetchProfile();
      navigate('/home');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || t('company.createError');
      setError(errorMessage);
      console.error('Failed to create company:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: 'var(--spacing-md)',
      backgroundColor: 'var(--color-bg)',
    }}>
      <div style={{
        position: 'absolute',
        top: 'var(--spacing-md)',
        right: 'var(--spacing-md)',
      }}>
        <LanguageSwitcher />
      </div>
      <div className="card" style={{
        maxWidth: '480px',
        width: '100%',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
          <h1 style={{ 
            fontSize: '1.875rem',
            marginBottom: 'var(--spacing-sm)',
          }}>{t('company.createTitle')}</h1>
          <p style={{ 
            color: 'var(--color-text-secondary)',
            fontSize: '0.875rem',
          }}>
            {t('company.createSubtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label 
              htmlFor="name" 
              style={{ 
                display: 'block',
                marginBottom: 'var(--spacing-sm)',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              {t('company.name')} <span style={{ color: 'var(--color-error)' }}>*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('company.namePlaceholder')}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem',
                transition: 'border-color 0.2s',
              }}
              autoFocus
            />
          </div>

          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label 
              htmlFor="street" 
              style={{ 
                display: 'block',
                marginBottom: 'var(--spacing-sm)',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              {t('company.street')}
            </label>
            <input
              id="street"
              name="street"
              type="text"
              value={formData.street}
              onChange={handleChange}
              placeholder={t('company.streetPlaceholder')}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem',
                transition: 'border-color 0.2s',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
            <div style={{ flex: 1 }}>
              <label 
                htmlFor="city" 
                style={{ 
                  display: 'block',
                  marginBottom: 'var(--spacing-sm)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              >
                {t('company.city')}
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                placeholder={t('company.cityPlaceholder')}
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1rem',
                  transition: 'border-color 0.2s',
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label 
                htmlFor="postalCode" 
                style={{ 
                  display: 'block',
                  marginBottom: 'var(--spacing-sm)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              >
                {t('company.postalCode')}
              </label>
              <input
                id="postalCode"
                name="postalCode"
                type="text"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder={t('company.postalCodePlaceholder')}
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1rem',
                  transition: 'border-color 0.2s',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
            <div style={{ flex: 1 }}>
              <label 
                htmlFor="state" 
                style={{ 
                  display: 'block',
                  marginBottom: 'var(--spacing-sm)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              >
                {t('company.state')}
              </label>
              <input
                id="state"
                name="state"
                type="text"
                value={formData.state}
                onChange={handleChange}
                placeholder={t('company.statePlaceholder')}
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1rem',
                  transition: 'border-color 0.2s',
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label 
                htmlFor="country" 
                style={{ 
                  display: 'block',
                  marginBottom: 'var(--spacing-sm)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              >
                {t('company.country')}
              </label>
              <input
                id="country"
                name="country"
                type="text"
                value={formData.country}
                onChange={handleChange}
                placeholder={t('company.countryPlaceholder')}
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1rem',
                  transition: 'border-color 0.2s',
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label 
              htmlFor="vatNumber" 
              style={{ 
                display: 'block',
                marginBottom: 'var(--spacing-sm)',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              {t('company.vatNumber')}
            </label>
            <input
              id="vatNumber"
              name="vatNumber"
              type="text"
              value={formData.vatNumber}
              onChange={handleChange}
              placeholder={t('company.vatNumberPlaceholder')}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem',
                transition: 'border-color 0.2s',
              }}
            />
          </div>

          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label 
              htmlFor="bankAccountNumber" 
              style={{ 
                display: 'block',
                marginBottom: 'var(--spacing-sm)',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              {t('company.bankAccountNumber')}
            </label>
            <input
              id="bankAccountNumber"
              name="bankAccountNumber"
              type="text"
              value={formData.bankAccountNumber}
              onChange={handleChange}
              placeholder={t('company.bankAccountNumberPlaceholder')}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem',
                transition: 'border-color 0.2s',
              }}
            />
          </div>

          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label 
              htmlFor="adminName" 
              style={{ 
                display: 'block',
                marginBottom: 'var(--spacing-sm)',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              {t('company.adminName')} <span style={{ color: 'var(--color-error)' }}>*</span>
            </label>
            <input
              id="adminName"
              name="adminName"
              type="text"
              value={formData.adminName}
              onChange={handleChange}
              placeholder={t('company.adminNamePlaceholder')}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem',
                transition: 'border-color 0.2s',
              }}
            />
          </div>

          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label 
              htmlFor="adminEmail" 
              style={{ 
                display: 'block',
                marginBottom: 'var(--spacing-sm)',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              {t('company.adminEmail')} <span style={{ color: 'var(--color-error)' }}>*</span>
            </label>
            <input
              id="adminEmail"
              name="adminEmail"
              type="email"
              value={formData.adminEmail}
              onChange={handleChange}
              placeholder={t('company.adminEmailPlaceholder')}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem',
                transition: 'border-color 0.2s',
              }}
            />
          </div>

          {error && (
            <div style={{
              padding: 'var(--spacing-sm) var(--spacing-md)',
              backgroundColor: 'var(--color-error-light)',
              color: 'var(--color-error)',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--spacing-lg)',
              fontSize: '0.875rem',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !formData.name.trim() || !formData.adminEmail.trim() || !formData.adminName.trim()}
            className="button"
            style={{
              width: '100%',
              padding: 'var(--spacing-sm) var(--spacing-md)',
              opacity: (isLoading || !formData.name.trim() || !formData.adminEmail.trim() || !formData.adminName.trim()) ? 0.6 : 1,
              cursor: (isLoading || !formData.name.trim() || !formData.adminEmail.trim() || !formData.adminName.trim()) ? 'not-allowed' : 'pointer',
            }}
          >
            {isLoading ? `${t('common.loading')}` : t('company.createButton')}
          </button>
        </form>
      </div>
    </div>
  );
}
