interface IProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: IProps) {
  return (
    <>
      {/* Sidebar Content */}
      <div
        className={`bg-gray-800 text-white transform transition-transform duration-300 ease-in-out w-64
        fixed inset-y-0 left-0 z-40  
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:-translate-x-full'}`}
      >
        <div className="p-5 h-full">
          <h2 className="text-2xl font-bold italic">SADA KHATA</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className="block p-2 hover:bg-gray-700 rounded">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block p-2 hover:bg-gray-700 rounded">
                About
              </a>
            </li>
            <li>
              <a href="#" className="block p-2 hover:bg-gray-700 rounded">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="block p-2 hover:bg-gray-700 rounded">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay for small screens */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden" onClick={toggleSidebar} />}
    </>
  );
}
