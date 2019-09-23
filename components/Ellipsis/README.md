## 何时使用

需要控制文字最长显示个数时使用，hover时以tootip形式展示完整文字。

### Properties

| 参数                  | 说明                 | 类型                  | 默认值         |
| ---------------------| ---------------------| -------------------- | -------------- |
| tooltip              | 拖拽框的长度            | boolean / `IEllipsisTooltipProps` |           |
| length               | 字数限制               | int                  |          |
| lines                | 行数                  | int                  |      |
| style                | 样式对象               | `CSSProperties`      |     |
| className            | 样式类                 | string               |      |
| fullWidthRecognition | 根据文字Unicode计算宽度 | bool                 |      |


### Models

`IEllipsisTooltipProps`定义如下：

```json
{
  title?: React.ReactNode | RenderFunction,
  overlayStyle?: React.ReactNode | RenderFunction
}
```
