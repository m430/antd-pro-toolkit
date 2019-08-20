import React, { Component } from 'react';
import ClassNames from 'classnames';
import './index.less';
import { Icon, Tabs } from 'antd';
import { AxiosPromise } from 'axios';

const TabPane = Tabs.TabPane

export interface Result {
  errorCode?: number;
  data?: any;
  msg?: string;
}

export interface CascaderProps {
  onItemClick?: (code: string, level: number, ) => AxiosPromise<Result>;
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
      selectedItems: [{ code: '-1', name: '请选择' }],
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
    const { onItemClick, dataSource } = this.props;
    const { selectedItems } = this.state;
    this.setState({
      currentTab: index,
    });
    if (index > 0 && !dataSource[index] && onItemClick) {
      onItemClick(selectedItems[index - 1].code, index);
    }
  };

  handleClickItem = async (tabIdx: number, item: Item) => {
    let { onChange, onItemClick, dataSource } = this.props;
    let { selectedItems } = this.state;
    selectedItems = selectedItems.slice(0, tabIdx + 1);
    selectedItems[tabIdx] = item;

    if (onItemClick) {
      // 异步加载子项数据
      onItemClick(item.code, tabIdx + 1).then(() => {
        this.setState({ selectedItems, currentTab: tabIdx + 1 });
        if (onChange) {
          onChange(selectedItems);
        }
      })
    } else {
      if (dataSource[tabIdx].length > 0) {
        this.setState({ selectedItems });
      }
      if (dataSource[tabIdx + 1] && dataSource[tabIdx + 1].length > 0) {
        selectedItems.push({code: '-1', name: '请选择'});
        this.setState({ selectedItems, currentTab: tabIdx + 1 });
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

  renderItems = (tabIdx: number) => {
    const { dataSource } = this.props;
    const { selectedItems } = this.state;

    return (
      <div className="antd-pro-tab-items">
        {dataSource[tabIdx].map((item: Item, itemIdx: number) => (
          <ul className="antd-pro-panel-list">
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
          </ul>
        ))}
      </div>
    )
  }

  renderContent = () => {
    const { selectedItems, visible, currentTab } = this.state;

    return (
      <div
        className={ClassNames({
          'antd-pro-cascader-content-wrap': true,
          'antd-pro-hidden': !visible,
        })}
      >
        <Tabs 
          animated={false}
          className="antd-pro-tab-content"
          activeKey={`${currentTab}`} 
          onTabClick={this.handleClickTab}
        >
          {
            selectedItems.map((item: Item, tabIdx: number) => (
              <TabPane tab={item.name} key={`${tabIdx}`} className="andt-pro-tab-panel">
                {this.renderItems(tabIdx)}
              </TabPane>
            ))
          }
        </Tabs>
      </div>
    );
  };

  filterItems = (items: Array<Item>, code: string = '-1') => {
    return items.filter(item => item.code !== code);
  }

  render() {
    const { selectedItems } = this.state;
    const { value, onItemClick, onChange, ...restProps } = this.props;

    const filterSelectedItems = this.filterItems(selectedItems);
    return (
      <div
        className="antd-pro-cascader"
        onMouseEnter={() => this.setState({ visible: true })}
        onMouseLeave={() => this.setState({ visible: false })}
        {...restProps}
      >
        <div className="antd-pro-cascader-text-wrap">
          <div className="antd-pro-cascader-text">
            {filterSelectedItems.map((item: Item) => item.name).join('')}
          </div>
          <Icon type="down" className="icon-tab-down" />
        </div>
        {this.renderContent()}
      </div>
    );
  }
}
