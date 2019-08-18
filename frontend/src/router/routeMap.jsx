import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import App from "../container/index.jsx"
import Login from "../container/Login/index.jsx"
import Home from "../container/Home/index.jsx"
import Register from '../container/Register/index.jsx'

class RouteMap extends React.Component {
    updateHandle() {
        console.log('router changed!')
    }
    render() {
        return (
            <Router history={this.props.history} onUpdate={this.updateHandle.bind(this)}>
                
                <Route path='/' component={App}>
                    <IndexRoute component = {Login}/>
                    <Route path='Home' component={Home}/>
                    <Route path='Register' component={Register}/>
                    
                </Route>  
            </Router>
        )
    }
}

export default RouteMap