import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Cascader } from '../src';

storiesOf('Cascader', module)
  .add('default', () =>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 500 }}>
      <Cascader />
    </div>
  )
