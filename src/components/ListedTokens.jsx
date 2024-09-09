import React, { useState } from 'react';
import { useGetListedTokensQuery } from '../services/cryptoMarketsApi';
import { Row, Col, Typography, Button } from "antd";


const { Title, Text } = Typography;

const ListedTokens = ({ exchange }) => {


    const { data: listedTokens, isFetching, error } = useGetListedTokensQuery(exchange);
    // to track whether the "More button has been pressed - if yes, all listed tokens are gonna be displayed"
    const [showAll, setShowAll] = useState(false);

    if (isFetching) return "Loading...";

    // initially display only 5 lsited
    const initialTokens = listedTokens?.data?.tokens.slice(0, 5);
    // display all the listed (once more button is pressed)
    const remainingTokens = listedTokens?.data?.tokens.slice(5);


    return (
        <>
            <Col className='coin-value-statistics'>
                <Row justify="space-between" align="middle">
                    <Title className='custom-text-color-2' level={5}> Listed cryptocurrencies </Title>
                    <Title className='custom-text-color-2' level={5}> Price in USD </Title>
                </Row>

                {initialTokens?.map((token, i) => (
                    <Col className='coin-stats' key={i}>
                        <Col className='coin-stats-name'>
                            <Text>{token.symbol}</Text>
                        </Col>
                        <Text>{token.price}</Text>
                    </Col>
                ))}


                {/** @note if all listed tokens is more than 5, display a "more" button */}
                {!showAll && remainingTokens?.length > 0 && (
                    <Button
                        onClick={() => setShowAll(true)}
                        style={{ backgroundColor: '#333F48', color: '#BAC4D0' }}
                    >
                        More
                    </Button>
                )}


                {/** @note if all listed tokens is more than 5, and More button has been pressed, display remaining tokens (and do not display the button) */}
                {showAll && remainingTokens?.map((token, i) => (
                    <Col className='coin-stats' key={i + 5}>
                        <Col className='coin-stats-name'>
                            <Text>{token.symbol}</Text>
                        </Col>
                        <Text>{token.price}</Text>
                    </Col>
                ))}
            </Col>
        </>
    )
}

export default ListedTokens