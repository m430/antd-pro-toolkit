import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import TabCascader from '../components/TabCascader';
import AddressSelector from './biz-components/AddressSelector'
import DemoContainer from '../tools/DemoContainer';
import doc from '../components/TabCascader/README.md';
import { Icon } from 'antd';
import _ from 'lodash';

// level=3 常用市
let hotCities = [
  {
    "code": "A440300000",
    "rateCode": "755",
    "level": 3,
    "countryCode": "A000086000",
    "name": "深圳市",
    "provinceCode": "A440000000",
    "provinceRateCode": "440",
    "provinceName": "广东省",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 1
  },
  {
    "code": "A310000000",
    "rateCode": "021",
    "level": 2,
    "countryCode": "A000086000",
    "name": "上海市",
    "provinceCode": "A310000000",
    "provinceRateCode": "021",
    "provinceName": "上海市",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 2
  },
  {
    "code": "A440100000",
    "rateCode": "020",
    "level": 3,
    "countryCode": "A000086000",
    "name": "广州市",
    "provinceCode": "A440000000",
    "provinceRateCode": "440",
    "provinceName": "广东省",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 3
  },
  {
    "code": "A110000000",
    "rateCode": "010",
    "level": 2,
    "countryCode": "A000086000",
    "name": "北京市",
    "provinceCode": "A110000000",
    "provinceRateCode": "010",
    "provinceName": "北京市",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 4
  },
  {
    "code": "A330100000",
    "rateCode": "571",
    "level": 3,
    "countryCode": "A000086000",
    "name": "杭州市",
    "provinceCode": "A330000000",
    "provinceRateCode": "330",
    "provinceName": "浙江省",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 5
  },
  {
    "code": "A441900000",
    "rateCode": "769",
    "level": 3,
    "countryCode": "A000086000",
    "name": "东莞市",
    "provinceCode": "A440000000",
    "provinceRateCode": "440",
    "provinceName": "广东省",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 6
  },
  {
    "code": "A320500000",
    "rateCode": "512",
    "level": 3,
    "countryCode": "A000086000",
    "name": "苏州市",
    "provinceCode": "A320000000",
    "provinceRateCode": "320",
    "provinceName": "江苏省",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 7
  },
  {
    "code": "A330400000",
    "rateCode": "573",
    "level": 3,
    "countryCode": "A000086000",
    "name": "嘉兴市",
    "provinceCode": "A330000000",
    "provinceRateCode": "330",
    "provinceName": "浙江省",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 8
  },
  {
    "code": "A330300000",
    "rateCode": "577",
    "level": 3,
    "countryCode": "A000086000",
    "name": "温州市",
    "provinceCode": "A330000000",
    "provinceRateCode": "330",
    "provinceName": "浙江省",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 9
  },
  {
    "code": "A350500000",
    "rateCode": "595",
    "level": 3,
    "countryCode": "A000086000",
    "name": "泉州市",
    "provinceCode": "A350000000",
    "provinceRateCode": "350",
    "provinceName": "福建省",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 10
  },
  {
    "code": "A330200000",
    "rateCode": "574",
    "level": 3,
    "countryCode": "A000086000",
    "name": "宁波市",
    "provinceCode": "A330000000",
    "provinceRateCode": "330",
    "provinceName": "浙江省",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 11
  },
  {
    "code": "A440600000",
    "rateCode": "757",
    "level": 3,
    "countryCode": "A000086000",
    "name": "佛山市",
    "provinceCode": "A440000000",
    "provinceRateCode": "440",
    "provinceName": "广东省",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 12
  },
  {
    "code": "A320100000",
    "rateCode": "025",
    "level": 3,
    "countryCode": "A000086000",
    "name": "南京市",
    "provinceCode": "A320000000",
    "provinceRateCode": "320",
    "provinceName": "江苏省",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 13
  },
  {
    "code": "A330700000",
    "rateCode": "579",
    "level": 3,
    "countryCode": "A000086000",
    "name": "金华市",
    "provinceCode": "A330000000",
    "provinceRateCode": "330",
    "provinceName": "浙江省",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 14
  },
  {
    "code": "A370200000",
    "rateCode": "532",
    "level": 3,
    "countryCode": "A000086000",
    "name": "青岛市",
    "provinceCode": "A370000000",
    "provinceRateCode": "370",
    "provinceName": "山东省",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 15
  },
  {
    "code": "A420100000",
    "rateCode": "027",
    "level": 3,
    "countryCode": "A000086000",
    "name": "武汉市",
    "provinceCode": "A420000000",
    "provinceRateCode": "420",
    "provinceName": "湖北省",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 16
  },
  {
    "code": "A510100000",
    "rateCode": "028",
    "level": 3,
    "countryCode": "A000086000",
    "name": "成都市",
    "provinceCode": "A510000000",
    "provinceRateCode": "510",
    "provinceName": "四川省",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 17
  },
  {
    "code": "A350200000",
    "rateCode": "592",
    "level": 3,
    "countryCode": "A000086000",
    "name": "厦门市",
    "provinceCode": "A350000000",
    "provinceRateCode": "350",
    "provinceName": "福建省",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 18
  },
  {
    "code": "A120000000",
    "rateCode": "022",
    "level": 2,
    "countryCode": "A000086000",
    "name": "天津市",
    "provinceCode": "A120000000",
    "provinceRateCode": "022",
    "provinceName": "天津市",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 19
  },
  {
    "code": "A350100000",
    "rateCode": "591",
    "level": 3,
    "countryCode": "A000086000",
    "name": "福州市",
    "provinceCode": "A350000000",
    "provinceRateCode": "350",
    "provinceName": "福建省",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 20
  },
  {
    "code": "A320200000",
    "rateCode": "510",
    "level": 3,
    "countryCode": "A000086000",
    "name": "无锡市",
    "provinceCode": "A320000000",
    "provinceRateCode": "320",
    "provinceName": "江苏省",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 21
  },
  {
    "code": "A331000000",
    "rateCode": "576",
    "level": 3,
    "countryCode": "A000086000",
    "name": "台州市",
    "provinceCode": "A330000000",
    "provinceRateCode": "330",
    "provinceName": "浙江省",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 22
  },
  {
    "code": "A430100000",
    "rateCode": "7311",
    "level": 3,
    "countryCode": "A000086000",
    "name": "长沙市",
    "provinceCode": "A430000000",
    "provinceRateCode": "430",
    "provinceName": "湖南省",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 23
  },
  {
    "code": "A442000000",
    "rateCode": "760",
    "level": 3,
    "countryCode": "A000086000",
    "name": "中山市",
    "provinceCode": "A440000000",
    "provinceRateCode": "440",
    "provinceName": "广东省",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 24
  },
  {
    "code": "A410100000",
    "rateCode": "371",
    "level": 3,
    "countryCode": "A000086000",
    "name": "郑州市",
    "provinceCode": "A410000000",
    "provinceRateCode": "410",
    "provinceName": "河南省",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 25
  },
  {
    "code": "A350300000",
    "rateCode": "594",
    "level": 3,
    "countryCode": "A000086000",
    "name": "莆田市",
    "provinceCode": "A350000000",
    "provinceRateCode": "350",
    "provinceName": "福建省",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 26
  },
  {
    "code": "A330600000",
    "rateCode": "575",
    "level": 3,
    "countryCode": "A000086000",
    "name": "绍兴市",
    "provinceCode": "A330000000",
    "provinceRateCode": "330",
    "provinceName": "浙江省",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 27
  },
  {
    "code": "A370100000",
    "rateCode": "531",
    "level": 3,
    "countryCode": "A000086000",
    "name": "济南市",
    "provinceCode": "A370000000",
    "provinceRateCode": "370",
    "provinceName": "山东省",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 28
  },
  {
    "code": "A210400000",
    "rateCode": "024",
    "level": 3,
    "countryCode": "A000086000",
    "name": "抚顺市",
    "provinceCode": "A210000000",
    "provinceRateCode": "210",
    "provinceName": "辽宁省",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 29
  },
  {
    "code": "A500000000",
    "rateCode": "023",
    "level": 2,
    "countryCode": "A000086000",
    "name": "重庆市",
    "provinceCode": "A500000000",
    "provinceRateCode": "023",
    "provinceName": "重庆市",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 30
  },
  {
    "code": "A441300000",
    "rateCode": "752",
    "level": 3,
    "countryCode": "A000086000",
    "name": "惠州市",
    "provinceCode": "A440000000",
    "provinceRateCode": "440",
    "provinceName": "广东省",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 31
  },
  {
    "code": "A340100000",
    "rateCode": "551",
    "level": 3,
    "countryCode": "A000086000",
    "name": "合肥市",
    "provinceCode": "A340000000",
    "provinceRateCode": "340",
    "provinceName": "安徽省",
    "lang": "SC",
    "availableAsDestination": true,
    "availableAsOrigin": true,
    "weight": 32
  }
]

