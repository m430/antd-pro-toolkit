import React from 'react';
import { storiesOf } from '@storybook/react';
import AddressSelector from './biz-components/AddressSelector'
import DemoContainer from '../tools/DemoContainer';
import doc from '../components/TabCascader/README.md';
import _ from 'lodash';

class Demo1 extends React.Component {
  
  render() {
    return (
      <DemoContainer>
        <AddressSelector />
      </DemoContainer>
    )
  }
}
storiesOf('Address', module)
  .add('TabCascader',
    () => <Demo1 />,
    { notes: doc }
  )