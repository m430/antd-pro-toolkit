import React from 'react';
import { Tooltip, Avatar } from 'antd';
import classNames from 'classnames';

export interface IAvatarItemProps {
  tips?: React.ReactNode;
  src?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  size?: 'large' | 'small' | 'default' | number;
}

export default class AvatarItem extends React.Component<IAvatarItemProps, any> {

  render() {
    const { src, size, tips, onClick = () => { } } = this.props;

    const cls = classNames("avatarItem", {
      "avatarItemLarge": size === 'large',
      "avatarItemSmall": size === 'small',
    });

    return (
      <li className={cls} onClick={onClick}>
        {tips ? (
          <Tooltip title={tips}>
            <Avatar src={src} size={size} style={{ cursor: 'pointer' }} />
          </Tooltip>
        ) : (
            <Avatar src={src} size={size} />
          )}
      </li>
    );
  }
}