import React from 'react';

import './index.less';

export interface IFieldProps {
  label: React.ReactNode;
  value: React.ReactNode;
  style?: React.CSSProperties;
}

export default class Field extends React.Component<IFieldProps, any> {

  render() {
    const { label, value, ...rest } = this.props;
    return (
      <div className="field" {...rest}>
        <span>{label}</span>
        <span>{value}</span>
      </div>
    )
  }
}