import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from "antd";

import { Navbar, Homepage, Exchanges, Cryptocurrencies, News, CryptoDetails } from "./components";
// additional styling
import "./App.css";

export const App = () => {
    return (
        // @note @crucial the className below are custom CSS classes, these are defined in App.css
        // these are gonne be used only for the layout and some minor styling changes, the majority of styling is done via antd
        <div className='app'>
            <div className='navbar'>
                <Navbar />
            </div>
            <div className='main'>
                {/** @note Layout is coming from antd */}
                <Layout>
                    <div className='routes'>
                        {/** @note Routes is coming from react-router-dom, allows us to have multiple routes */}
                        <Routes> {/* Changed from Switch to Routes */}
                            <Route path="/" element={<Homepage />} /> {/* Changed to element prop */}
                            <Route path="/exchanges" element={<Exchanges />} />
                            <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
                            <Route path="/crypto/:coinId" element={<CryptoDetails />} />
                            <Route path="/news" element={<News />} />
                        </Routes>
                    </div>
                </Layout>
                <div className='footer'>
                    {/** @note the inline styles using CSS */}
                    <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
                        Cryptovererse <br />
                        All rights reserved.
                    </Typography.Title>
                    {/** @learning antd: Space is antd's way of saying this is a div, but we add spaces btw the items */}
                    <Space>
                        <Link to="/"></Link>
                        <Link to="/exchanges">Exchanges</Link>
                        <Link to="/news">News</Link>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default App






/* @note was like this, but <Routes> is the newer API that replaces <Switch> in React Router v6 and allows for nested routes and better handling of route elements.
    < div className = 'app' >
            <div className='navbar'>
                <Navbar />
            </div>
            <div className='main'>
                <Layout>
                    <div className='routes'>
                        <Switch>
                            <Route exact path="/">
                                <Homepage />
                            </Route>
                            <Route exact path="/exchanges">
                                <Exchanges />
                            </Route>
                            <Route exact path="/cryptocurrencies">
                                <Cryptocurrencies />
                            </Route>
                            <Route exact path="/crypto/:coinId">
                                <CryptoDetails />
                            </Route>
                            <Route exact path="/news">
                                <News />
                            </Route>
                        </Switch>
                    </div>
                </Layout>
            </div>
            <div className='footer'>

            </div>
        </div >
    )
}

export default App

*/