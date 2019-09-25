import React from 'react';
import { storiesOf } from '@storybook/react';
import TabCascader from '../components/TabCascader';
import Timeline from '../components/Timeline';
import DemoContainer from '../tools/DemoContainer';
import { Icon } from 'antd';
import doc from '../components/TabCascader/README.md';
import timelineDoc from '../components/Timeline/README.md';
import _ from 'lodash';
import { handleLogin } from '../utils/utils';
import axios from '../http';

class Demo1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          title: '内地',
          code: '0',
          maxLevel: 4,
          items: [
            {
              title: '常用市',
              level: 3,
              entry: false,
              items: [
                {
                  "id": 47,
                  "code": "110100",
                  "name": "北京市",
                  "parentCode": "110000",
                  "path": "CN/110000/110100",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "110000",
                  "areaName2": "北京市",
                  "areaCode3": "110100",
                  "areaName3": "北京市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 48,
                  "code": "120100",
                  "name": "天津市",
                  "parentCode": "120000",
                  "path": "CN/120000/120100",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "120000",
                  "areaName2": "天津市",
                  "areaCode3": "120100",
                  "areaName3": "天津市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 49,
                  "code": "130100",
                  "name": "石家庄市",
                  "parentCode": "130000",
                  "path": "CN/130000/130100",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "130000",
                  "areaName2": "河北省",
                  "areaCode3": "130100",
                  "areaName3": "石家庄市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 50,
                  "code": "130200",
                  "name": "唐山市",
                  "parentCode": "130000",
                  "path": "CN/130000/130200",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "130000",
                  "areaName2": "河北省",
                  "areaCode3": "130200",
                  "areaName3": "唐山市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 51,
                  "code": "130300",
                  "name": "秦皇岛市",
                  "parentCode": "130000",
                  "path": "CN/130000/130300",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "130000",
                  "areaName2": "河北省",
                  "areaCode3": "130300",
                  "areaName3": "秦皇岛市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 52,
                  "code": "130400",
                  "name": "邯郸市",
                  "parentCode": "130000",
                  "path": "CN/130000/130400",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "130000",
                  "areaName2": "河北省",
                  "areaCode3": "130400",
                  "areaName3": "邯郸市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 53,
                  "code": "130500",
                  "name": "邢台市",
                  "parentCode": "130000",
                  "path": "CN/130000/130500",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "130000",
                  "areaName2": "河北省",
                  "areaCode3": "130500",
                  "areaName3": "邢台市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 54,
                  "code": "130600",
                  "name": "保定市",
                  "parentCode": "130000",
                  "path": "CN/130000/130600",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "130000",
                  "areaName2": "河北省",
                  "areaCode3": "130600",
                  "areaName3": "保定市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 55,
                  "code": "130700",
                  "name": "张家口市",
                  "parentCode": "130000",
                  "path": "CN/130000/130700",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "130000",
                  "areaName2": "河北省",
                  "areaCode3": "130700",
                  "areaName3": "张家口市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 56,
                  "code": "130800",
                  "name": "承德市",
                  "parentCode": "130000",
                  "path": "CN/130000/130800",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "130000",
                  "areaName2": "河北省",
                  "areaCode3": "130800",
                  "areaName3": "承德市",
                  "areaCode4": null,
                  "areaName4": null
                }
              ]
            },
            {
              title: '省/直辖市',
              level: 2,
              entry: false,
              items: [
                {
                  "id": null,
                  "code": "130000",
                  "name": "河北省",
                  "parentCode": "CN",
                  "path": null,
                  "groupCode": "0",
                  "level": 2,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "130000",
                  "areaName2": "河北省",
                  "areaCode3": null,
                  "areaName3": null,
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": null,
                  "code": "140000",
                  "name": "山西省",
                  "parentCode": "CN",
                  "path": null,
                  "groupCode": "0",
                  "level": 2,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "140000",
                  "areaName2": "山西省",
                  "areaCode3": null,
                  "areaName3": null,
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": null,
                  "code": "150000",
                  "name": "内蒙古自治区",
                  "parentCode": "CN",
                  "path": null,
                  "groupCode": "0",
                  "level": 2,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "150000",
                  "areaName2": "内蒙古自治区",
                  "areaCode3": null,
                  "areaName3": null,
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": null,
                  "code": "210000",
                  "name": "辽宁省",
                  "parentCode": "CN",
                  "path": null,
                  "groupCode": "0",
                  "level": 2,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "210000",
                  "areaName2": "辽宁省",
                  "areaCode3": null,
                  "areaName3": null,
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": null,
                  "code": "220000",
                  "name": "吉林省",
                  "parentCode": "CN",
                  "path": null,
                  "groupCode": "0",
                  "level": 2,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "220000",
                  "areaName2": "吉林省",
                  "areaCode3": null,
                  "areaName3": null,
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": null,
                  "code": "230000",
                  "name": "黑龙江省",
                  "parentCode": "CN",
                  "path": null,
                  "groupCode": "0",
                  "level": 2,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "230000",
                  "areaName2": "黑龙江省",
                  "areaCode3": null,
                  "areaName3": null,
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": null,
                  "code": "320000",
                  "name": "江苏省",
                  "parentCode": "CN",
                  "path": null,
                  "groupCode": "0",
                  "level": 2,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "320000",
                  "areaName2": "江苏省",
                  "areaCode3": null,
                  "areaName3": null,
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 47,
                  "code": "110100",
                  "name": "北京市",
                  "parentCode": "110000",
                  "path": null,
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "110000",
                  "areaName2": "北京市",
                  "areaCode3": "110100",
                  "areaName3": "北京市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 48,
                  "code": "120100",
                  "name": "天津市",
                  "parentCode": "120000",
                  "path": null,
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "120000",
                  "areaName2": "天津市",
                  "areaCode3": "120100",
                  "areaName3": "天津市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 119,
                  "code": "310100",
                  "name": "上海市",
                  "parentCode": "310000",
                  "path": null,
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "310000",
                  "areaName2": "上海市",
                  "areaCode3": "310100",
                  "areaName3": "上海市",
                  "areaCode4": null,
                  "areaName4": null
                }
              ]
            }
          ]
        },
        {
          title: '港澳台',
          code: '0',
          maxLevel: 4,
          items: [
            {
              title: '常用市',
              level: 3,
              entry: false,
              items: [
                {
                  "id": 47,
                  "code": "110100",
                  "name": "北京市",
                  "parentCode": "110000",
                  "path": "CN/110000/110100",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "110000",
                  "areaName2": "北京市",
                  "areaCode3": "110100",
                  "areaName3": "北京市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 48,
                  "code": "120100",
                  "name": "天津市",
                  "parentCode": "120000",
                  "path": "CN/120000/120100",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "120000",
                  "areaName2": "天津市",
                  "areaCode3": "120100",
                  "areaName3": "天津市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 49,
                  "code": "130100",
                  "name": "石家庄市",
                  "parentCode": "130000",
                  "path": "CN/130000/130100",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "130000",
                  "areaName2": "河北省",
                  "areaCode3": "130100",
                  "areaName3": "石家庄市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 50,
                  "code": "130200",
                  "name": "唐山市",
                  "parentCode": "130000",
                  "path": "CN/130000/130200",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "130000",
                  "areaName2": "河北省",
                  "areaCode3": "130200",
                  "areaName3": "唐山市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 51,
                  "code": "130300",
                  "name": "秦皇岛市",
                  "parentCode": "130000",
                  "path": "CN/130000/130300",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "130000",
                  "areaName2": "河北省",
                  "areaCode3": "130300",
                  "areaName3": "秦皇岛市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 52,
                  "code": "130400",
                  "name": "邯郸市",
                  "parentCode": "130000",
                  "path": "CN/130000/130400",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "130000",
                  "areaName2": "河北省",
                  "areaCode3": "130400",
                  "areaName3": "邯郸市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 53,
                  "code": "130500",
                  "name": "邢台市",
                  "parentCode": "130000",
                  "path": "CN/130000/130500",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "130000",
                  "areaName2": "河北省",
                  "areaCode3": "130500",
                  "areaName3": "邢台市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 54,
                  "code": "130600",
                  "name": "保定市",
                  "parentCode": "130000",
                  "path": "CN/130000/130600",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "130000",
                  "areaName2": "河北省",
                  "areaCode3": "130600",
                  "areaName3": "保定市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 55,
                  "code": "130700",
                  "name": "张家口市",
                  "parentCode": "130000",
                  "path": "CN/130000/130700",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "130000",
                  "areaName2": "河北省",
                  "areaCode3": "130700",
                  "areaName3": "张家口市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 56,
                  "code": "130800",
                  "name": "承德市",
                  "parentCode": "130000",
                  "path": "CN/130000/130800",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "130000",
                  "areaName2": "河北省",
                  "areaCode3": "130800",
                  "areaName3": "承德市",
                  "areaCode4": null,
                  "areaName4": null
                }
              ]
            },
            {
              title: '省/直辖市',
              level: 2,
              entry: false,
              items: [
                {
                  "id": null,
                  "code": "130000",
                  "name": "河北省",
                  "parentCode": "CN",
                  "path": null,
                  "groupCode": "0",
                  "level": 2,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "130000",
                  "areaName2": "河北省",
                  "areaCode3": null,
                  "areaName3": null,
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": null,
                  "code": "140000",
                  "name": "山西省",
                  "parentCode": "CN",
                  "path": null,
                  "groupCode": "0",
                  "level": 2,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "140000",
                  "areaName2": "山西省",
                  "areaCode3": null,
                  "areaName3": null,
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": null,
                  "code": "150000",
                  "name": "内蒙古自治区",
                  "parentCode": "CN",
                  "path": null,
                  "groupCode": "0",
                  "level": 2,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "150000",
                  "areaName2": "内蒙古自治区",
                  "areaCode3": null,
                  "areaName3": null,
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": null,
                  "code": "210000",
                  "name": "辽宁省",
                  "parentCode": "CN",
                  "path": null,
                  "groupCode": "0",
                  "level": 2,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "210000",
                  "areaName2": "辽宁省",
                  "areaCode3": null,
                  "areaName3": null,
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": null,
                  "code": "220000",
                  "name": "吉林省",
                  "parentCode": "CN",
                  "path": null,
                  "groupCode": "0",
                  "level": 2,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "220000",
                  "areaName2": "吉林省",
                  "areaCode3": null,
                  "areaName3": null,
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": null,
                  "code": "230000",
                  "name": "黑龙江省",
                  "parentCode": "CN",
                  "path": null,
                  "groupCode": "0",
                  "level": 2,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "230000",
                  "areaName2": "黑龙江省",
                  "areaCode3": null,
                  "areaName3": null,
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": null,
                  "code": "320000",
                  "name": "江苏省",
                  "parentCode": "CN",
                  "path": null,
                  "groupCode": "0",
                  "level": 2,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "320000",
                  "areaName2": "江苏省",
                  "areaCode3": null,
                  "areaName3": null,
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 47,
                  "code": "110100",
                  "name": "北京市",
                  "parentCode": "110000",
                  "path": null,
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "110000",
                  "areaName2": "北京市",
                  "areaCode3": "110100",
                  "areaName3": "北京市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 48,
                  "code": "120100",
                  "name": "天津市",
                  "parentCode": "120000",
                  "path": null,
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "120000",
                  "areaName2": "天津市",
                  "areaCode3": "120100",
                  "areaName3": "天津市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 119,
                  "code": "310100",
                  "name": "上海市",
                  "parentCode": "310000",
                  "path": null,
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "310000",
                  "areaName2": "上海市",
                  "areaCode3": "310100",
                  "areaName3": "上海市",
                  "areaCode4": null,
                  "areaName4": null
                }
              ]
            }
          ]
        },
        {
          title: '国际',
          code: '0',
          maxLevel: 4,
          items: [
            {
              title: '海外',
              level: 3,
              entry: false,
              items: [
                {
                  "id": 47,
                  "code": "110100",
                  "name": "北京市",
                  "parentCode": "110000",
                  "path": "CN/110000/110100",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "110000",
                  "areaName2": "北京市",
                  "areaCode3": "110100",
                  "areaName3": "北京市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 48,
                  "code": "120100",
                  "name": "天津市",
                  "parentCode": "120000",
                  "path": "CN/120000/120100",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "120000",
                  "areaName2": "天津市",
                  "areaCode3": "120100",
                  "areaName3": "天津市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 49,
                  "code": "130100",
                  "name": "石家庄市",
                  "parentCode": "130000",
                  "path": "CN/130000/130100",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "130000",
                  "areaName2": "河北省",
                  "areaCode3": "130100",
                  "areaName3": "石家庄市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 50,
                  "code": "130200",
                  "name": "唐山市",
                  "parentCode": "130000",
                  "path": "CN/130000/130200",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "130000",
                  "areaName2": "河北省",
                  "areaCode3": "130200",
                  "areaName3": "唐山市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 51,
                  "code": "130300",
                  "name": "秦皇岛市",
                  "parentCode": "130000",
                  "path": "CN/130000/130300",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "130000",
                  "areaName2": "河北省",
                  "areaCode3": "130300",
                  "areaName3": "秦皇岛市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 52,
                  "code": "130400",
                  "name": "邯郸市",
                  "parentCode": "130000",
                  "path": "CN/130000/130400",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "130000",
                  "areaName2": "河北省",
                  "areaCode3": "130400",
                  "areaName3": "邯郸市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 53,
                  "code": "130500",
                  "name": "邢台市",
                  "parentCode": "130000",
                  "path": "CN/130000/130500",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "130000",
                  "areaName2": "河北省",
                  "areaCode3": "130500",
                  "areaName3": "邢台市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 54,
                  "code": "130600",
                  "name": "保定市",
                  "parentCode": "130000",
                  "path": "CN/130000/130600",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "130000",
                  "areaName2": "河北省",
                  "areaCode3": "130600",
                  "areaName3": "保定市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 55,
                  "code": "130700",
                  "name": "张家口市",
                  "parentCode": "130000",
                  "path": "CN/130000/130700",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "130000",
                  "areaName2": "河北省",
                  "areaCode3": "130700",
                  "areaName3": "张家口市",
                  "areaCode4": null,
                  "areaName4": null
                },
                {
                  "id": 56,
                  "code": "130800",
                  "name": "承德市",
                  "parentCode": "130000",
                  "path": "CN/130000/130800",
                  "groupCode": "0",
                  "level": 3,
                  "areaCode1": "CN",
                  "areaName1": "中国",
                  "areaCode2": "130000",
                  "areaName2": "河北省",
                  "areaCode3": "130800",
                  "areaName3": "承德市",
                  "areaCode4": null,
                  "areaName4": null
                }
              ]
            }
          ]
        }
      ]
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

storiesOf('Advance', module)
  .add('TabCascader',
    () => <Demo1 />,
    { notes: doc }
  )
  .add('Timeline',
    () => <TimelineDemo1 />,
    { notes: timelineDoc }
  )
  .add('Timeline-2',
    () => <TimelineDemo2 />,
    { notes: timelineDoc }
  )