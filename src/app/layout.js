

import './globals.css';
import { Inter } from 'next/font/google';
import { WidgetProvider } from '../context/WidgetContext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WidgetProvider>
          {children}
        </WidgetProvider>
      </body>
    </html>
  );
}
