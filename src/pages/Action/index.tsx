import React, { useState, useEffect, Fragment } from 'react';
import { Button, Input, message } from 'antd';
import { useWeb3React } from '@web3-react/core';

import NFTBox from '_components/NFTBox';
import ConnectWallet from '_components/ConnectWallet';

import services from '_src/services';

import './index.less';
import { useHistory } from 'react-router';
import pageURL from '_constants/pageURL';

function Action() {
  const { account, chainId } = useWeb3React();
  const hirstory = useHistory();
  const [word, setWord] = useState('');
  const [nftList, setNftList] = useState([]);

  function getLootList() {
    services.lootServer
      .getNFTList()
      .then((data) => {
        console.log(data);
        setNftList(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  useEffect(() => {
    getLootList();
  }, [account]);

  function onClaimWord(e) {
    setWord(e.target.value);
  }

  async function onClaimSubmit() {
    if (chainId !== 523) {
      message.warning('Please connect to the Findora network to operate');
      return;
    }
    if (word.trim() === '') {
      message.info('Can not be empty');
      return;
    }
    try {
      const isExist = await services.lootServer.ownerOf(word);
      if (isExist) {
        await services.lootServer.claim(word);
        message.success('mint successed');
        getLootList();
      } else {
        message.warn('NFT has been claimed');
      }
    } catch (err) {
      message.error(err.message);
    }
  }

  return (
    <div className="action-page">
      <div className="wallet_box">
        <div className="btn_back" onClick={() => hirstory.push(pageURL.home)}>
          Back
        </div>
        <ConnectWallet />
      </div>
      <div className="title">Loot</div>
      <div className="sub_info"> Findora Loot Contract ` Example</div>
      <div className="input_box">
        <Input placeholder="Input ID（ 0 ~ 8000 ）to get a Loot" onChange={onClaimWord} className="word-input" />
        <div className="btn_box">
          <Button onClick={onClaimSubmit}>Mint</Button>
        </div>
      </div>
      <div className="continer">
        {nftList.length > 0 &&
          nftList.map((item) => {
            return <NFTBox key={item.id} data={item} />;
          })}
      </div>
    </div>
  );
}
export default Action;
