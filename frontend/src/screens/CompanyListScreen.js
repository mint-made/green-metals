import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Badge, Breadcrumb, Button, Col, Form, Row } from 'react-bootstrap';

import {
  createCompany,
  deleteCompany,
  listCompanies,
} from '../actions/companyActions';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { formatNumber } from '../util/utility';
import CompaniesGraphView from '../components/CompaniesGraphView';
import CompaniesTableView from '../components/CompaniesTableView';
import { COMPANY_CREATE_RESET } from '../constants/companyConstants';
import Message from '../components/Message';

const CompanyListScreen = ({ match, history }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const metal = match.params.metal || '';
  const keyword = useQuery().get('q') || '';
  const pageNo = useQuery().get('page') || 1;
  const sort = useQuery().get('sort') || 'mcap_desc';

  const [term, setTerm] = useState('');
  const [view, setView] = useState('table');

  const companyList = useSelector((state) => state.companyList);
  const { loading, error, companies, pages, page } = companyList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const companyCreate = useSelector((state) => state.companyCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    company: createdCompany,
  } = companyCreate;

  const companyDelete = useSelector((state) => state.companyDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = companyDelete;

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: COMPANY_CREATE_RESET });
    }

    dispatch(listCompanies(keyword, Number(pageNo), sort, metal));
  }, [dispatch, keyword, pageNo, sort, metal, successDelete, history]);

  useEffect(() => {
    if (successCreate && userInfo.isAdmin && createdCompany) {
      history.push(`/admin/company/${createdCompany._id}/edit`);
    }
  }, [successCreate, createdCompany, history]);

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

  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    const sArr = s.split(' ').map((string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    });
    return sArr.join(' ');
  };

  const getTotalMcap = () => {
    if (!companies || companies.length < 1) {
      return 0;
    }

    let total = 0;
    companies.forEach((company) => {
      total += company.mcap;
    });

    return total;
  };

  const createCompanyHandler = () => {
    dispatch(createCompany());
  };

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteCompany(id));
    }
  };

  return (
    <>
      <Meta
        title={metal ? `Companies - ${capitalize(metal)}` : 'Companies - All'}
      />
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

      <Row className='my-2'>
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item href='/companies'>Companies</Breadcrumb.Item>
            {metal && (
              <Breadcrumb.Item href={`/companies/${metal}`}>
                {capitalize(metal)}
              </Breadcrumb.Item>
            )}
          </Breadcrumb>
        </Col>
        <Col>
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
        {metal && !loading && !error && (
          <Col className='text-center'>
            <p className='m-0'>Total {metal} MCap:</p>
            <Badge variant='dark'>{formatNumber(getTotalMcap(), 1)}</Badge>
          </Col>
        )}
        <Col>
          <button onClick={() => setView('table')}>
            <i className='fas fa-align-justify'></i>
          </button>{' '}
          <button onClick={() => setView('graph')}>
            <i className='fas fa-chart-pie'></i>
          </button>{' '}
          <button onClick={() => setView('summary')}>
            <i className='fas fa-th-large'></i>
          </button>
          <button onClick={createCompanyHandler} className='ml-4'>
            <i className='fas fa-plus'></i> Co.
          </button>
        </Col>
      </Row>
      {loadingCreate || loadingDelete || loading ? (
        <Loader />
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <>
          {view === 'graph' && companies && (
            <CompaniesGraphView companies={companies} commodityName={metal} />
          )}
          {view === 'table' && companies && (
            <CompaniesTableView
              companies={companies}
              pages={pages}
              page={page}
              sort={sort}
              keyword={keyword}
              userInfo={userInfo}
              deleteHandler={deleteHandler}
            />
          )}
        </>
      )}
    </>
  );
};

export default CompanyListScreen;
