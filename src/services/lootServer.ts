import { getLootContract, getDefaultAccount, gasOptions } from './web3';

const MetacoreServer = {
  async claim(nftId: string) {
    const contract = getLootContract();
    const options = await gasOptions();
    await contract.methods.claim(nftId).send(options);
  },
  async ownerOf(nftId: string): Promise<boolean> {
    const contract = getLootContract();
    try {
      await contract.methods.ownerOf(nftId).call();
      return false;
    } catch (e) {
      return true;
    }
  },

  async getNFTList() {
    const contract = getLootContract();
    const address = await getDefaultAccount();
    const result = [];
    try {
      let nftTotal = await contract.methods.balanceOf(address).call();
      console.log('当前地址拥有的NFT数量', nftTotal);
      while (nftTotal > 0) {
        nftTotal = Number(nftTotal) - 1;
        const nftId = await contract.methods.tokenOfOwnerByIndex(address, nftTotal).call();
        console.log('当前地址拥有的NFT id', nftTotal, nftId);

        let word = await contract.methods.tokenURI(nftId).call();

        word = JSON.parse(atob(word.replace('data:application/json;base64,', '')));

        result.push({
          word,
          id: nftId,
        });
      }
      return result;
    } catch (e) {
      console.log(e);
      return [];
    }
  },
  async getTokenList() {
    const contract = getLootContract();
    const address = await getDefaultAccount();
    const result = [];
    try {
      let count = await contract.methods.totalSupply().call();
      console.log('有几个 NFT', count);
      while (count > 0) {
        count = count - 1;
        try {
          let tokenID = await contract.methods.tokenByIndex(count).call();

          const _address = await contract.methods.ownerOf(tokenID).call();

          if (address === _address) {
            const word = await contract.methods.tokenURI(tokenID).call();
            result.push({ word: JSON.parse(atob(word.replace('data:application/json;base64,', ''))), id: count });
          }
        } catch (e) {}
      }
      return result;
    } catch (err) {
      console.log(err);
      return [];
    }
  },
};

export default MetacoreServer;
