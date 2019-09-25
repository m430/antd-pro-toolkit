import React, { Component, Fragment } from 'react';
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

  render() {
    const { steps } = this.props;
    const timelineDot = (index: number) => {
      if (index === 0) {
        return <span className="dotfirst"><Icon type="check" /></span>
      } else {
        return <span className="dots"></span>
      }
    }

    return (
      <div className="timelines">
        <div className="timelinesItem">
          <Timeline>
            {
              steps.map((item: TimelineStep, index: number) => {
                return (
                  <Fragment key={index}>
                    <Timeline.Item dot={timelineDot(index)}>
                      {item.year && <div className="week">{item.year}&nbsp;{item.week}</div>}
                      <span className="messageTime">{item.messageTime}</span>
                      <span className="statusName">{item.curStatus}</span>
                      <span className="trackMessage">{item.message}</span>
                    </Timeline.Item>
                  </Fragment>
                )
              })
            }
          </Timeline>
        </div>
      </div>
    );



  }
}
