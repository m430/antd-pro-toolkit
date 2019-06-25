import React from 'react';
import Draggable from 'react-draggable';
import cx from 'classnames';
import styles from './index.less';
import {
  Icon
} from 'antd';

class SlideVerify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      icon: 'double-right',
      handlerStatus: '',
      offset: 0,
      position: {
        x: 0,
        y: 0
      }
    }
  }

  handleMouseDown = (e) => {
    const { onMouseDown } = this.props;
    if (onMouseDown) onMouseDown(e);
  }

  handleStart = (e, draggableData) => {
    const { onStart } = this.props;
    this.setState({
      handlerStatus: 'dragging'
    })
    if (onStart) onStart(e, draggableData);
  }

  handleStop = (e, draggableData) => {
    const { onStop } = this.props;
    let offset = draggableData.x - draggableData.y + draggableData.node.offsetWidth;
    let isVerify = false;
    if (offset !== this.refs.slider.clientWidth) {
      this.setState({
        icon: 'close',
        disabled: true,
        handlerStatus: 'error'
      })
      setTimeout(this.resetSlide, 700)
    } else {
      this.setState({
        icon: 'check',
        disabled: true,
        handlerStatus: 'done'
      })
      isVerify = true;
    }
    if (onStop) onStop(isVerify, e, draggableData);
  }

  handleDrag = (e, draggableData) => {
    const { onDrag } = this.props;
    let offset = draggableData.x - draggableData.y + draggableData.node.offsetWidth;
    this.setState({ offset, position: { x: draggableData.x - draggableData.y, y: 0 } })
    if (onDrag) onDrag(e, draggableData);
  }

  resetSlide = () => {
    this.setState({
      position: {
        x: 0,
        y: 0
      },
      offset: 0,
      handlerStatus: "",
      icon: 'double-right',
      disabled: false
    });
  }

  render() {
    const { position, icon, disabled, handlerStatus, offset } = this.state;
    let dragCls = handlerStatus ? styles[handlerStatus] : "";
    let handlerSty = {};
    if (handlerStatus == 'error') {
      handlerSty.transition = 'all .2s linear';
    }
    return (
      <div ref="slider" className={styles.slideVerify}>
        <div className={`${styles.progress} ${dragCls}`} style={{ width: offset }}></div>
        <Draggable
          axis="x"
          bounds="parent"
          disabled={disabled}
          onMouseDown={this.handleMouseDown}
          onStart={this.handleStart}
          onDrag={this.handleDrag}
          onStop={this.handleStop}
          position={position}
        >
          <div ref="handler" className={`${styles.slideHandler} ${dragCls}`} style={handlerSty}>
            <Icon type={icon} />
          </div>
        </Draggable>
      </div>
    )
  }
}

export default SlideVerify;
