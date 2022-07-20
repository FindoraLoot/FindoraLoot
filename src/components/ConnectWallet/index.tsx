import React, { useEffect, useState } from 'react';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { notification, Button } from 'antd';

import { injected } from './connector';
import { useEagerConnect, useInactiveListener } from '_components/ConnectWallet/WalletHooks';

import metamaskLogo from '_assets/images/metamask_logo.png';

import './index.less';

const ConnectWallet = () => {
  const triedEager = useEagerConnect();
  const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React();
  const [activatingConnector, setActivatingConnector] = useState<InjectedConnector>();

  useEffect(() => {
    window['__LootAPP__'] = {
      chainId,
    };
  }, [chainId]);

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    } else {
      // if (error instanceof UnsupportedChainIdError) {
      //   (connector as any).changeChainId('137');
      //   return;
      // }
      if (error instanceof UnsupportedChainIdError) {
        notification.warning({
          message: error?.name,
          description: error?.message,
          top: 80,
        });
        return;
      }
    }
  }, [activatingConnector, connector]);

  const activating = injected === activatingConnector;
  const connected = injected === connector;
  const disabled = !triedEager || !!activatingConnector || !!error;
  const isDisconnect = !error && chainId;

  useInactiveListener(!triedEager || !!activatingConnector);

  function handleOnCLickConnectWallet() {
    if (!isDisconnect) {
      setActivatingConnector(injected);
      activate(injected);
    } else {
      deactivate();
    }
  }

  function ButtonSwitchComponent() {
    if (connected && isDisconnect) {
      return (
        <div className="wallet_connected">
          <img src={metamaskLogo} />
          <span className="address">{`${account.slice(0, 8)}···${account.slice(-6)}`}</span>
        </div>
      );
    } else {
      if (activating) {
        return <div>CONNECTING</div>;
      } else {
        return (
          <div className="connect_activating" onClick={handleOnCLickConnectWallet}>
            CONNECT WALLET
          </div>
        );
      }
    }
  }
  return <div className="components_connect_wallet">{ButtonSwitchComponent()}</div>;
};

export default ConnectWallet;
