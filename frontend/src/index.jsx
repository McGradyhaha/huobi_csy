import React from 'react';
import {render}	from 'react-dom';
import {Provider} from 'react-redux';
import {hashHistory} from 'react-router'
import configureStore from './store/configureStore.js'

import 'antd/dist/antd.css';

import RouteMap from './router/routeMap.jsx';

const store = configureStore()

render(
    <Provider store = {store}>
        <RouteMap history={hashHistory}/>
    </Provider>,
    document.getElementById('root')
);

