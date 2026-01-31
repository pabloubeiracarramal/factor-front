import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export default function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, user, fetchProfile } = useAuth();
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const handleAuth = async () => {
      const token = searchParams.get('token');
      
      if (token) {
        // Store the token
        login(token);
        
        // Fetch user profile to check if they have a company
        await fetchProfile();
      } else {
        // No token found in URL
        setError('Authentication failed. No token received.');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    };

    handleAuth();
  }, [searchParams, login, navigate, fetchProfile]);

  // Once user is loaded, redirect based on company status
  useEffect(() => {
    if (user) {
      if (user.companyId && user.company) {
        // User has a company, redirect to home
        navigate('/home');
      } else {
        // User doesn't have a company, redirect to create company
        navigate('/create-company');
      }
    }
  }, [user, navigate]);

  if (error) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 'var(--spacing-md)',
      }}>
        <div className="card" style={{
          textAlign: 'center',
          maxWidth: '420px',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-error-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto var(--spacing-lg)',
          }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="var(--color-error)" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 style={{ 
            color: 'var(--color-error)', 
            marginBottom: 'var(--spacing-md)',
            fontSize: '1.5rem',
          }}>Authentication Error</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-md)' }}>{error}</p>
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: '0.875rem' }}>
            Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: 'var(--spacing-md)',
    }}>
      <div className="card" style={{
        textAlign: 'center',
      }}>
        <div className="spinner" style={{ margin: '0 auto var(--spacing-lg)' }} />
        <h2 style={{ marginBottom: 'var(--spacing-md)', fontSize: '1.5rem' }}>Authenticating...</h2>
        <p style={{ color: 'var(--color-text-secondary)' }}>Please wait while we sign you in.</p>
      </div>
    </div>
  );
}
