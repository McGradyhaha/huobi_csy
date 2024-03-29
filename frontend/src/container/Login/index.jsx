
import React from 'react'
import {Form, Icon, Input, Button, Checkbox, Alert, Menu} from 'antd';
import './style.css'
import {hashHistory} from "react-router";
import {bindActionCreators} from "redux";
import * as userinfoActions from "../../actions/userinfo";
import connect from "react-redux/es/connect/connect";
import {postLogin} from "../../fetch/User/Login/login.js";


const FormItem = Form.Item;
const onClose = function (e) {
    console.log(e, 'I was closed.');
};
const supStyle = {
    fontSize: '20px',
    fontWeight: 'bold'
}



class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: '',
            password: '',
            keepLogin: false,
            no_error: true
        }
    }

    // login
    submitHandler(){
        /*
        const that = this
        const username = this.state.username
        const password = this.state.password
        const keepLogin = this.state.keepLogin
        const dict = {
            email: username,
            password: password,
            remember: keepLogin
        };
        console.log("dict is ", JSON.stringify(dict))
        
        const result = postLogin(dict)
        result.then(res => {
            return res.json()
        }).then(json => {
            console.log(json)
            if(json.type.code == 202){

                this.props.userinfoActions.login({
                    username: username
                })
                console.log('hello device')
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

    onChange(e) {
        this.setState({
            keepLogin: e.target.value
        })
        console.log(`checked = ${e.target.checked}`);
    }

    // change password in input
    onChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }

    render() {
        return (
            <div >
                {
                    this.state.no_error
                        ?<div style={{marginLeft: '300px', marginTop: '200px'}}>
                            <Form className="login-form">
                                <FormItem>
                                    <span style ={supStyle}>Login</span>
                                </FormItem>
                                <FormItem>
                                    <Input
                                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        placeholder="Enter your Email"
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
                                    <Checkbox onChange={this.onChange}>Keep my login</Checkbox>
                                </FormItem>
                                <FormItem>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                        onClick={this.submitHandler.bind(this)}
                                    >
                                        Log in
                                    </Button>
                                    Or <a href="#/Register">register now!</a>
                                </FormItem>
                            </Form>
                        </div>
                        :<div style={{marginLeft: '300px', marginTop: '200px'}}>

                            <Alert
                                message="Error!!!"
                                description="Wrong credentials, Try again"
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
)(Login)