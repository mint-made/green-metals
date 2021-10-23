import React from 'react';
import { Table, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import NumFormat from '../components/NumFormat';

const AssetSummary = ({ asset, companyRef }) => {
  const renderNpv = () => {
    if (asset.npv && asset.npv.value && asset.npv.discount) {
      return (
        <tr>
          <td>
            NPV<sub>{asset.npv.discount}%</sub>
          </td>
          <td>
            <Badge variant='primary'>
              $<NumFormat number={asset.npv.value} dp='2' />
            </Badge>
          </td>
        </tr>
      );
    }
  };

  return (
    <Card className='mb-1 rounded pt-3 mb-4'>
      <Card.Title>
        <Link to={`/asset/${asset._id}`}>
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

      <Card.Body className='p-0'>
        <Table className='mb-0' size='sm'>
          <tbody>
            <tr>
              <td>Location</td>
              <td>
                {asset.location.country}
                {asset.location.province ? `, ${asset.location.province}` : ''}
              </td>
            </tr>
            <tr>
              <td>Stage</td>
              <td>{asset.stage}</td>
            </tr>
            <tr>
              <td>Study</td>
              <td>{asset.study ? asset.study : '-'}</td>
            </tr>
            {renderNpv()}
            <tr>
              <td>Resource</td>
              <td>
                {asset.resource.map((r, index) => (
                  <p key={index} className='m-0'>
                    {r.i && r.mi
                      ? `${r.i}${r.units} Inf. & ${r.mi}${r.units} M+I ${r.type}`
                      : r.i
                      ? `${r.i}${r.units} Inf. ${r.type}`
                      : r.mi
                      ? `${r.mi}${r.units} M+I ${r.type}`
                      : ''}
                  </p>
                ))}
              </td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default AssetSummary;
