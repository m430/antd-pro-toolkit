import React, { Component } from 'react'
import classNames from 'classnames';
import List from './list';
import Operation from './operation';
import Search from './search';
import 'antd/lib/transfer/style/index.less';

export default class Transfer extends Component {
  constructor(props) {
    super(props);
    const { selectedKeys = [], targetItems = [] } = props;
    this.state = {
      leftFilter: '',
      rightFilter: '',
      sourceSelectedItems: selectedKeys.filter(key => targetItems.indexOf(key) === -1),
      targetSelectedItems: selectedKeys.filter(key => targetItems.indexOf(key) > -1),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { sourceSelectedItems, targetSelectedItems } = this.state;

    if (
      nextProps.targetItems !== this.props.targetItems ||
      nextProps.dataSource !== this.props.dataSource
    ) {
      // clear cached separated dataSource
      this.separatedDataSource = null;

      if (!nextProps.selectedKeys) {
        // clear key no longer existed
        // clear checkedKeys according to targetItems
        const { dataSource, targetItems = [] } = nextProps;

        const newSourceSelectedItems = [];
        const newTargetSelectedItems = [];
        dataSource.forEach(({ key }) => {
          let sourceSelectedIndex = sourceSelectedItems.findIndex(item => key === item.key);
          let targetSelectedIndex = targetSelectedItems.findIndex(item => key === item.key);
          let targetItemIndex = targetItems.findIndex(item => key === item.key);
          if (sourceSelectedIndex > -1 && targetItemIndex == -1) {
            newSourceSelectedItems.push(key);
          }
          if (targetSelectedIndex > -1 && targetItemIndex > -1) {
            newTargetSelectedItems.push(key);
          }
        });
        this.setState({
          sourceSelectedItems: newSourceSelectedItems,
          targetSelectedItems: newTargetSelectedItems,
        });
      }
    }

    if (nextProps.selectedKeys) {
      const targetItems = nextProps.targetItems || [];
      this.setState({
        sourceSelectedItems: nextProps.selectedKeys.filter(key => !targetItems.includes(key)),
        targetSelectedItems: nextProps.selectedKeys.filter(key => targetItems.includes(key)),
      });
    }
  }

  separateDataSource(props) {
    if (this.separatedDataSource) {
      return this.separatedDataSource;
    }

    const { dataSource, rowKey, targetItems = [] } = props;

    let leftDataSource = [];
    let rightDataSource = [...targetItems];
    leftDataSource = dataSource.filter(record => {
      if (rowKey) {
        record.key = rowKey(record);
      }

      const indexOfKey = targetItems.findIndex(item => item.key === record.key);
      return indexOfKey === -1;
    });

    this.separatedDataSource = {
      leftDataSource,
      rightDataSource,
    };

    return this.separatedDataSource;
  }

  moveTo = (direction) => {
    const { targetItems = [], dataSource = [], onChange } = this.props;
    const { sourceSelectedItems, targetSelectedItems } = this.state;
    const moveItems = direction === 'right' ? sourceSelectedItems : targetSelectedItems;
    // filter the disabled options
    const newMoveItems = moveItems.filter(
      (item) => !dataSource.some(data => !!(item.key === data.key && data.disabled)),
    );
    // move items to target box
    const newTargetItems =
      direction === 'right'
        ? newMoveItems.concat(targetItems)
        : targetItems.filter(targetItem => newMoveItems.findIndex(item => item.key === targetItem.key) === -1);

    // empty checked keys
    const oppositeDirection = direction === 'right' ? 'left' : 'right';
    this.setState({
      [this.getSelectedItemsName(oppositeDirection)]: [],
    });
    this.handleSelectChange(oppositeDirection, []);

    if (onChange) {
      onChange(newTargetItems, direction, newMoveItems);
    }
  };

  moveToLeft = () => this.moveTo('left');
  moveToRight = () => this.moveTo('right');

  handleSelectChange(direction, holder) {
    const { sourceSelectedItems, targetSelectedItems } = this.state;
    const onSelectChange = this.props.onSelectChange;
    if (!onSelectChange) {
      return;
    }

    if (direction === 'left') {
      onSelectChange(holder, targetSelectedItems);
    } else {
      onSelectChange(sourceSelectedItems, holder);
    }
  }

  handleSelectAll = (
    direction,
    filteredDataSource,
    checkAll,
  ) => {
    const originalSelectedItems = this.state[this.getSelectedItemsName(direction)] || [];
    const currentItems = filteredDataSource;
    // Only operate current keys from original selected keys
    const newItems1 = originalSelectedItems.filter((item) => currentItems.findIndex(cItem => cItem.key === item.key) === -1);
    const newItems2 = [...originalSelectedItems];
    currentItems.forEach(item => {
      if (newItems2.findIndex(item2 => item2.key === item.key) === -1) {
        newItems2.push(item);
      }
    });
    const holder = checkAll ? newItems1 : newItems2;
    this.handleSelectChange(direction, holder);

    if (!this.props.selectedKeys) {
      this.setState({
        [this.getSelectedItemsName(direction)]: holder,
      });
    }
  };

  handleLeftSelectAll = (filteredDataSource, checkAll) =>
    this.handleSelectAll('left', filteredDataSource, checkAll);
  handleRightSelectAll = (filteredDataSource, checkAll) =>
    this.handleSelectAll('right', filteredDataSource, checkAll);

  handleFilter = (direction, e) => {
    const { onSearchChange, onSearch } = this.props;
    const value = e.target.value;
    this.setState({
      // add filter
      [`${direction}Filter`]: value,
    });
    if (onSearchChange) {
      onSearchChange(direction, e);
    }
    if (onSearch) {
      onSearch(direction, value);
    }
  };

  handleLeftFilter = (e) => this.handleFilter('left', e);
  handleRightFilter = (e) => this.handleFilter('right', e);

  handleClear = (direction) => {
    const { onSearch } = this.props;
    this.setState({
      [`${direction}Filter`]: '',
    });
    if (onSearch) {
      onSearch(direction, '');
    }
  };

  handleLeftClear = () => this.handleClear('left');
  handleRightClear = () => this.handleClear('right');

  handleSelect = (direction, selectedItem, checked) => {
    const { sourceSelectedItems, targetSelectedItems } = this.state;
    const holder = direction === 'left' ? [...sourceSelectedItems] : [...targetSelectedItems];
    const index = holder.findIndex(h => h.key === selectedItem.key);
    if (index > -1) {
      holder.splice(index, 1);
    }
    if (checked) {
      holder.push(selectedItem);
    }
    this.handleSelectChange(direction, holder);

    if (!this.props.selectedKeys) {
      this.setState({
        [this.getSelectedItemsName(direction)]: holder,
      });
    }
  };

  handleLeftSelect = (selectedItem, checked) => {
    return this.handleSelect('left', selectedItem, checked);
  };

  handleRightSelect = (selectedItem, checked) => {
    return this.handleSelect('right', selectedItem, checked);
  };

  handleScroll = (direction, e) => {
    const { onScroll } = this.props;
    if (onScroll) {
      onScroll(direction, e);
    }
  };

  handleLeftScroll = (e) => this.handleScroll('left', e);
  handleRightScroll = (e) => this.handleScroll('right', e);

  getTitles() {
    const { props } = this;
    if (props.titles) {
      return props.titles;
    }
  }

  getSelectedItemsName(direction) {
    return direction === 'left' ? 'sourceSelectedItems' : 'targetSelectedItems';
  }

  render() {
    const {
      prefixCls = 'ant-transfer',
      className,
      disabled,
      operations = [],
      showSearch,
      body,
      footer,
      style,
      listStyle,
      operationStyle,
      filterOption,
      render,
      lazy,
    } = this.props;
    const { leftFilter, rightFilter, sourceSelectedItems, targetSelectedItems } = this.state;

    const { leftDataSource, rightDataSource } = this.separateDataSource(this.props);
    const leftActive = targetSelectedItems.length > 0;
    const rightActive = sourceSelectedItems.length > 0;

    const cls = classNames(className, prefixCls, disabled && `${prefixCls}-disabled`);

    const titles = this.getTitles();
    return (
      <div className={cls} style={style}>
        <List
          prefixCls={`${prefixCls}-list`}
          titleText={titles[0]}
          dataSource={leftDataSource}
          filter={leftFilter}
          filterOption={filterOption}
          style={listStyle}
          checkedItems={sourceSelectedItems}
          handleFilter={this.handleLeftFilter}
          handleClear={this.handleLeftClear}
          handleSelect={this.handleLeftSelect}
          handleSelectAll={this.handleLeftSelectAll}
          render={render}
          showSearch={showSearch}
          body={body}
          footer={footer}
          lazy={lazy}
          onScroll={this.handleLeftScroll}
          disabled={disabled}
        />
        <Operation
          className={`${prefixCls}-operation`}
          rightActive={rightActive}
          rightArrowText={operations[0]}
          moveToRight={this.moveToRight}
          leftActive={leftActive}
          leftArrowText={operations[1]}
          moveToLeft={this.moveToLeft}
          style={operationStyle}
          disabled={disabled}
        />
        <List
          prefixCls={`${prefixCls}-list`}
          titleText={titles[1]}
          dataSource={rightDataSource}
          filter={rightFilter}
          filterOption={filterOption}
          style={listStyle}
          checkedItems={targetSelectedItems}
          handleFilter={this.handleRightFilter}
          handleClear={this.handleRightClear}
          handleSelect={this.handleRightSelect}
          handleSelectAll={this.handleRightSelectAll}
          render={render}
          showSearch={showSearch}
          body={body}
          footer={footer}
          lazy={lazy}
          onScroll={this.handleRightScroll}
          disabled={disabled}
        />
      </div>
    );
  };
}
