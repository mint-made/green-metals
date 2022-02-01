import { useEffect, useState } from 'react';
import { Badge, Col, Dropdown, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import ConvMcap from '../components/ConvMcap';
import Message from '../components/Message';
import Meta from '../components/Meta';

const CompareScreen = ({ history }) => {
  const location = useLocation();
  const sort = useQuery().get('sort') || '';
  const [compareList, setCompareList] = useState([]);

  const compare = useSelector((state) => state.compare);
  const { compareList: compareListData } = compare;

  useEffect(() => {
    if (sort === 'mcap_asc') {
      let sortedListAsc = compareListData.sort(function (a, b) {
        return a.mcap - b.mcap;
      });
      setCompareList([...sortedListAsc]);
    } else if (sort === 'mcap_desc') {
      let sortedListDesc = compareListData.sort(function (a, b) {
        return a.mcap + b.mcap;
      });
      setCompareList([...sortedListDesc]);
    } else {
      setCompareList([...compareListData]);
    }
  }, [compareListData, sort]);

  const sortSelectHandler = (value) => {
    history.push(`${location.pathname}?sort=${value}`);
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  return (
    <>
      <Meta title='Compare Companies' />
      <Row className='mb-2'>
        <Col>
          <h1 className='text-center'>Compare List </h1>
        </Col>
        <Col className='d-flex justify-content-end'>
          <Dropdown>
            <Dropdown.Toggle id='dropdown-basic'>Sort By:</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => sortSelectHandler('mcap_asc')}>
                MCap: Low - High
              </Dropdown.Item>
              <Dropdown.Item onClick={() => sortSelectHandler('mcap_desc')}>
                MCap: High - Low
              </Dropdown.Item>
              <Dropdown.Item onClick={() => sortSelectHandler('')}>
                None
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

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
              <h5 className='m-0 text-center'>
                <i className='fas fa-chart-pie mr-1'></i>Compare
              </h5>
            </th>
          </tr>
        </thead>
        <tbody>
          {compareList.map((company, index) => (
            <tr key={index}>
              <td className='p-0'>
                <Link to={`/company/${company._id}`}>
                  <div className='d-flex justify-content-between p-2 '>
                    <p className='mb-0 text-dark'>
                      {company.name}
                      <span>
                        <i className='pl-1 fas fa-info-circle text-info'></i>
                      </span>
                    </p>
                  </div>
                </Link>
              </td>
              <td className='p-2'>
                <Link to={`/company/${company._id}`}>
                  <Badge variant='secondary'>{company.trading.ticker}</Badge>
                </Link>
                <span style={{ fontSize: '75%' }}>
                  {' '}
                  {company.trading.exchange}
                </span>
              </td>
              <td className='p-2'>
                <Badge variant='primary'>
                  <ConvMcap company={company} />
                </Badge>
              </td>
              <td className='p-2'>{company.primaryCommodity}</td>
            </tr>
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
