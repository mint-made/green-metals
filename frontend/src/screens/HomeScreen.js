import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { listCompanies } from '../actions/companyActions';
import Company from '../components/Company';
import Loader from '../components/Loader';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const companyList = useSelector((state) => state.companyList);
  const { loading, error, companies } = companyList;

  useEffect(() => {
    dispatch(listCompanies());
  }, [dispatch]);

  console.log(`loading: ${loading} & error: ${error}`, companies);

  return (
    <>
      <h1>Natural Resource Companies</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Table size='sm' striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Ticker</th>
              <th>Mcap</th>
              <th>Primary Commodity</th>
              <th>More Info</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <Company key={company._id} company={company} />
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default HomeScreen;
