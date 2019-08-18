import React from 'react'

import {Form, Icon, Input, Button, Checkbox, Alert} from 'antd';
import '../Login/style.css'
import {hashHistory} from "react-router";
import {bindActionCreators} from "redux";
import * as userinfoActions from "../../actions/userinfo";
import connect from "react-redux/es/connect/connect";
import {postRegister} from "../../fetch/User/Register/register.js";

const FormItem = Form.Item;
const supStyle = {
    fontSize: '20px',
    fontWeight: 'bold'
}

class Register extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: '',
            password: '',
            email: '',
            no_error:true
        }
    }

    // login
    submitHandler(){
        /*
        const that = this
        const username = this.state.username
        const password = this.state.password
        const email = this.state.email
        const dict = {
            email: email,
            password: password,
            username: username
        };
        console.log("dict is ", JSON.stringify(dict))

        const result = postRegister(dict)
        result.then(res => {
            return res.json()
        }).then(json => {
            console.log(json)
            if(json.type.code == 212){

                this.props.userinfoActions.login({
                    username: username
                })
                console.log(json.type.code)
            }
            else{
                that.setState({
                    no_error: false
                })
            }

        })
        */
       hashHistory.push('Home')  
    }

    
    // change username in input
    onChangeUserName(e){
        this.setState({
            username: e.target.value
        })
    }

    // change password in input
    onChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        })
    }


    render(){
        return (
            <div >
                {
                    this.state.no_error
                        ?<div style={{marginLeft: '300px', marginTop: '100px'}}>
                            <Form className="login-form">
                                <FormItem>
                                    <span style ={supStyle}>Register</span>
                                </FormItem>
                                <FormItem>
                                    <Input
                                        prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        placeholder="Enter your Email"
                                        value={this.state.email}
                                        onChange = {this.onChangeEmail.bind(this)}/>
                                </FormItem>
                                <FormItem>
                                    <Input
                                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        placeholder="Enter your Username"
                                        value={this.state.username}
                                        onChange = {this.onChangeUserName.bind(this)}/>
                                </FormItem>
                                <FormItem>
                                    <Input
                                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        type="password"
                                        placeholder="Enter your Password"
                                        value={this.state.password}
                                        onChange = {this.onChangePassword.bind(this)}/>
                                </FormItem>
                                <FormItem>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                        onClick={this.submitHandler.bind(this)}
                                    >
                                        Register
                                    </Button>
                                </FormItem>
                            </Form>
                         </div>
                        :<div style={{marginLeft: '300px', marginTop: '100px'}}>
                            <Form className="login-form">
                                <FormItem>
                                    <span style ={supStyle}>Register</span>
                                </FormItem>
                                <FormItem>
                                    <Input
                                        prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        placeholder="Enter your Email"
                                        value={this.state.email}
                                        onChange = {this.onChangeEmail.bind(this)}/>
                                </FormItem>
                                <FormItem>
                                    <Input
                                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        placeholder="Enter your Username"
                                        value={this.state.username}
                                        onChange = {this.onChangeUserName.bind(this)}/>
                                </FormItem>
                                <FormItem>
                                    <Input
                                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        type="password"
                                        placeholder="Enter your Password"
                                        value={this.state.password}
                                        onChange = {this.onChangePassword.bind(this)}/>
                                </FormItem>
                                <FormItem>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                        onClick={this.submitHandler.bind(this)}
                                    >
                                        Register
                                    </Button>
                                </FormItem>
                            </Form>
                            <Alert
                                message="Error!!!"
                                description="This email has registed Try again"
                                type="error"
                                closable
                            />
                        </div>
                }
            </div>
        )
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
)(Register)