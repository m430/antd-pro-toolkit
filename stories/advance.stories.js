import React from 'react';
import { storiesOf } from '@storybook/react';
import TabCascader from '../components/TabCascader';
import Uploader from '../components/Uploader'
import Timeline from '../components/Timeline';
import DemoContainer from '../tools/DemoContainer';
import { Icon } from 'antd';
import doc from '../components/TabCascader/README.md';
import uploaderDoc from '../components/Uploader/README.md';
import timelineDoc from '../components/Timeline/README.md';
import _ from 'lodash';
import { handleLogin } from '../utils/utils';
import axios from '../http';
import addressData from './mock/address';

class Demo1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: addressData
    }
  }
  render() {
    const { dataSource } = this.state;
    return (
      <DemoContainer>
        <TabCascader
          style={{ width: 500 }}
          placeholder="请选择地址..."
          hint="温馨提示：支持中文、拼音或首字母，如：西安 或 XA"
          addonAfter={<Icon type="ellipsis" />}
          dataSource={dataSource}
        />
      </DemoContainer>
    )
  }
}

class TimelineDemo1 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      waybills: [],
      trackInfo: [
        {
          date: "2019-06-11",
          week: "周二",
          trackingList: [
            {
              message: "订单已受理，待收货",
              messageTime: "15:05:15"
            }
          ]
        }, {
          date: "2019-07-11",
          week: "周三",
          trackingList: [
            {
              message: "货物到达【张旭仓库高新点】",
              messageTime: "15:05:15"
            }
          ]
        }, {
          date: "2019-07-30",
          week: "周三",
          trackingList: [
            {
              message: "货物到达【张旭仓库韦曲点】",
              messageTime: "15:05:15"
            }
          ]
        }
      ]
      ,
      token: ""
    }
  }

  componentDidMount() {
    // this.initOrderInfo();
  }

  handleSearchOrders = (params) => {
    const { token } = this.state;
    return axios.get('/api/v1/order/list', {
      ...params,
      headers: { "x-token": token }
    })
  }

  handleSearchOrderStatus = (waybillNo) => {
    const { token } = this.state;
    return axios.get(`/api/v1/order/track/${waybillNo}`, {
      headers: { "x-token": token }
    })
  }

  initOrderInfo = async () => {
    let resLogin = await handleLogin();
    if (resLogin.errorCode === 0) {
      const token = resLogin.data.token;
      this.setState({ token });
    }

    let resWaybills = await this.handleSearchOrders({ pageIndex: 1, pageSize: 8 });
    if ((resWaybills.errorCode === 0) && (resWaybills.data.length > 0)) {
      const waybills = resWaybills.data;
      this.setState({ waybills });

      const waybillNo = waybills[0].waybillNo;

      let resOrderStatus = await this.handleSearchOrderStatus(waybillNo);
      if (resOrderStatus.errorCode === 0) {
        const trackInfo = resOrderStatus.data;
        this.setState({ trackInfo });
      }
    }
  }

  render() {
    const { trackInfo } = this.state;
    const curStatus = "已签收"

    let steps = trackInfo.map((item) => {
      return item.trackingList.map((sub, index) => {
        if (index === 0) {
          return Object.assign({}, sub, { year: item.date, week: item.week, curStatus: curStatus })
        }
        return sub
      })
    }).reduce((total, current) => {
      return [...total, ...current]
    }, []);

    return (
      <DemoContainer>
        <Timeline
          steps={steps}
        />
      </DemoContainer>
    )
  }
}


class TimelineDemo2 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      waybills: [],
      trackInfo: [
        {
          date: "2019-06-11",
          week: "周二",
          trackingList: [
            {
              message: "货物到达【张旭仓库韦曲点】",
              messageDate: "2019-09-18",
              messageTime: "15:05:15"
            },
            {
              message: "订单已受理，待收货",
              messageDate: "2019-09-18",
              messageTime: "16:07:51"
            }
          ]
        }
      ],
      token: ""
    }
  }

  componentDidMount() {
    // this.initOrderInfo();
  }

  render() {
    const { trackInfo } = this.state;
    const curStatus = "已签收"

    let steps = trackInfo.map((item) => {
      return item.trackingList.map((sub, index) => {
        if (index === 0) {
          return Object.assign({}, sub, { year: item.date, week: item.week, curStatus: curStatus })
        }
        return sub
      })
    }).reduce((total, current) => {
      return [...total, ...current]
    }, []);

    return (
      <DemoContainer>
        <Timeline
          steps={steps}
        />
      </DemoContainer>
    )
  }
}

