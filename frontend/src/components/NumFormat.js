import React from 'react';

// Formats numbers into a more readable format
// e.g. NumFormat(1234567890, 2) => 1.23B
const NumFormat = ({ number, dp = 2 }) => {
  if (!number || typeof Number(number) !== 'number') {
    return 0;
  }

  let millionsOrBillions = '';
  let value = Number(number).toFixed(0);
  const integerCount = value.toString().length;
  if (integerCount >= 10) {
    value = value / 1000000000;
    millionsOrBillions = 'B';
  } else {
    value = value / 1000000;
    millionsOrBillions = 'M';
  }
  value = value.toFixed(dp);

  return (
    <>
      {value}
      {millionsOrBillions}
    </>
  );
};

export default NumFormat;
