import React, { Component } from 'react'
import ClassNames from 'classnames';
import Dropdown from 'antd/lib/dropdown';
import 'antd/lib/dropdown/style/css';
import Tabs from 'antd/lib/tabs';
import 'antd/lib/tabs/style/css';
import './index.less';
import Button from 'antd/lib/button/button';
import 'antd/lib/button/style/css';
import Icon from 'antd/lib/icon/index';
import 'antd/lib/icon/style/css';

const { TabPane } = Tabs;

export default class Cascader extends Component {

  constructor(props) {
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

  handleClickTab = (index) => {
    this.setState({
      tabIndex: index
    })
  }

  handleClickItem = (tabIdx, item) => {
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

    const { text, tabs, tabIndex, selectedItems } = this.state;

    return (
      <div className="antd-pro-cascader-content-wrap">
        <div className="antd-pro-tab">
          {tabs.map((tab, index) => (
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
          {tabs.map((tab, tabIdx) => (
            <div key={tabIdx} className={ClassNames({
              'andt-pro-tab-panel': true,
              'antd-pro-hidden': tabIdx !== tabIndex
            })}>
              <ul className="antd-pro-panel-list">
                {tab.items.map((item, itemIdx) =>
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
            {selectedItems.map(item => item.name).join('')}
          </div>
          <Icon type="down" className="icon-tab-down" />
        </div>
        {this.renderContent()}
      </div>
    )
  }
}
