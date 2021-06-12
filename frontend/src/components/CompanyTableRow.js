import React from 'react';
import { Link } from 'react-router-dom';

import NumFormat from './NumFormat';

const CompanyTableRow = ({ company }) => {
  return (
    <tr key={company._id}>
      <td>{company.name}</td>
      <td>
        {company.trading.exchange}:{company.trading.ticker}
      </td>
      <td>
        <NumFormat number={company.trading.mcap} dp='2' />
      </td>
      <td>{company.primaryCommodity}</td>
      <td>
        <Link className='btn btn-dark p-1' to={`/company/${company._id}`}>
          More Info
        </Link>
      </td>
    </tr>
  );
};

export default CompanyTableRow;
