## 何时使用

在需要上传一个或多个文件时,可以使用`Upload`组件.用户传入的数据接口以及方法需要符合以下要求:

### Properties

| 参数         | 说明                             | 类型               | 默认值 |
| ------------ | -------------------------------- | ------------------ | ------ |
| width   | 组件宽度 | `number`           |        |
| isView        | 是否只读                  | `boolean`      |   false     |
| type        | 组件类型                         | `card | list`    |    `card`    |
| placeholder    | 上传文字提示                           | `string`    |  无      |
| max  | 最大上传文件数量                     | `number` |     9999   |
| uploadInfo   | 上传配置                   | `UploadInfo` |  无      |
| value         |  已上传的文件      | ` Array<FileInterface> | FileInterface` |        |
| style   | 样式对象                 | `CSSProperties`    |        |


### Events

| 参数              | 说明                       | 类型                        | 默认值 |
| ----------------- | -------------------------- | --------------------------- | ------ |
| onChange          | 上传成功后的时间 | function(value)     | 无     |

### Model

`FileInterface`定义如下:

```

{
  id: string,
  name: string,
  originPath: string | null,
  path: string,
  thumbnailPath: string | null,
  type: string,
}

```