// level=2 省
let provinces = [
  {
    "distId": 41,
    "level": 2,
    "code": "A340000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "安徽省",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "340"
  },
  {
    "distId": 30,
    "level": 2,
    "code": "A110000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "北京市",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "010"
  },
  {
    "distId": 51,
    "level": 2,
    "code": "A500000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "重庆市",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "023"
  },
  {
    "distId": 42,
    "level": 2,
    "code": "A350000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "福建省",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "350"
  },
  {
    "distId": 57,
    "level": 2,
    "code": "A620000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "甘肃省",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "620"
  },
  {
    "distId": 48,
    "level": 2,
    "code": "A440000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "广东省",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "440"
  },
  {
    "distId": 49,
    "level": 2,
    "code": "A450000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "广西壮族自治区",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "450"
  },
  {
    "distId": 53,
    "level": 2,
    "code": "A520000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "贵州省",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "520"
  },
  {
    "distId": 50,
    "level": 2,
    "code": "A460000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "海南省",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "460"
  },
  {
    "distId": 32,
    "level": 2,
    "code": "A130000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "河北省",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "130"
  },
  {
    "distId": 45,
    "level": 2,
    "code": "A410000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "河南省",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "410"
  },
  {
    "distId": 37,
    "level": 2,
    "code": "A230000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "黑龙江省",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "230"
  },
  {
    "distId": 46,
    "level": 2,
    "code": "A420000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "湖北省",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "420"
  },
  {
    "distId": 47,
    "level": 2,
    "code": "A430000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "湖南省",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "430"
  },
  {
    "distId": 36,
    "level": 2,
    "code": "A220000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "吉林省",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "220"
  },
  {
    "distId": 39,
    "level": 2,
    "code": "A320000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "江苏省",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "320"
  },
  {
    "distId": 43,
    "level": 2,
    "code": "A360000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "江西省",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "360"
  },
  {
    "distId": 35,
    "level": 2,
    "code": "A210000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "辽宁省",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "210"
  },
  {
    "distId": 34,
    "level": 2,
    "code": "A150000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "内蒙古自治区",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "150"
  },
  {
    "distId": 59,
    "level": 2,
    "code": "A640000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "宁夏回族自治区",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "640"
  },
  {
    "distId": 58,
    "level": 2,
    "code": "A630000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "青海省",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "630"
  },
  {
    "distId": 44,
    "level": 2,
    "code": "A370000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "山东省",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "370"
  },
  {
    "distId": 33,
    "level": 2,
    "code": "A140000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "山西省",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "140"
  },
  {
    "distId": 56,
    "level": 2,
    "code": "A610000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "陕西省",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "610"
  },
  {
    "distId": 38,
    "level": 2,
    "code": "A310000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "上海市",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "021"
  },
  {
    "distId": 52,
    "level": 2,
    "code": "A510000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "四川省",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "510"
  },
  {
    "distId": 31,
    "level": 2,
    "code": "A120000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "天津市",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "022"
  },
  {
    "distId": 55,
    "level": 2,
    "code": "A540000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "西藏自治区",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "540"
  },
  {
    "distId": 60,
    "level": 2,
    "code": "A650000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "新疆维吾尔自治区",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "650"
  },
  {
    "distId": 54,
    "level": 2,
    "code": "A530000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "云南省",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "530"
  },
  {
    "distId": 40,
    "level": 2,
    "code": "A330000000",
    "parentId": 11,
    "parentCode": "A000086000",
    "countryCode": "A000086000",
    "name": "浙江省",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "330"
  }
]

