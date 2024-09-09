import React from 'react';
import { Row, Col, Typography, Collapse } from "antd";
import { useGetCryptoMarketsQuery } from '../services/cryptoMarketsApi';

import { ListedTokens } from '../components';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
    const { data: exchanges, isFetching, error } = useGetCryptoMarketsQuery();

    if (isFetching) return "Loading...";
    console.log("exchanges", exchanges);





    return (
        <>
            <div className='home-heading-container'>
                <Title level={2} className='home-title'>Supported Crypto Exchanges and the Tokens Listed on Each</Title>
            </div>

            <div className='extra-margin-top-custom'>
                <Col className='coin-value-statistics'>
                    <Collapse className='custom-collapse'>
                        {exchanges?.data?.exchanges.map((exchange, i) => (

                            // @note dropdown element
                            <Panel
                                header={
                                    <Row>
                                        <Col span={8}><Text className="custom-text-color-1" strong>{exchange.name}</Text></Col>
                                        <Col span={8}><Text className="custom-text-color-1">{exchange.type}</Text></Col>
                                        <Col span={8}><a href={exchange.website} target="_blank" rel="noopener noreferrer">{exchange.website}</a></Col>
                                    </Row>
                                }
                                key={i}
                            >
                                {/** @note listed tokens coming form another component */}
                                <ListedTokens exchange={exchange.name} />
                            </Panel>
                        ))}
                    </Collapse>

                    <Row className='vertical-space'>&nbsp;</Row>

                </Col>
            </div >
        </>
    )
}

export default Exchanges;