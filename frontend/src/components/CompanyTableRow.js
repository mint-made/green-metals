import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import {
  addToCompareList,
  removeFromCompareList,
} from '../actions/compareActions';
import { getCurrency } from '../actions/currencyActions';
import NumFormat from './NumFormat';

const CompanyTableRow = ({ company }) => {
  const dispatch = useDispatch();
  const compare = useSelector((state) => state.compare);
  const { compareList } = compare;

  const currencyList = useSelector((state) => state.currencyList);
  const { currency, loading, error } = currencyList;

  useEffect(() => {
    if (!currency.usd) {
      dispatch(getCurrency());
    }
  }, [currency, dispatch]);

  const addToCompareListHandler = (id) => {
    dispatch(addToCompareList(id));
  };

  const removeFromCompareListHandler = (id) => {
    dispatch(removeFromCompareList(id));
  };

  const convertedMcap = (mcap) => {
    console.log(company);
    console.log(currency.selected);
    if (currency.selected === 'local') {
      return (
        <>
          {company.trading.currency}
          <NumFormat number={company.trading.mcap} dp='2' />
        </>
      );
    } else {
      const currencySymbol =
        currency.selected === 'gbp'
          ? '£'
          : currency.selected === 'aud'
          ? 'A$'
          : currency.selected === 'usd'
          ? '$'
          : currency.selected === 'cad'
          ? 'C$'
          : '';

      const convMcap = mcap * currency.usd[currency.selected];

      return (
        <>
          {currencySymbol}
          <NumFormat number={convMcap} dp='2' />
        </>
      );
    }

    // {company.trading.currency}
    // <NumFormat number={company.trading.mcap} dp='2' />
  };

  return (
    <tr key={company._id}>
      <td className='p-2'>{company.name}</td>
      <td className='p-2'>
        {company.trading.exchange}:{company.trading.ticker}
      </td>
      <td className='p-2'>
        {loading ? '-' : error ? 'errror' : <>{convertedMcap(company.mcap)}</>}
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