//level=3 市
let cities = [
  {
    "distId": 351,
    "level": 3,
    "code": "A610900000",
    "parentId": 56,
    "parentCode": "A610000000",
    "countryCode": "A000086000",
    "name": "安康市",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "915"
  },
  {
    "distId": 345,
    "level": 3,
    "code": "A610300000",
    "parentId": 56,
    "parentCode": "A610000000",
    "countryCode": "A000086000",
    "name": "宝鸡市",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "917"
  },
  {
    "distId": 349,
    "level": 3,
    "code": "A610700000",
    "parentId": 56,
    "parentCode": "A610000000",
    "countryCode": "A000086000",
    "name": "汉中市",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "916"
  },
  {
    "distId": 352,
    "level": 3,
    "code": "A611000000",
    "parentId": 56,
    "parentCode": "A610000000",
    "countryCode": "A000086000",
    "name": "商洛市",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "914"
  },
  {
    "distId": 344,
    "level": 3,
    "code": "A610200000",
    "parentId": 56,
    "parentCode": "A610000000",
    "countryCode": "A000086000",
    "name": "铜川市",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "919"
  },
  {
    "distId": 347,
    "level": 3,
    "code": "A610500000",
    "parentId": 56,
    "parentCode": "A610000000",
    "countryCode": "A000086000",
    "name": "渭南市",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "913"
  },
  {
    "distId": 343,
    "level": 3,
    "code": "A610100000",
    "parentId": 56,
    "parentCode": "A610000000",
    "countryCode": "A000086000",
    "name": "西安市",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "029"
  },
  {
    "distId": 346,
    "level": 3,
    "code": "A610400000",
    "parentId": 56,
    "parentCode": "A610000000",
    "countryCode": "A000086000",
    "name": "咸阳市",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "029"
  },
  {
    "distId": 348,
    "level": 3,
    "code": "A610600000",
    "parentId": 56,
    "parentCode": "A610000000",
    "countryCode": "A000086000",
    "name": "延安市",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "911"
  },
  {
    "distId": 350,
    "level": 3,
    "code": "A610800000",
    "parentId": 56,
    "parentCode": "A610000000",
    "countryCode": "A000086000",
    "name": "榆林市",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "912"
  }
]

