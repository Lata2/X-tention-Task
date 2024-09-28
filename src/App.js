import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerManagement from './Components/customer/CustomerManagement';
import CustomerStats from './Components/customer/CustomerStates';
import Sidebar from './Components/sidebar/Sidebar';
import Dashboard from './Components/Dashboard';

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <Router>
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`flex-1 ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customer-management" element={<CustomerManagement />} />
            <Route path="/customer-stats" element={<CustomerStats />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
