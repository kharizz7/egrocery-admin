// Layout.js
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 p-4">
      <Outlet />
    </div>
  </div>
);

export default Layout;
