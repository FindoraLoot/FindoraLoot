import Web3 from 'web3';
import { getWeb3ReactContext } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import Tokens from '_constants/tokens';

const LootABI = require('_abis/loot.json');

const web3 = new Web3(Web3.givenProvider);

const getContract = (address: string, ABI: any, options) => {
  return new web3.eth.Contract(ABI, address, options);
};

const getLootContract = () => {
  const { chainId } = window['__LootAPP__'];
  if (chainId === 2153) {
    return getContract(Tokens.dev.lootAddress, LootABI, { gasLimit: '8000000' });
  }
  if (chainId === 524) {
    return getContract(Tokens.moca.lootAddress, LootABI, { gasLimit: '8000000' });
  }

  throw Error('chainId undefined , not abi');
};

const getBalance = async (address: string) => {
  let balance = await web3.eth.getBalance(address);
  return balance;
};

const getDefaultAccount = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);
  if (accounts.length > 0) {
    return accounts[0];
  }
  return '';
};

const gasOptions = async (params = {}) => {
  const gasLimit = Web3.utils.toHex(8000000);
  // const gasPrice = Web3.utils.toHex(1000000);
  const from = await getDefaultAccount();
  return {
    from,
    gasLimit,
    // gasPrice,
    ...params,
  };
};

const toDecimals = async (contract: any, amount: string, decimals: string, flag: 'timse' | 'div') => {
  const ten = new BigNumber(10);
  // const decimals = await contract.methods.decimals().call();
  const power = ten.exponentiatedBy(decimals);
  const amountBN = new BigNumber(amount);
  console.log(amountBN.toString(), decimals.toString());
  return flag === 'timse' ? amountBN.times(power) : amountBN.div(power);
};

export { web3, getContract, getLootContract, gasOptions, getDefaultAccount, getBalance, toDecimals };
