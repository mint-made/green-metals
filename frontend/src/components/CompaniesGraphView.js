import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TreeMapChart from './graphs/TreeMapChart';
import LineChart from './graphs/LineChart';
import Loader from '../components/Loader';
import { listCommodityData } from '../actions/commodityActions';
import { Col, Row } from 'react-bootstrap';

const CompaniesGraphView = ({ companies, commodityName }) => {
  const dispatch = useDispatch();
  const commodityData = useSelector((state) => state.commodityData);
  const { loading, error, commodity } = commodityData;

  useEffect(() => {
    dispatch(listCommodityData(commodityName));
  }, [commodityName, dispatch]);
  return (
    <Row>
      <Col>{companies && <TreeMapChart companies={companies} />}</Col>
      <Col>
        {loading ? (
          <Loader />
        ) : error ? (
          <h3>{error}</h3>
        ) : (
          <LineChart data={commodity.data} />
        )}
      </Col>
    </Row>
  );
};

export default CompaniesGraphView;
