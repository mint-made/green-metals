import React from 'react';
import { Table, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AssetSummary = ({ asset }) => {
  return (
    <Card className='mb-1 rounded pt-3'>
      <Card.Title>
        <Link to={`/asset/${asset.assetRef}`}>
          <div className=' '>
            <h5 className='text-center mb-0'>
              {asset.name}
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
              <td>{asset.stakePercent}%</td>
            </tr>
            <tr>
              <td>Asset Ref</td>
              <td>{asset.assetRef}</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default AssetSummary;
