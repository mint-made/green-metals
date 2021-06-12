import React from 'react';
import { Table, Card } from 'react-bootstrap';

const AssetSummary = ({ asset }) => {
  return (
    <Card className='mb-1'>
      <h4 className='text-center my-1'>{asset.name}</h4>
      <Table className='mb-0' size='sm'>
        <tbody>
          <tr>
            <td>Location</td>
            <td>{asset.location}</td>
          </tr>
          <tr>
            <td>Stage</td>
            <td>{asset.stage}</td>
          </tr>
          <tr>
            <td>Metals</td>
            <td>
              {asset.resource
                .map((resource) => {
                  return resource.commodity;
                })
                .join(', ')}
            </td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
};

export default AssetSummary;
