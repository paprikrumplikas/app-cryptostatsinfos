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
        {/** @crucial @learning redux: allows any component in your application to access and interact with the Redux store using hooks like useSelector and useDispatch, or higher-order components like connect */}
        <Provider store={store}>
            {/** @crucial @learning antd: this is how default styles can be GLOBALLY overwritten with custom values */}
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#333F48', // Using Ant Design's default blue as an example
                        fontSizeHeading2: 24,
                        fontSizeHeading3: 18,
                        colorTextHeading: '#333F48', // Add this line
                        colorText: '#333F48', // Or any color you prefer

                    },
                }}
            >
                <App />
            </ConfigProvider>,
        </Provider>
    </Router >
);