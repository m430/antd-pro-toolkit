import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import TabCascader from '../components/TabCascader';
import DemoContainer from '../tools/DemoContainer';

let dataSource = [
  [
    {
      code: 1,
      name: '陕西省'
    },
    {
      code: 2,
      name: '河北省'
    },
    {
      code: 3,
      name: '山东省'
    },
    {
      code: 4,
      name: '四川省'
    },
  ],
  [
    {
      code: 11,
      name: '西安市'
    },
    {
      code: 12,
      name: '铜川市'
    },
    {
      code: 13,
      name: '咸阳市'
    },
    {
      code: 14,
      name: '宝鸡市'
    },
  ]
]

class Demo1 extends React.Component {

  render() {
    return (
      <DemoContainer>
        <TabCascader dataSource={dataSource} />
      </DemoContainer>
    )
  }
}

storiesOf('Address', module)
  .add('TabCascader',
    () => <Demo1 />,
  )