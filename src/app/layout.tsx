'use client';

import store from '@/store/store';
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'bg-white text-black shadow-lg',
            duration: 3000
          }}
        />
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
