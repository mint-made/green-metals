import React from 'react';

const MCap = ({ mcap }) => {
  let millionsOrBillions = '';
  let mcapValue = mcap.value.toFixed(0);
  const integerCount = mcapValue.toString().length;
  if (integerCount >= 10) {
    mcapValue = mcapValue / 1000000000;
    millionsOrBillions = 'B';
  } else {
    mcapValue = mcapValue / 1000000;
    millionsOrBillions = 'M';
  }
  mcapValue = mcapValue.toFixed(2);

  return (
    <div>
      {mcap.currency}
      {mcapValue}
      {millionsOrBillions}
    </div>
  );
};

export default MCap;
