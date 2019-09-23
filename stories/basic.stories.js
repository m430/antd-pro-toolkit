import React from 'react';
import { storiesOf } from '@storybook/react';
import AvatarList from '../components/AvatarList';
import CountDown from '../components/CountDown';
import Ellipsis from '../components/Ellipsis';
import ellipsisDoc from '../components/Ellipsis/README.md';
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

class Demo4 extends React.Component {
  render() {
    return (
      <DemoContainer>
        <Ellipsis tooltip length={10} fullWidthRecognition >
          "123456789012345678901234567890"
        </Ellipsis>
      </DemoContainer>
    )
  }
}

storiesOf('Basic', module)
  .add('CountDown', () => <Demo1 />)
  .add('AvatarList', () => <Demo2 />)
  .add('Headline', () => <Demo3 />)
  .add('Ellipsis', () => <Demo4 />, { notes: ellipsisDoc })