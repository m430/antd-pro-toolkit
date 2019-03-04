import React, { Component } from 'react'
import CusInputNumber from '../CusInputNumber';

export default class Range extends Component {

  constructor(props) {
    super(props);
    this.state = {
      start: props.value.start,
      end: props.value.end
    }
  }

  componentWillReceiveProps({ value }) {
    this.setState({
      start: value.start,
      end: value.end
    })
  }

  static validate(rule, value, callback) {
    const { start = '', end = '' } = value;
    if (typeof start !== 'number' && typeof end !== 'number') {
      callback();
    }
    if (!`${start}` || !`${end}`) {
      return callback(rule.message);
    }
    if (start >= end) {
      callback(rule.message);
    } else {
      callback();
    }
  }

  handleChangeStart = (val = '') => {
    const { onChange } = this.props;
    this.setState({
      start: val
    })
    if (onChange) {
      onChange(Object.assign({}, this.state, { start: val }))
    }
  }

  handleChangeEnd = (val = '') => {
    const { onChange } = this.props;
    this.setState({
      end: val
    })
    if (onChange) {
      onChange(Object.assign({}, this.state, { end: val }))
    }
  }

  render() {
    const { style, extra, width = 300, value, ...restProps } = this.props;
    const { start, end } = this.state;

    return (
      <div style={{ display: 'flex', alignItems: 'center', ...style }}>
        <div style={{ display: 'flex', alignItems: 'center', width }}>
          <CusInputNumber value={start} style={{ flex: 1 }} {...restProps} onChange={this.handleChangeStart} />
          <span style={{ margin: '0 5px' }}>-</span>
          <CusInputNumber value={end} style={{ flex: 1 }} {...restProps} onChange={this.handleChangeEnd} />
        </div>
        {extra}
      </div>
    )
  }
}
