import React, { useRef, useState, useImperativeHandle } from 'react';
import classNames from 'classnames';
import KeyCode from 'rc-util/lib/KeyCode';
import List from 'rc-virtual-list';
import Option from './Option';
import { Item } from './index';

type KeyFunc = (item: Item) => string;

export interface IOptionListProps {
  prefixCls: any;
  data: Array<Item>;
  height: number;
  itemKey: string | KeyFunc;
  itemHeight: number;
  searchValue?: string;
  notFoundContent?: React.ReactNode;
  onSelect: (item: Item) => void;
  onToggle?: (open?: boolean) => void;
  onScroll?: React.UIEventHandler<HTMLDivElement>;
}

export interface RefOptionListProps {
  onKeyDown: React.KeyboardEventHandler;
}

const OptionList: React.RefForwardingComponent<
  RefOptionListProps,
  IOptionListProps
> = (
  {
    prefixCls,
    data,
    itemKey = "key",
    height,
    itemHeight,
    onSelect,
    onToggle,
    onScroll,
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

      for (let i = 0; i < len; i++) {
        const current = (index + i * offset + len) % len;
        return current;
      }
      return -1;
    }

    const [activeIndex, setActiveIndex] = useState(() => getActiveIndex(0));

    const onListMouseDown: React.MouseEventHandler<HTMLDivElement> = e => {
      e.preventDefault();
    }


    // ================= Keyboard =================
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
              const nextActiveIndex = getActiveIndex(activeIndex + offset, offset);
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
            if (onToggle) {
              onToggle(false);
            }
          }
        }
      }
    }));

    // ================= render =================
    if (data.length === 0) {
      return (
        <div
          className={`${prefixCls}-empty`}
          onMouseDown={onListMouseDown}
        >
          {notFoundContent}
        </div>
      )
    }

    return (
      <List<Item>
        component="ul"
        className={`${prefixCls}-list`}
        itemKey={itemKey}
        ref={listRef}
        data={data}
        height={height}
        itemHeight={itemHeight}
        fullHeight={false}
        onScroll={onScroll}
        onMouseDown={onListMouseDown}
      >
        {(item, itemIndex) => {

          const optionPrefixCls = `${prefixCls}-list-option`;
          const optionClassName = classNames({
            [`${optionPrefixCls}__active`]: activeIndex === itemIndex
          })

          return <Option
            prefixCls={prefixCls}
            className={optionClassName}
            item={item}
            onClick={onSelect}
          />
        }}
      </List>
    );
  };

const RefOptionList = React.forwardRef<RefOptionListProps, IOptionListProps>(OptionList);
RefOptionList.displayName = "OptionList";

export default RefOptionList;



