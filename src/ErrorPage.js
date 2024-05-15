// ErrorPage.js

import React from 'react';
import { useLocation } from 'react-router-dom';

const ErrorPage = () => {
  const location = useLocation();
  const message = location.state && location.state.message;

  return (
    <div>
      <h2>Error!</h2>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ErrorPage;


