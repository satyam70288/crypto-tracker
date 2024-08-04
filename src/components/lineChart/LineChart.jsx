import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts'; // Ensure this import is correct for your charting library

const LineChart = ({ historicalData }) => {
    const [data, setData] = useState([["Date", "Price"]]);
     console.log(historicalData.prices)
    useEffect(() => {
        if (historicalData && historicalData.prices) {
            try {
                const dataCopy = [["Date", "Price"]];
                historicalData.prices.forEach((item) => {
                    // Validate item[0] and item[1]
                    if (Array.isArray(item) && item.length === 2) {
                        const date = new Date(item[0]).toLocaleDateString(); // Format the date
                        const price = item[1];
                        dataCopy.push([date, price]);
                    }
                });
                setData(dataCopy);
            } catch (error) {
                console.error("Error processing historical data:", error);
            }
        }
    }, [historicalData]);

    return (
        <div style={{ width: '100%', height: '400px' }}> {/* Set appropriate height */}
            <Chart
                chartType="LineChart"
                data={data}
                width="100%"
                height="75%"
                legendToggle
                border
            />
        </div>
    );
};

export default LineChart;
