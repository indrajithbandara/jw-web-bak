import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {Router, Route,IndexRoute, HistoryHandle} from './lib/router_helper';
import FastClick from 'fastclick';

// lib
import './lib/date_helper';

// components
import App from './components/app';

//globalConfig
import globalConfig from './config/CONFIG';

// css bootstrap
import 'bootstrap/dist/css/bootstrap.css';
// css custom
import './app.css';


const rootRoute = {
  childRoutes: [
    {
      path: '/',
      component: App
    }
  ]
}

ReactDOM.render(
  <Router history={HistoryHandle} routes={rootRoute}/>, document.getElementById('root'))
