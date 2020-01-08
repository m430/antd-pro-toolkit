import React from 'react'
import { Icon } from 'antd'
import Ellipsis from '../Ellipsis';
import './style'

export interface File {
  id: string,
  name: string,
  originPath: string | null,
  path: string,
  thumbnailPath: string | null,
  type: string,
}

export interface FileProps {
  item: File,
  handlePreview: Function,
  isUploading: boolean,
  handleRemove: Function,
  width: number
}
const File = (props: FileProps) => {
  const { item, handlePreview, isUploading = true, handleRemove, width } = props
  const imgType = ['png', 'jpeg', 'jpg', 'pdf'];
  const fileType = item.name.split('.').reverse()[0].toLowerCase()
  const isImg = imgType.includes(fileType);
  const length = Math.floor((width - 100) / 14)
  return (
    <span className='uploadFile' onClick={() => handlePreview(item)}>
      <div className="ant-upload-list ant-upload-list-text">
        <div className="ant-upload-list-item ant-upload-list-item-done">
          <div className="ant-upload-list-item-info">
            <span className='name'>
              <Icon style={{ fontSize: 14 }} type={isImg ? 'file-image' : 'file'} />
              <a className='name' style={{ marginLeft: 20 }} >
                <Ellipsis tooltip length={length}>
                  {item.name}
                </Ellipsis>
              </a>
            </span>
          </div>
          {
            isUploading ? <Icon style={{ fontSize: 14 }} type="close" onClick={(e) => {
              e.stopPropagation()
              handleRemove(item)
            }} /> :
              <div />
          }
        </div>
      </div>
    </span>
  )
}

export default File
