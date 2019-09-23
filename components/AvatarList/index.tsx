import React from 'react';
import AvatarItem, { IAvatarItemProps } from './AvatarItem';

import './style';

export interface IAvatarListProps {
  size?: 'large' | 'small' | 'default' | number;
  style?: React.CSSProperties;
  children: React.ReactElement<IAvatarItemProps> | Array<React.ReactElement<IAvatarItemProps>>;
}

export default class AvatarList extends React.Component<IAvatarListProps, any> {
  public static Item: typeof AvatarItem;

  render() {
    const { children, size, ...other } = this.props;

    const childrenWithProps = React.Children.map(children, (child: React.ReactElement<IAvatarItemProps>) =>
      React.cloneElement(child, {
        size,
      })
    );
    return (
      <div {...other} className="avatarList">
        <ul> {childrenWithProps} </ul>
      </div>
    )
  }
}

AvatarList.Item = AvatarItem;