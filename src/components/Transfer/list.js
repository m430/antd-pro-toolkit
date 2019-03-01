import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import { Checkbox } from 'antd';
import classNames from 'classnames';
import Animate from 'rc-animate';
import Item from './item';
import Search from './search';
import triggerEvent from '../_utils/triggerEvent';

function isRenderResultPlainObject(result) {
  return (
    result &&
    !React.isValidElement(result) &&
    Object.prototype.toString.call(result) === '[object Object]'
  );
}

export default class TransferList extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  getCheckStatus(filteredDataSource) {
    const { checkedItems } = this.props;
    if (checkedItems.length === 0) {
      return 'none';
    } else if (filteredDataSource.every(item => checkedItems.findIndex(c => c.key === item.key) >= 0)) {
      return 'all';
    }
    return 'part';
  }

  handleSelect = (selectedItem) => {
    const { checkedItems } = this.props;
    const result = checkedItems.some(c => c.key === selectedItem.key);
    this.props.handleSelect(selectedItem, !result);
  };

  handleFilter = (e) => {
    this.props.handleFilter(e);
    if (!e.target.value) {
      return;
    }
    this.triggerScrollTimer = window.setTimeout(() => {
      const transferNode = ReactDOM.findDOMNode(this);
      const listNode = transferNode.querySelectorAll('.ant-transfer-list-content')[0];
      if (listNode) {
        triggerEvent(listNode, 'scroll');
      }
    }, 0);
  };

  handleClear = () => {
    this.props.handleClear();
  };

  matchFilter = (text, item) => {
    const { filter, filterOption } = this.props;
    if (filterOption) {
      return filterOption(filter, item);
    }
    return text.indexOf(filter) >= 0;
  };

  renderItem = (item) => {
    const { render = noop } = this.props;
    const renderResult = render(item);
    const isRenderResultPlain = isRenderResultPlainObject(renderResult);
    return {
      renderedText: isRenderResultPlain ? renderResult.value : renderResult,
      renderedEl: isRenderResultPlain ? renderResult.label : renderResult,
    };
  };

  render() {
    const {
      prefixCls,
      dataSource,
      titleText,
      checkedItems,
      lazy,
      disabled,
      body,
      footer,
      showSearch,
      style,
      filter,
      searchPlaceholder,
      notFoundContent,
      itemUnit,
      itemsUnit,
      onScroll,
    } = this.props;

    // Custom Layout
    const footerDom = footer && footer(this.props);
    const bodyDom = body && body(this.props);

    const listCls = classNames(prefixCls, {
      [`${prefixCls}-with-footer`]: !!footerDom,
    });

    const filteredDataSource = [];
    const totalDataSource = [];

    const showItems = dataSource.map(item => {
      const { renderedText, renderedEl } = this.renderItem(item);
      if (filter && filter.trim() && !this.matchFilter(renderedText, item)) {
        return null;
      }

      // all show items
      totalDataSource.push(item);
      if (!item.disabled) {
        // response to checkAll items
        filteredDataSource.push(item);
      }

      const checked = checkedItems.findIndex(c => c.key === item.key) >= 0;
      return (
        <Item
          disabled={disabled}
          key={item.key}
          item={item}
          lazy={lazy}
          renderedText={renderedText}
          renderedEl={renderedEl}
          checked={checked}
          prefixCls={prefixCls}
          onClick={this.handleSelect}
        />
      );
    });

    const unit = dataSource.length > 1 ? itemsUnit : itemUnit;

    const search = showSearch ? (
      <div className={`${prefixCls}-body-search-wrapper`}>
        <Search
          prefixCls={`${prefixCls}-search`}
          onChange={this.handleFilter}
          handleClear={this.handleClear}
          placeholder={searchPlaceholder}
          value={filter}
          disabled={disabled}
        />
      </div>
    ) : null;

    const searchNotFound = showItems.every(item => item === null) && (
      <div className={`${prefixCls}-body-not-found`}>{notFoundContent}</div>
    );

    const listBody = bodyDom || (
      <div
        className={classNames(
          showSearch ? `${prefixCls}-body ${prefixCls}-body-with-search` : `${prefixCls}-body`,
        )}
      >
        {search}
        <Animate
          component="ul"
          componentProps={{ onScroll }}
          className={`${prefixCls}-content`}
          transitionName={this.state.mounted ? `${prefixCls}-content-item-highlight` : ''}
          transitionLeave={false}
        >
          {showItems}
        </Animate>
        {searchNotFound}
      </div>
    );

    const listFooter = footerDom ? <div className={`${prefixCls}-footer`}>{footerDom}</div> : null;

    const checkStatus = this.getCheckStatus(filteredDataSource);
    const checkedAll = checkStatus === 'all';
    const checkAllCheckbox = (
      <Checkbox
        ref="checkbox"
        disabled={disabled}
        checked={checkedAll}
        indeterminate={checkStatus === 'part'}
        onChange={() => this.props.handleSelectAll(filteredDataSource, checkedAll)}
      />
    );

    return (
      <div className={listCls} style={style}>
        <div className={`${prefixCls}-header`}>
          {checkAllCheckbox}
          <span className={`${prefixCls}-header-selected`}>
            <span>
              {(checkedItems.length > 0 ? `${checkedItems.length}/` : '') + totalDataSource.length}{' '}
              {unit}
            </span>
            <span className={`${prefixCls}-header-title`}>{titleText}</span>
          </span>
        </div>
        {listBody}
        {listFooter}
      </div>
    );
  }
}
