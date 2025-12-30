import './globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeToggle } from '@/components/ThemeToggle';

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export const metadata: Metadata = {
  title: 'JobNest',
  description: 'Job application tracker',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen overflow-hidden bg-[var(--bg)] text-[var(--fg)]">
        <header className="flex justify-end border-b border-[var(--border)] p-4">
          <ThemeToggle />
        </header>

        <div className="h-[calc(100vh-64px)]">
          {children}
        </div>
      </body>
    </html>
  );
}









