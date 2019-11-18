import React from 'react'
import { Icon } from 'antd'

export interface File {
  id: string,
  name: string,
  originPath: string | null,
  path: string,
  thumbnailPath: string | null,
  type: string,
}

export interface ImageProps {
  item: File,
  handlePreview: Function,
  isUploading: boolean,
  handleRemove: Function
}

const Image = (props: ImageProps) => {
  const { item, handlePreview, isUploading = true, handleRemove } = props
  const imgType = ['png', 'jpeg', 'jpg', 'pdf'];
  const fileType = item.name.split('.').reverse()[0].toLowerCase()
  const canPrev = imgType.includes(fileType)
  return (
    <>
      <div className="ant-upload-list ant-upload-list-picture-card" onClick={() => handlePreview(item)} >
        <div className="ant-upload-list-item ant-upload-list-item-done" style={{ width: 102, height: 102 }}>
          <div className="ant-upload-list-item-info">
            <span style={{ height: '100%', textAlign: 'center' }}>
              {canPrev ? (
                <a
                  className="ant-upload-list-item-thumbnail"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {
                    fileType !== 'pdf' ?
                      <img src={item.path} alt={item.name || ''} /> :
                      <iframe src={item.path} title={item.name}></iframe>
                  }
                </a>
              ) : (
                  <>
                    <Icon
                      type="picture"
                      style={{
                        fontSize: 26,
                        lineHeight: 2,
                        color: '#1890FF',
                      }}
                    />
                    <span className="ant-upload-list-item-name">
                      {item.name}
                    </span>
                  </>
                )}
            </span>
          </div>
          <span className="ant-upload-list-item-actions">
            <Icon
              type="eye"
              style={{
                cursor: 'pointer',
                color: '#fff',
                opacity: canPrev ? 1 : 0.4,
              }}
            />
            {
              isUploading ? <Icon type='delete' style={{ color: 'rgba(255, 255, 255, 0.85)', marginLeft: 10 }} onClick={() => handleRemove(item)} /> :
                <div />
            }
          </span>
        </div>
      </div>
    </>
  )
}

export default Image
