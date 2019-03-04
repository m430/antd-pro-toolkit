import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { FormattedMessage } from 'umi/locale';
import { Menu } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './MenuView.less';
import { getAuthority } from '@/utils/authority';

const { Item } = Menu;

class MenuView extends Component {
  constructor(props) {
    super(props);
    const { match, location, menuMap } = props;
    const key = location.pathname.replace(`${match.path}/`, '');
    this.state = {
      mode: 'inline',
      menuMap,
      selectKey: menuMap[key] ? key : Object.keys(menuMap)[0],
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { match, location, menuMap } = props;
    let selectKey = location.pathname.replace(`${match.path}/`, '');
    let idx = selectKey.search('/');
    if (idx > -1) {
      selectKey = selectKey.substr(0, idx);
    }
    selectKey = menuMap[selectKey] ? selectKey : Object.keys(menuMap)[0];
    if (selectKey !== state.selectKey) {
      return { selectKey };
    }
    return null;
  }

  getMenu = () => {
    const { menuMap } = this.props;
    return Object.keys(menuMap).map(item => {
      let { hideInMenu } = menuMap[item];
      if (hideInMenu) return;
      return <Item key={item} disabled={menuMap[item].disabled}>{menuMap[item].title}</Item>
    });
  };

  getRightTitle = () => {
    const { menuMap } = this.props;
    const { selectKey } = this.state;
    return menuMap[selectKey].title;
  };

  selectKey = ({ key }) => {
    const { menuMap } = this.props;
    router.push(menuMap[key].path);
    this.setState({
      selectKey: key,
    });
  };

  render() {
    const { children } = this.props;
    const { mode, selectKey } = this.state;
    return (
      <GridContent>
        <div
          className={styles.main}
          ref={ref => {
            this.main = ref;
          }}
        >
          <div className={styles.leftmenu}>
            <Menu mode={mode} selectedKeys={[selectKey]} onClick={this.selectKey}>
              {this.getMenu()}
            </Menu>
          </div>
          <div className={styles.right}>
            {children}
          </div>
        </div>
      </GridContent>
    );
  }
}

export default MenuView;