//level=4 区
let districts = [
  {
    "distId": 2547,
    "level": 4,
    "code": "A610111000",
    "parentId": 343,
    "parentCode": "A610100000",
    "countryCode": "A000086000",
    "name": "灞桥区",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "029"
  },
  {
    "distId": 2548,
    "level": 4,
    "code": "A610103000",
    "parentId": 343,
    "parentCode": "A610100000",
    "countryCode": "A000086000",
    "name": "碑林区",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "029"
  },
  {
    "distId": 2549,
    "level": 4,
    "code": "A610116000",
    "parentId": 343,
    "parentCode": "A610100000",
    "countryCode": "A000086000",
    "name": "长安区",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "029"
  },
  {
    "distId": 2550,
    "level": 4,
    "code": "A610126000",
    "parentId": 343,
    "parentCode": "A610100000",
    "countryCode": "A000086000",
    "name": "高陵区",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "029"
  },
  {
    "distId": 2551,
    "level": 4,
    "code": "A610125000",
    "parentId": 343,
    "parentCode": "A610100000",
    "countryCode": "A000086000",
    "name": "鄠邑区",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "029"
  },
  {
    "distId": 2552,
    "level": 4,
    "code": "A610122000",
    "parentId": 343,
    "parentCode": "A610100000",
    "countryCode": "A000086000",
    "name": "蓝田县",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "029"
  },
  {
    "distId": 2553,
    "level": 4,
    "code": "A610104000",
    "parentId": 343,
    "parentCode": "A610100000",
    "countryCode": "A000086000",
    "name": "莲湖区",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "029"
  },
  {
    "distId": 2554,
    "level": 4,
    "code": "A610115000",
    "parentId": 343,
    "parentCode": "A610100000",
    "countryCode": "A000086000",
    "name": "临潼区",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "029"
  },
  {
    "distId": 2555,
    "level": 4,
    "code": "A610112000",
    "parentId": 343,
    "parentCode": "A610100000",
    "countryCode": "A000086000",
    "name": "未央区",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "029"
  },
  {
    "distId": 2546,
    "level": 4,
    "code": "A610102000",
    "parentId": 343,
    "parentCode": "A610100000",
    "countryCode": "A000086000",
    "name": "新城区",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "029"
  },
  {
    "distId": 2556,
    "level": 4,
    "code": "A610114000",
    "parentId": 343,
    "parentCode": "A610100000",
    "countryCode": "A000086000",
    "name": "阎良区",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "029"
  },
  {
    "distId": 2557,
    "level": 4,
    "code": "A610113000",
    "parentId": 343,
    "parentCode": "A610100000",
    "countryCode": "A000086000",
    "name": "雁塔区",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "029"
  },
  {
    "distId": 2558,
    "level": 4,
    "code": "A610124000",
    "parentId": 343,
    "parentCode": "A610100000",
    "countryCode": "A000086000",
    "name": "周至县",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "029"
  }
]

