import React from 'react'

import { Menu, Input, Icon} from 'antd'
import {hashHistory} from 'react-router'



class LeftSideBar extends React.Component {
    constructor(props, context) {
        super(props, context);
        
    }
    render(){
        return (
                <div className='sideMenu'>

                    <Menu
                        style={{width: 256}}
                        mode="vertical"
                        style={{ height: '100%', borderRight:0 }}
                    >
                        <Menu.Item key="view">
                            <Icon type="video-camera" />
                            3D View
                        </Menu.Item>
                        <Menu.Item key="detail">
                            <Icon type="user"/>
                            Movie Details
                        </Menu.Item>
                        <Menu.Item key="recommend">
                            <Icon type="star" />
                            Movie Recommendation
                        </Menu.Item>
                        <Menu.Item key="filter">
                            <Icon type="star" />
                            Movie Filter
                        </Menu.Item>
                        <Menu.Item key="actor">
                            <Icon type="star" />
                            Movie by Actor
                        </Menu.Item>
                        
                    </Menu>
                </div>
        )
    }
    clickHandler(value) {
        
    }
}

export default LeftSideBar