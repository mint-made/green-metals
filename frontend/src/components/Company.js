import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import MCap from '../components/MCap';

const Company = ({ company }) => {
  return (
    <tr key={company._id}>
      <td>{company.name}</td>
      <td>
        {company.tickers[0].exchange}:{company.tickers[0].ticker}
      </td>
      <td>
        <MCap mcap={company.mcap} />
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

export default Company;
