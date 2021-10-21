const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  const sArr = s.split(' ').map((string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  });
  return sArr.join(' ');
};

export default capitalize;
