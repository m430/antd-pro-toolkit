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

export interface TabData {
  title: string;
  level: number;
  entry: boolean;
  items: Array<Item>;
}

export interface CascaderProps {
  onItemClick?: (tabIdx: number, item: Item, ) => Promise<any>;
  onTabClick?: (index: number, level: number) => AxiosPromise<Result>;
  onSearch?: (val: string) => Promise<Result>;
  onChange?: Function;
  value?: Array<Item>;
  dataSource: Array<TabData>;
  className?: string;
  level: number;
}

export interface Item {
  code: string;
  name: string;
  level: number;
}

export interface CascaderState {
  currentTab: number;
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
      currentTab: 0,
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

  handleClickTab = (tabIdx: number) => {
    const { dataSource, onTabClick } = this.props;
    let currentData = dataSource[tabIdx];
    if (currentData) {
      if (currentData.items.length > 0) {
        this.setState({ currentTab: tabIdx });
      } else {
        if (onTabClick) {
          onTabClick(tabIdx, currentData.level).then(() => {
            this.setState({ currentTab: tabIdx });
          });
        }
      }
    }
  };

  handleClickItem = async (tabIdx: number, item: Item) => {
    const { onChange, onItemClick, dataSource } = this.props;
    let { selectedItems } = this.state;

    if (tabIdx === 0 || tabIdx === 1) {
      selectedItems = [];
      selectedItems.push(item);
    } else {
      selectedItems = selectedItems.slice(0, tabIdx - 1);
      selectedItems[tabIdx - 1] = item;
    }
    const displayVal = selectedItems.map((item: Item) => item.name).join('-');
    this.setState({ selectedItems, inputVal: displayVal });

    // 异步加载子项数据
    if (onItemClick) {
      onItemClick(tabIdx, item).then((data: number) => {
        this.setState({ currentTab: data });
        if (onChange) {
          onChange(selectedItems);
        }
      })
    } else { // 静态数据
      if (dataSource[tabIdx + 1] && dataSource[tabIdx + 1].items.length > 0) {
        this.setState({ currentTab: tabIdx + 1 });
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

  renderItems = (tabIdx: number) => {
    const { dataSource } = this.props;
    const { selectedItems } = this.state;

    return (
      <div className="antd-pro-tab-items">
        <ul className="antd-pro-panel-list">
          <Row>
            {dataSource[tabIdx].items.map((item: Item, itemIdx: number) => (
              <Col xs={12} md={8} lg={6}>
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

              </Col>
            ))}
          </Row>
        </ul>
      </div>
    )
  }

  renderContent = () => {
    const { dataSource } = this.props;
    const { visible, currentTab } = this.state;

    const contentCls = ClassNames('antd-pro-cascader-content-wrap', {
      'antd-pro-hidden': !visible
    });

    return (
      <div className={contentCls}>
        <Tabs
          animated={false}
          className="antd-pro-tab-content"
          activeKey={`${currentTab}`}
          onTabClick={this.handleClickTab}
        >
          {
            dataSource.map((item: TabData, tabIdx: number) => (
              <TabPane
                key={`${tabIdx}`}
                className="andt-pro-tab-panel"
                tab={
                  <span>
                    {dataSource[tabIdx].entry &&<i className="tab-header-dot"></i>}
                    {item.title}
                  </span>
                }
              >
                {this.renderItems(tabIdx)}
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
