import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { Button, Menu, Typography, Avatar } from "antd";
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from "@ant-design/icons";

import icon from '../images/cryptocurrency.png';


const Navbar = () => {

    // @note @learning to decide whether to display the nav or sidebar
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);

    // @note @learning to decide whether to display the nav or sidebar
    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize)
    }, []);

    // @note @learning to decide whether to display the nav or sidebar
    useEffect(() => {
        if (screenSize < 760) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize])

    // @custom, as Menu.Item approach was depracated
    // @custom @learning this is where i needed to set the text of menu items text
    const menuItems = [
        { key: 'home', icon: <HomeOutlined className='custom-menu-icon' />, label: <Link to="/" className="custom-menu">Home</Link> },
        { key: 'cryptocurrencies', icon: <FundOutlined className='custom-menu-icon' />, label: <Link to="/cryptocurrencies" className="custom-menu">Cryptocurrencies</Link> },
        { key: 'exchanges', icon: <MoneyCollectOutlined className='custom-menu-icon' />, label: <Link to="/exchanges" className="custom-menu">Exchanges</Link> },
        { key: 'news', icon: <BulbOutlined className='custom-menu-icon' />, label: <Link to="/news" className="custom-menu">News</Link> },
    ];


    return (
        <div className='nav-container'>
            <div className='logo-container'>
                <Avatar
                    src={icon}
                    size="large"
                />
                <Typography.Title level={2} className='logo' />
                <Link to="/" className='custom-menu'>CryptoStats</Link>

                <Button
                    className='menu-control-container'
                    onClick={() => setActiveMenu(true)}
                >
                    <MenuOutlined />
                </Button>
            </div>

            {/** @note @learning render the menu only if activeMenu is true (i.e. screensizes bigger then 760) */}
            {activeMenu && (
                < Menu theme="white" items={menuItems} className='custom-menu' />
            )}

        </div >
    )
}

export default Navbar;