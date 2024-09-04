import React, { useState, useEffect } from 'react';
import HTMLReactParser from 'html-react-parser/lib/index';
import { useParams, useSearchParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetPriceHistoryQuery } from '../services/cryptoApi';
import { LineChart } from "../components";
import { Line } from 'react-chartjs-2';

// @note so that we dont have to type Typography.Title and stuff each time
const { Title, Text } = Typography;
const { Option } = Select;


const CryptoDetails = () => {
    // @learning object destructuring to extract the uiid parameter from the URL parameters provided by the useParams hook from react-router-dom. It then renames this parameter to coinId
    // @learning @crucial @syntax When you destructure uuid from useParams and rename it to coinId, you are essentially creating a local variable coinId that holds the value of uuid.
    const { uuid: coinId } = useParams();
    const [timePeriod, setTimePeriod] = useState("7d");
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
    const cryptoDetails = data?.data?.coin;
    // @learning @crucial @syntax By using { uuid: coinId, timePeriod }, you are creating an object where the key uuid is assigned the value of coinId. This ensures that the parameter names match what the query function expects.
    const { data: coinHistory, isFetching: isLoading } = useGetPriceHistoryQuery({ uuid: coinId, timePeriod });


    // @note do not mount the component until data is not fetched
    if (isFetching) return "Loading...";
    if (isLoading) return "Loading...";




    const time = ['3h', '24h', '7d', '30d', '3m', '6m', '1y', '3y', '5y'];

    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails?.['24hVolume'] && millify(cryptoDetails?.['24hVolume'])}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Approved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
    ];


    return (
        <Col className='coin-detail-container'>

            <Col className='coin-heading-container'>
                <Title level={2} className='coin-name'>
                    {cryptoDetails.name} ({cryptoDetails.symbol}) Price
                </Title>
                <p>{cryptoDetails.name} live price in US dollars.
                    view price statistics, market cap and supply.
                </p>
            </Col>

            <Select
                defaultValue="7d"
                className='select-timeperiod'
                placeholder="Select time period"
                onChange={(value) => setTimePeriod(value)}
            >

                {/** loop over the options, i.e. the dates specified in the time array */}
                {time.map((date) => <Option key={date}>{date}</Option>)}
            </Select>

            <LineChart
                coinHistory={coinHistory}
                currentPrice={millify(cryptoDetails.price)}
                coinName={cryptoDetails.name}
            />

            <Col className='stats-container'>

                <Col className='coin-value-statistics'>
                    <Col className='coin.value-statistics-heading'>
                        <Title level={3} className='coin-details-headin'>{cryptoDetails.name} value statistics</Title>
                        <p>An overview showing the stats of {cryptoDetails.name}</p>
                    </Col>
                    {stats.map(({ icon, title, value }, i) => (
                        <Col className='coin-stats' key={i}>
                            <Col className='coin-stats-name'>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>{value}</Text>
                        </Col>
                    ))}
                </Col>

                <Col className='other-stats-info'>
                    <Col className='coin.value-statistics-heading'>
                        <Title level={3} className='coin-details-headin'>Crypto Market Statistics</Title>
                        <p>Overview of the stats of all cryptocurrencies</p>
                    </Col>
                    {genericStats.map(({ icon, title, value }, i) => (
                        <Col className='coin-stats' key={i}>
                            <Col className='coin-stats-name'>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>{value}</Text>
                        </Col>
                    ))}
                </Col>
            </Col>
            <Col className='coin-desc-link'>
                <Row className='coin-desc'>
                    <Title level={3} className='coin-details-heading'>
                        What is {cryptoDetails.name}?
                    </Title>
                    <p>{cryptoDetails.description}</p>
                </Row>
                <Col className='coin-links'>
                    <Title level={3} className='coin-details-heading'>
                        {cryptoDetails.name} Links
                    </Title>
                    {cryptoDetails.links.map((link) =>
                        <Row className='coin-link' key={link.name}>
                            <Title level={5} className='link-name'>
                                {link.type}
                            </Title>
                            <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
                        </Row>)}
                </Col>
            </Col>
        </Col >
    )
}

export default CryptoDetails