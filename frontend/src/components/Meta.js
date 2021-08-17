import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Green Metals',
  description:
    'Information/Analysis of companies involved in producing critical metals for the zero-carbon future ',
  keywords:
    'investing, commodities, resources, renewables, energy, zero-carbon, natural resources, stocks, shares, stocks',
};

export default Meta;
