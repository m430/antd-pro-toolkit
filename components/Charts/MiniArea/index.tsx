import React from 'react';
import { Chart, Axis, Tooltip, Geom, tooltipData } from 'bizcharts';
import autoHeight from '../autoHeight';
import '../index.less';


export interface IAxis {
  title: any;
  line: any;
  gridAlign: any;
  labels: any;
  tickLine: any;
  grid: any;
}

export interface IMiniAreaProps {
  color?: string;
  height: number;
  borderColor?: string;
  line?: boolean;
  animate?: boolean;
  xAxis?: IAxis;
  yAxis?: IAxis;
  scale?: any;
  borderWidth?: number;
  forceFit?: boolean;
  data: Array<{
    x: number | string;
    y: number;
  }>;
}

class MiniArea extends React.Component<IMiniAreaProps, any> {
  render() {
    const {
      height,
      data = [],
      forceFit = true,
      color = 'rgba(24, 144, 255, 0.2)',
      borderColor = '#1089ff',
      scale = {},
      borderWidth = 2,
      line,
      xAxis,
      yAxis,
      animate = true,
    } = this.props;

    const padding = [36, 5, 30, 5];

    const scaleProps = {
      x: {
        type: 'cat',
        range: [0, 1],
        ...scale.x,
      },
      y: {
        min: 0,
        ...scale.y,
      },
    };

    const tooltip = [
      'x*y',
      (x: string, y: string) => ({
        name: x,
        value: y,
      }),
    ];

    const chartHeight = height + 54;

    

    return (
      <div className="miniChart" style={{ height }}>
        <div className="chartContent">
          {height > 0 && (
            <Chart
              animate={animate}
              scale={scaleProps}
              height={chartHeight}
              forceFit={forceFit}
              data={data}
              padding={padding as [number, number, number, number]}
            >
              <Axis
                key="axis-x"
                name="x"
                label={undefined}
                {...xAxis}
              />
              <Axis
                key="axis-y"
                name="y"
                {...yAxis}
              />
              <Tooltip showTitle={false} crosshairs={false} />
              <Geom
                type="area"
                position="x*y"
                color={color}
                tooltip={tooltip as tooltipData}
                shape="smooth"
                style={{
                  fillOpacity: 1,
                }}
              />
              {line ? (
                <Geom
                  type="line"
                  position="x*y"
                  shape="smooth"
                  color={borderColor}
                  size={borderWidth}
                  tooltip={false}
                />
              ) : (
                <span style={{ display: 'none' }} />
              )}
            </Chart>
          )}
        </div>
      </div>
    );
  }
}

export default autoHeight()(MiniArea);