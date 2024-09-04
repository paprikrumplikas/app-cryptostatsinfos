import React from "react";
import ReactDOM from 'react-dom/client';
// @learning to use Links and other stuff, we need to wrap the app with the Router
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

// @crucial
import { ConfigProvider } from 'antd';
import { purple } from '@ant-design/colors';

import App from "./App";

// @crucial @learning antd: this single line imporves the desgin tremendously
import "antd/dist/reset.css"
// @learning redux this is the var we have to provide to our provider
import store from "./app/store";


// @learning @crucial in the backgorung this means that we have an index.html file in the public folder
// and that has one single div with an id of "root".
// Our entire app is gonna go into that div
ReactDOM.createRoot(document.getElementById('root')).render(
    // @learning redux: we need to wrap the entire app intp the provider (like with React's context provider) that has the store as prop
    <Router>
        <Provider store={store}>
            <ConfigProvider theme={{ primary: purple[5] }}>
                <App />
            </ConfigProvider>,
        </Provider>
    </Router >
);