import React, { Component } from 'react';
import ClassNames from 'classnames';
import './index.less';
import { Icon } from 'antd';
import { AxiosPromise } from 'axios';

export interface Result {
  errorCode?: number;
  data?: any;
  msg?: string;
}

export interface CascaderProps {
  onClickItem?: (code: string, level: number, ) => AxiosPromise<Result>;
  onChange?: Function;
  value?: Array<Item>;
  dataSource: Array<Array<Item>>;
}

export interface Item {
  code: string;
  name: string;
}

export interface CascaderState {
  currentTab: number;
  selectedItems: Array<Item>;
  visible: Boolean;
}

export default class TabCascader extends Component<CascaderProps, CascaderState> {
  constructor(props: CascaderProps) {
    super(props);
    this.state = {
      currentTab: 0,
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
      currentTab: index,
    });
    if (index > 0 && !dataSource[index] && onClickItem) {
      onClickItem(selectedItems[index - 1].code, index);
    }
  };

  handleClickItem = async (tabIdx: number, item: Item) => {
    let { onChange, onClickItem, dataSource } = this.props;
    let { selectedItems } = this.state;
    selectedItems = selectedItems.slice(0, tabIdx + 1);
    selectedItems[tabIdx] = item;

    if (onClickItem) {
      // 异步加载子项数据
      onClickItem(item.code, tabIdx + 1).then(() => {
        this.setState({ selectedItems, currentTab: tabIdx + 1 });
        if (onChange) {
          onChange(selectedItems);
        }
      })
    } else {
      console.log(dataSource, tabIdx, item);
      if (dataSource[tabIdx].length > 0) {
        this.setState({ selectedItems });
      }
      if (dataSource[tabIdx + 1] && dataSource[tabIdx + 1].length > 0) {
        this.setState({ currentTab: tabIdx + 1 });
      }
    }
  };

  renderTabHeader = (title: string, index: number) => {
    const { currentTab } = this.state;
    return (
      <a
        onClick={() => this.handleClickTab(index)}
        className={ClassNames({
          'antd-pro-tab-item': true,
          'antd-pro-tab-item-current': index === currentTab,
        })}
      >
        {title}
        <Icon type="down" className="icon-tab-down" />
      </a>
    )
  }

  renderContent = () => {
    const { dataSource } = this.props;
    const { currentTab, selectedItems, visible } = this.state;

    console.log(currentTab, selectedItems);
    return (
      <div
        className={ClassNames({
          'antd-pro-cascader-content-wrap': true,
          'antd-pro-hidden': !visible,
        })}
      >
        <div className="antd-pro-tab">
          {
            selectedItems.length == 0 && this.renderTabHeader('请选择', 0)
          }
          {
            selectedItems.map((item: Item, index: number) => (
              this.renderTabHeader(item.name, index)
            ))
          }
          {
            currentTab !== 0 && dataSource[selectedItems.length] && this.renderTabHeader('请选择', selectedItems.length)
          }
        </div>
        <div className="antd-pro-tab-content">
          {dataSource.map((tab, tabIdx: number) => (
            <div
              key={tabIdx}
              className={ClassNames({
                'andt-pro-tab-panel': true,
                'antd-pro-hidden': tabIdx !== currentTab,
              })}
            >
              <ul className="antd-pro-panel-list">
                {tab.map((item: Item, itemIdx: number) => (
                  <li
                    key={`${tabIdx}-${itemIdx}`}
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
