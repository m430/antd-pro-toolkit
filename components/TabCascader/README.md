## 何时使用

通常有多级数据需要逐级选择的时候，可以使用`TabCascader`，用户传入的数据接口需符合以下要求：

```json
// dataSource
[
  // 第一层Tab数据 
  {
    title: string,    // 第一层Tab的title
    maxLevel: number, // 最大可选择的级别
    code: string, // 第一层编码
    items: [
      // 第二层Tab数据
      {
        title: string, // 第二层Tab的title
        level: number, // 本级的level
        entry: Boolean, // 是否从此层选择下来的
        items: [
          {
            code: string,  // 第二层tab内的item编码
            name: string,  // item的名称
            level: number, // item的级别
            groupCode: string, // 第一层Tab的code
            parentCode: string, // 父级的编码
            areaCode1: string,  // 第一级 code
            areaCode2: string,  // 第二级 code
            areaCode3: string,  // 第三级 code
            areaCode4: string,  // 第四级 code
            areaName1: string,  // 第一级 name
            areaName2: string,  // 第二级 name
            areaName3: string,  // 第三级 name
            areaName4: string,  // 第四级 name
          }
          ...
        ]
      }
      ...
    ]
  }
  ...
]
```


### Properties

| 参数         | 说明                                       | 类型                   | 默认值 |
| ------------ | ------------------------------------------ | ---------------------- | ------ |
| dataSource   | `Array<PanelData>`参考上面的结构           | `Array`                |        |
| value        | 选择的`item`值                             | `Array<Item>`          |        |
| style        | 样式对象                                   | `CSSProperties`        |        |
| className    | 样式类                                     | `String/Object`        |        |
| hint         | `Tab`选择下拉框上方的提示语                | `String/ReactNode`     |        |
| contentStyle | 下拉框的样式                               | `CSSProperties`        |        |
| contentCls   | 下拉框框的`className`                      | `string`               |        |
| colSpan      | `TabPanel`中的`Item`占比的`span`           | `number`               | 6      |
| inputProps   | `Input`组件的所有属性除了`onChange|onBlur` | `InputProps`           |        |
| pagination   | 搜索下拉框的分页设置                       | `Boolean | Pagination` |        |

> 注意： 当设置`pagination`的时候，如果不设置具体的配置参数，则默认从第一页开始加载，pageSize为10.


### Events

| 参数                   | 说明                            | 类型                          | 默认值 |
| ---------------------- | ------------------------------- | ----------------------------- | ------ |
| onTopTabChange         | 第一层`Tab`改变的事件           | `function(tabKey)`            | 无     |
| onTabChange            | 第二层`Tab`改变的事件           | `function(key, topKey, item)` | 无     |
| onSearch               | 输入框搜索事件                  | `function(val)`               | 无     |
| onSearchItemClick      | 搜索出的`Item`列表点击事件      | `function(item)`              | 无     |
| onItemClick            | 点击的`Item`的事件              | `function(key, topKey, item)` | 无     |
| onBlur                 | 输入框失去焦点事件              | `function(e)`                 | 无     |
| onChange               | 选择的`Item`发生变化的事件      | `function(selectedItems)`     | 无     |
| onClear                | `Input`设置为`allowClear`的回调 | `function(e)`                 | 无     |
| onPopupScroll          | 搜索下拉框滚动事件              | `function(e)`                 | 无     |
| inputProps.renderValue | 自定义渲染函数                  | `function(selectedItems)`     |      |

> 注意： 设置`inputProps.renderValue`的时候，用于自定义渲染Input中显示的值，可根据需求自行传入。

### Models

`PanelData`定义如下：

```json
{
  title: string,    // top tab的title
  code: string,     // 
  maxLevel: number,
  items: Array<TabData>
}
```

`TabData`定义如下：

```json
{
  title: string,
  level: number,
  entry: boolean,
  items: Array<Item>
}
```

`Pagination`定义如下：

```json
{
  currentPage: number,
  currentResult: number,
  pageSize: number,
  totalPage: number,
  totalResult: number
}
```