// 港澳台  level=2
let gat = [
  {
    "distId": 14,
    "level": 2,
    "code": "A000820000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000820000",
    "name": "澳门",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "853"
  },
  {
    "distId": 12,
    "level": 2,
    "code": "A000710000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000710000",
    "name": "台湾",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "886"
  },
  {
    "distId": 13,
    "level": 2,
    "code": "A000810000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000810000",
    "name": "香港",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "852"
  },
]

// level=3
let gatCities = [
  {
    "distId": 3408,
    "level": 3,
    "code": "A000710100",
    "parentId": 10086328163336,
    "parentCode": "A000710000",
    "countryCode": "A000710000",
    "name": "高雄市",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "886"
  },
  {
    "distId": 3409,
    "level": 3,
    "code": "A000710200",
    "parentId": 10086328163336,
    "parentCode": "A000710000",
    "countryCode": "A000710000",
    "name": "花莲县",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "886"
  },
  {
    "distId": 3410,
    "level": 3,
    "code": "A000710300",
    "parentId": 10086328163336,
    "parentCode": "A000710000",
    "countryCode": "A000710000",
    "name": "基隆市",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "886"
  },
  {
    "distId": 10209879366037,
    "level": 3,
    "code": "A007101100",
    "parentId": 10086328163336,
    "parentCode": "A00720000",
    "countryCode": "A000710000",
    "name": "嘉义市",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "886"
  },
  {
    "distId": 3412,
    "level": 3,
    "code": "A000710500",
    "parentId": 10086328163336,
    "parentCode": "A000710000",
    "countryCode": "A000710000",
    "name": "嘉义县",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "886"
  },
  {
    "distId": 3413,
    "level": 3,
    "code": "A000710600",
    "parentId": 10086328163336,
    "parentCode": "A000710000",
    "countryCode": "A000710000",
    "name": "苗栗县",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "886"
  },
  {
    "distId": 3414,
    "level": 3,
    "code": "A000710700",
    "parentId": 10086328163336,
    "parentCode": "A000710000",
    "countryCode": "A000710000",
    "name": "南投县",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "886"
  },
  {
    "distId": 3415,
    "level": 3,
    "code": "A000710800",
    "parentId": 10086328163336,
    "parentCode": "A000710000",
    "countryCode": "A000710000",
    "name": "屏东县",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "886"
  },
  {
    "distId": 3416,
    "level": 3,
    "code": "A000710900",
    "parentId": 10086328163336,
    "parentCode": "A000710000",
    "countryCode": "A000710000",
    "name": "台北市",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "886"
  },
  {
    "distId": 3417,
    "level": 3,
    "code": "A000711000",
    "parentId": 10086328163336,
    "parentCode": "A000710000",
    "countryCode": "A000710000",
    "name": "台东县",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "886"
  },
  {
    "distId": 3418,
    "level": 3,
    "code": "A000711100",
    "parentId": 10086328163336,
    "parentCode": "A000710000",
    "countryCode": "A000710000",
    "name": "台南市",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "886"
  },
  {
    "distId": 3419,
    "level": 3,
    "code": "A000711200",
    "parentId": 10086328163336,
    "parentCode": "A000710000",
    "countryCode": "A000710000",
    "name": "台中市",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "886"
  },
  {
    "distId": 3420,
    "level": 3,
    "code": "A000711300",
    "parentId": 10086328163336,
    "parentCode": "A000710000",
    "countryCode": "A000710000",
    "name": "桃园市",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "886"
  },
  {
    "distId": 3421,
    "level": 3,
    "code": "A000711400",
    "parentId": 10086328163336,
    "parentCode": "A000710000",
    "countryCode": "A000710000",
    "name": "新北市",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "886"
  },
  {
    "distId": 10209821676342,
    "level": 3,
    "code": "A00720017",
    "parentId": 10086328163336,
    "parentCode": "A000710000",
    "countryCode": "A000710000",
    "name": "新竹市",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "886"
  },
  {
    "distId": 3423,
    "level": 3,
    "code": "A000711591",
    "parentId": 10086328163336,
    "parentCode": "A000710000",
    "countryCode": "A000710000",
    "name": "新竹县",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "886"
  },
  {
    "distId": 3424,
    "level": 3,
    "code": "A000711600",
    "parentId": 10086328163336,
    "parentCode": "A000710000",
    "countryCode": "A000710000",
    "name": "宜兰县",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "886"
  },
  {
    "distId": 3425,
    "level": 3,
    "code": "A000711700",
    "parentId": 10086328163336,
    "parentCode": "A000710000",
    "countryCode": "A000710000",
    "name": "云林县",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "886"
  },
  {
    "distId": 3426,
    "level": 3,
    "code": "A000711800",
    "parentId": 10086328163336,
    "parentCode": "A000710000",
    "countryCode": "A000710000",
    "name": "彰化县",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "886"
  }
]

