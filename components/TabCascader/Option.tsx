import React, { Component } from 'react';
import { Item } from './index';

export interface IOptionProps {
  item: Item;
  onClick: (item: Item) => void;
}

export default class Option extends Component<IOptionProps, any> {

  render() {
    const { item, onClick } = this.props;

    const parentName = (item: Item) => item.parents[item.parents.length - 1].name;

    return (
      <li className="list-item" key={item.code} onClick={() => onClick(item)}>
        {item.name} {item.level !== 1 && `(${parentName(item)})`}
      </li>
    )
  }
}