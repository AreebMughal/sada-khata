import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar/sidebar';
import SidebarHeader from '@/components/sidebar-header/sidebar-header';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Open by default on large screens

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Automatically close/open sidebar based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false); // Close sidebar on small screens
      } else {
        setIsSidebarOpen(true); // Open sidebar on large screens
      }
    };

    handleResize(); // Set initial state based on screen size
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize); // Cleanup on unmount
  }, []);

  return (
    <div className="flex min-h-screen bg-gray">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
        {/* Header */}
        <SidebarHeader toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

        {/* Content */}
        <main className="flex-1 p-4 bg-gray-100 mt-14">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
