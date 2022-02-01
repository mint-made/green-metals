import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import Loader from '../Loader';
import { formatNumber, sortBy } from '../../util/utility';

import './graphs.scss';

const TreeMapChart = ({ companies, property = 'mcap' }) => {
  const [data, setData] = useState([]);
  const [sortedCompanies, setSortedCompanies] = useState([]);

  const showFullTooltip = (row, size, value) => {
    const company = companies[row - 5] ? companies[row - 5] : null;

    if (!company) {
      return null;
    }
    return (
      '<a href="/company/' +
      company._id +
      '"><div class="tree-map-tooltip">' +
      company.name +
      '</a><br/>MCap: ' +
      formatNumber(company.mcap) +
      '</div>'
    );
  };

  const options = {
    minColor: '#f00',
    midColor: '#ddd',
    maxColor: '#0d0',
    headerHeight: 15,
    fontColor: 'black',
    showScale: false,
    enableHighlight: true,
    generateTooltip: showFullTooltip,
  };

  useEffect(() => {
    if (companies && !!companies.length) {
      setSortedCompanies(sortBy(companies, property, false));
    }
  }, [companies, property]);

  useEffect(() => {
    if (sortedCompanies && !!sortedCompanies.length) {
      const dataTitles = [
        'Location',
        'Parent',
        'Market trade volume (size)',
        'Market increase/decrease (color)',
      ];
      const parent = [sortedCompanies[0].primaryCommodity, null, 0, 0];
      const companyTypes = [
        ['Producer', sortedCompanies[0].primaryCommodity, 0, 0],
        ['Developer', sortedCompanies[0].primaryCommodity, 0, 0],
        ['Explorer', sortedCompanies[0].primaryCommodity, 0, 0],
        ['Other', sortedCompanies[0].primaryCommodity, 0, 0],
      ];

      const dataValues = sortedCompanies.map(({ trading, type, mcap }) => {
        return [trading.ticker, type, mcap, 0];
      });
      setData([dataTitles, parent, ...companyTypes, ...dataValues]);
    }
  }, [sortedCompanies]);
  // const exampleData = [
  //   [
  //     'Location',
  //     'Parent',
  //     'Market trade volume (size)',
  //     'Market increase/decrease (color)',
  //   ],
  //   ['Global', null, 0, 0],
  //   ['America', 'Global', 0, 0],
  //   ['Europe', 'Global', 0, 0],
  //   ['Asia', 'Global', 0, 0],
  //   ['Australia', 'Global', 0, 0],
  //   ['Africa', 'Global', 0, 0],
  //   ['Brazil', 'America', 11, 10],
  //   ['France', 'Europe', 42, -11],
  //   ['China', 'Asia', 36, 4],
  //   ['Egypt', 'Africa', 21, 0],
  // ];
  return (
    <div>
      {data && !!data.length ? (
        <Chart
          chartType='TreeMap'
          width='100%'
          height='400px'
          data={data}
          options={options}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default TreeMapChart;
