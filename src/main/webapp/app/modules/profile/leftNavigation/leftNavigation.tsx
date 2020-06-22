import './left-navigation.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserEdit } from 'react-icons/fa';
import { FiPower } from 'react-icons/fi';

const leftNavigation = () => {
  return (
    <div className="left-nav">
      <Link to="">
        <FaUserEdit />
      </Link>

      <Link to="">
        <FiPower />
      </Link>
    </div>
  );
};

export default leftNavigation;
