import React from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment'

const Chart = ({ items }) => {
  const lineChart = (
    <Line
      data={{
        labels: items.map((item) =>
          moment(new Date(item.createdAt)).format('D-M-YY')
        ),
        datasets: [
          {
            data: items.map((item) => item.price),
            label: 'Revenue',
            borderColor: '#3333ff',
            fill: true,
          },
        ],
      }}
    />
  );
  return (
    <div className='mr-2'>
      <h2 className="row"> REVENUE </h2>
      <div className="row">{lineChart}</div>
    </div>
  );
};

export default Chart;
