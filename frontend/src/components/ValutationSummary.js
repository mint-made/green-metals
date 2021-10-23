import React from 'react';
import { Badge, Card, Table, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

import NumFormat from './NumFormat';
import ConvMcap from './ConvMcap';

const ValutationSummary = ({ company }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Card className='rounded'>
      <div className='d-flex justify-content-center'>
        <h3 className='text-center p-3'>{company.name}</h3>
        <div className='p-3'>
          {userInfo && userInfo.isAdmin && (
            <>
              <LinkContainer to={`/admin/company/${company._id}/edit`}>
                <Button variant='light' className='btn-sm'>
                  <i className='fas fa-edit'></i>
                </Button>
              </LinkContainer>
            </>
          )}
        </div>
      </div>
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
              <Badge variant='primary'>
                <ConvMcap company={company} />
              </Badge>
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
