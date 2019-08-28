import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import classNames from 'classnames';
import './index.less';
import { Tabs, Input, Row, Col, Spin, Empty } from 'antd';
import { AxiosPromise } from 'axios';

const TabPane = Tabs.TabPane

export interface Result {
  errorCode?: number;
  data?: any;
  msg?: string;
}

export interface PanelData {
  title: string;
  maxLevel: number;
  data: Array<TabData>
}

export interface TabData {
  title: string;
  level: number;
  entry: boolean;
  items: Array<Item>;
}

export interface CascaderProps {
  onItemClick?: (key: number, topKey: number, item: Item, ) => Promise<any>;
  onTopTabChange?: (tabKey: string) => AxiosPromise<Result>;
  onTabChange?: (key: number, topKey: number) => AxiosPromise<Result>;
  onSearch?: (val: string) => Promise<any>;
  onBlur?: React.FocusEventHandler<Element>;
  onChange?: Function;
  value?: Array<Item>;
  dataSource: Array<PanelData>;
  className?: string;
  placeholder?: string;
  addonAfter?: string | React.ReactNode;
  hint?: string | React.ReactNode;
}

export interface Item {
  code: string;
  name: string;
  level: number;
}

export interface CascaderState {
  firstTab: number;
  secondTab: number;
  inputVal: string;
  selectedItems: Array<Item>;
  visible: Boolean;
  searchVisible: Boolean;
  isSearching: Boolean;
  fetchList: Array<any>;
}

export default class TabCascader extends Component<CascaderProps, CascaderState> {
  el: HTMLDivElement | null;
  debounceSearch: Function;

  static defaultProps = {
    level: 4
  }

  constructor(props: CascaderProps) {
    super(props);
    this.state = {
      firstTab: 0,
      secondTab: 0,
      inputVal: '',
      selectedItems: [],
      visible: false,
      searchVisible: false,
      isSearching: false,
      fetchList: []
    };
    this.debounceSearch = debounce(this.handleSearch, 600);

  }

  componentDidMount() {
    this.handleOutsideClick();
  }

  componentWillReceiveProps(nextProps: CascaderProps) {
    if (nextProps.value) {
      this.setState({
        selectedItems: nextProps.value.filter(v => v.code && v.name),
      });
    }
  }

