import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import axios from '../http';

import { Cascader } from '../components';

function login() {
  return axios({
    method: 'POST',
    url: '/api/v1/auth/login',
    data: {
      username: 'cus1',
      password: "F781A7EA5252604FCDA90263F8FB3E8E"
    }
  })
}
function queryAreas(params) {
  return axios({
    method: 'GET',
    url: '/api/v1/base/areas',
    params: {
      countryCode: 'CN',
      parentId: 0,
      pageSize: 999,
      ...params
    }
  })
}

function handleChange(value) {
  console.log(value);
} 
login();

let data = [
  {code: "120000", name: "天津"},
  {code: "120100", name: "天津市"},
  {code: "120113", name: "北辰区"}
]

storiesOf('Cascader', module)
  .add('default', () =>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 500 }}>
      <Cascader load={queryAreas} onChange={handleChange} value={data} style={{ width: 300 }} />
    </div>
  )
