import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
// to parse date time
import moment from "moment";

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImgUrl = "https://www.freevector.com/uploads/vector/preview/3990/FreeVector-No-Signal-TV.jpg"

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState("cryptocurrency");

    // if we are in the simplified version, we want only 6 hits, otherwise 12
    const count = simplified ? 6 : 12;
    // we raname the data to cryptoNews
    const { data: cryptoNews, isFetching, error } = useGetCryptoNewsQuery({ searchTerm: newsCategory, count });
    // needed for the options
    const { data } = useGetCryptosQuery(100);


    // @note not allow the component to mount while data is being fetched. This way, data will not be undefined
    if (isFetching) return 'Loading...';
    console.log(cryptoNews);

    // @note API was not respecting the limit specified for the number of hits, so use client-side limiting
    const displayedNews = cryptoNews?.items?.slice(0, count) || [];
    console.log("Displayed:", displayedNews);



    return (
        <Row gutter={[24, 24]}>

            {/** @note creates a dropdown with the top100 cryptos and when a user selects one, news specific to that selected coin will appear */}
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className='select-news'
                        placeholder="Select a crypto for coin-specific news"
                        optionFilterProp="children"
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        style={{ width: '100%' }} // Set the width to 100% of the parent container

                    >
                        <Option value="cryptocurrency"></Option>
                        {data?.data?.coins.map((coin) =>
                            <Option value={coin.name}>{coin.name}</Option>)}
                    </Select>
                </Col>
            )}

            {
                displayedNews.map((news, i) => (
                    <Col
                        xs={24}
                        sm={12}
                        lg={8}
                        key={i} // @note index of the array we are mapping over
                    >
                        <Card hoverable className='news-card'>
                            <a href={news.newsUrl} target="_blank" rel="noreferrer">
                                <div className='news-image-container'>
                                    <Title className='news-title' level={4}>
                                        {news.title.length > 75 ?
                                            `${news.title.substring(0, 75)} ...`
                                            : news.title}                                    </Title>
                                    <img
                                        src={news?.images?.thumbnailProxied || demoImgUrl}
                                        alt="news"
                                    />
                                </div>
                                <p>
                                    {/** @learning @custom This code uses the padEnd method to add non-breaking spaces (\u00A0) to the end of the snippet until it reaches a length of 200 characters. 
                                     * This ensures that all snippets will take up the same amount of space in the layout. 
                                     * Conseqeuntly, the elements in the div below will be verticylla aligned on each card.*/}
                                    {news.snippet.length > 200
                                        ? `${news.snippet.substring(0, 200)} ...`
                                        : news.snippet.padEnd(200, '\u00A0')}
                                </p>
                            </a>
                            <div className='provider-container'>
                                {/*  <Avatar src={"https://www.nasdaq.com/sites/acquia.prod/files/styles/355x355/public/2022/11/09/coindesksquare.jpg?h=7afb1587&itok=JGZKh9A6" || demoImgUrl} alt="news" /> */}
                                <Text>{moment.unix(news.timestamp / 1000).startOf('ss').fromNow()}</Text>
                                <Text className='provider-name'>{news.publisher}</Text>
                            </div>
                        </Card>
                    </Col>
                ))
            }
        </Row>
    )
}

export default News