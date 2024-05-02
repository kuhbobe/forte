import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebarButton.css';
import { IconContext } from 'react-icons';

export default function SidebarButton({ title, to, icon, onClick }) {
  const location = useLocation();
  const isActive = to ? location.pathname === to : false;
  const btnClass = isActive ? 'btn-body active' : 'btn-body';

  if (to) {
    return (
      <Link to={to}>
        <div className={btnClass}>
          <IconContext.Provider value={{ size: '24px', className: 'btn-icon' }}>
            {icon}
            <p className="btn-title">{title}</p>
          </IconContext.Provider>
        </div>
      </Link>
    );
  } else if (onClick) {
    return (
      <div className={btnClass} onClick={onClick}>
        <IconContext.Provider value={{ size: '24px', className: 'btn-icon' }}>
          {icon}
          <p className="btn-title">{title}</p>
        </IconContext.Provider>
      </div>
    );
  } else {
    return null; // Render nothing if neither "to" nor "onClick" is provided
  }
}
