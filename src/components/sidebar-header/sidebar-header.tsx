// src/components/sidebar-header/SidebarHeader.tsx

import React from 'react';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';

const SidebarHeader = ({ toggleSidebar, isSidebarOpen }: { toggleSidebar: () => void; isSidebarOpen: boolean }) => {
  return (
    <header className="p-4 bg-gray-800 text-white fixed w-full z-50">
      <button onClick={toggleSidebar} className="text-2xl">
        {isSidebarOpen ? <MenuOutlined /> : <MenuOutlined />}
      </button>
    </header>
  );
};

export default SidebarHeader;
