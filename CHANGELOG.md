# CHANGELOG

## [0.5.2] (2019-10-12)
  - feature: `TabCascader`组件添加`prefixCls`属性，用于设置自定义`ClassName`前缀
  - feature: `TabCascader`组件添加`listHeight`属性，用于设置搜索下拉列表高度
  - feature: `TabCascader`组件添加`listItemHeight`属性，用于设置搜索下拉列表选项高度
  - feature: `TabCascader`组件添加`onPopupScroll`属性，用于监听搜索拉下列表滚动事件
  - feature: `TabCascader`组件下拉列表添加键盘控制事件，支持`UP | DOWN | ESC | ENTER`，上下控制方向，`ESC`用于取消，`ENTER`用于选择。
  - improve: `Uploader`组件优化部分特性。

## [0.4.8] (2019-09-29)
  - feature: `TabCascader`组件添加`inputProps.renderValue`自定义渲染函数，支持根据选择路径自定义渲染

## [0.4.6] (2019-09-27)
  - feature: 修改`Uploader`部分特性，添加`beforeUpload`钩子函数;
  - fix: 修复`TabCascader`清空的bug

## [0.4.5] (2019-09-26)
  - feature: 修改`Uploader`部分特性;

## [0.4.4] (2019-09-25)
  - feature: 新增`TabCascader`的`inputProps`属性，支持`antd`所有的`Input`组件属性`InputProps`， 除了`'onBlur' | 'onClick' | 'onChange'`这三个需要配置在组件上;
  - feature: 新增`TabCascader`的`pagination`属性，支持`Boolean | Pagination`, 用于异步搜索时候进行分页的配置项, 当设置此属性时搜索下拉滚动会进行异步加载;
  - feature: 新增`Uploader`组件，提供`card | list`两种样式，并提供上传组件的预览;
  - feature: 新增`Timeline`组件，提供统一的时间线展示组件;
  - feature: 新增`Ellipsis`组件，提供根据字符长度统一截断的组件，鼠标移入可提示全部字符;
  - remove: 移除`TabCascader`的`inputCls, inputStyle, addonAfter, placeholder`迁移至`inputProps`属性中;


## [0.4.3] (2019-09-24)
  - migrate: 迁移`Charts`相关组件到`antd-pro-charts`组件库中
  - remove: 移除相关不必要的代码。

## [0.4.1] (2019-09-23)
  - feature: 新增`Ellipsis`组件。

## [0.4.0] (2019-09-19)
  - fix: `TabCascader`组件选择时，`level`为`2`时候选择展示缺失的bug
  - feature: `TabCascader`组件新增`colSpan`属性用于设置`Item`列占比
  - improve: `TabCascader`组件样式调整，字体整体变大
  - update: `TabCascader`修改因节点数据结构变更引起的变化。

## [0.3.7] (2019-09-17)
  - fix: `TabCascader`组件`value`为空时进行清空操作。

## [0.3.6] (2019-09-17)
  - feature: `TabCascader`组件添加`inputStyle/inputCls/contentStyle/contentCls`属性，支持外部自定义数样式。

## [0.3.5] (2019-09-16)
  - fix: 修复`TabCascader`组件失去焦点时候下拉框一直显示的bug。

## [0.3.4] (2019-09-09)
  - fix: 修复`TabCascader`组件`value`为空时候报错的bug。

## [0.3.3] (2019-09-09)
  - fix: 修复`TabCascader`组件选择时展示的数据不正确的bug。

## [0.3.1] (2019-09-05)
  - component: 新增`TabCascader`组件作为级联选择的基础组件
  - refactor: 重构`AvatarList|CountDown|Headline|NumberInfo|ScrollSelect|SlideVerify|Trend|Charts`组件使用`typescript`，增强类型限制，语法提示。

## [0.2.8] (2019-08-12)
  - fix: `SlideVerify`组件在`IE`浏览器无法使用的问题
  - 
## [0.2.7] (2019-07-08)
  - refactor: 重构使用`typescript`进行开发。

## [0.2.6] (2019-06-25)
  - bug fix: 修复`passTxt`定位偏离的问题

## [0.2.5] (2019-07-3)
  - feature: `SlideVerify`添加`size`属性，支持`small|middle|large`
  - feature: `SlideVerify`添加`width`属性，可自定义宽度
  - feature: `SlideVerify`添加`hintTxt`属性，可自定义提示语
  - feature: `SlideVerify`添加`passTxt`属性，可自定义验证通过提示语
  - 移除css module

## [0.2.3] (2019-06-25)
  - bug fix: 修复firefox下无法拖到头的bug

## [0.2.1](https://github.com/m430/antd-pro-toolkit/compare/0.0.3...0.2.1) (2019-05-22)
  - 添加`AvatarList`组件
  - 添加`Charts`类组件`Bar`、`Gauge`、`MiniArea`、`MiniBar`、`MiniProgress`、`Pie`、`Radar`、`TagCloud`、`TimelineChart`、`WaterWave`
  - 添加`Headline`组件
  - 添加`NumberInfo`组件
  - 添加`ScrollSelect`组件
  - 添加`Trend`组件
  - 添加`SlideVerify`组件
