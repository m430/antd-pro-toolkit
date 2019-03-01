import React, { Component } from 'react';
import {
  queryCountries,
  queryCities
} from '@/services/geolocation';
import {
  Row,
  Col,
  Select,
  Input
} from 'antd';
import { maxLength } from '@/utils/form';

const { Option } = Select;

class AddressForm extends Component {
  constructor(props) {
    super(props);
    const value = props.value || {};
    this.state = {
      countryCode: value.countryCode,
      cityCode: value.cityCode,
      countries: [],
      cities: []
    }
  }

  componentDidMount() {
    this.isMount = true;
    const { countryCode, cityCode } = this.state;
    queryCountries({
      pageSize: 300
    }).then(res => {
      if (res.errorCode === 0) {
        if (this.isMount) {
          this.setState({
            countries: res.data
          })
        }
      }
    })
    if (countryCode && cityCode) {
      this.searchCities({ pageSize: 200 });
    }
  }

  componentWillUnmount() {
    this.isMount = false;
  }

  searchCities = ({ q = "", pageIndex = 1, pageSize = 200, countryCode = this.state.countryCode } = {}) => {
    queryCities({
      q,
      pageIndex,
      pageSize,
      countryCode
    }).then(res => {
      if (res.errorCode === 0) {
        if (this.isMount) {
          this.setState({
            cities: res.data
          });
        }
      }
    })
  }

  handleCountryChange = (value) => {
    queryCities({
      countryCode: value
    }).then(res => {
      if (res.errorCode === 0) {
        this.setState({
          countryCode: value,
          cities: res.data,
          cityCode: ''
        });
        this.triggerChange({ countryCode: value });
      }
    })
  }

  handleCityChange = (value) => {
    this.setState({
      cityCode: value,
    });
    this.triggerChange({ cityCode: value });
  }

  triggerChange = (changedValue) => {
    const { countryCode, cityCode } = this.state;
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, { countryCode, cityCode }, changedValue));
    }
  }

  render() {
    const { countryCode, cityCode, countries, cities } = this.state;
    return (
      <Row gutter={8} style={{ width: 310 }}>
        <Col span={12}>
          <Select
            showSearch
            optionFilterProp="children"
            value={countryCode}
            onChange={this.handleCountryChange}
            onInputKeyDown={(e) => maxLength(e, 30)}
            style={{ width: '100%' }}
            placeholder="国家"
            filterOption={(inputValue, option) => {
              let val = inputValue.trim();
              return option.props.children.includes(val.toUpperCase());
            }}
          >
            {countries.map(val => <Option key={val.code} value={val.code}>{`${val.name}(${val.code})`}</Option>)}
          </Select>
        </Col>
        <Col span={12}>
          {
            countryCode &&
            <Select
              showSearch
              optionFilterProp="children"
              onChange={this.handleCityChange}
              onSearch={(q) => this.searchCities({ q })}
              onInputKeyDown={(e) => maxLength(e, 30)}
              style={{ width: '100%' }}
              value={cityCode}
              placeholder="市"
              filterOption={(inputValue, option) => {
                let val = inputValue.trim();
                return option.props.children.includes(val.toUpperCase());
              }}
            >
              {cities.map(val => <Option key={val.code} value={val.code}>{val.name}</Option>)}
            </Select>}
        </Col>
      </Row>
    )
  }
}

export default AddressForm;