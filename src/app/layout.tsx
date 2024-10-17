'use client';

import { IReactChild } from '@/interfaces/react-child.interface';
import store from '@/store/store';
import 'antd/dist/reset.css';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import AdminLayout from './admin-layout';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: Readonly<IReactChild>) {

  const pathname = usePathname();
  const isPublicRoute = ['/', '/login', '/signup'].includes(pathname);

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
        <Provider store={store}>
          {isPublicRoute ? (
            <>{children}</>
          ) : (
            <AdminLayout>
              {children}
            </AdminLayout>
          )}
        </Provider>
      </body>
    </html>
  );
}
