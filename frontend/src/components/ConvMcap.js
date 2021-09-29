import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrency } from '../actions/currencyActions';
import NumFormat from './NumFormat';

const ConvMcap = ({ company }) => {
  const dispatch = useDispatch();
  const currencyList = useSelector((state) => state.currencyList);
  const { currency, loading, error } = currencyList;

  useEffect(() => {
    if (!currency.usd) {
      dispatch(getCurrency());
    }
  }, [currency, dispatch]);

  const convertedMcap = (mcap) => {
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
          : currency.selected === 'eur'
          ? '€'
          : currency.selected === 'aud'
          ? 'A$'
          : currency.selected === 'usd'
          ? '$'
          : currency.selected === 'cad'
          ? 'C$'
          : '';
      console.log(currency.usd);
      const convMcap = mcap * currency.usd[currency.selected];

      return (
        <>
          {currencySymbol}
          <NumFormat number={convMcap} dp='2' />
        </>
      );
    }
  };

  return (
    <>
      {loading ? (
        ''
      ) : error ? (
        'error'
      ) : company && company.trading ? (
        <>{convertedMcap(company.mcap)}</>
      ) : (
        ''
      )}
    </>
  );
};

export default ConvMcap;
