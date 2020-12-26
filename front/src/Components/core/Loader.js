import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = ({ text = 'Loading...' }) => {
  return (
    <div className="d-flex align-items-center justify-content-center flex-column h-100">
      <Spinner animation="border" variant="success" role="status"></Spinner>
      <h3>{text}</h3>
    </div>
  );
};

export default Loader;
