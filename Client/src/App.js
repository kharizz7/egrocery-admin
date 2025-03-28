// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Upload from './components/Upload';
import Orders from './components/Orders';
import Contact from './components/Contact';
import Profile from './components/Profile';
import Account from './components/Account';
import Stock from './components/Stock'

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Account />} />
      <Route path="/*" element={
        <Sidebar>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/upload" element={ <Upload category="Product" apiUrl="http://localhost:3000/api/products" />} />
            <Route path='/stock' element={<Stock />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Sidebar>
      } />
    </Routes>
  </Router>
);

export default App;
