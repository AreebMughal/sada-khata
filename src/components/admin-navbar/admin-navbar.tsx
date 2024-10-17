import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

interface IProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export default function AdminNavbar({ toggleSidebar, isSidebarOpen }: IProps) {

  return (
    <header className="p-4 bg-white text-black fixed w-full z-50 flex items-center">
      <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
        {isSidebarOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </button>
      <h1 className="ml-4 text-xl font-semibold"> Dashboard</h1>
    </header>
  );
}
