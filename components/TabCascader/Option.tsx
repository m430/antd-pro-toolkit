import React from 'react';
import classNames from 'classnames';
import { Item } from './index';

export interface IOptionProps {
  item: Item;
  prefixCls: string;
  className: string;
  onClick: (item: Item) => void;
}

const Option: React.RefForwardingComponent<HTMLLIElement, IOptionProps> = (
  {
    item,
    prefixCls,
    className,
    onClick
  }, ref) => {

  const parentName = (item: Item) => item.parents[item.parents.length - 1].name;

  const mergedClassName = classNames([`${prefixCls}-list-option`], className);

  return (
    <li ref={ref} className={mergedClassName} key={item.code} onClick={() => onClick(item)}>
      {item.name} {item.level !== 1 && `(${parentName(item)})`}
    </li>
  )
}

const RefOption = React.forwardRef<React.ReactNode, IOptionProps>(Option);
RefOption.displayName = "Option";

export default RefOption;