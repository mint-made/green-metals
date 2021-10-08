import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listAssets } from '../actions/assetActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

const AssetListScreen = () => {
  const dispatch = useDispatch();

  const assetList = useSelector((state) => state.assetList);
  const { loading, error, assets } = assetList;

  useEffect(() => {
    dispatch(listAssets());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th className='p-1'>
                <h5 className='m-0 text-center'>Name</h5>
              </th>
              <th className='p-1'>
                <h5 className='m-0 text-center'>Location</h5>
              </th>
              <th className='p-1'>
                <h5 className='m-0 text-center'>Stage</h5>
              </th>
              <th className='p-1'>
                <h5 className='m-0 text-center'>Resource</h5>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset._id}>
                <td className='p-2'>{asset.name}</td>
                <td className='p-2'>{asset.location.country}</td>
                <td className='p-2'>{asset.stage}</td>
                <td className='p-2'>
                  {asset.resource.map((resource) => `${resource.type}`)}
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default AssetListScreen;
