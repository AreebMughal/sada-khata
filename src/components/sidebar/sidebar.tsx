import React from 'react';

const SidebarContent = ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) => (
  <div
    className={`bg-gray-800 text-white transform transition-transform duration-300 ease-in-out w-64 ${
      isOpen ? 'translate-x-0 block' : '-translate-x-full hidden'
    } md:relative md:block fixed inset-y-0 left-0`}
    style={{ display: isOpen ? 'block' : 'none' }} 
  >
    <div className="p-5 h-full">
      <h2 className="text-2xl font-bold italic">SADA KHATA</h2>
      <ul className="mt-4 space-y-2">
        <li>
          <a href="#" className="block p-2 hover:bg-gray-700 rounded" >
            Home
          </a>
        </li>
        <li>
          <a href="#" className="block p-2 hover:bg-gray-700 rounded" >
            About
          </a>
        </li>
        <li>
          <a href="#" className="block p-2 hover:bg-gray-700 rounded" >
            Services
          </a>
        </li>
        <li>
          <a href="#" className="block p-2 hover:bg-gray-700 rounded" >
            Contact
          </a>
        </li>
      </ul>
    </div>
  </div>
);

const SidebarOverlay = ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) => (
  isOpen && <div className="fixed inset-0 bg-black opacity-50 z-30 md:hidden" onClick={toggleSidebar} />
);

const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) => (
  <>
    {/* Sidebar content */}
    <SidebarContent isOpen={isOpen} toggleSidebar={toggleSidebar} />

    {/* Sidebar overlay (for closing the sidebar when clicking outside) */}
    <SidebarOverlay isOpen={isOpen} toggleSidebar={toggleSidebar} />
  </>
);

export default Sidebar;
