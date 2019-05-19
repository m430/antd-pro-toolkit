import React, { Component } from 'react'
import ClassNames from 'classnames';
import './style/index';
import { Icon } from 'antd';

export interface CascaderProps {
  load: Function,
  onChange: Function,
  value: Array<Item>
}

export interface Item {
  code: string;
  name: string;
}

export interface TabItem {
  title: string;
  items: Array<Item>;
}

export interface CascaderState {
  tabs: Array<TabItem>;
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

export default class Cascader extends Component<CascaderProps, CascaderState> {

  constructor(props: CascaderProps) {
    super(props);
    this.state = {
      tabIndex: -1,
      tabs: (props.value || []).map(v => ({ title: v.name, items: []})),
      selectedItems: props.value || [],
      visible: false
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = (parentId?: string) => {
    const { load } = this.props;
    const { tabs, tabIndex } = this.state;
    let params: any = {};
    if (parentId) {
      params.parentId = parentId;
    }
    load(params).then((res: HttpResponse) => {
      if (res.errorCode === 0 && res.data.length > 0) {
        if (res.data.length > 0) {
          if (tabs[tabIndex + 1]) {
            tabs[tabIndex + 1].items = res.data;
          } else {
            tabs[tabIndex + 1] = {
              title: '请选择',
              items: res.data
            }
          }
          this.setState({ tabs, tabIndex: tabIndex + 1 })
        }
      }
    })
  }

  handleClickTab = (index: number) => {
    const { tabs, selectedItems } = this.state;
    this.setState({
      tabIndex: index
    })
    if (index > 0 && tabs[index].items.length === 0) {
      this.loadData(selectedItems[index - 1].code);
    }
  }

  handleClickItem = (tabIdx: number, item: Item) => {
    let { onChange } = this.props;
    let { selectedItems, tabs } = this.state;
    selectedItems = selectedItems.slice(0, tabIdx + 1);
    tabs = tabs.slice(0, tabIdx + 1);
    selectedItems[tabIdx] = item;
    tabs[tabIdx].title = item.name;
    this.setState({
      selectedItems,
      tabs,
    });
    if (onChange) {
      onChange(selectedItems);
    }
    setTimeout(() => this.loadData(item.code), 0);
  }

  renderContent = () => {

    const { tabs, tabIndex, selectedItems, visible } = this.state;

    return (
      <div className={
        ClassNames({
          'antd-pro-cascader-content-wrap': true,
          'antd-pro-hidden': !visible
        })}>
        <div className="antd-pro-tab">
          {tabs.map((tab: TabItem, index: number) => (
            <a
              onClick={() => this.handleClickTab(index)}
              className={ClassNames({
                'antd-pro-tab-item': true,
                'antd-pro-tab-item-current': index === tabIndex
              })}
            >
              {tab.title}
              <Icon type="down" className="icon-tab-down" />
            </a>
          ))}
        </div>
        <div className="antd-pro-tab-content">
          {tabs.map((tab: TabItem, tabIdx: number) => (
            <div key={tabIdx} className={ClassNames({
              'andt-pro-tab-panel': true,
              'antd-pro-hidden': tabIdx !== tabIndex
            })}>
              <ul className="antd-pro-panel-list">
                {tab.items.map((item: Item, itemIdx: number) =>
                  <li
                    key={itemIdx}
                    className={ClassNames({
                      'panel-list-item-current': selectedItems[tabIdx] && selectedItems[tabIdx].code == item.code
                    })}
                    onClick={() => this.handleClickItem(tabIdx, item)}
                  >
                    <a>{item.name}</a>
                  </li>
                )}
              </ul>
            </div>
          ))}

        </div>
      </div>
    )
  }

  render() {
    const { selectedItems } = this.state;
    const { value, load, onChange, ...restProps } = this.props;
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
    )
  }
}
