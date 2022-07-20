import React from 'react';
import { useWeb3React } from '@web3-react/core';

import ConnectWallet from '_components/ConnectWallet';

import './index.less';

const Header = () => {
  const { account } = useWeb3React();
  return (
    <header className="header">
      <div className="logo">Loot</div>
      <ConnectWallet />
    </header>
  );
};

export default Header;
