import './navigation.scss';
import React, { useState } from 'react';

const navigation = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <>
      <nav className="navigation">
        <div className="row">
          <figure onClick={() => setNavOpen(!navOpen)}>
            <img src="content/images/list.png" alt="Menu" className="menu-icon" />
          </figure>
          <div className="line"></div>
          <img src="content/images/Layer 1.png" alt="Logo" className="logo" />
          <div>
            <h1 className="text-white ml-5 mt-3 always">Always</h1>
            <h1 className="text-white ml-5 always">&nbsp;&nbsp;Open. 24/7</h1>
          </div>
          <button type="button" className="logoutBtn text-uppercase">
            Log out
          </button>
        </div>
      </nav>
    </>
  );
};

export default navigation;
