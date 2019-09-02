import React from 'react';

function fixedZero(val: number) {
  return val * 1 < 10 ? `0${val}` : val;
}
const initTime = (props: ICountDownProps) => {
  let lastTime = 0;
  let targetTime = 0;
  try {
    if (Object.prototype.toString.call(props.target) === '[object Date]') {
      targetTime = (props.target as Date).getTime();
    } else {
      targetTime = new Date(props.target).getTime();
    }
  } catch (e) {
    throw new Error(`invalid target prop ${e}`);
  }

  lastTime = targetTime - new Date().getTime();
  return {
    lastTime: lastTime < 0 ? 0 : lastTime,
  };
};

export interface ICountDownProps {
  format?: (time: number) => string | React.ReactNode;
  target: Date | number;
  onEnd?: () => void;
  style?: React.CSSProperties;
}

export default class CountDown extends React.Component<ICountDownProps, any> {
  timer = 0;

  interval = 1000;

  constructor(props: ICountDownProps) {
    super(props);
    const { lastTime } = initTime(props);
    this.state = {
      lastTime,
    };
  }

  static getDerivedStateFromProps(nextProps: ICountDownProps, preState: any) {
    const { lastTime } = initTime(nextProps);
    if (preState.lastTime !== lastTime) {
      return {
        lastTime,
      };
    }
    return null;
  }

  componentDidMount() {
    this.tick();
  }

  componentDidUpdate(prevProps: ICountDownProps) {
    const { target } = this.props;
    if (target !== prevProps.target) {
      clearTimeout(this.timer);
      this.tick();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  defaultFormat = (time: number) => {
    const hours = 60 * 60 * 1000;
    const minutes = 60 * 1000;

    const h = Math.floor(time / hours);
    const m = Math.floor((time - h * hours) / minutes);
    const s = Math.floor((time - h * hours - m * minutes) / 1000);
    return (
      <span>
        {fixedZero(h)}:{fixedZero(m)}:{fixedZero(s)}
      </span>
    );
  };

  tick = () => {
    const { onEnd } = this.props;
    let { lastTime } = this.state;

    this.timer = window.setTimeout(() => {
      if (lastTime < this.interval) {
        clearTimeout(this.timer);
        this.setState(
          {
            lastTime: 0,
          },
          () => {
            if (onEnd) {
              onEnd();
            }
          }
        );
      } else {
        lastTime -= this.interval;
        this.setState(
          {
            lastTime,
          },
          () => {
            this.tick();
          }
        );
      }
    }, this.interval);
  };

  render() {
    const { format = this.defaultFormat, onEnd, ...rest } = this.props;
    const { lastTime } = this.state;
    const result = format(lastTime);

    return <span {...rest}>{result}</span>;
  }
}