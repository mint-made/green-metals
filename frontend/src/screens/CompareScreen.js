import { Col, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import CompanyTableRow from '../components/CompanyTableRow';
import Message from '../components/Message';
import Meta from '../components/Meta';

const CompareScreen = () => {
  const compare = useSelector((state) => state.compare);
  const { compareList } = compare;

  return (
    <>
      <Meta title='Compare Companies' />
      <h1 className='text-center'>Compare List</h1>

      <Table size='sm' striped bordered hover responsive>
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
            <th className='p-1'>
              <h5 className='m-0 text-center'>Info</h5>
            </th>
            <th className='p-1'>
              <h5 className='m-0 text-center'>Compare</h5>
            </th>
          </tr>
        </thead>
        <tbody>
          {compareList.map((company) => (
            <CompanyTableRow key={company._id} company={company} />
          ))}
        </tbody>
      </Table>
      <Row className='d-flex justify-content-center'>
        <Col md={8} lg={6}>
          {compareList.length === 0 && (
            <Message variant='danger'>
              Add Companies to your Compare List
            </Message>
          )}
        </Col>
      </Row>
    </>
  );
};

export default CompareScreen;
