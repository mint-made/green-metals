import React from 'react';
import { Table, Card } from 'react-bootstrap';

const AssetSummary = ({ asset }) => {
  return (
    <Card className='mb-1 rounded pt-3'>
      <Card.Title>
        <h4 className='text-center mb-0'>{asset.name}</h4>
      </Card.Title>

      <Card.Body className='pt-0'>
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
      </Card.Body>
    </Card>
  );
};

export default AssetSummary;
