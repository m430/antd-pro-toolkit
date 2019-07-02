import React from 'react';
import { Tooltip } from 'antd';

import './index.less';

const MiniProgress = ({ target, color = 'rgb(19, 194, 194)', strokeWidth, percent }) => (
  <div className="miniProgress">
    <Tooltip title={`目标值: ${target}%`}>
      <div className="target" style={{ left: target ? `${target}%` : null }}>
        <span style={{ backgroundColor: color || null }} />
        <span style={{ backgroundColor: color || null }} />
      </div>
    </Tooltip>
    <div className="progressWrap">
      <div
        className="progress"
        style={{
          backgroundColor: color || null,
          width: percent ? `${percent}%` : null,
          height: strokeWidth || null,
        }}
      />
    </div>
  </div>
);

export default MiniProgress;
