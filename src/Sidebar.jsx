import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaShoppingBag, FaTachometerAlt, FaListAlt, FaShoppingCart, FaUsers, FaTags,
  FaBell, FaStore, FaUserShield, FaUserTie, FaBoxOpen, FaChartLine, FaBars
} from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <FaTachometerAlt /> },
    { name: 'Category', path: '/categories', icon: <FaListAlt /> },
    { name: 'Orders', path: '/orders', icon: <FaShoppingCart /> },
    { name: 'Customers', path: '/customers', icon: <FaUsers /> },
    { name: 'Coupons', path: '/coupons', icon: <FaTags /> },
    { name: 'Notifications', path: '/notifications', icon: <FaBell /> },
    { name: 'Stores', path: '/stores', icon: <FaStore /> },
    { name: 'Sub Admins', path: '/sub-admins', icon: <FaUserShield /> },
    { name: 'Sellers', path: '/sellers', icon: <FaUserTie /> },
    { name: 'Vendors Product', path: '/vendors-product', icon: <FaBoxOpen /> },
    { name: 'Analytics', path: '/analytics', icon: <FaChartLine /> }
  ];

  return (
    <>
      {/* Open button visible only when sidebar is closed on small screens */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          style={{
            position: 'fixed',
            top: 10,
            left: 10,
            zIndex: 1100,
            padding: '8px 12px',
            fontSize: '18px',
            cursor: 'pointer',
            backgroundColor: '#0d6efd',
            border: 'none' ,
            borderRadius: '4px',
            color: 'white',
          }}
          aria-label="Open sidebar"
        >
          <FaBars />
        </button>
      )}

      {/* Sidebar */}
      <div
        style={{
          width: '250px',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: isOpen ? 0 : '-250px',
          backgroundColor: '#212529',
          color: 'white',
          padding: '20px 15px',
          overflowY: 'auto',
          transition: 'left 0.3s ease',
          zIndex: 1050,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Close button only visible on small screens when sidebar is open */}
        {isOpen && window.innerWidth < 768 && (
          <button
            onClick={toggleSidebar}
            aria-label="Close sidebar"
            style={{
              alignSelf: 'flex-end',
              background: 'transparent',
              border: 'none',
              fontSize: '28px',
              color: 'white',
              cursor: 'pointer',
              marginBottom: '10px',
              padding: 0,
              lineHeight: 1,
            }}
          >
            &times;
          </button>
        )}

        <h4 style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaShoppingBag /> FASTBAG
        </h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, flexGrow: 1 }}>
          {menuItems.map(({ name, path, icon }) => (
            <li key={name} style={{ marginBottom: '15px' }}>
              <Link
                to={path}
                style={{
                  color: location.pathname === path ? '#0d6efd' : 'white',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontWeight: location.pathname === path ? '600' : 'normal',
                }}
                onClick={() => {
                  if (window.innerWidth < 768) toggleSidebar(); // close sidebar after click on mobile
                }}
              >
                {icon} <span>{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
