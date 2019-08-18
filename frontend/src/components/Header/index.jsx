import {Menu} from 'antd'
import React, { Component } from 'react';

class Header extends Component{
    render() {
        return (
            <div className="Header">
              <div className="logo" />
              <Menu
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="1">Block 1</Menu.Item>
                <Menu.Item key="2">Block 2</Menu.Item>
                <Menu.Item key="3">Block 3</Menu.Item>
              </Menu>
            </div>
          );
    }
}

export default Header