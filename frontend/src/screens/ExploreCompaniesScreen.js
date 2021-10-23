import React, { useEffect, useState } from 'react';
import { Breadcrumb, Col, Dropdown, Form, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { listCompanies } from '../actions/companyActions';
import CompanyTableRow from '../components/CompanyTableRow';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import { useLocation } from 'react-router-dom';

const HomeScreen = ({ match, history }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const metal = match.params.metal || '';
  const keyword = useQuery().get('q') || '';
  const pageNo = useQuery().get('page') || 1;
  const sort = useQuery().get('sort') || 'mcap_desc';

  const [term, setTerm] = useState('');

  const companyList = useSelector((state) => state.companyList);
  const { loading, error, companies, pages, page } = companyList;

  useEffect(() => {
    dispatch(listCompanies(keyword, Number(pageNo), sort, metal));
  }, [dispatch, keyword, pageNo, sort, metal]);

  // Whenever the component is re-rendered and term has changed, run this function
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (term) {
        history.push(`${location.pathname}?q=${term}`);
      }
      if (!term && keyword) {
        history.push(`${location.pathname}`);
      }
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [term, history, location, keyword]);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const sortSelectHandler = (value) => {
    history.push(`${location.pathname}?sort=${value}`);
  };

  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    const sArr = s.split(' ').map((string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    });
    return sArr.join(' ');
  };

  return (
    <>
      <Meta
        title={metal ? `Companies - ${capitalize(metal)}` : 'Companies - All'}
      />
      <Row className='my-2'>
        <Col xs={4}>
          <Breadcrumb>
            <Breadcrumb.Item href='/companies'>Companies</Breadcrumb.Item>
            {metal && (
              <Breadcrumb.Item href={`/companies/${metal}`}>
                {capitalize(metal)}
              </Breadcrumb.Item>
            )}
          </Breadcrumb>
        </Col>
        <Col xs={4}>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              history.push(`${location.pathname}?q=${term}`);
            }}
          >
            <Form.Group controlId='search'>
              <Form.Control
                placeholder='Search by Name or Ticker'
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Col>

        <Col xs={4} className='d-flex justify-content-end'>
          <Dropdown>
            <Dropdown.Toggle id='dropdown-basic'>Sort By:</Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => sortSelectHandler('mcap_asc')}>
                MCap: Low - High
              </Dropdown.Item>
              <Dropdown.Item onClick={() => sortSelectHandler('mcap_desc')}>
                MCap: High - Low
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <h3>{error}</h3>
      ) : (
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
                <th className='p-1'>
                  <h5 className='m-0 text-center'>
                    MCap{' '}
                    {sort === 'mcap_desc' && (
                      <i className='fas fa-sort-amount-up'></i>
                    )}
                    {sort === 'mcap_asc' && (
                      <i className='fas fa-sort-amount-down-alt'></i>
                    )}
                  </h5>
                </th>
                <th className='p-1'>
                  <h5 className='m-0 text-center'>Commodity</h5>
                </th>
                <th className='p-1'>
                  <h5 className='m-0 text-center'>
                    <i className='fas fa-chart-pie mr-1'></i>Compare
                  </h5>
                </th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <CompanyTableRow key={company._id} company={company} />
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} sort={sort} keyword={keyword} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
