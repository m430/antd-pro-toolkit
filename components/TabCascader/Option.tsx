import React from 'react';
import classNames from 'classnames';
import { Item } from './index';

export interface IOptionProps {
  item: Item;
  prefixCls: string;
  className: string;
  onClick: (item: Item) => void;
}

const Option: React.FC<IOptionProps> = (
  {
    item,
    prefixCls,
    className,
    onClick
  }) => {

  const parentName = (item: Item) => item.parents[item.parents.length - 1].name;

  const mergedClassName = classNames([`${prefixCls}-option`], className);

  return (
    <li className={mergedClassName} key={item.code} onClick={() => onClick(item)}>
      {item.name} {item.level !== 1 && `(${parentName(item)})`}
    </li>
  )
}

export default Option;