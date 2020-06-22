import React from 'react';
import Navigation from './topNavigation/navigation';
import LeftNavigation from './leftNavigation/leftNavigation';
import Tabs from './tabs/tabs';

const profile = () => {
  return (
    <>
      <Navigation />
      <LeftNavigation />
      <Tabs />
    </>
  );
};
export default profile;
