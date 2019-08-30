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
  code: string;
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
  onSearchItemClick?: (item: Item, ) => Promise<any>;
  onTopTabChange?: (tabKey: string) => AxiosPromise<Result>;
  onTabChange?: (key: number, topKey: number, item: Item | undefined) => AxiosPromise<Result>;
  onSearch?: (val: string) => Promise<any>;
  onBlur?: React.FocusEventHandler<Element>;
  onChange?: Function;
  value?: Array<Item>;
  dataSource: Array<PanelData>;
  className?: string;
  placeholder?: string;
  addonAfter?: string | React.ReactNode;
  hint?: string | React.ReactNode;
  style?: React.CSSProperties;
}

export interface Item {
  code: string;
  name: string;
  level: number;
  groupCode: string;
  parentCode?: string;
  areaCode1?: string;
  areaCode2?: string;
  areaCode3?: string;
  areaCode4?: string;
  areaName1?: string;
  areaName2?: string;
  areaName3?: string;
  areaName4?: string;
  [key: string]: any;
}

export interface CascaderState {
  firstTab: number;
  secondTab: number;
  inputVal: string;
  selectedItems: Array<Item>;
  visible: Boolean;
  searchVisible: Boolean;
  tabLoading: Boolean;
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
      tabLoading: false,
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
      e.stopPropagation();
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
    const { onTabChange, dataSource } = this.props;
    const { firstTab, selectedItems } = this.state;

    let currentKey = Number(tabKey);
    let currentTabData = dataSource[firstTab].data[currentKey];

    if (currentTabData && currentTabData.items.length > 0) {
      this.setState({ secondTab: currentKey });
    } else {
      if (onTabChange) {
        this.setState({ tabLoading: true });
        let currentItem = selectedItems.find(item => item.level === currentTabData.level);
        onTabChange(currentKey, firstTab, currentItem).then(() => {
          this.setState({ tabLoading: false });
          this.setState({ secondTab: currentKey });
        })
      }
    }

  };


  handleClickItem = (item: Item) => {
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
    // 异步加载下一级项数据
    if (onItemClick) {
      if (item.level !== dataSource[firstTab].maxLevel) {
        if (secondTab == 0 && firstTab == 0) {
          this.setState({ secondTab: secondTab + 2, tabLoading: true });
        } else {
          this.setState({ secondTab: secondTab + 1, tabLoading: true });
        }
      }
      onItemClick(secondTab, firstTab, item).then(() => {
        this.setState({ tabLoading: false });
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

  handleSearchItemClick = async (item: Item) => {
    const { dataSource, onSearchItemClick } = this.props;
    let { firstTab, selectedItems } = this.state;

    firstTab = Number(item.groupCode);
    selectedItems = [];
    let startIndex = firstTab == 2 ? 1 : 2;
    for (let i = startIndex; i <= item.level; i++) {
      selectedItems.push({
        code: item[`areaCode${i}`],
        name: item[`areaName${i}`],
        level: i,
        groupCode: item.groupCode,
        parentCode: item[`areaCode${i - 1}`]
      });
    }
    const displayVal = selectedItems.map((item: Item) => item.name).join('-');
    this.setState({
      firstTab,
      searchVisible: false,
      visible: true,
      selectedItems,
      inputVal: displayVal
    });
    if (onSearchItemClick) {
      this.setState({ tabLoading: true });
      onSearchItemClick(item).then(() => {
        this.setState({ 
          tabLoading: false, 
          secondTab: dataSource[firstTab].data.length - 1
        });
      });
    }
  }

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
    const el = this.el as HTMLDivElement;
    const target = e.target as Node;
    if (searchVisible && !el.contains(target)) {
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

  renderItems = (tabItem: TabData) => {
    const items = tabItem.items;
    const { selectedItems } = this.state;

    const hasSelectedItem = (item: Item) => {
      return selectedItems.findIndex(sItem => item.code == sItem.code) > -1 && tabItem.entry;
    }

    const itemList = items.map((item: Item) => (
      <Col xs={12} md={8} lg={6} key={item.code}>
        <li
          className={classNames({
            'tab-item-selected': hasSelectedItem(item)
          })}
          onClick={() => this.handleClickItem(item)}
        >
          <a>{item.name}</a>
        </li>

      </Col>
    ))

    return (
      <div className="antd-pro-tab-items">
        <ul className="antd-pro-panel-list">
          <Row>
            {
              items.length === 0
                ? <Empty className="empty" />
                : itemList
            }
          </Row>
        </ul>
      </div>
    )
  }

  renderContent = () => {
    const { dataSource, hint } = this.props;
    const { visible, firstTab, secondTab, tabLoading } = this.state;

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
                        {tabLoading && tabIdx === secondTab ? <div className="tab-loading"><Spin /></div> : this.renderItems(tabItem)}
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
    const { fetchList, isSearching, searchVisible } = this.state;

    const parentName = (item: any) => item[`areaName${item.level - 1}`];

    const searchList = fetchList.length == 0
      ? <Empty className="empty" />
      : fetchList.map(item => (
        <li className="list-item" key={item.code} onClick={() => this.handleSearchItemClick(item)}>
          {item.name} {item.level !== 1 && `(${parentName(item)})`}
        </li>
      ));

    const cls = classNames('search-section', {
      'antd-pro-hidden': !searchVisible
    });
    return (
      <div className={cls}>
        {
          isSearching ? <Spin className="loading-spin" /> : searchList
        }
      </div>
    )
  }

  render() {
    const { inputVal } = this.state;
    const { className, placeholder, addonAfter, style } = this.props;

    const cascaderCls = classNames('antd-pro-cascader', className);
    return (
      <div
        ref={node => this.el = node}
        className={cascaderCls}
        style={style}
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
        {this.renderSearchSection()}
      </div>
    );
  }
}
