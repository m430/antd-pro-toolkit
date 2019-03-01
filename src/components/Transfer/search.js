import React, { Component } from 'react'
import { Icon, Input } from 'antd';

export default class Search extends Component {
  handleChange = (e) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(e);
    }
  };

  handleClear = (e) => {
    e.preventDefault();
    const { handleClear, disabled } = this.props;
    if (!disabled && handleClear) {
      handleClear(e);
    }
  };

  render() {
    const { placeholder, value, prefixCls, disabled } = this.props;
    const icon =
      value && value.length > 0 ? (
        <a href="#" className={`${prefixCls}-action`} onClick={this.handleClear}>
          <Icon type="close-circle" theme="filled" />
        </a>
      ) : (
        <span className={`${prefixCls}-action`}>
          <Icon type="search" />
        </span>
      );

    return (
      <div>
        <Input
          placeholder={placeholder}
          className={prefixCls}
          value={value}
          ref="input"
          onChange={this.handleChange}
          disabled={disabled}
        />
        {icon}
      </div>
    );
  }
}
