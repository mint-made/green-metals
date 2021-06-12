import React from 'react';
import { Card, Table } from 'react-bootstrap';

import NumFormat from './NumFormat';

const ValutationSummary = ({ company }) => {
  return (
    <Card>
      <Table className='mb-0' size='sm'>
        <tbody>
          <tr>
            <td>Ticker Symbol</td>
            <td>
              {company.trading.exchange}:{company.trading.ticker}
            </td>
          </tr>
          <tr>
            <td>Share Price</td>
            <td>
              {company.trading.currency}
              {company.trading.price}
            </td>
          </tr>
          <tr>
            <td>Market Cap</td>
            <td>
              {company.trading.currency}
              <NumFormat number={company.trading.mcap} dp='2' />
            </td>
          </tr>
          <tr>
            <td>Shares Issued</td>
            <td>
              <NumFormat number={company.issuedShares} dp='2' />
            </td>
          </tr>
          <tr>
            <td>Primary Commodity</td>
            <td>{company.primaryCommodity}</td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
};

export default ValutationSummary;
