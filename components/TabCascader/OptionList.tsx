import React, { Component, useRef, useState, useImperativeHandle } from 'react';
import classNames from 'classnames';
import KeyCode from 'rc-util/lib/KeyCode';
import List from 'rc-virtual-list';
import Option from './Option';
import { Item } from './index';

export interface IOptionListProps {
  data: Array<Item>;
  onSelect: (item: Item) => void;
  onToggle: (open?: boolean) => void;
  notFoundContent?: React.ReactNode;
}

export interface RefOptionListProps {
  onKeyDown: React.KeyboardEventHandler;
}

const OptionList: React.RefForwardingComponent<
  RefOptionListProps,
  IOptionListProps
> = (
  {
    data,
    onSelect,
    onToggle,
    notFoundContent
  },
  ref
) => {
    const listRef = useRef<List>(null);

    const scrollIntoView = (index: number) => {
      if (listRef.current) {
        listRef.current.scrollTo({ index });
      }
    }

    const getActiveIndex = (index: number, offset: number = 1): number => {
      const len = data.length;

      for (let i = 1; i < len; i++) {
        const current = (index + i * offset + len) % len;
        return current;
      }
      return -1;
    }

    const [activeIndex, setActiveIndex] = useState(() => getActiveIndex(0));


    // ================== Keyboard =========================
    useImperativeHandle(ref, () => ({
      onKeyDown: e => {
        const { which } = e;
        switch (which) {
          case KeyCode.UP:
          case KeyCode.DOWN: {
            let offset = 0;
            if (which === KeyCode.UP) {
              offset = -1;
            } else if (which === KeyCode.DOWN) {
              offset = 1;
            }
    
            if (offset !== 0) {
              const nextActiveIndex = getActiveIndex(activeIndex, offset);
              scrollIntoView(nextActiveIndex);
              setActiveIndex(nextActiveIndex);
            }
    
            break;
          }
    
          case KeyCode.ENTER: {
            const selectItem = data[activeIndex];
            onSelect(selectItem);
    
            break;
          }
    
          case KeyCode.ESC: {
            onToggle(false);
          }
        }
      }
    }));

    

  }

export default class OptionList extends Component<IOptionListProps, any> {
  listRef: React.RefObject<List>;

  constructor(props: IOptionListProps) {
    super(props);
    this.state = {
      activeIndex: 0
    };
    this.listRef = React.createRef();
  }

  getActiveIndex = (index: number, offset: number = 1): number => {
    const { data } = this.props;
    const len = data.length;

    for (let i = 1; i < len; i++) {
      const current = (index + i * offset + len) % len;
      return current;
    }
    return -1;
  }

  scrollIntoView = (index: number) => {
    if (this.listRef.current) {
      this.listRef.current.scrollTo({ index });
    }
  }

  onKeyDown = (e: React.KeyboardEvent) => {
    const { data, onSelect, onToggle } = this.props;
    const { activeIndex } = this.state;

    const { which } = e;
    switch (which) {
      case KeyCode.UP:
      case KeyCode.DOWN: {
        let offset = 0;
        if (which === KeyCode.UP) {
          offset = -1;
        } else if (which === KeyCode.DOWN) {
          offset = 1;
        }

        if (offset !== 0) {
          const nextActiveIndex = this.getActiveIndex(activeIndex, offset);
          this.scrollIntoView(nextActiveIndex);
          this.setState({ activeIndex: nextActiveIndex });
        }

        break;
      }

      case KeyCode.ENTER: {
        const selectItem = data[activeIndex];
        onSelect(selectItem);

        break;
      }

      case KeyCode.ESC: {
        onToggle(false);
      }
    }
  }

  handleScroll = (e: React.UIEvent<HTMLElement>) => {
    console.log(e);
  }

  handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  }

  render() {
    const { data, onSelect } = this.props;
    return (
      <List<Item>
        itemKey="key"
        ref={this.listRef}
        data={data}
        height={200}
        itemHeight={40}
        fullHeight={false}
        onKeyDown={this.onKeyDown}
        onScroll={this.handleScroll}
        onMouseDown={this.handleMouseDown}
      >
        {(item, itemIndex) => {

          const optionClassName = classNames('')
          return <Option item={item} onClick={onSelect} />
        }}
      </List>
    )
  }
}