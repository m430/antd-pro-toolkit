import React from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';
import './index.less';

export interface INumberInfoProps {
  title?: React.ReactNode | string;
  subTitle?: React.ReactNode | string;
  total?: React.ReactNode | string;
  status?: 'up' | 'down';
  theme?: string;
  suffix?: string;
  gap?: number;
  subTotal?: number;
  style?: React.CSSProperties;
}

export default class NumberInfo extends React.Component<INumberInfoProps, any> {
  render() {
    const { theme, title, subTitle, total, subTotal, status, suffix, gap, ...rest } = this.props;
    return (
      <div
        className={classNames("numberInfo", {
          [`numberInfo${theme}`]: theme,
        })}
        {...rest}
      >
        {title && (
          <div className="numberInfoTitle" title={typeof title === 'string' ? title : ''}>
            {title}
          </div>
        )}
        {subTitle && (
          <div
            className="numberInfoSubTitle"
            title={typeof subTitle === 'string' ? subTitle : ''}
          >
            {subTitle}
          </div>
        )}
        <div className="numberInfoValue" style={gap ? { marginTop: gap } : undefined}>
          <span>
            {total}
            {suffix && <em className="suffix">{suffix}</em>}
          </span>
          {(status || subTotal) && (
            <span className="subTotal">
              {subTotal}
              {status && <Icon type={`caret-${status}`} />}
            </span>
          )}
        </div>
      </div>
    )
  }
}