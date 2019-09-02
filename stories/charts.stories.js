import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import numeral from 'numeral';
import { Icon, Tooltip } from 'antd';

import { Charts, NumberInfo, Trend } from '../components';

const {
  yuan,
  ChartCard,
  Field,
  MiniArea,
  MiniBar,
  MiniProgress,
  Pie,
  Bar,
  Radar,
  Gauge,
  WaterWave,
  TagCloud,
  TimelineChart
} = Charts;

const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 100) + 10,
  });
}

const salesPieData = [
  {
    x: '家用电器',
    y: 4544,
  },
  {
    x: '食用酒水',
    y: 3321,
  },
  {
    x: '个护健康',
    y: 3113,
  },
  {
    x: '服饰箱包',
    y: 2341,
  },
  {
    x: '母婴产品',
    y: 1231,
  },
  {
    x: '其他',
    y: 1231,
  },
];

const radarOriginData = [
  {
    name: '个人',
    ref: 10,
    koubei: 8,
    output: 4,
    contribute: 5,
    hot: 7,
  },
  {
    name: '团队',
    ref: 3,
    koubei: 9,
    output: 6,
    contribute: 3,
    hot: 1,
  },
  {
    name: '部门',
    ref: 4,
    koubei: 1,
    output: 6,
    contribute: 5,
    hot: 7,
  },
];
const radarData = [];
const radarTitleMap = {
  ref: '引用',
  koubei: '口碑',
  output: '产量',
  contribute: '贡献',
  hot: '热度',
};
radarOriginData.forEach(item => {
  Object.keys(item).forEach(key => {
    if (key !== 'name') {
      radarData.push({
        name: item.name,
        label: radarTitleMap[key],
        value: item[key],
      });
    }
  });
});

const tags = [];
for (let i = 0; i < 50; i += 1) {
  tags.push({
    name: `TagClout-Title-${i}`,
    value: Math.floor(Math.random() * 50) + 20,
  });
}

const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}

const chartData = [];
for (let i = 0; i < 20; i += 1) {
  chartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * i,
    y1: Math.floor(Math.random() * 100) + 1000,
    y2: Math.floor(Math.random() * 100) + 10,
  });
}

storiesOf('Charts', module)
  .add('MiniArea', () =>
    <ChartCard title="搜索用户数量" total={numeral(8846).format('0,0')} contentHeight={134}>
      <NumberInfo
        subTitle={<span>本周访问</span>}
        total={numeral(12321).format('0,0')}
        status="up"
        subTotal={17.1}
      />
      <MiniArea line height={45} data={visitData} />
    </ChartCard>
  )
  .add('MiniBar', () =>
    <ChartCard
      title="访问量"
      action={
        <Tooltip title="指标说明">
          <Icon type="info-circle-o" />
        </Tooltip>
      }
      total={numeral(8846).format('0,0')}
      footer={<Field label="日访问量" value={numeral(1234).format('0,0')} />}
      contentHeight={46}
    >
      <MiniBar height={46} data={visitData} />
    </ChartCard>
  )
  .add('MiniProgress', () =>
    <ChartCard
      title="线上购物转化率"
      action={
        <Tooltip title="指标说明">
          <Icon type="info-circle-o" />
        </Tooltip>
      }
      total="78%"
      footer={
        <div>
          <span>
            周同比
              <Trend flag="up" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>
              12%
              </Trend>
          </span>
          <span style={{ marginLeft: 16 }}>
            日环比
              <Trend flag="down" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>
              11%
              </Trend>
          </span>
        </div>
      }
      contentHeight={46}
    >
      <MiniProgress percent={78} strokeWidth={8} target={80} />
    </ChartCard>
  )
  .add('Pie', () =>
    <Pie
      hasLegend
      title="销售额"
      subTitle="销售额"
      total={() => (
        <span
          dangerouslySetInnerHTML={{
            __html: yuan(salesPieData.reduce((pre, now) => now.y + pre, 0)),
          }}
        />
      )}
      data={salesPieData}
      valueFormat={val => <span dangerouslySetInnerHTML={{ __html: yuan(val) }} />}
      height={294}
    />
  )
  .add('Bar', () => <Bar height={200} title="销售额趋势" data={salesData} />)
  .add('Gauge', () => <Gauge title="核销率" height={164} percent={87} />)
  .add('Radar', () =>
    <ChartCard title="数据比例">
      <Radar hasLegend height={286} data={radarData} />
    </ChartCard>
  )
  .add('WaterWave', () =>
    <div style={{ textAlign: 'center' }}>
      <WaterWave height={161} title="补贴资金剩余" percent={34} />
    </div>
  )
  .add('TagCloud', () => <TagCloud data={tags} height={200} />)
  .add('TimelineChart', () => <TimelineChart height={200} data={chartData} titleMap={{ y1: '客流量', y2: '支付笔数' }} />)