import React from 'react';
import './Dashboard.css';

const TopHeader = ({ pageTitle, toggleSidebar, sidebarOpen }) => {
  return (
    <header className="top-header">
      <div className="header-container">
        <div className="header-left">
          <button 
            className="menu-button"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? "◀" : "☰"}
          </button>
          <h1 className="page-title">{pageTitle}</h1>
        </div>
        <div className="header-right">
          <div className="search-container">
            <span className="search-icon">
              🔍
            </span>
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="search-input"
            />
          </div>
          <button className="notification-button">
            🔔
          </button>
          <div className="user-avatar">
            U
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;