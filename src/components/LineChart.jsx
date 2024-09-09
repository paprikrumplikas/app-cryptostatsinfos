import React from 'react';
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";

// @custom, otherwise errors around the chart
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title as ChartTitle,
    Tooltip,
    Legend
} from 'chart.js';

// @custom, otherwise errors around the chart
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ChartTitle,
    Tooltip,
    Legend
);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    const coinPrice = [];
    const coinTimeStamp = [];

    {/** @note we are pushing each price 1 by 1 to the coinPrice array */ }
    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinPrice.push(coinHistory.data.history[i].price);
        coinTimeStamp.push(new Date(coinHistory.data.history[i].timestamp * 1000).toLocaleString());
    }

    /** @learning to create a linechart, we need the Line component from react-charts
     * <Line> needs 2 objects as params: data and options
     */
    const data = {
        labels: coinTimeStamp,
        datasets: [{
            label: "Price in USD",
            data: coinPrice,
            fill: false,
            backgroundColor: "#333F48",
            borderColor: "#333F48"
        }]
    }


    const options = {
        scales: {
            y: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    }

    return (
        <>
            <Row className='chart-header'>
                <Title level={2} className='chart-title'>{coinName}</Title>
                <Col className='price-container'>
                    <Title level={5} className='price-change'>{coinHistory?.data?.change}%</Title>
                    <Title level={5} className='current-price'>Current {coinName} Price: $ {currentPrice}</Title>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </>
    )
}

export default LineChart