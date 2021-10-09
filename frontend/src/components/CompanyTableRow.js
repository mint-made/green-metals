import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import {
  addToCompareList,
  removeFromCompareList,
} from '../actions/compareActions';
import ConvMcap from './ConvMcap';

const CompanyTableRow = ({ company }) => {
  const dispatch = useDispatch();
  const compare = useSelector((state) => state.compare);
  const { compareList } = compare;

  const addToCompareListHandler = (id) => {
    dispatch(addToCompareList(id));
  };

  const removeFromCompareListHandler = (id) => {
    dispatch(removeFromCompareList(id));
  };

  return (
    <tr key={company._id}>
      <td className='p-0'>
        <Link to={`/company/${company._id}`}>
          <div className='d-flex justify-content-between p-2 '>
            <p className='mb-0 text-dark'>{company.name}</p>

            <span>
              <i className='fas fa-info-circle text-info'></i>
            </span>
          </div>
        </Link>
      </td>
      <td className='p-2'>
        {company.trading.exchange}:{company.trading.ticker}
      </td>
      <td className='p-2'>
        <Badge variant='primary'>
          <ConvMcap company={company} />
        </Badge>
      </td>
      <td className='p-2'>{company.primaryCommodity}</td>
      <td className='p-1 text-center'>
        {compareList.find((x) => x._id === company._id) ? (
          <Button
            className='btn btn-success p-1 mx-1'
            type='button'
            onClick={() => removeFromCompareListHandler(company._id)}
          >
            <i className='far fa-check-circle px-1'></i>
          </Button>
        ) : (
          <Button
            className='btn btn-danger p-1 mx-1'
            type='button'
            onClick={() => addToCompareListHandler(company._id)}
          >
            <i className='far fa-times-circle px-1'></i>
          </Button>
        )}
      </td>
    </tr>
  );
};

export default CompanyTableRow;
