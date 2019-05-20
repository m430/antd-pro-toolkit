import React, { Component } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
const { Option } = Select;

export default class ScrollSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {},
      searchVal: '',
      fetching: false,
      mode: '',
    };
    this.handleSearch = debounce(this.handleSearch, 500);
  }

  flag = true;
  componentDidMount() {
    document.addEventListener('compositionstart', e => {
      this.flag = false;
      e.stopPropagation();
      e.preventDefault();
      return false;
    });
    document.addEventListener('compositionend', e => {
      this.flag = true;
      e.stopPropagation();
      e.preventDefault();
      return false;
    });
    this.handleSearch();
  }

  handleChange = (val, option) => {
    const { onChange } = this.props;
    if (!val) {
      this.handleSearch();
    }
    if (onChange) {
      onChange(val, option);
    }
    console.log(val, option);
  };

  handleSearch = (value = '') => {
    const { search, pageSize = 10 } = this.props;
    if (!this.flag) {
      return;
    }
    this.setState({ data: [], fetching: true, mode: 'multiple' });
    search({ q: value, pageSize }).then(res => {
      if (res.errorCode === 0) {
        this.setState({
          data: res.data,
          pagination: res.pagination,
          searchVal: value,
          fetching: false,
          mode: '',
        });
        if (this.refs.scrollSelect) {
          this.refs.scrollSelect.rcSelect.onPopupFocus();
        }
      }
    });
  };

  handleBlur = (options = []) => {
    if (options.length == 0) {
      this.handleSearch();
    }
  };

  handleScroll = e => {
    const { search, pageSize = 10 } = this.props;
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    const { searchVal, pagination, data } = this.state;
    if (scrollTop + clientHeight == scrollHeight && data.length < pagination.totalResult) {
      search({
        q: searchVal,
        pageIndex: pagination.currentPage + 1,
        pageSize,
      }).then(res => {
        if (res.errorCode === 0) {
          this.setState({
            data: [...data].concat(res.data),
            pagination: res.pagination,
          });
        }
      });
    }
  };

  render() {
    const {
      optionKey = 'code',
      optionLabel = 'name',
      optionCode = 'code',
      showKey = true,
      renderOption,
      value,
      ...restProps
    } = this.props;
    const { data, fetching, mode } = this.state;
    let options;
    if (value && value.key) {
      options = data
        .filter(item => item[optionKey] !== value.key)
        .map(
          item =>
            renderOption ? (
              renderOption(item)
            ) : (
              <Option key={item[optionKey]} value={item[optionKey]} {...item}>{`${
                item[optionLabel]
              }${showKey ? `(${item[optionCode]})` : ''}`}</Option>
            )
        );
      options = [<Option value={value.key}>{value.label}</Option>, ...options];
    } else {
      options = data.map(
        item =>
          renderOption ? (
            renderOption(item)
          ) : (
            <Option key={item[optionKey]} value={item[optionKey]} {...item}>{`${item[optionLabel]}${
              showKey ? `(${item[optionCode]})` : ''
            }`}</Option>
          )
      );
    }
    return (
      <Select
        ref="scrollSelect"
        labelInValue
        mode={mode}
        showSearch
        filterOption={false}
        onSearch={this.handleSearch}
        onBlur={() => this.handleBlur(options)}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        onPopupScroll={this.handleScroll}
        value={value}
        {...restProps}
        onChange={this.handleChange}
      >
        {options}
      </Select>
    );
  }
}