class TimelineDemo3 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      waybills: [],
      trackInfo: {},
      orderStatus: {},
      token: ""
    }
  }

  componentDidMount() {
    this.initOrderInfo();
  }

  handleSearchOrders = (params) => {
    const { token } = this.state;
    return axios.get('/api/v1/order/list', {
      ...params,
      headers: { "x-token": token }
    })
  }

  handleSearchOrderTrackingStatus = (waybillNo) => {
    const { token } = this.state;
    return axios.get(`/api/v1/order/track/${waybillNo}`, {
      headers: { "x-token": token }
    })
  }

  handleSearchOrderStatus = (waybillNo) => {
    const { token } = this.state;
    return axios.get(`/api/v1/order/${waybillNo}`, {
      headers: { "x-token": token }
    })
  }

  initOrderInfo = async () => {
    let resLogin = await handleLogin();
    if (resLogin.errorCode === 0) {
      const token = resLogin.data.token;
      this.setState({ token });
    }

    let resWaybills = await this.handleSearchOrders({ pageIndex: 1, pageSize: 8 });
    if ((resWaybills.errorCode === 0) && (resWaybills.data.length > 0)) {
      const waybills = resWaybills.data;
      this.setState({ waybills });

      const waybillNo = waybills[1].waybillNo;

      let resOrderTrackStatus = await this.handleSearchOrderTrackingStatus(waybillNo);
      if (resOrderTrackStatus.errorCode === 0) {
        const trackInfo = resOrderTrackStatus.data;
        this.setState({ trackInfo });
      }

      let resOrderStatus = await this.handleSearchOrderStatus(waybillNo);
      if (resOrderStatus.errorCode === 0) {
        const orderStatus = resOrderStatus.data;
        this.setState({ orderStatus });
      }
    }
  }

  renderTimeline(key, steps, trackKeys, index) {
    return (
      <div style={{ width: 600, paddingTop: 24 }} key={index}>
        {trackKeys.length > 1 && (
          <Divider orientation="left" style={{ width: 400 }}>子单号：{key}</Divider>
        )}
        <Timeline
          steps={steps}
        />
      </div>
    );
  }

  render() {
    const { trackInfo, orderStatus } = this.state;
    const curStatus = orderStatus.orderStatusName;

    let trackKeys = Object.keys(trackInfo);
    let subWaybillsList = Object.entries(trackInfo);

    const content = subWaybillsList.length > 0 && subWaybillsList.map(([key, val], index1) => {
      let steps = val.map((item) => {
        return item.trackingList.map((sub, index) => {
          if (index === 0) {
            return Object.assign({}, sub, { year: item.date, week: item.week, curStatus: curStatus })
          }
          return sub
        })
      }).reduce((total, current) => {
        return [...total, ...current]
      }, []);

      return this.renderTimeline(key, steps, trackKeys, index1);
    });

    return (
      <DemoContainer>
        {content}
      </DemoContainer>
    );
  }
}

class UploaderDemo extends React.Component {

  componentDidMount() {
    handleLogin();
  }

  render() {
    return (
      <DemoContainer>
        <Uploader uploadInfo={{ listType: "picture-card", action: "/api/v1/sys/files/upload", accept: '.jpg,.jpeg,.png,.zip,.rar,.doc,.docx,.xls,.xlsx,.pdf' }} />
      </DemoContainer>
    )
  }
}
storiesOf('Advance', module)
  .add('TabCascader',
    () => <Demo1 />,
    { notes: doc }
  )
  .add('Timeline-mock-1',
    () => <TimelineDemo1 />,
    { notes: timelineDoc }
  )
  .add('Timeline-mock-2',
    () => <TimelineDemo2 />,
    { notes: timelineDoc }
  )
  .add('Timeline-backend-1',
    () => <TimelineDemo3 />,
    { notes: timelineDoc }
  ).add('Upload',
    () => <UploaderDemo />,
    { notes: uploaderDoc }
  )
