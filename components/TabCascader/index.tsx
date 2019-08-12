import React, { Component } from 'react';
import ClassNames from 'classnames';
import './index.less';
import { Icon } from 'antd';
import { AxiosResponse } from 'axios';

export interface CascaderProps {
  onClickItem?: Function;
  onChange?: Function;
  value?: Array<Item>;
  dataSource: Array<TabItem>;
}

export interface TabItem {
  title: string;
  items: Array<Item>;
}

export interface Item {
  code: string;
  name: string;
}

export interface CascaderState {
  tabIndex: number;
  selectedItems: Array<Item>;
  visible: Boolean;
}

export interface HttpResponse {
  data: Array<any>;
  errorCode: number;
  msg: string;
  pagination?: Object;
}

export default class TabCascader extends Component<CascaderProps, CascaderState> {
  constructor(props: CascaderProps) {
    super(props);
    this.state = {
      tabIndex: 0,
      // tabs: setTabs(props.value),
      selectedItems: [],
      visible: false,
    };
  }

  componentWillReceiveProps(nextProps: CascaderProps) {
    if (nextProps.value) {
      this.setState({
        selectedItems: nextProps.value.filter(v => v.code && v.name),
      });
    }
  }

  handleClickTab = (index: number) => {
    const { onClickItem, dataSource } = this.props;
    const { selectedItems } = this.state;
    this.setState({
      tabIndex: index,
    });
    if (index > 0 && !dataSource[index] && onClickItem) {
      onClickItem(selectedItems[index - 1].code, index);
    }
  };

  handleClickItem = (tabIdx: number, item: Item) => {
    let { onChange, onClickItem } = this.props;
    let { selectedItems } = this.state;
    selectedItems = selectedItems.slice(0, tabIdx + 1);
    selectedItems[tabIdx] = item;
    if (onClickItem) {
      onClickItem(item.code, tabIdx + 1, selectedItems).then((res: AxiosResponse) => {
        let tabLen;
        if (selectedItems.length >= 4) {
          tabLen = 4;
        } else {
          tabLen = selectedItems.length + 1;
        }
  
        if (tabIdx === 2 && res.data.length === 0) {
          tabLen = 3;
        }
  
        this.setState({
          selectedItems,
        });
        if (tabIdx + 1 < tabLen) {
          this.setState({ tabIndex: tabIdx + 1 });
        }
        if (onChange) {
          onChange(selectedItems);
        }
      });
    }
  };

  renderContent = () => {
    const { dataSource } = this.props;
    const { tabIndex, selectedItems, visible } = this.state;
    return (
      <div
        className={ClassNames({
          'antd-pro-cascader-content-wrap': true,
          'antd-pro-hidden': !visible,
        })}
      >
        <div className="antd-pro-tab">
          {selectedItems.length == 0 && (
            <a
              onClick={() => this.handleClickTab(0)}
              className={ClassNames({
                'antd-pro-tab-item': true,
                'antd-pro-tab-item-current': 0 === tabIndex,
              })}
            >
              请选择
              <Icon type="down" className="icon-tab-down" />
            </a>
          )}
          {selectedItems.map((item, index: number) => (
            <a
              onClick={() => this.handleClickTab(index)}
              className={ClassNames({
                'antd-pro-tab-item': true,
                'antd-pro-tab-item-current': index === tabIndex,
              })}
            >
              {item.name}
              <Icon type="down" className="icon-tab-down" />
            </a>
          ))}
          {selectedItems.length > 0 &&
            selectedItems.length < 4 &&
            dataSource[dataSource.length - 1].items.length !== 0 && (
              <a
                onClick={() => this.handleClickTab(selectedItems.length)}
                className={ClassNames({
                  'antd-pro-tab-item': true,
                  'antd-pro-tab-item-current': selectedItems.length === tabIndex,
                })}
              >
                请选择
                <Icon type="down" className="icon-tab-down" />
              </a>
            )}
        </div>
        <div className="antd-pro-tab-content">
          {dataSource.map((tab, tabIdx: number) => (
            <div
              key={tabIdx}
              className={ClassNames({
                'andt-pro-tab-panel': true,
                'antd-pro-hidden': tabIdx !== tabIndex,
              })}
            >
              <ul className="antd-pro-panel-list">
                {tab.items.map((item: Item, itemIdx: number) => (
                  <li
                    key={itemIdx}
                    className={ClassNames({
                      'panel-list-item-current':
                        selectedItems[tabIdx] && selectedItems[tabIdx].code == item.code,
                    })}
                    onClick={() => this.handleClickItem(tabIdx, item)}
                  >
                    <a>{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };

  render() {
    const { selectedItems } = this.state;
    const { value, onClickItem, onChange, ...restProps } = this.props;
    return (
      <div
        className="antd-pro-cascader"
        onMouseEnter={() => this.setState({ visible: true })}
        onMouseLeave={() => this.setState({ visible: false })}
        {...restProps}
      >
        <div className="antd-pro-cascader-text-wrap">
          <div className="antd-pro-cascader-text">
            {selectedItems.map((item: Item) => item.name).join('')}
          </div>
          <Icon type="down" className="icon-tab-down" />
        </div>
        {this.renderContent()}
      </div>
    );
  }
}
