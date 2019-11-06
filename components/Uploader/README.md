## 何时使用

在需要上传一个或多个文件时,可以使用`Upload`组件.用户传入的数据接口以及方法需要符合以下要求:

### Properties

| 参数         | 说明                             | 类型               | 默认值 |
| ------------ | -------------------------------- | ------------------ | ------ |
| width   | 组件宽度 | `number`           |        | 300
| isView        | 是否只读                  | `boolean`      |   false     |
| type        | 组件类型(上传以及文件展示类型,值仅为`card|list`)                        | `string`    |    `card`    |
| placeholder    | 上传文字提示                           | `string`    |  无      |
| max  | 最大上传文件数量                     | `number` |     9999   |
| uploadInfo   | 上传配置                   | `UploadInfo` |  无      |
| value         |  已上传的文件      | ` Array<FileInterface>` |        |
| style   | 样式对象                 | `CSSProperties`    |        |
| maxFileSize   |  文件的最大值                | `number`    |        |
| alwaysShowUploadButton   |  是否始终显示上传按钮                | `boolean`    |   false     |
| showResult   |  是否显示上传结果列表                | `boolean`    |    true    |


### Events

| 参数              | 说明                       | 类型                        | 默认值 |
| ----------------- | -------------------------- | --------------------------- | ------ |
| onChange          | 上传成功后的事件 | function(value)     | 无     |
| beforeUpload   | 上传前的校验                 | function(File)   |     无   |

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

`UploadInfo`定义如下:

```

{
  action: string, // 上传路径
  accept: string, // 可以上传的文件类型
}

```

### 注意

1. `maxFileSize` 和 `beforeUpload`. 如果设置了`beforeUpload`,则无需设置`maxFileSize`.此时会走设置的`beforeUpload`来进行上传前的校验.而如果没有设置`beforeUpload`,此时会走默认的上传前的校验,此时设置`maxFileSize`才会生效.
