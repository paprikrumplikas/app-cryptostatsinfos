import React from "react";
import ReactDOM from 'react-dom/client';
// @learning to use Links and other stuff, we need to wrap the app with the Router
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

// @crucial @learning antd: this single line imporves the desgin tremendously
import "antd/dist/reset.css"


// @learning @crucial in the backgorung this means that we have an index.html file in the public folder
// and that has one single div with an id of "root".
// Our entire app is gonna go into that div
ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <App />
    </Router>
);