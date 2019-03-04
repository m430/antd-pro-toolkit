import React, { Component } from 'react'
import { InputNumber } from 'antd';
import { maxLength } from '@/utils/form';

export default class CusInputNumber extends Component {

  constructor(props) {
    super(props);
  }

  handleKeyUp = (e) => {
    e.target.value = e.target.value.replace(/[^\d.]/g, "");
    e.target.value = e.target.value.replace(/\.{2,}/g, ".");
    e.target.value = e.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  }
  render() {
    return (
      <InputNumber onKeyUp={this.handleKeyUp}
        onInput={(e) => maxLength(e, 5)}
        {...this.props}
      />
    )
  }
}
