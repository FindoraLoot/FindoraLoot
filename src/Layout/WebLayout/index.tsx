import React from 'react';
import Header from '_components/Header';

import './index.less';

const WebLayout: React.FC = ({ children }) => {
  return (
    <div className="web-container">
      <Header />
      {children}
    </div>
  );
};

export default WebLayout;
