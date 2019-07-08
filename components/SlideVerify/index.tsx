import React, { createRef } from 'react';
import Draggable, { DraggableData, ControlPosition } from 'react-draggable';
import cx from 'classnames';
import './index.less';
import {
  Icon
} from 'antd';

export interface SlideVerifyProps {
  width?: number;
  size?: 'small' | 'middle';
  hintTxt?: string;
  passTxt?: string;
  onStart?: (e?: React.MouseEvent<HTMLElement>, draggableData?: DraggableData) => void;
  onDrag?: (e?: React.MouseEvent<HTMLElement>, draggableData?: DraggableData) => void;
  onStop?: (isVerify?: Boolean, e?: React.MouseEvent<HTMLElement>, draggableData?: DraggableData) => void;
  onMouseDown?: (e?: MouseEvent) => void;
}

export interface SlideVerifyState {
  disabled?: boolean;
  icon?: string;
  handlerStatus?: string;
  offset?: number;
  position?: ControlPosition;
  passTxtLeft?: number;
}

export default class SlideVerify extends React.Component<SlideVerifyProps, SlideVerifyState> {

  static defaultProps: SlideVerifyProps = {
    width: 400,
    size: 'middle',
    hintTxt: '向右滑动验证',
    passTxt: '验证通过'
  }

  state: SlideVerifyState = {
    disabled: false,
    icon: 'double-right'
  }

  private slider = createRef<HTMLDivElement>();

  componentDidMount() {
    const sliderDom = this.slider.current;
    if (sliderDom) {
      this.setState({
        passTxtLeft: sliderDom.clientWidth / 2
      })
    }
  }

  handleMouseDown = (e: MouseEvent) => {
    const { onMouseDown } = this.props;
    if (onMouseDown) onMouseDown(e);
  }

  handleStart = (e: React.MouseEvent<HTMLElement>, draggableData: DraggableData) => {
    const { onStart } = this.props;
    this.setState({
      handlerStatus: 'dragging'
    })
    if (onStart) onStart(e, draggableData);
  }

  handleStop = (e: React.MouseEvent<HTMLElement>, draggableData: DraggableData) => {
    const { onStop } = this.props;
    let offset = draggableData.x - draggableData.y + draggableData.node.offsetWidth;
    let isVerify = false;

    const sliderDom = this.slider.current;

    if (sliderDom) {
      if (offset !== sliderDom.clientWidth) {
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

  }

  handleDrag = (e: React.MouseEvent<HTMLElement>, draggableData: DraggableData) => {
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
    const {
      size,
      hintTxt,
      passTxt,
      width
    } = this.props;

    const {
      position,
      icon,
      disabled,
      handlerStatus,
      offset,
      passTxtLeft
    } = this.state;

    let dragCls = handlerStatus ? `${handlerStatus}` : "";
    let handlerSty: React.CSSProperties = {};
    if (handlerStatus == 'error') {
      handlerSty.transition = 'all .2s linear';
    }

    return (
      <div ref={this.slider} className={cx('slideVerify', `is-${size}`)} style={{ width }}>
        <div className={`progress ${dragCls}`} style={{ width: offset }}>
          <span className="passTxt" style={{ left: passTxtLeft }}>{passTxt}</span>
        </div>
        <span className="hintTxt">{hintTxt}</span>
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
          <div ref="handler" className={`slideHandler ${dragCls}`} style={handlerSty}>
            <Icon type={icon} />
          </div>
        </Draggable>
      </div>
    )
  }
}