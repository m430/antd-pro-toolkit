import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import CountDown from '../components/CountDown';
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

storiesOf('Basic', module)
  .add('CountDown',
    () => <Demo1 />,
  )