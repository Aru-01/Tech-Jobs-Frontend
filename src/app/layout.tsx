import './globals.css';
import { Toaster } from 'react-hot-toast';
import { Inter, Space_Grotesk } from 'next/font/google';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import { AuthProvider } from '@/hooks/useAuth';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });


export const metadata = {
  title: 'Tech_Jobs — Premium Tech Job Board for Developers',
  description: 'Find your dream tech job at the world\'s most innovative companies. 12,000+ curated software engineering, AI/ML, DevOps, and design roles. Salary transparency, remote-first.',
  keywords: 'tech jobs, software engineer jobs, developer jobs, remote tech jobs, AI ML jobs, DevOps jobs, frontend jobs, backend jobs',
  openGraph: {
    title: 'Tech_Jobs — Premium Tech Job Board',
    description: 'Find your dream tech job at world-class companies. Curated roles, salary transparency, remote-first.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <Providers>
          <AuthProvider>
            <Navbar />
            <main className="page-transition">{children}</main>
            <Footer />
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 4000,
                style: {
                  borderRadius: '12px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: '500',
                },
              }}
            />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
