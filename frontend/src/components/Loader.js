import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = ({ size = '100px' }) => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: size,
        height: size,
        margin: 'auto',
        display: 'block',
      }}
    >
      <span className='sr-only'>Loading</span>
    </Spinner>
  );
};

export default Loader;
