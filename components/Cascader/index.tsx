import React, { Component } from 'react'
import ClassNames from 'classnames';
import './index.less';
import { Icon } from 'antd';


export default class Cascader extends Component<{}, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      text: '',
      tabIndex: 0,
      visible: false,
      tabs: [
        {
          title: '请选择',
          items: [
            { key: 1, name: '北京' },
            { key: 2, name: '天津' },
          ]
        },
        {
          title: '北京',
          items: [
            { key: 1, name: '北京1' },
            { key: 2, name: '天津2' },
          ]
        },
      ],
      selectedItems: []
    }
  }

  handleClickTab = (index: number) => {
    this.setState({
      tabIndex: index
    })
  }

  handleClickItem = (tabIdx: number, item: any) => {
    const { selectedItems, tabs } = this.state;
    selectedItems[tabIdx] = item;
    tabs[tabIdx].title = item.name;
    this.setState({ 
      selectedItems,
      tabIndex: tabIdx + 1,
      tabs
    });
  }

  renderContent = () => {

    const { tabs, tabIndex, selectedItems } = this.state;

    return (
      <div className="antd-pro-cascader-content-wrap">
        <div className="antd-pro-tab">
          {tabs.map((tab: any, index: number) => (
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
          {tabs.map((tab: any, tabIdx: number) => (
            <div key={tabIdx} className={ClassNames({
              'andt-pro-tab-panel': true,
              'antd-pro-hidden': tabIdx !== tabIndex
            })}>
              <ul className="antd-pro-panel-list">
                {tab.items.map((item: any, itemIdx: number) =>
                  <li
                    key={itemIdx}
                    className={ClassNames({
                      'panel-list-item-current': selectedItems[tabIdx] && selectedItems[tabIdx].key == item.key
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
    return (
      <div className="antd-pro-cascader">
        <div className="antd-pro-cascader-text-wrap">
          <div className="antd-pro-cascader-text">
            {selectedItems.map((item: any) => item.name).join('')}
          </div>
          <Icon type="down" className="icon-tab-down" />
        </div>
        {this.renderContent()}
      </div>
    )
  }
}
