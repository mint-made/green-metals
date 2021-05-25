import React from 'react';
import { Card } from 'react-bootstrap';

const Company = ({ company }) => {
  return (
    <Card className='my-3 -3 rounded'>
      <a href={`/company/${company._id}`}>
        <Card.Img src={company.logo} variant='top' />
      </a>
      <Card.Body>
        <a href={`/company/${company._id}`}>
          <Card.Title as='div'>
            <strong>
              {company.name} specializing in {company.primaryCommodity}
            </strong>
          </Card.Title>
        </a>
        <Card.Text as='div'>
          <div className='my-3'></div>
        </Card.Text>
        <Card.Text as='h3'>
          {company.tickers[0].exchange}:{company.tickers[0].ticker} -{' '}
          {company.tickers[0].currency}
          {company.tickers[0].price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Company;
