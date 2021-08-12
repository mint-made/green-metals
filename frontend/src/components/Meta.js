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
  title: 'Green Future Investing',
  description:
    'Consolidated data on natural resource companies, to help individuals invest smarter.',
  keywords:
    'investing, commodities, resources, natural resources, stocks, shares, stocks',
};

export default Meta;
