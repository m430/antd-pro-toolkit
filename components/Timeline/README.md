## 何时使用

需要展示运单操作历史时，可以使用`OrderStatus`：

### Properties

| 参数        | 说明                             | 类型               | 默认值 |
| ----------- | -------------------------------- | ------------------ | ------ |
| trackInfo  | `OrderTrackingStatus`参考上面的结构 | `Object`            |        |

### Models

`OrderTrackingStatus`定义如下：

```json
{
  string: TrackingInfo[];
}
```

`TrackingInfo`定义如下：

```json
{
  date: string;
  whichDay: string;
  trackingList: TrackingStep[];
}
```

`TrackingStep`定义如下：

```json
{
  id: number;            // 此Tab的code
  time: string;
  statusName: string;
  trackMessage: string;
  year?: string;
  week?: string;
}
```

