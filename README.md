# antd-pro-toolkit
🐜 ant design pro toolkit is an advance common components library.

## Usage

```bash
npm install --save antd-pro-toolkit
```

```javascript
import { SlideVerify } from 'antd-pro-toolkit';
```

## Dependency

- antd
- lodash

## Components

- [x] AvatarList
- [x] CountDown
- [x] Ellipsis
- [x] Headline
- [x] NumberInfo
- [x] ScrollSelect
- [x] SlideVerify
- [x] TabCascader
- [x] Timeline
- [x] Trend
- [x] Uploader

## token
Some story need to comunicate with server to fetch data, and need to login first, so you need to create a token file(`token.js`) like below, otherwise you will get some error.

``` javascript
import Des from './utils/des';

export const username = "user"
export const password = Des.enc("*******")
```
