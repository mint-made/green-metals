import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import CompanyTableRow from '../components/CompanyTableRow';

const CompareScreen = () => {
  const compare = useSelector((state) => state.compare);
  const { compareList } = compare;

  return (
    <>
      <h1 className="text-center">Compare List</h1>

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
    </>
  );
};

export default CompareScreen;
