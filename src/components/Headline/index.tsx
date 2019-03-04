import React, { Component, Fragment } from 'react'
import Link from 'umi/link';
import {
  Card,
  Icon
} from 'antd';

export default class Headline extends Component {

  render() {
    const { backRoute, title, backClick, ...restProps } = this.props;
    return (
      <Card {...restProps}>
        {
          backRoute ?
            <Link to={backRoute} style={{ color: 'rgba(0, 0, 0, 0.65)', fontWeight: 600, fontSize: 16 }} onClick={backClick}>
              <Icon type="left" style={{ marginRight: 10 }}></Icon>
              <span>{title}</span>
            </Link> :
            <span style={{ color: 'rgba(0, 0, 0, 0.65)', fontWeight: 600, fontSize: 16 }}>{title}</span>
        }
      </Card>
    )
  }
}