let foreignCountries = [
  {
    "distId": 10165156727278,
    "level": 1,
    "code": "A000971000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000971000",
    "name": "阿拉伯联合酋长国",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "AE"
  },
  {
    "distId": 3,
    "level": 1,
    "code": "A000061000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000061000",
    "name": "澳大利亚",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "AU"
  },
  {
    "distId": 10163866568389,
    "level": 1,
    "code": "A000032000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000032000",
    "name": "比利时",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "BE"
  },
  {
    "distId": 10163866568242,
    "level": 1,
    "code": "A000049000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000049000",
    "name": "德国",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "DE"
  },
  {
    "distId": 10104036025968,
    "level": 1,
    "code": "A000007000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000007000",
    "name": "俄罗斯",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "RU"
  },
  {
    "distId": 10163866568292,
    "level": 1,
    "code": "A000033000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000033000",
    "name": "法国",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "FR"
  },
  {
    "distId": 8,
    "level": 1,
    "code": "A000082000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000082000",
    "name": "韩国",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "KR"
  },
  {
    "distId": 10163866568478,
    "level": 1,
    "code": "A000031000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000031000",
    "name": "荷兰",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "NL"
  },
  {
    "distId": 10163994449088,
    "level": 1,
    "code": "A000011000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000011000",
    "name": "加拿大",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "CA"
  },
  {
    "distId": 10151643876325,
    "level": 1,
    "code": "A000855000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000855000",
    "name": "柬埔寨",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "KH"
  },
  {
    "distId": 2,
    "level": 1,
    "code": "A000060000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000060000",
    "name": "马来西亚",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "MY"
  },
  {
    "distId": 1,
    "level": 1,
    "code": "A000001000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000001000",
    "name": "美国",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "US"
  },
  {
    "distId": 10,
    "level": 1,
    "code": "A000976000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000976000",
    "name": "蒙古国",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "MN"
  },
  {
    "distId": 10165156722880,
    "level": 1,
    "code": "A000880000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000880000",
    "name": "孟加拉国",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "BD"
  },
  {
    "distId": 10164139500254,
    "level": 1,
    "code": "A000095000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000095000",
    "name": "缅甸",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "MM"
  },
  {
    "distId": 10165156723734,
    "level": 1,
    "code": "A000977000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000977000",
    "name": "尼泊尔",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "NP"
  },
  {
    "distId": 7,
    "level": 1,
    "code": "A000081000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000081000",
    "name": "日本",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "JP"
  },
  {
    "distId": 10165156727943,
    "level": 1,
    "code": "A000094000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000094000",
    "name": "斯里兰卡",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "LK"
  },
  {
    "distId": 6,
    "level": 1,
    "code": "A000066000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000066000",
    "name": "泰国",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "TH"
  },
  {
    "distId": 10163866568319,
    "level": 1,
    "code": "A000034000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000034000",
    "name": "西班牙",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "ES"
  },
  {
    "distId": 5,
    "level": 1,
    "code": "A000064000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000064000",
    "name": "新加坡",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "SG"
  },
  {
    "distId": 10164155064338,
    "level": 1,
    "code": "A000164000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000164000",
    "name": "新西兰",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "NZ"
  },
  {
    "distId": 10163866568348,
    "level": 1,
    "code": "A000039000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000039000",
    "name": "意大利",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "IT"
  },
  {
    "distId": 10130885782282,
    "level": 1,
    "code": "A000091000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000091000",
    "name": "印度",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "IN"
  },
  {
    "distId": 4,
    "level": 1,
    "code": "A000062000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000062000",
    "name": "印度尼西亚",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "ID"
  },
  {
    "distId": 10163866568367,
    "level": 1,
    "code": "A000044000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000044000",
    "name": "英国",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "GB"
  },
  {
    "distId": 9,
    "level": 1,
    "code": "A000084000",
    "parentId": 0,
    "parentCode": "A000000000",
    "countryCode": "A000084000",
    "name": "越南",
    "lang": "SC",
    "available": true,
    "opening": false,
    "rateCode": "VN"
  },
]

