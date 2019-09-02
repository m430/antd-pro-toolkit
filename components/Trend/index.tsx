import React from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';
import './style';

export interface ITrendProps {
  colorful?: boolean;
  flag: 'up' | 'down';
  style?: React.CSSProperties;
  reverseColor?: boolean;
  className?: string;
}

export default class Trend extends React.Component<ITrendProps, any> {
  render() {

    const { colorful = true, reverseColor = false, flag, children, className, ...rest } = this.props;
    const classString = classNames(
      "trendItem",
      {
        "trendItemGrey": !colorful,
        "reverseColor": reverseColor && colorful,
      },
      className
    );
    return (
      <div {...rest} className={classString} title={typeof children === 'string' ? children : ''}>
        <span className="value">{children}</span>
        {flag && (
          <span className={flag}>
            <Icon type={`caret-${flag}`} />
          </span>
        )}
      </div>
    );
  }
}