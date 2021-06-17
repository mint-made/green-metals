import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import {
  addToCompareList,
  removeFromCompareList,
} from '../actions/compareActions';
import NumFormat from './NumFormat';

const CompanyTableRow = ({ company }) => {
  const compare = useSelector((state) => state.compare);
  const { compareList } = compare;

  const dispatch = useDispatch();

  const addToCompareListHandler = (id) => {
    dispatch(addToCompareList(id));
  };

  const removeFromCompareListHandler = (id) => {
    dispatch(removeFromCompareList(id));
  };

  return (
    <tr key={company._id}>
      <td className='p-2'>{company.name}</td>
      <td className='p-2'>
        {company.trading.exchange}:{company.trading.ticker}
      </td>
      <td className='p-2'>
        {company.trading.currency}
        <NumFormat number={company.trading.mcap} dp='2' />
      </td>
      <td className='p-2'>{company.primaryCommodity}</td>
      <td className='p-1 text-center'>
        <Link className='btn btn-dark p-1' to={`/company/${company._id}`}>
          Info
        </Link>
      </td>
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
