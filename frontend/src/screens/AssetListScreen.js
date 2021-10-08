import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

const AssetListScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <div>
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
        <tbody></tbody>
      </Table>
    </div>
  );
};

export default AssetListScreen;
