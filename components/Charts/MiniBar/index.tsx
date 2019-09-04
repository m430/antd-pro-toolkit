import React from 'react';
import { Chart, Tooltip, Geom, tooltipData } from 'bizcharts';
import autoHeight from '../autoHeight';
import '../index.less';

export interface IMiniBarProps {
  color?: string;
  height: number;
  data: Array<{
    x: number | string;
    y: number;
  }>;
  forceFit?: boolean;
  style?: React.CSSProperties;
}

class MiniBar extends React.Component<IMiniBarProps, any> {
  render() {
    const { height, forceFit = true, color = '#1890FF', data = [] } = this.props;

    const scale = {
      x: {
        type: 'cat',
      },
      y: {
        min: 0,
      },
    };

    const padding = [36, 5, 30, 5];

    const tooltip = [
      'x*y',
      (x: string, y: string) => ({
        name: x,
        value: y,
      }),
    ];

    // for tooltip not to be hide
    const chartHeight = height + 54;

    return (
      <div className="miniChart" style={{ height }}>
        <div className="chartContent">
          <Chart
            scale={scale}
            height={chartHeight}
            forceFit={forceFit}
            data={data}
            padding={padding as [number, number, number, number]}
          >
            <Tooltip showTitle={false} crosshairs={false} />
            <Geom type="interval" position="x*y" color={color} tooltip={tooltip as tooltipData} />
          </Chart>
        </div>
      </div>
    );
  }
}

export default autoHeight()(MiniBar);