import React from 'react';
import { Badge, Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import ConvMcap from './ConvMcap';
import Paginate from './Paginate';

const CompaniesTableView = ({
  companies,
  pages,
  page,
  sort,
  keyword,
  userInfo,
  deleteHandler,
}) => {
  return (
    <>
      <Table size='sm' striped bordered hover responsive>
        <thead>
          <tr>
            <th className='p-1'>
              <h5 className='m-0 text-center'>Name</h5>
            </th>
            <th className='p-1'>
              <h5 className='m-0 text-center'>Ticker</h5>
            </th>
            <th className='p-1 d-flex justify-content-center'>
              <Button className='p-0 px-2 text-center'>
                {sort === 'mcap_desc' && (
                  <i className='fas fa-sort-amount-up'></i>
                )}
                {sort === 'mcap_asc' && (
                  <i className='fas fa-sort-amount-down-alt'></i>
                )}
              </Button>
            </th>
            <th className='p-1'>
              <h5 className='m-0 text-center'>Commodity</h5>
            </th>
            {userInfo && userInfo.isAdmin && <th className='p-1'></th>}
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <tr key={index}>
              <td className='p-0'>
                <Link to={`/company/${company._id}`}>
                  <div className='d-flex justify-content-between p-2 '>
                    <p className='mb-0 text-dark'>
                      {company.name}
                      <span>
                        <i className='pl-1 fas fa-info-circle text-info'></i>
                      </span>
                    </p>
                  </div>
                </Link>
              </td>
              <td className='p-2'>
                <Link to={`/company/${company._id}`}>
                  <Badge variant='secondary'>{company.trading.ticker}</Badge>
                </Link>
                <span style={{ fontSize: '75%' }}>
                  {' '}
                  {company.trading.exchange}
                </span>
              </td>
              <td className='p-2'>
                <Badge variant='primary'>
                  <ConvMcap company={company} />
                </Badge>
              </td>
              <td className='p-2'>{company.primaryCommodity}</td>

              {userInfo && userInfo.isAdmin && (
                <td className='p-1 text-center '>
                  <div className='d-flex '>
                    <Button
                      href={`/admin/company/${company._id}/edit`}
                      variant='light'
                      className='btn-sm py-1 px-2'
                    >
                      <i className='fas fa-edit'></i>
                    </Button>
                    <Button
                      variant='danger'
                      className='btn-sm px-2 py-1'
                      onClick={() => deleteHandler(company._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      <Paginate pages={pages} page={page} sort={sort} keyword={keyword} />
    </>
  );
};

export default CompaniesTableView;
