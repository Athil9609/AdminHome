import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  // Toggle sidebar open/close state
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        style={{
          marginLeft: sidebarOpen ? '250px' : '0',
          padding: '20px',
          minHeight: '100vh',
          width: '100%',
          backgroundColor: '#f8f9fa',
          transition: 'margin-left 0.3s ease',
        }}
      >
        {/* Optional: Add a button to toggle sidebar on small screens */}
      

        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPage;
