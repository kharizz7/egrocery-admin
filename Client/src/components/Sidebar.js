import { useNavigate } from 'react-router-dom';
import { Bell, User } from 'lucide-react';

const Sidebar = ({ children }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Sidebar (Fixed Position) */}
      <div className="fixed top-0 left-0 h-full bg-gray-800 text-white w-64 p-5 z-40">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <ul className="space-y-4">
          <li><button onClick={() => handleNavigation('/home')} className="hover:text-gray-300">Home</button></li>
          <li><button onClick={() => handleNavigation('/upload')} className="hover:text-gray-300">Upload</button></li>
          <li><button onClick={() => handleNavigation('/orders')} className="hover:text-gray-300">Orders</button></li>
          <li><button onClick={() => handleNavigation('/contact')} className="hover:text-gray-300">Contact</button></li>
        </ul>
      </div>

      {/* Main Content Area (Push Content) */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Navbar */}
        <nav className="flex justify-between items-center w-full bg-gray-900 text-white p-4 fixed top-0 pl-[300px] right-0 z-30">
          <h1 className="text-xl font-bold">MyApp</h1>
          <div className="flex-1 flex justify-center">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 rounded-lg text-black w-1/3"
            />
          </div>
          <div className="flex items-center space-x-6">
            <Bell size={24} />
            <button onClick={() => handleNavigation('/profile')}>
              <User size={24} />
            </button>
          </div>
        </nav>

        {/* Page Content (With Navbar Offset) */}
        <main className="p-6 overflow-auto flex-1 mt-[200px]">{children}</main>
      </div>
    </div>
  );
};

export default Sidebar;
