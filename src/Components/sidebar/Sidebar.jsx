import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { FaHome, FaUser, FaBox, FaFileInvoice, FaMoneyBillWave, FaChartBar } from 'react-icons/fa'; 

const Sidebar = ({ onCloseSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    if (isOpen) {
      onCloseSidebar();
      setIsOpen(false); // Close the sidebar upon clicking any link
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('tenant');
    navigate("/login");
  };

  return (
    <>
      <button className="toggle-btn" onClick={handleToggleSidebar}>
        {isOpen ? '❌' : '☰'}
      </button>
      <div className={isOpen ? 'sidebar open' : 'sidebar'}>
        <ul>
          <li>
            <NavLink to="/" activeClassName="active" className="options" onClick={handleItemClick}>
              <FaHome className="icon" /> <span className="text">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/customer-management" activeClassName="active" className="options" onClick={handleItemClick}>
              <FaUser className="icon" /> <span className="text">Customer Management</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/customer-stats" activeClassName="active" className="options" onClick={handleItemClick}>
              <FaChartBar className="icon" /> <span className="text">Customer Stats</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