let initData = [
  {
    title: '常用市',
    level: 3,
    entry: false,
    items: hotCities
  },
  {
    title: '省/直辖市',
    level: 2,
    entry: false,
    items: []
  }
];
class Demo1 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          title: '内地',
          maxLevel: 4,
          data: _.cloneDeep(initData)
        },
        {
          title: '港澳台',
          maxLevel: 3,
          data: [
            {
              title: '港澳台',
              level: 2,
              entry: true,
              items: gat
            }
          ]
        },
        {
          title: '国际',
          maxLevel: 1,
          data: [
            {
              title: '海外',
              level: 2,
              entry: true,
              items: foreignCountries
            }
          ]
        },
      ]
    }
  }

  queryRegion = (level, topKey) => {
    return new Promise((resolve) => {
      if (topKey == 0) { // 内地
        switch (level) {
          case -1:
            resolve(hotCities);
            break;
          case 2:
            resolve(provinces);
            break;
          case 3:
            resolve(cities);
            break;
          case 4:
            resolve(districts);
            break;
          default:
            resolve([]);
        }
      } else if (topKey == 1) { // 港澳台
        switch (level) {
          case 2:
            resolve(gat);
            break;
          case 3:
            resolve(gatCities);
            break;
          default:
            resolve([]);
        }
      } else if (topKey == 2) { // 国际
        switch (level) {
          case 1:
            resolve(foreignCountries);
            break;
          case 2:
            resolve(gatCities);
            break;
          default:
            resolve([]);
        }
      }
    })
  }

  searchRegion = (val) => {
    return new Promise((resolve) => {
      resolve(gatCities);
    })
  }

  handleTabChange = (key, topKey) => {
    const { dataSource } = this.state;
    let tabData = dataSource[topKey].data;
    let level = tabData[key].level;
    // TODO: 此处可根据items的数据添加缓存处理
    return this.queryRegion(level, topKey).then(data => {
      tabData[key].items = data;
      if (topKey == 0 && key > 0) {
        tabData = tabData.slice(0, key + 1);
      }
      dataSource[topKey].data = tabData;
      this.setState({ dataSource });
    });
  }

  buildDataSource = (key, topKey, item, data) => {
    let { dataSource } = this.state;
    let tabData = dataSource[topKey].data;
    let currentData = tabData[key];
    if (key == 0 && topKey == 0) {
      tabData = _.cloneDeep(initData);
    } else {
      tabData = tabData.slice(0, key + 1);
      tabData[0].entry = false;
      tabData[key].title = item.name;
    }
    if (item.level !== 4) {
      tabData.push({
        title: '请选择',
        level: currentData.level + 1,
        items: data
      });
    }
    tabData[key].entry = true;

    dataSource[topKey].data = tabData;
    this.setState({ dataSource });
    return dataSource;
  }

  handleItemClick = (key, topKey, item) => {
    let { dataSource } = this.state;
    if (item.level === dataSource[topKey].maxLevel) {
      dataSource[topKey].data[key].title = item.name;
      dataSource[topKey].data[key].entry = true;
      this.setState({ dataSource });
      return Promise.resolve(dataSource[topKey].data.length - 1);
    }
    // 请求下一级的数据， TODO: 真实接口把item的code参数带上
    return this.queryRegion(item.level + 1, topKey).then(data => {
      let newDataSource = this.buildDataSource(key, topKey, item, data);
      console.log('newDataSource', newDataSource)
      return newDataSource[topKey].data.length - 1;
    });
  }

  render() {
    const { dataSource } = this.state;
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