import { ReactNode, Metadata } from '@/types';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';

import { GeneralProviders, ThemeProvider } from './components';

import './globals.css';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'SyväHire',
  description: 'Know your candidates',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      className={cn(fontSans.variable, 'dark')}
      suppressHydrationWarning
      lang="en"
    >
      <body>
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
