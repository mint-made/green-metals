import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listAssetDetails } from '../actions/assetActions';
import { Table, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Loader from '../components/Loader';
import Message from '../components/Message';

const AssetSummary = ({ assetRef, companyRef }) => {
  const dispatch = useDispatch();

  const assetDetails = useSelector((state) => state.assetDetails);
  const { loading, error, asset } = assetDetails;

  useEffect(() => {
    dispatch(listAssetDetails(assetRef));
  }, [dispatch, assetRef]);
  console.log(asset.ownership);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Card className='mb-1 rounded pt-3'>
            <Card.Title>
              <Link to={`/asset/${assetRef}`}>
                <div className=' '>
                  <h5 className='text-center mb-0'>
                    {asset.name} (
                    {asset.ownership.map((owner) =>
                      owner.companyRef === companyRef ? owner.stakePercent : ''
                    )}
                    {''}
                    %)
                    <span>
                      <i className='pl-1 fas fa-info-circle text-info'></i>
                    </span>
                  </h5>
                </div>
              </Link>
            </Card.Title>

            <Card.Body className='pt-0'>
              <Table className='mb-0' size='sm'>
                <tbody>
                  <tr>
                    <td>Stake Percent</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Location</td>
                    <td>{asset.location.country}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
};

export default AssetSummary;
