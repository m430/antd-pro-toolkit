import React from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { OptionProps } from 'antd/lib/select';
const { Option } = Select;

export interface ScrollSelectProps {
  optionKey?: string;
  optionLabel?: string;
  optionCode?: string;
  showKey?: Boolean;
  pageSize?: number;
  value?: any;
  onSearch?: (params: any) => Promise<any>;
  onChange?: (val: string, option: React.ReactElement<OptionProps>) => void;
  renderOption?: (item: any) => React.ReactNode;
}

export default class ScrollSelect extends React.Component<ScrollSelectProps, any> {

  flag = true;

  static defaultProps: ScrollSelectProps = {
    optionKey: 'code',
    optionLabel: 'name',
    optionCode: 'code',
    showKey: false,
    pageSize: 10
  }

  constructor(props: ScrollSelectProps) {
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

  handleChange = (val: string, option: React.ReactElement<OptionProps>) => {
    const { onChange } = this.props;
    if (!val) {
      this.handleSearch();
    }
    if (onChange) {
      onChange(val, option);
    }
  };

  handleSearch = (value = '') => {
    const { onSearch, pageSize = 10 } = this.props;
    if (!this.flag) {
      return;
    }
    this.setState({ data: [], fetching: true, mode: 'multiple' });
    if (onSearch) {
      onSearch({ q: value, pageSize }).then(res => {
        if (res.errorCode === 0) {
          this.setState({
            data: res.data,
            pagination: res.pagination,
            searchVal: value,
            fetching: false,
            mode: '',
          });
          if (this.refs.scrollSelect) {
            (this.refs.scrollSelect as any).rcSelect.onPopupFocus();
          }
        }
      });
    }
  };

  handleBlur = (options: Array<React.ReactNode>) => {
    if (options.length == 0) {
      this.handleSearch();
    }
  };

  handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { onSearch, pageSize = 10 } = this.props;
    const { scrollTop, clientHeight, scrollHeight } = (e.target as HTMLDivElement);
    const { searchVal, pagination, data } = this.state;
    if (scrollTop + clientHeight == scrollHeight && data.length < pagination.totalResult) {
      if (onSearch) {
        onSearch({
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
    let options: Array<React.ReactNode>;
    if (value && value.key) {
      options = data
        .filter((item: any) => item[optionKey] !== value.key)
        .map(
          (item: any) =>
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
        (item: any) =>
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
