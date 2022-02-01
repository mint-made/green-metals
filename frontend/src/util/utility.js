// Formats numbers into a more readable format
// e.g. NumFormat(1234567890, 2) => 1.23B
export const formatNumber = (number, dp = 2, currency = '$') => {
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

  return currency + value + millionsOrBillions;
};

// Sort data by a given property property
export const sortBy = (data, property, isAscendingOrder = false) => {
  return data.sort((a, b) => {
    const itemA = a[property];
    const itemB = b[property];

    let comparison = 0;
    if (itemA > itemB) {
      comparison = isAscendingOrder ? 1 : -1;
    } else if (itemA < itemB) {
      comparison = isAscendingOrder ? -1 : 1;
    }
    return comparison;
  });
};
