import React, { Component } from 'react';
import { Timeline, Icon } from 'antd';
import './style';

export interface TimelineStep {
  id: number;
  messageTime: string;
  message: string;
  curStatus?: string;
  year?: string;
  week?: string;
}

export interface CusTimelineProps {
  steps: TimelineStep[];
}

export default class CusTimeline extends Component<CusTimelineProps, any> {

  constructor(props: CusTimelineProps) {
    super(props);
  }

  renderSteps(steps: TimelineStep[]) {
    const timelineDot = (index: number) => {
      if (index === 0) {
        return <span className="dotfirst"><Icon type="check" /></span>
      } else {
        return <span className="dots"></span>
      }
    }

    return steps.map((item: TimelineStep, index: number) => {
      return (
        <Timeline.Item key={index} dot={timelineDot(index)}>
          {item.year && <div className="week">{item.year}&nbsp;{item.week}</div>}
          <span className="messageTime">{item.messageTime}</span>
          <span className="statusName">{item.curStatus}</span>
          <span className="message">{item.message}</span>
        </Timeline.Item>
      )
    })
  }

  render() {
    const { steps } = this.props;

    return (
      <Timeline className="timelines">
        {this.renderSteps(steps)}
      </Timeline>
    );
  }
}
