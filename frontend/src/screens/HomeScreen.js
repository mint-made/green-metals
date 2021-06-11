import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { listCompanies } from '../actions/companyActions';
import Company from '../components/Company';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const companyList = useSelector((state) => state.companyList);
  const { loading, error, companies } = companyList;

  useEffect(() => {
    dispatch(listCompanies());
  }, [dispatch]);

  return (
    <>
      <h1>Natural Resource Companies</h1>
      {loading ? (
        <h2>Loading...</h2>
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
