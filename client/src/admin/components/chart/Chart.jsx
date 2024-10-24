import React from 'react';
import './chart.css';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = ({title, data, dataKey, grid}) => {
  return (
    <div className="chart">
        <h3 className="chartTitle">{title}</h3>
        <ResponsiveContainer width="100%" aspect={4/1}>
            <LineChart data={data}>
                <XAxis dataKey="name" stroke="#008080" />
                <Line type="monotone" dataKey={dataKey} stroke="#008080" />
                <Tooltip />
                {grid && <CartesianGrid strok="#e0dfdf" strokeDasharray='5 5' />}
            </LineChart>
        </ResponsiveContainer>
    </div>
  )
}

export default Chart