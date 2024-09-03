import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from "antd";

import { useGetCryptosQuery } from '../services/cryptoApi';


const Cryptocurrencies = ({ simplified }) => {
    // @note in a simplified view we limit display to only 10 hits, otherwise 100
    const count = simplified ? 10 : 100;
    // @note we are renaming the data to cryptoList
    const { data: cryptosList, isFetching, error } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    // @learning for the search functionality
    useEffect(() => {
        // filtering
        const filteredData = cryptosList?.data?.coins.filter((coins) => coins.name.toLowerCase().includes(searchTerm.toLowerCase()));
        // setting to state
        setCryptos(filteredData);
    }, [cryptosList, searchTerm])



    // @crucial @learning redux: to prevent errors when the data is still being fetched
    // @crucial conditional is actually preventing the component from trying to render with undefined data.
    if (isFetching) return "Loading...";
    console.log(cryptos);

    return (
        <>
            {/** display the search bar only on the crtocurrencies page, not on homepage */}
            {!simplified &&
                <div className='search-crypto'>
                    <Input
                        placeholder="Search cryptocurrency"
                        onChange={(e) => setSearchTerm(e.target.value)} // @learning for the search func
                    />
                </div>
            }
            {/** gutter is a prop Row components can have in antd, it just adds space */}
            <Row gutter={[32, 32]} className='crypto-card-container'>

                {/** @note we are looping through the cryptos array, and display a col element per each */}
                {/** ? is needed as sometimes cryptos is undefined which we cannot loop thorugh */}

                {cryptos?.map((currency) => (
                    // in antd, Cols can have xs prop that says how to ebhave on small devs. 24 is the max width, ie we say that on mobile lets take the full width */ }
                    <Col
                        key={currency.uuid}
                        xs={24}
                        sm={12}
                        lg={6}
                        className="crypto-card"
                    >
                        {/** the entire card is gonna be a link */}
                        <Link to={`/crypto/${currency.uuid}`} >
                            <Card
                                title={`${currency.rank}. ${currency.name}`} // built-in props for antd's Card comp, the other 2 as well
                                extra={<img className='crypto-image' src={currency.iconUrl} />}
                                hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Marketcap: {millify(currency.marketCap)}</p>
                                <p>Daily change: {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}

            </Row >
        </>
    )
}

export default Cryptocurrencies