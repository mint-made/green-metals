import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { listCompanies } from '../actions/companyActions';
import CompanyTableRow from '../components/CompanyTableRow';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import { useLocation } from 'react-router-dom';

const HomeScreen = ({ match }) => {
  const dispatch = useDispatch();

  const metal = match.params.metal || '';
  const keyword = useQuery().get('q') || '';
  const pageNo = useQuery().get('page') || 1;
  const sort = useQuery().get('sort') || '';

  const companyList = useSelector((state) => state.companyList);
  const { loading, error, companies, pages, page } = companyList;

  useEffect(() => {
    dispatch(listCompanies(keyword, Number(pageNo), sort, metal));
  }, [dispatch, keyword, pageNo, sort, metal]);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  return (
    <>
      <Meta />
      <h1 className='text-center'>Natural Resource Companies</h1>
      <h2>{metal}</h2>
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
                  <h5 className='m-0 text-center'>MCap</h5>
                </th>
                <th className='p-1'>
                  <h5 className='m-0 text-center'>Commodity</h5>
                </th>
                <th className='p-1'>
                  <h5 className='m-0 text-center'>Info</h5>
                </th>
                <th className='p-1'>
                  <h5 className='m-0 text-center'>
                    <i className='fas fa-chart-pie'></i> Compare
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
          <Paginate pages={pages} page={page} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
