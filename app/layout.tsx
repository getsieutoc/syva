import { ReactNode, Metadata } from '@/types';
import { Inter } from 'next/font/google';

import { GeneralProviders, ThemeProvider } from './components';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SyväHire',
  description: 'Know your candidates',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GeneralProviders>
          <ThemeProvider
            disableTransitionOnChange
            defaultTheme="system"
            attribute="class"
            enableSystem
          >
            {children}
          </ThemeProvider>
        </GeneralProviders>
      </body>
    </html>
  );
}
