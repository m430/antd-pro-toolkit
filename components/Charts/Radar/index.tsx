import React from 'react';
import { LegendItem, Chart, Tooltip, Axis, Coord, Geom } from 'bizcharts';
import { Row, Col } from 'antd';
import autoHeight from '../autoHeight';
import './index.less';

/* eslint react/no-danger:0 */
export interface IRadarProps {
  title?: React.ReactNode;
  height: number;
  padding?: [number, number, number, number];
  hasLegend?: boolean;
  data: Array<{
    name: string;
    label: string;
    value: string;
  }>;
  style?: React.CSSProperties;
  forceFit?: boolean;
  tickCount?: number;
  animate?: boolean;
  colors?: Array<any>;
}

interface IRadarState {
  legendData: Array<LegendItem>
}

class Radar extends React.Component<IRadarProps, IRadarState> {

  constructor(props: IRadarProps) {
    super(props);
    this.state = {
      legendData: []
    }
  }

  chart: any;
  node: HTMLDivElement;

  componentDidMount() {
    this.getLegendData();
  }

  componentDidUpdate(preProps: IRadarProps) {
    const { data } = this.props;
    if (data !== preProps.data) {
      this.getLegendData();
    }
  }

  getG2Instance = (chart: G2.Chart) => {
    this.chart = chart;
  };

  // for custom lengend view
  getLegendData = () => {
    if (!this.chart) return;
    const geom = this.chart.getAllGeoms()[0]; // 获取所有的图形
    if (!geom) return;
    const items = geom.get('dataArray') || []; // 获取图形对应的

    const legendData = items.map((item: Array<any>) => {
      // eslint-disable-next-line
      const origins = item.map((t: any) => t._origin);
      const result = {
        name: origins[0].name,
        color: item[0].color,
        checked: true,
        value: origins.reduce((p, n) => p + n.value, 0),
      };

      return result;
    });

    this.setState({
      legendData,
    });
  };

  handleRef = (n: HTMLDivElement) => {
    this.node = n;
  };

  handleLegendClick = (item: LegendItem, i: number) => {
    const newItem = item;
    newItem.checked = !newItem.checked;

    const { legendData } = this.state;
    if (legendData) {
      legendData[i] = newItem;
  
      const filteredLegendData = legendData.filter((l: LegendItem) => l.checked).map((l: LegendItem) => l.name);
  
      if (this.chart) {
        this.chart.filter('name', (val: string) => filteredLegendData.indexOf(val) > -1);
        this.chart.repaint();
      }
  
      this.setState({
        legendData,
      });
    }
  };

  render() {
    const defaultColors = [
      '#1890FF',
      '#FACC14',
      '#2FC25B',
      '#8543E0',
      '#F04864',
      '#13C2C2',
      '#fa8c16',
      '#a0d911',
    ];

    const {
      data = [],
      height = 0,
      title,
      hasLegend = false,
      forceFit = true,
      tickCount = 4,
      padding = [35, 30, 16, 30],
      animate = true,
      colors = defaultColors,
    } = this.props;

    const { legendData } = this.state;

    const scale = {
      value: {
        min: 0,
        tickCount,
      },
    };

    const chartHeight = height - (hasLegend ? 80 : 22);

    return (
      <div className="radar" style={{ height }}>
        {title && <h4>{title}</h4>}
        <Chart
          scale={scale}
          height={chartHeight}
          forceFit={forceFit}
          data={data}
          padding={padding as [number, number, number, number]}
          animate={animate}
          onGetG2Instance={this.getG2Instance}
        >
          <Tooltip />
          <Coord type="polar" />
          <Axis
            name="label"
            line={null}
            tickLine={null}
            grid={{
              lineStyle: {
                lineDash: undefined,
              },
              hideFirstLine: false,
            }}
          />
          <Axis
            name="value"
            grid={{
              type: 'polygon',
              lineStyle: {
                lineDash: undefined,
              },
            }}
          />
          <Geom type="line" position="label*value" color={['name', colors]} size={1} />
          <Geom
            type="point"
            position="label*value"
            color={['name', colors]}
            shape="circle"
            size={3}
          />
        </Chart>
        {hasLegend && (
          <Row className="legend">
            {legendData.map((item: LegendItem, i) => (
              <Col
                span={24 / legendData.length}
                key={item.name}
                onClick={() => this.handleLegendClick(item, i)}
              >
                <div className="legendItem">
                  <p>
                    <span
                      className="dot"
                      style={{
                        backgroundColor: !item.checked ? '#aaa' : item.color,
                      }}
                    />
                    <span>{item.name}</span>
                  </p>
                  <h6>{item.value}</h6>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </div>
    );
  }
}

export default autoHeight()(Radar);