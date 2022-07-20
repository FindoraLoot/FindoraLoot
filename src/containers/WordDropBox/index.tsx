import classNames from 'classnames';
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';

import NFTBox from '_components/NFTBox';

import './index.less';

function WordDropBox({ onDrop, data, className, onClose }) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'wordBox',
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;

  return (
    <div className={classNames('cp_word_drop', className, { isActive })} ref={drop}>
      {data.length > 0 &&
        data.map((item) => {
          return <NFTBox isClose data={item} key={item.id} onClose={onClose} />;
        })}
    </div>
  );
}
export default WordDropBox;
