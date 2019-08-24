import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import TabCascader from '../components/TabCascader';
import DemoContainer from '../tools/DemoContainer';

// level=-1
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

// level=2
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

//level=3
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

//level=4
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

class Demo1 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          title: '常用市',
          level: 3,
          entry: true,
          items: hotCities
        },
        {
          title: '省/直辖市',
          level: 2,
          entry: false,
          items: []
        }
      ]
    }
  }

  queryRegion = (level) => {
    return new Promise((resolve) => {
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
    })
  }

  handleTabClick = (index, level) => {
    const { dataSource } = this.state;
    return this.queryRegion(level).then(data => {
      dataSource[index].items = data;
      this.setState({ dataSource });
    });
  }

  buildDataSource = (index, item, data) => {
    let { dataSource } = this.state;
    let currentData = dataSource[index];
    if (index == 0) {
      dataSource = [
        {
          title: '常用市',
          level: 3,
          entry: true,
          items: hotCities
        },
        {
          title: '省/直辖市',
          level: 2,
          entry: false,
          items: []
        }
      ];
    } else {
      dataSource = dataSource.slice(0, index + 1);
    }
    dataSource[index].entry = true;
    if (index == 0) {
      dataSource.push({
        title: '请选择',
        level: currentData.level + 1,
        items: data
      });
    } else {
      dataSource[index].title = item.name;
      if (item.level !== 4) {
        dataSource.push({
          title: '请选择',
          level: currentData.level + 1,
          items: data
        });
      }
    }
    this.setState({ dataSource });
    return dataSource;
  }

  handleItemClick = (index, item) => {
    let { dataSource } = this.state;
    let currentData = dataSource[index];
    if (item.level === 4) {
      dataSource[index].title = item.name;
      dataSource[index].entry = true;
      this.setState({ dataSource });
      return Promise.resolve(dataSource.length - 1);
    }
    // 请求下一级的数据， TODO: 真实接口把item的code参数带上
    return this.queryRegion(currentData.level + 1).then(data => {
      let newDataSource = this.buildDataSource(index, item, data);
      console.log('newDataSource', newDataSource)
      return newDataSource.length - 1;
    });
  }

  render() {
    const { dataSource } = this.state;
    return (
      <DemoContainer>
        <TabCascader
          onTabClick={this.handleTabClick}
          onItemClick={this.handleItemClick}
          style={{ width: 600 }}
          dataSource={dataSource}
        />
      </DemoContainer>
    )
  }
}

storiesOf('Address', module)
  .add('TabCascader',
    () => <Demo1 />,
  )