// src/components/layout/AdminLayout.tsx

import React, { useState } from 'react';
import Sidebar from '@/components/sidebar/sidebar';

const AdminLayout = ({
  children,
  Header,
}: {
  children: React.ReactNode;
  Header: React.ComponentType<{ toggleSidebar: () => void; isSidebarOpen: boolean }>;
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

        {/* Content */}
        <main className="flex-1 p-4 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
