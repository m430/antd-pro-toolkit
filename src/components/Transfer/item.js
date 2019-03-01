import React, { Component } from 'react'
import classNames from 'classnames';
import Lazyload from 'react-lazy-load';
import { Checkbox } from 'antd';

export default class Item extends Component {
  render() {
    const {
      renderedText,
      renderedEl,
      item,
      lazy,
      checked,
      disabled,
      prefixCls,
      onClick,
    } = this.props;

    const className = classNames({
      [`${prefixCls}-content-item`]: true,
      [`${prefixCls}-content-item-disabled`]: disabled || item.disabled,
    });

    let title = undefined;
    if (typeof renderedText === 'string' || typeof renderedText === 'number') {
      title = String(renderedText);
    }

    const listItem = (
      <li
        className={className}
        title={title}
        onClick={disabled || item.disabled ? undefined : () => onClick(item)}
      >
        <Checkbox checked={checked} disabled={disabled || item.disabled} />
        <span>{renderedEl}</span>
      </li>
    );
    let children = null;
    if (lazy) {
      const lazyProps = {
        height: 32,
        offset: 500,
        throttle: 0,
        debounce: false,
        ...lazy,
      };
      children = <Lazyload {...lazyProps}>{listItem}</Lazyload>;
    } else {
      children = listItem;
    }

    return children;
  }
}
