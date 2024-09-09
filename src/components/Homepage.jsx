import React from 'react';
import { Link } from "react-router-dom";

import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";

import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News } from '../components';

// @learning @crucial We destrcu the title from Typography, so instead of
// <Typography.Title></Typography.Title> we can use <Title></Title>
const { Title } = Typography;


const Homepage = () => {
    // @learning redux: redux also gives us isFetching
    const { data, isFetching, error } = useGetCryptosQuery(10); // limiting hits to 10
    if (isFetching) return 'Loading...';

    // @learning redux: this is how we get data
    const globalStats = data?.data?.stats;
    console.log(data);


    return (
        <>
            {/** @note this title has been destructured from typography, see the contstant on top */}
            <Title level={2} className='heading'>Global Crypto Stats</Title>
            <Row>
                {/** @learning antd: in atnd, there are a total of 24 spaces. This span of 12 means that it is gonna take the half of the width of the screens */}
                <Col span={12}>
                    {/** @note a Statistic component is basically a div with a heading and a value*/}
                    <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Marketcap" value={millify(globalStats.totalMarketCap)} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} />
                </Col>
            </Row>


            <div className='home-heading-container'>
                <Title level={2}>Top 12 Cryptocurrencies in the World</Title>
                <Title level={3}><Link to="/cryptocurrencies">Show more</Link></Title>
            </div>
            {/** @note this displays the little cards */}
            <Cryptocurrencies simplified={true} />


            <div className='home-heading-container'>
                <Title level={2} className='home-title'>Latest Crypto News</Title>
                <Title level={3} className='show-more'><Link to="/news">Show more</Link></Title>
            </div>
            <News simplified={true} />
        </>
    )
}

export default Homepage