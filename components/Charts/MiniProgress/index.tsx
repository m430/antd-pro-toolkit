import React from 'react';
import { Tooltip } from 'antd';

import './index.less';

export interface IMiniProgressProps {
  target: number;
  color?: string;
  strokeWidth?: number;
  percent?: number;
  style?: React.CSSProperties;
}

export default class MiniProgress extends React.Component<IMiniProgressProps, any> {
  render() {
    const { target, color = 'rgb(19, 194, 194)', strokeWidth, percent } = this.props;
    return (
      <div className="miniProgress">
        <Tooltip title={`目标值: ${target}%`}>
          <div className="target" style={{ left: target ? `${target}%` : undefined }}>
            <span style={{ backgroundColor: color || undefined }} />
            <span style={{ backgroundColor: color || undefined }} />
          </div>
        </Tooltip>
        <div className="progressWrap">
          <div
            className="progress"
            style={{
              backgroundColor: color || undefined,
              width: percent ? `${percent}%` : undefined,
              height: strokeWidth || undefined,
            }}
          />
        </div>
      </div>
    )
  }
}