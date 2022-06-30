import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "antd/dist/antd.css";
import reportWebVitals from './reportWebVitals';
import './i18Next';

import * as signalR from '@aspnet/signalr'

//setup redux
import { Provider } from 'react-redux';
import store from './redux/configStore';
import { DOMAIN } from './util/setting/config';

export const connection = new signalR.HubConnectionBuilder().withUrl(`${DOMAIN}/DatVeHub`).configureLogging(signalR.LogLevel.Information).build();
connection.start().then(() => {
    ReactDOM.render( < Provider store = { store } >
        <
        App / >
        <
        /Provider> ,
        document.getElementById('root')
    );
}).catch(errors => {
    console.log(errors);
})


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();