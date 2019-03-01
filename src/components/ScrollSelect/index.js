import React, { Component } from 'react';
import { Select } from 'antd';

const { Option } = Select;

export default class ScrollSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {},
      searchVal: ''
    }
  }

  componentDidMount() {
    this.handleSearch();
  }

  handleChange = (val) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(val);
    }
  }

  handleSearch = (value = "") => {
    const { search, pageSize = 10 } = this.props;

    search({ q: value, pageSize }).then(res => {
      if (res.errorCode === 0) {
        this.setState({
          data: res.data,
          pagination: res.pagination,
          searchVal: value
        })
      }
    })
  }

  handleScroll = (e) => {
    const { search } = this.props;
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    const { searchVal, pagination, data } = this.state;
    if (scrollTop + clientHeight == scrollHeight && data.length < pagination.totalResult) {
      search({
        q: searchVal,
        pageIndex: pagination.currentPage + 1
      }).then(res => {
        if (res.errorCode === 0) {
          this.setState({
            data: [...data].concat(res.data),
            pagination: res.pagination
          })
        }
      })
    }
  }

  render() {
    const { optionKey = "code", showKey = true, renderOption, ...restProps } = this.props;
    const { data } = this.state;
    return (
      <Select
        showSearch
        onChange={this.handleChange}
        onSearch={this.handleSearch}
        onPopupScroll={this.handleScroll}
        {...restProps}
      >
        {data.map(item =>
          renderOption ? renderOption(item) : <Option key={item[optionKey]} value={item[optionKey]}>{item.name}{showKey && `(${item.code})`}</Option>
        )}
      </Select>
    )
  }
}
