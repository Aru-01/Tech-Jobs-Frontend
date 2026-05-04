'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authApi } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshProfile } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      handleCallback(code);
    } else {
      setError('No authorization code found.');
      toast.error('Authentication failed: No code provided.');
      router.push('/login');
    }
  }, [searchParams]);

  const handleCallback = async (code) => {
    try {
      console.log('Sending code to backend:', code);
      const response = await authApi.googleAuth({ code });
      console.log('Backend response:', response);
      
      if (response.success && response.data?.access) {
        localStorage.setItem('access_token', response.data.access);
        await refreshProfile();
        toast.success('Google login successful! 🚀');
        router.push('/');
      } else {
        const msg = response.message || (response.errors ? Object.values(response.errors).flat()[0] : 'Failed to authenticate with backend.');
        setError(msg);
        toast.error(msg);
      }
    } catch (err) {
      console.error('Google callback error:', err);
      const msg = err.response?.data?.message || 'An unexpected error occurred during authentication.';
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {!error ? (
        <>
          <Loader2 className="animate-spin text-accent mb-4" size={48} />
          <h2 className="text-xl font-semibold">Authenticating with Google...</h2>
          <p className="text-muted text-sm mt-2">Please wait while we finalize your sign-in.</p>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-500">Authentication Error</h2>
          <p className="text-muted mt-2">{error}</p>
          <button 
            onClick={() => router.push('/login')}
            className="mt-6 px-6 py-2 rounded-xl bg-accent text-white font-semibold"
          >
            Back to Login
          </button>
        </div>
      )}
    </div>
  );
}
