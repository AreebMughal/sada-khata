// components/Sidebar.tsx
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 ease-in-out ${
          isOpen ? 'w-64' : 'w-0'
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="text-white text-3xl p-4 focus:outline-none"
        >
          
        </button>
        <div
          className={`p-4 transition-opacity duration-300 ease-in-out ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">Sidebar Menu</h2>
          <ul>
            <li className="py-2">Group Page </li>
            
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out transform ${
          isOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        {/* Hamburger Icon */}
        <button
          onClick={toggleSidebar}
          className="text-3xl p-2 focus:outline-none fixed top-4 left-4 z-50"
        >
          <FaBars />
        </button>

        <div className="p-8">
          <h1 className="text-4xl font-bold text-center">Home Page</h1>
          <p className='text-center'>This is the main content of the page. It will move to the right when the sidebar is opened and return to its original position when closed.</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
