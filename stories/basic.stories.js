import React from 'react';
import { storiesOf } from '@storybook/react';
import AvatarList from '../components/AvatarList';
import CountDown from '../components/CountDown';
import { Headline } from '../components';
import DemoContainer from '../tools/DemoContainer';

class Demo1 extends React.Component {

  render() {
    const targetTime = new Date().getTime() + 3900000;
    return (
      <DemoContainer>
        <CountDown style={{ fontSize: 20 }} target={targetTime} />
      </DemoContainer>
    )
  }
}
function Demo2() {
  return (
    <DemoContainer>
      <AvatarList size="large">
        <AvatarList.Item
          tips="Jake"
          src="https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png"
        />
        <AvatarList.Item
          tips="Andy"
          src="https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png"
        />
        <AvatarList.Item
          tips="Niko"
          src="https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png"
        />
      </AvatarList>
    </DemoContainer>
  )
}
function Demo3() {
  return (
    <DemoContainer style={{ width: 600 }}>
      <Headline title="返回" backRoute="/" />
    </DemoContainer>
  )
}

storiesOf('Basic', module)
  .add('CountDown', () => <Demo1 />)
  .add('AvatarList', () => <Demo2 />)
  .add('Headline', () => <Demo3 />)