import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.scss';

const sidebarItems = [1, 2, 3, 4, 5, 6];

function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="Sidebar__logo">
        <FontAwesomeIcon icon={faThLarge} size="lg" />
      </div>
      {sidebarItems.map(item => (
        <div key={item} className="Sidebar__item" />
      ))}
    </div>
  );
}

export default Sidebar;
