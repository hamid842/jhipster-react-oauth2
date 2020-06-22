import './tabs.scss';
import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import HomeTab from './home-tab/homeTab';
import ProfileTab from './profile-tab/profileTab';
import ReceiverTab from './receive-tab/receiverTab';
import Transfer from './transfer/transfer';

const tabs = () => {
  return (
    <div className="tabs">
      <Tabs defaultActiveKey="profile" id="profile">
        <Tab eventKey="home" title="Home" tabClassName="text-custom">
          <div className="home">
            <HomeTab />
          </div>
        </Tab>
        <Tab eventKey="profile" title="Profile" tabClassName="text-custom">
          <div className="profile">
            <ProfileTab />
          </div>
        </Tab>
        <Tab eventKey="receiver" title="Receiver" tabClassName="text-custom">
          <div className="profile">
            <ReceiverTab />
          </div>
        </Tab>
        <Tab eventKey="transfer" title="Transfer" tabClassName="text-custom">
          <div className="profile">
            <Transfer />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default tabs;
