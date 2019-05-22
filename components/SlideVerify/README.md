## 何时使用

通常为了防止用户频繁点击登录验证时，需要用户手动拖动通过验证。

### API

| 参数        | 说明               | 类型                                | 默认值 |
| ----------- | ------------------ | ----------------------------------- | ------ |
| onDrag      | 拖拽中触发         | function(e, draggableData)          | 无     |
| onStart     | 开始拖拽时触发     | function(e, draggableData)          | 无     |
| onStop      | 拖拽结束时触发     | function(isVerify,e, draggableData) | 无     |
| onMouseDown | 鼠标按下滑块时触发 | function(e)                         | 无     |

**注意：** 如果需要对`SlideVerify`的滑块进行重置位置，可以使用`ref`的`resetSlide()`。