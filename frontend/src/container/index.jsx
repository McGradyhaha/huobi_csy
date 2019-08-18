import React, { Component } from 'react';
import { Switch, Layout, Menu, Breadcrumb, Icon } from 'antd';
import Header from '../components/Header/index.jsx'
import Footer from '../components/Footer/index.jsx'
import Dialog from '../components/chatDialog/index.jsx'
import {hashHistory} from "react-router";
import {bindActionCreators} from "redux";
import * as userinfoActions from "../actions/userinfo";
import connect from "react-redux/es/connect/connect";
import LeftSiderBar from '../components/LeftSider/index.jsx'

const {Sider, Content} = Layout
const { SubMenu } = Menu;

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        initDone: false
    }
  }

  render() {
    return (
      <div className="App">
        <Layout>
          <Header/>
          <Content style={{ padding: '0 50px', height:'800px'}}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Layout style={{ padding: '24px 0', background: '#fff'}}>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%' }}
                >
                  <SubMenu
                    key="sub1"
                    title={
                      <span>
                        <Icon type="user" />
                        subnav 1
                      </span>
                    }
                  >
                    <Menu.Item key="1">option1</Menu.Item>
                    <Menu.Item key="2">option2</Menu.Item>
                    <Menu.Item key="3">option3</Menu.Item>
                    <Menu.Item key="4">option4</Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub2"
                    title={
                      <span>
                        <Icon type="laptop" />
                        subnav 2
                      </span>
                    }
                  >
                    <Menu.Item key="5">option5</Menu.Item>
                    <Menu.Item key="6">option6</Menu.Item>
                    <Menu.Item key="7">option7</Menu.Item>
                    <Menu.Item key="8">option8</Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub3"
                    title={
                      <span>
                        <Icon type="notification" />
                        subnav 3
                      </span>
                    }
                  >
                    <Menu.Item key="9">option9</Menu.Item>
                    <Menu.Item key="10">option10</Menu.Item>
                    <Menu.Item key="11">option11</Menu.Item>
                    <Menu.Item key="12">option12</Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: 600 }}>
                  {this.props.children}
              </Content>
            </Layout>
          </Content>
        </Layout>
        <Dialog/>,
      </div>
     )
  }


  componentDidMount(){
    this.props.userinfoActions.login({
        ifLogin:true
        })
    this.checkIfLogin()
  }

  checkIfLogin(){
    const userinfo = this.props.userinfo
    if (userinfo.username){
        // already login
        this.props.userinfoActions.login({
            ifLogin:true

        })
    }else{
        // not login
  }
 }
}

  

function mapStateToProps(state) {
  return {
      userinfo: state.userinfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
      userinfoActions: bindActionCreators(userinfoActions, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