  handleOutsideClick = () => {
    const el = this.el as HTMLDivElement;
    document.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as Node;
      if (!el.contains(target)) {
        this.setState({ visible: false });
      }
    })
  }

  handleTopTabChange = (tabKey: string) => {
    const { onTopTabChange } = this.props;
    let numKey = Number(tabKey);
    this.setState({ secondTab: 0, firstTab: numKey });
    if (onTopTabChange) {
      onTopTabChange(tabKey);
    }
  };

  handleSecondTabChange = (tabKey: string) => {
    const { onTabChange } = this.props;
    const { firstTab } = this.state;

    let currentKey = Number(tabKey);

    if (onTabChange) {
      onTabChange(currentKey, firstTab).then(() => {
        this.setState({ secondTab: currentKey });
      })
    }
  };


  handleClickItem = async (item: Item) => {
    const { onChange, onItemClick, dataSource } = this.props;
    let { selectedItems, firstTab, secondTab } = this.state;

    if ((secondTab === 0 || secondTab === 1) && firstTab == 0) {
      selectedItems = [];
      selectedItems.push(item);
    } else {
      if (firstTab == 0) {
        selectedItems = selectedItems.slice(0, secondTab - 1);
        selectedItems[secondTab - 1] = item;
      } else {
        selectedItems = selectedItems.slice(0, secondTab);
        selectedItems[secondTab] = item;
      }
    }
    const displayVal = selectedItems.map((item: Item) => item.name).join('-');
    this.setState({ selectedItems, inputVal: displayVal });

    if (dataSource[firstTab].maxLevel == item.level) {
      this.setState({ visible: false });
    }
    // 异步加载子项数据
    if (onItemClick) {
      onItemClick(secondTab, firstTab, item).then((data: number) => {
        this.setState({ secondTab: data });
        if (onChange) {
          onChange(selectedItems);
        }
      })
    } else { // 静态数据
      let nextTabData = dataSource[firstTab].data[secondTab + 1];
      if (nextTabData && nextTabData.items.length > 0) {
        this.setState({ secondTab: secondTab + 1 });
      }
    }
  };

  hanldeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputVal = e.target.value;
    this.setState({ inputVal });
    if (!inputVal) {
      this.setState({
        visible: false,
        searchVisible: false
      })
      return;
    }
    this.setState({ isSearching: true, visible: false, searchVisible: true });
    this.debounceSearch(inputVal);

  }

  handleSearch = (val: string) => {
    const { onSearch } = this.props;
    const { searchVisible } = this.state;

    if (onSearch && searchVisible) {
      this.setState({ isSearching: true, visible: false, searchVisible: true });
      onSearch(val).then(data => {
        this.setState({ fetchList: data, isSearching: false });
      });
    }
  }

  handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).select();
    this.setState({ visible: true });
  }

  handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { searchVisible } = this.state;
    const { onBlur } = this.props;
    if (searchVisible) {
      this.setState({
        searchVisible: false,
        selectedItems: [],
        inputVal: ''
      });
    }
    if (onBlur) {
      onBlur(e);
    }
  }

  renderItems = (items: Array<Item>) => {
    const { selectedItems } = this.state;

    const hasSelectedItem = (item: Item) => {
      return selectedItems.findIndex(sItem => item.code == sItem.code) > -1;
    }

    return (
      <div className="antd-pro-tab-items">
        <ul className="antd-pro-panel-list">
          <Row>
            {items.map((item: Item) => (
              <Col xs={12} md={8} lg={6}>
                <li
                  key={item.code}
                  className={classNames({
                    'tab-item-selected': hasSelectedItem(item)
                  })}
                  onClick={() => this.handleClickItem(item)}
                >
                  <a>{item.name}</a>
                </li>

              </Col>
            ))}
          </Row>
        </ul>
      </div>
    )
  }

  renderContent = () => {
    const { dataSource, hint } = this.props;
    const { visible, firstTab, secondTab } = this.state;

    const contentCls = classNames(
      'antd-pro-cascader-content-wrap',
      {
        'antd-pro-hidden': !visible
      }
    );

    return (
      <div className={contentCls}>
        <div className="hint">{hint}</div>
        <Tabs
          animated={false}
          className="antd-pro-top-tab"
          activeKey={`${firstTab}`}
          onChange={this.handleTopTabChange}
        >
          {
            dataSource.map((item: PanelData, panelIdx: number) => (
              <TabPane key={`${panelIdx}`} tab={item.title}>
                <Tabs
                  animated={false}
                  className="antd-pro-second-tab"
                  activeKey={`${secondTab}`}
                  onChange={this.handleSecondTabChange}
                >
                  {
                    item.data.map((tabItem: TabData, tabIdx: number) => (
                      <TabPane
                        key={`${tabIdx}`}
                        className="andt-pro-tab-panel"
                        tab={
                          <li className={classNames({ 'tab-header-dot': tabItem.entry })}>
                            {tabItem.title}
                          </li>
                        }
                      >
                        {this.renderItems(tabItem.items)}
                      </TabPane>
                    ))
                  }
                </Tabs>
              </TabPane>

            ))
          }
        </Tabs>
      </div>
    );
  };

  renderSearchSection() {
    const { fetchList, isSearching } = this.state;
    const searchList = fetchList.length == 0
      ? <Empty className="empty" />
      : fetchList.map(item => (
        <li className="list-item">
          {item.name}
        </li>
      ))
    return (
      <div className="search-section">
        {
          isSearching ? <Spin className="loading-spin" /> : searchList
        }
      </div>
    )
  }

  render() {
    const { inputVal, searchVisible } = this.state;
    const { value, onItemClick, onChange, className, placeholder, addonAfter, ...restProps } = this.props;

    const cascaderCls = classNames('antd-pro-cascader', className);
    return (
      <div
        ref={node => this.el = node}
        className={cascaderCls}
        {...restProps}
      >
        <Input
          value={inputVal}
          className="tab-search-bar"
          addonAfter={addonAfter}
          onChange={this.hanldeInputChange}
          onClick={this.handleInputClick}
          onBlur={this.handleInputBlur}
          placeholder={placeholder}
        ></Input>
        {this.renderContent()}
        {searchVisible && this.renderSearchSection()}
      </div>
    );
  }
}
