import React from 'react';
import Chart from 'react-google-charts';
import Loader from '../Loader';

import './graphs.scss';

const LineChart = ({ data }) => {
  // const data = [
  //   ['Year', 'Sales', 'Expenses'],
  //   ['2004', 1000, 400],
  //   ['2005', 1170, 460],
  //   ['2006', 660, 1120],
  //   ['2007', 1030, 540],
  // ];

  const graphData = data.map(({ date, closingPrice }) => [
    date.slice(0, 10),
    closingPrice,
  ]);
  const formattedData = [['Date', 'Price'], ...graphData];
  return (
    <div>
      {data && !!data.length ? (
        <Chart
          chartType='LineChart'
          width='100%'
          height='400px'
          data={formattedData}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default LineChart;
