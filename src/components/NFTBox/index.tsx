import React from 'react';

import './index.less';

export interface INFTBox {
  data: any;
}

const NFTBox: React.FC<INFTBox> = ({ data }) => {
  return (
    <div className="nft-box">
      <img src={data.word.image} />
    </div>
  );
};

NFTBox.defaultProps = {};
export default NFTBox;
