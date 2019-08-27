import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import ClassNames from 'classnames';
import './index.less';
import { Icon, Tabs, Input, Row, Col } from 'antd';
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
  onSearch?: (val: string) => Promise<Result>;
  onChange?: Function;
  value?: Array<Item>;
  dataSource: Array<PanelData>;
  className?: string;
  level: number;
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
  isSearch: Boolean;
  fetchList: Array<any>;
}

export default class TabCascader extends Component<CascaderProps, CascaderState> {
  el: HTMLDivElement | null;

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
      isSearch: false,
      fetchList: []
    };
    console.log(props);
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
    const { dataSource, onTopTabChange } = this.props;
    let numKey = Number(tabKey);
    let currentData = dataSource[numKey];
    this.setState({ secondTab: 0 });
    if (currentData) {
      if (currentData.data.length > 0) {
        this.setState({ firstTab: numKey });
      } else {
        if (onTopTabChange) {
          onTopTabChange(tabKey).then(() => {
            this.setState({ firstTab: numKey });
          });
        }
      }
    }
  };

  handleSecondTabChange = (tabKey: string) => {
    const { dataSource, onTabChange } = this.props;
    const { firstTab } = this.state;

    let currentKey = Number(tabKey);

    let currentPanelData = dataSource[firstTab];
    let currentTabData = currentPanelData.data[currentKey];
    if (currentTabData && currentTabData.items.length > 0) {
      this.setState({ secondTab: currentKey });
    } else {
      if (onTabChange) {
        onTabChange(currentKey, firstTab).then(() => {
          this.setState({ secondTab: currentKey });
        })
      }
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
    const { onSearch } = this.props;
    let inputVal = e.target.value;
    this.setState({ inputVal });
    if (onSearch) {
      const debounceSearch = debounce(onSearch, 600);
      this.setState({ isSearch: true });
      debounceSearch(inputVal).then(res => {
        this.setState({ fetchList: res.data, isSearch: false });
      })
    }

  }

  handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).select();
    this.setState({ visible: true });
  }

  handleSearchFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
    this.setState({ visible: true });
  }

  handleSearchBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log(e);
  }

  renderItems = (items: Array<Item>) => {
    const { selectedItems, secondTab } = this.state;

    return (
      <div className="antd-pro-tab-items">
        <ul className="antd-pro-panel-list">
          <Row>
            {items.map((item: Item) => (
              <Col xs={12} md={8} lg={6}>
                <li
                  key={item.code}
                  className={ClassNames({
                    'panel-list-item-current':
                      selectedItems[secondTab] && selectedItems[secondTab].code == item.code,
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
    const { dataSource } = this.props;
    const { visible, firstTab, secondTab } = this.state;

    const contentCls = ClassNames('antd-pro-cascader-content-wrap', {
      'antd-pro-hidden': !visible
    });

    return (
      <div className={contentCls}>
        <Tabs
          animated={false}
          className="antd-pro-tab-content"
          activeKey={`${firstTab}`}
          onChange={this.handleTopTabChange}
        >
          {
            dataSource.map((item: PanelData, panelIdx: number) => (
              <TabPane key={`${panelIdx}`} tab={item.title}>
                <Tabs
                  animated={false}
                  className="antd-pro-tab-content"
                  activeKey={`${secondTab}`}
                  onChange={this.handleSecondTabChange}
                >
                  {
                    item.data.map((tabItem: TabData, tabIdx: number) => (
                      <TabPane
                        key={`${tabIdx}`}
                        className="andt-pro-tab-panel"
                        tab={
                          <span>
                            {tabItem.entry && <i className="tab-header-dot"></i>}
                            {tabItem.title}
                          </span>
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
    return (
      <div className="search-section">

      </div>
    )
  }

  render() {
    const { inputVal } = this.state;
    const { value, onItemClick, onChange, className, ...restProps } = this.props;

    const cascaderCls = ClassNames('antd-pro-cascader', className);
    return (
      <div
        ref={node => this.el = node}
        className={cascaderCls}
        {...restProps}
      >
        <Input
          value={inputVal}
          className="tab-search-bar"
          addonAfter={<Icon type="ellipsis" />}
          onChange={this.hanldeInputChange}
          onClick={this.handleInputClick}
        ></Input>
        {this.renderContent()}
      </div>
    );
  }
}
