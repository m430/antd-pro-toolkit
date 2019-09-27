import React, { Component } from 'react'
import {
  Upload,
  Modal,
  message,
  Icon,
  Button
} from 'antd';
import File from './File'
import Image from './Image'

export interface FileInterface {
  id: string,
  name: string,
  originPath: string | null,
  path: string,
  thumbnailPath: string | null,
  type: string,
}

export interface UploadInfo {
  action: string,
  accept: string
}

export interface UploadProps {
  width?: number,
  isView?: boolean,
  type?: 'card' | 'list',
  placeholder?: string,
  max?: number,
  uploadInfo: UploadInfo,
  onChange?: Function,
  value?: Array<FileInterface> | FileInterface,
  style?: React.CSSProperties,
  maxFileSize?: number,
  beforeUpload?: Function
}

export interface UploadState {
  previewVisible: boolean,
  previewImage: FileInterface,
  previewType: string,
  fileUploading: boolean,
  fileList: Array<FileInterface>,
  width: number,
  valueType: string
}

export default class Uploader extends Component<UploadProps, UploadState>{
  listType: {}
  constructor(props: UploadProps) {
    super(props);
    this.state = {
      // 是否打开预览图片modal
      previewVisible: false,
      // 预览的图片对象
      previewImage: {
        id: '',
        name: '',
        originPath: '',
        path: '',
        thumbnailPath: '',
        type: '',
      },
      // 预览图片的类型
      previewType: '',
      // 是否正在上传文件
      fileUploading: false,
      // 已有的文件列表
      fileList: [],
      // 组件宽度
      width: 300,
      valueType: 'array'
    }
  }
  componentDidMount() {
    // 获取文件列表
    const { value } = this.props
    // 获取设置的宽度
    const { width } = this.props
    // 如果没有设置宽度,就获取元素的宽度
    let currentWidth = width ? width : (this.refs.file as any).clientWidth
    this.setState({ width: currentWidth })
    this.getValue(value)
  }
  componentWillReceiveProps(nextProps: UploadProps) {
    this.getValue(nextProps.value)
  }
  getValue = (value: any) => {
    let fileList = [], valueType = 'array'
    // 判断传入对象,如果是object,则将其存入数组中
    if (Object.prototype.toString.call(value) === '[object Object]') {
      fileList = [value]
      valueType = 'object'
    }
    // 如果是array,则将其赋值给fileList
    if (Object.prototype.toString.call(value) === '[object Array]') {
      fileList = value
    }
    this.setState({ fileList, valueType })
  }

  // 上传前校验文件格式和文件大小
  beforeUpload = (file: any) => {
    const { beforeUpload, maxFileSize } = this.props;
    if (typeof beforeUpload === 'function') {
      return beforeUpload(file)
    }
    // 获取设置的可以上传的文件类型
    const { uploadInfo: { accept } } = this.props;
    // 将文件名按‘.’分割,倒序,然后取出首个,即为文件名,然后转小写
    let fileName = file.name.split('.').reverse()[0].toLowerCase()
    // 判断当前上传的文件是否为允许的格式
    if (!accept.includes(fileName)) {
      message.error('文件格式不正确');
      return false;
    }
    if (maxFileSize) {
      const scaleOut = file.size / 1024 / 1024 <= Math.abs(maxFileSize)
      if (!scaleOut) {
        message.error(`上传文件必须小于${maxFileSize}MB!`);
        return false
      }
    }
    return true;
  }

  // 取消预览图片
  handleCancel = () => this.setState({
    previewVisible: false,
    previewImage: {
      id: '',
      name: '',
      originPath: '',
      path: '',
      thumbnailPath: '',
      type: '',
    },
  })

  // 预览图片
  handlePreview = (item: FileInterface) => {
    // 判断文件类型,目前只有图片类型和pdf可以预览
    const fileType = item.name.split('.').reverse()[0].toLowerCase()
    const imgType = ['jpg', 'jpeg', 'png', 'pdf']
    const canPreview = imgType.includes(fileType)
    if (!canPreview) return message.error(`暂不支持预览${fileType}格式的文件`)
    this.setState({
      previewImage: item,
      previewVisible: true,
      previewType: fileType
    });
  }

  handleChange = (info: any) => {
    const { onChange } = this.props
    const { fileList, valueType } = this.state
    if ('uploading' === info.file.status) {
      this.setState({ fileUploading: true })
      return
    }
    if ('done' === info.file.status) {
      if (info.file.response.errorCode === 0) {
        this.setState({ fileUploading: false, fileList: [...fileList, info.file.response.data] })
        if (onChange) {
          // 根据传入的数据来决定回填的数据
          if (valueType === 'object') {
            onChange(info.file.response.data)
          } else {
            onChange([...fileList, info.file.response.data])
          }
        }
      } else {
        this.setState({ fileUploading: false })
        message.error(info.file.response.msg)
      }
    }
  }

  // 删除文件
  handleRemoveFile = (file: FileInterface) => {
    const { onChange } = this.props
    const { fileList, valueType } = this.state
    this.setState({ fileList: fileList.filter(item => item.id !== file.id) })
    if (onChange) {
      if (valueType === 'object') {
        onChange({})
      } else {
        onChange(fileList.filter(item => item.id !== file.id))
      }
    }
  }

  render() {
    let { uploadInfo, isView = false, type = 'card', style, max = 9999, placeholder = '' } = this.props
    const { previewVisible, previewImage, fileUploading, fileList, width, previewType } = this.state
    let renderImageList = type === 'card' && fileList.map(item => (<Image isUploading={!isView} key={item.id} item={item} handlePreview={this.handlePreview} handleRemove={this.handleRemoveFile} />))
    let renderFileList = type === 'list' && fileList.map(item => (<File width={width} isUploading={!isView} key={item.id} item={item} handlePreview={this.handlePreview} handleRemove={this.handleRemoveFile} />))
    if (type === 'card') {
      this.listType = { listType: 'picture-card' }
    }
    return (
      <div style={{ ...style, width }} ref='file'>
        {renderImageList}
        <Upload
          {...uploadInfo}
          {...this.listType}
          showUploadList={false}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
        >
          {(!isView && !((max - fileList.length) === 0)) && (
            type === 'card' ?
              <div>
                <Icon type={fileUploading ? 'loading' : 'plus'} />
                {placeholder && <div className="ant-upload-text">{placeholder}</div>}
              </div>
              :
              <Button>
                <Icon type={fileUploading ? 'loading' : 'paper-clip'} /> {placeholder ? placeholder : '上传'}
              </Button>
          )
          }
        </Upload>
        {renderFileList}
        <Modal maskClosable={false}
          keyboard={false}
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
          width={800}
          bodyStyle={{ padding: '40px' }}
          title={previewImage.name}
        >
          {
            previewType !== 'pdf' &&
            <img alt={previewImage.name} style={{ width: '100%' }} src={(previewImage.path || '').replace('_150x150', '')} />
          }
          {
            previewType === 'pdf' &&
            <iframe style={{ width: '100%', height: '800px' }} src={previewImage.path} title={previewImage.name}></iframe>
          }
        </Modal>
      </div>
    )
  }
}
