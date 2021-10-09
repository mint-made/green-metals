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
              <th className='p-1'>
                <h5 className='m-0 text-center'>Owner</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset._id}>
                <td className='p-0'>
                  <Link to={`/asset/${asset._id}`}>
                    <div className='d-flex justify-content-between p-2 '>
                      <p className='mb-0 text-dark'>
                        {asset.name}
                        <span>
                          <i className='pl-1 fas fa-info-circle text-info'></i>
                        </span>
                      </p>
                    </div>
                  </Link>
                </td>
                <td className='p-2'>{asset.location.country}</td>
                <td className='p-2'>{asset.stage}</td>
                <td className='p-2'>
                  {asset.resource.map(
                    (res) => `${res.i + res.mi}${res.units} ${res.type}`
                  )}
                </td>
                <td className='p-0'>
                  <Link to={`/company/${asset.ownership[0].companyRef}`}>
                    <div className=' p-2 '>
                      <p className='mb-0 text-dark'>
                        {asset.ownership
                          ? `${asset.ownership[0].name} (${asset.ownership[0].stakePercent}%)`
                          : '-'}
                        <span>
                          <i className='pl-1 fas fa-info-circle text-info'></i>
                        </span>
                      </p>
                    </div>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default AssetListScreen;
