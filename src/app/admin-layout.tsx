import AdminNavbar from '@/components/admin-navbar/admin-navbar';
import Sidebar from '@/components/sidebar/sidebar';
import { IReactChild } from '@/interfaces/react-child.interface';
import { useEffect, useState } from 'react';

const AdminLayout = ({ children }: IReactChild) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className={`bg-gray-100 flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>

        <AdminNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

        <main className="flex-1 p-4 bg-white rounded-md mt-24 mx-5 mb-10">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
