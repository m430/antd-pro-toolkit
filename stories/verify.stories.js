import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { SlideVerify } from '../components';
import { Button } from 'antd';
import DemoContainer from '../tools/DemoContainer';
import slideDoc from '../components/SlideVerify/README.md';

class Demo1 extends React.Component {

  handleClick = (e) => {
    this.refs.slide.resetSlide();
  }

  render() {
    return (
      <DemoContainer>
        <SlideVerify ref="slide" />
        <Button type="primary" shape="circle" icon="redo" style={{ marginLeft: 10}} size="large" onClick={this.handleClick} />
      </DemoContainer>
    )
  }
}

storiesOf('Verify', module)
  .add('SlideVerify',
    () => <Demo1 />,
    { notes: slideDoc }
  )