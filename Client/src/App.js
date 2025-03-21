import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Account from './components/Account'
import Profile from './components/Profile'

function App() {
  return (
    
      <div>
      <Router>
      <Routes>
        <Route path="/" element={<Account />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      </Router>
      
    </div>

    
  );
}

export default App;
