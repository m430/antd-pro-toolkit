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
    data: [
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

| 参数        | 说明                             | 类型                 | 默认值 |
| ----------- | -------------------------------- | -------------------- | ------ |
| dataSource  | `Array<PanelData>`参考上面的结构 | `Array`              |        |
| value       | 选择的`item`值                   | `Array<Item>`        |        |
| style       | 样式对象                         | `CSSProperties`      |        |
| className   | 样式类                           | `String/Object`    |        |
| placeholder | 输入框提示语                     | `String/ReactNode` |        |
| addonAfter  | 输入框后置标签                   | `String/ReactNode` |        |
| hint        | `Tab`选择下拉框上方的提示语      | `String/ReactNode` |        |


### Events

| 参数              | 说明                       | 类型                        | 默认值 |
| ----------------- | -------------------------- | --------------------------- | ------ |
| onTopTabChange    | 第一层`Tab`改变的事件      | function(tabKey)            | 无     |
| onTabChange       | 第二层`Tab`改变的事件      | function(key, topKey, item) | 无     |
| onSearch          | 输入框搜索事件             | function(val)               | 无     |
| onSearchItemClick | 搜索出的`Item`列表点击事件 | function(item)              | 无     |
| onBlur            | 输入框失去焦点事件         | function(e)                 | 无     |
| onChange          | 选择的`Item`发生变化的事件 | function(selectedItems)     | 无     |