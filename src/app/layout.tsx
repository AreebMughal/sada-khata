'use client';

import store from '@/store/store';
import 'antd/dist/reset.css';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { Provider } from 'react-redux';
import AdminLayout from './admin-layout';
import './globals.css';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  if (typeof window !== 'undefined') {
    window.onload = () => {
        document.getElementById('holderStyle')!.remove();
    };
}

  const pathname = usePathname();
  const isPublicRoute = ['/', '/login', '/signup'].includes(pathname);


  return (
    <html lang="en">
      <header>
      <style
                id="holderStyle"
                dangerouslySetInnerHTML={{
                    __html: `
                    *, *::before, *::after {
                        transition: none!important;
                    }
                    `,
                }}
            />
      </header>
      <body className={inter.className}>
        <Provider store={store}>
          {isPublicRoute ? (
            <>{children}</> // Normal layout without sidebar
          ) : (
            <AdminLayout>{children}</AdminLayout>
          )}
        </Provider>
      </body>
    </html>
  );
}
