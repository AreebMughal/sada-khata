import React from 'react';
import { MenuOutlined } from '@ant-design/icons';

const SidebarHeader = ({
  toggleSidebar,
  isSidebarOpen,
}: {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}) => (
  <header className="p-4 bg-gray-800 text-white fixed w-full z-50 flex items-center">
    <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
      {isSidebarOpen ? <MenuOutlined /> : <MenuOutlined />}
    </button>
    <h1 className="ml-4 text-xl font-semibold"> Dashboard</h1>
  </header>
);

export default SidebarHeader;
