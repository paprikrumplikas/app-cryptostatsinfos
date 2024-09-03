import React from 'react';
import { Link } from "react-router-dom";

import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";

// @learning @crucial We destrcu the title from Typography, so instead of
// <Typography.Title></Typography.Title> we can use <Title></Title>
const { Title } = Typography;


const Homepage = () => {
    return (
        <>
            {/** @note this title has been destructured from typography, see the contstant on top */}
            <Title level={2} className='heading'>Global Crypto Stats</Title>
            <Row>
                {/** @learning antd: in atnd, there are a total of 24 spaces. This span of 12 means that it is gonna take the half of the width of the screens */}
                <Col span={12}>
                    {/** @note a Statistic component is basically a div with a heading and a value*/}
                    <Statistic title="Total Cryptocurrencies" value="5" />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Exchanges" value="5" />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Marketcap" value="5" />
                </Col>
                <Col span={12}>
                    <Statistic title="Total 24h Volume" value="5" />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Markets" value="5" />
                </Col>
            </Row>
        </>
    )
}

export default Homepage