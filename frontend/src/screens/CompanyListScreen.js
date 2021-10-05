import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  listCompanies,
  deleteCompany,
  createCompany,
} from '../actions/companyActions';
import NumFormat from '../components/NumFormat';
import Paginate from '../components/Paginate';
import { COMPANY_CREATE_RESET } from '../constants/companyConstants';
import { Link, useLocation } from 'react-router-dom';
import Meta from '../components/Meta';

const ProductListScreen = ({ history, match }) => {
  const location = useLocation();
  const metal = match.params.metal;
  const pageNo = useQuery().get('page') || 1;
  const sort = useQuery().get('sort') || '';

  const dispatch = useDispatch();

  const companyList = useSelector((state) => state.companyList);
  const { loading, error, companies, pages } = companyList;

  const companyDelete = useSelector((state) => state.companyDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = companyDelete;

  const companyCreate = useSelector((state) => state.companyCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    company: createdCompany,
  } = companyCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: COMPANY_CREATE_RESET });

    if (!userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/admin/company/${createdCompany._id}/edit`);
    } else {
      dispatch(listCompanies('', Number(pageNo), sort, metal));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdCompany,
    pageNo,
    metal,
    sort,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteCompany(id));
    }
  };

  const createCompanyHandler = () => {
    dispatch(createCompany());
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const sortSelectHandler = (value) => {
    history.push(`${location.pathname}?sort=${value}`);
  };

  return (
    <>
      <Meta title='Company List' />
      <Row className='align-items-center'>
        <Col>
          <h1>Companies</h1>
        </Col>
        <Col className='text-right d-flex justify-content-around my-3'>
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
          <Dropdown>
            <Dropdown.Toggle id='dropdown-basic'>Category:</Dropdown.Toggle>
            <Dropdown.Menu>
              {[
                '',
                'Lithium',
                'REEs',
                'Nickel',
                'Copper',
                'Potash',
                'Scandium',
                '-',
              ].map((metal, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => history.push(`/admin/companylist/${metal}`)}
                >
                  {metal ? metal : 'All'}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Button onClick={createCompanyHandler} variant='success'>
            <i className='fas fa-plus'></i> Create Company
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th className='p-1'>
                  <h5 className='m-0 text-center'>Name</h5>
                </th>
                <th className='p-1'>
                  <h5 className='m-0 text-center'>Ticker</h5>
                </th>
                <th className='p-1'>
                  <h5 className='m-0 text-center'>MCap</h5>
                </th>
                <th className='p-1'>
                  <h5 className='m-0 text-center'>Commodity</h5>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company._id}>
                  <td className='p-2'>
                    <Link to={`/company/${company._id}`}>{company.name}</Link>
                  </td>
                  <td className='p-2'>
                    {company.trading.exchange}:{company.trading.ticker}
                  </td>
                  <td className='p-2'>
                    {company.trading.currency}
                    <NumFormat number={company.trading.mcap} dp='2' />
                  </td>
                  <td className='p-2'>{company.primaryCommodity}</td>
                  <td>
                    <LinkContainer to={`/admin/company/${company._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(company._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={Number(pageNo)} sort={sort} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
