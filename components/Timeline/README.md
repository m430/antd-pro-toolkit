## 何时使用

需要展示操作变更历史时，可以使用`Timeline`组件：

### Properties

| 参数        | 说明                             | 类型               | 默认值 |
| ----------- | -------------------------------- | ------------------ | ------ |
| steps  | `Array<TimelineStep>`参考下面的结构 | `Array`            |        |

### Models
`TimelineStep`定义如下：

```json
{
  id: number;
  messageTime: string;       // 时分秒
  message: string;           // 每一步骤对应的展示消息内容
  curStatus?: string;        // 当前状态，理论上每一步骤一个状态变更
  year?: string;             // 状态变更时间
  week?: string;             // 星期
}
```

