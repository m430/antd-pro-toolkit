import React, { Component } from 'react';
import _ from 'lodash';
import axios from '../../http';
import { Icon } from 'antd';
import TabCascader from '../../components/TabCascader';

let initData = [
  {
    title: '常用市',
    level: 3,
    entry: false,
    items: []
  },
  {
    title: '省/直辖市',
    level: 2,
    entry: false,
    items: []
  }
];

let maxLevelMap = [4, 3, 1]

export default class AddressSelector extends Component {

  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      hotCities: [],
      dataSource: []
    }
  }

  componentDidMount() {
    this.initDataSource();
  }

  initDataSource = async () => {
    let resGroup = await axios.get('/api/v1/areas/search/group');
    let resFirst = await this.searchArea({ isHot: true });
    let groups = resGroup.data || [];
    // let groups = [
    //   {
    //     code: '0',
    //     name: '内地'
    //   },
    //   {
    //     code: '1',
    //     name: '港澳台',
    //   },
    //   {
    //     code: '2',
    //     name: '国际'
    //   }
    // ];
    let hotCities = resFirst.data || [];

    this.setState({ groups, hotCities })
    let dataSource = groups.map(g => {
      let dataItem = {
        title: g.name,
        maxLevel: maxLevelMap[Number(g.code)],
        code: g.code,
        data: []
      }
      if (g.code === '0') {
        dataItem.data = [
          {
            title: '常用市',
            level: 3,
            entry: false,
            items: hotCities
          },
          {
            title: '省/直辖市',
            level: 2,
            entry: false,
            items: []
          }
        ];
      } else if (g.code === '1') {
        dataItem.data = [
          {
            title: '港澳台',
            level: 2,
            entry: false,
            items: []
          }
        ]
      } else if (g.code === '2') {
        dataItem.data = [
          {
            title: '海外',
            level: 1,
            entry: false,
            items: []
          }
        ]
      }
      return dataItem;
    });
    this.setState({ dataSource });
  }

  searchArea = async ({
    isHot = false,
    pageSize = 999,
    ...rest
  } = {}) => {
    let res = await axios.get('/api/v1/areas/search', {
      params: {
        isHot,
        pageSize,
        ...rest
      }
    });
    return res;
  }

  handleSearch = async (val) => {
    let res = await this.searchArea({ content: val });
    return res.data;
  }

  handleTopTabChange = async (topKey) => {
    const { dataSource } = this.state;
    let tabData = dataSource[topKey].data;
    if (topKey != 0 && tabData.length > 0 && tabData[0].items.length === 0) {
      let res = await this.searchArea({ groupCode: topKey, level: tabData[0].level });
      tabData[0].items = res.data;
      dataSource[topKey].data = tabData;
      this.setState({ dataSource });
    }
  }

  handleTabChange = (key, topKey, item) => {
    const { dataSource } = this.state;
    let tabData = dataSource[topKey].data;
    let level = tabData[key].level;
    let query = { groupCode: topKey };
    if (key == 0) {
      query.isHot = true;
    } else {
      query.parentCode = item.parentCode;
    }
    return this.searchArea(query).then(res => {
      tabData[key].items = res.data;
      if (topKey == 0 && key > 0) {
        tabData = tabData.slice(0, key + 1);
      }
      dataSource[topKey].data = tabData;
      this.setState({ dataSource });
    });
  }

  buildDataSource = (key, topKey, item, data) => {
    let { dataSource } = this.state;
    let tabData = dataSource[topKey].data;
    let currentData = tabData[key];
    if (key == 0 && topKey == 0) {
      tabData = tabData.slice(0, key + 2);
      tabData[1].title = '省/直辖市';
      tabData[1].entry = false;
    } else {
      tabData = tabData.slice(0, key + 1);
      tabData[0].entry = false;
      tabData[key].title = item.name;
    }
    if (item.level !== 4) {
      tabData.push({
        title: '请选择',
        level: currentData.level + 1,
        items: data
      });
    }
    tabData[key].entry = true;

    dataSource[topKey].data = tabData;
    this.setState({ dataSource });
    return dataSource;
  }

  handleItemClick = (key, topKey, item) => {
    let { dataSource } = this.state;
    if (item.level === dataSource[topKey].maxLevel) {
      dataSource[topKey].data[key].title = item.name;
      dataSource[topKey].data[key].entry = true;
      this.setState({ dataSource });
      return Promise.resolve(dataSource[topKey].data.length - 1);
    }
    return this.searchArea({ parentCode: item.code }).then(res => {
      let newDataSource = this.buildDataSource(key, topKey, item, res.data);
    });
  }

  handleSearchItemClick = (item) => {
    let { dataSource } = this.state;
    let maxLevel = dataSource[item.groupCode].maxLevel;
    let groupData = dataSource[item.groupCode].data;
    let lastData = groupData[groupData.length - 1];
    let betweenLastLevel = item.level - lastData.level;
    const fillGroupData = async () => {
      for (let i = 0; i < groupData.length; i++) {
        let dataItem = groupData[i];
        if (item.groupCode == 0 && i == 0) {
          dataItem.entry = false;
          continue;
        }
        let level = dataItem.level;
        dataItem.code = level === item.level ? item.code : item[`areaCode${level}`];
        dataItem.title = level === item.level? item.name : item[`areaName${level}`];
        dataItem.groupCode = item.groupCode;
        dataItem.entry = true;
        dataItem.items = [];
      }
      let query = {};
      if (item.level !== maxLevel) {
        query.parentCode = item.code;
      } else {
        query.parentCode = item.parentCode; 
      }
      let res = await this.searchArea(query);
      if (item.level !== maxLevel) {
        groupData.push({
          title: '请选择',
          level: item.level + 1,
          entry: false,
          items: res.data
        });
      } else {
        groupData[groupData.length - 1].items = res.data;
      }

      return groupData;
    }
    if (betweenLastLevel > 0) { // 点击的级别大于tab最后一个的级别
      // 补齐level
      for (let i = lastData.level + 1; i <= item.level; i++) {
        groupData.push({ level: i });
      }
    } else {
      groupData = groupData.slice(0, groupData.length - Math.abs(betweenLastLevel));
    }
    return fillGroupData().then(gData => {
      dataSource[item.groupCode].data = groupData;
      this.setState({ dataSource });
    })
  }

  render() {
    const { dataSource } = this.state;
    return (
      <TabCascader
        onTabChange={this.handleTabChange}
        onTopTabChange={this.handleTopTabChange}
        onItemClick={this.handleItemClick}
        onSearchItemClick={this.handleSearchItemClick}
        onSearch={this.handleSearch}
        style={{ width: 500 }}
        dataSource={dataSource}
        placeholder="请选择地址"
        addonAfter={<Icon type="ellipsis" />}
        hint="温馨提示：支持中文、拼音或首字母，如：西安 或 XA"
      />
    )
  }
}
