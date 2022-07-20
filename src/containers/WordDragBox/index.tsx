import React from 'react';
import { useDrag } from 'react-dnd';

import NFTBox from '_components/NFTBox';

import './index.less';

export interface IWordDragBox {
  data: any;
  onSynthetic?: (data: any) => void;
}

const WordDragBox: React.FC<IWordDragBox> = ({ data, onSynthetic }) => {
  const [{ isDragging }, drager] = useDrag({
    type: 'wordBox',
    item: data,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div style={{ opacity }} ref={drager} className="word-drag-box">
      <NFTBox data={data} isShowSeparate onSynthetic={onSynthetic} />
    </div>
  );
};

WordDragBox.defaultProps = {
  onSynthetic: () => {},
};
export default WordDragBox;
