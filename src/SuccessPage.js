// SuccessPage.js

import React from 'react';
import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const location = useLocation();
  const message = location.state && location.state.message;

  return (
    <div>
      <h2>VM Creation is Successful!</h2>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SuccessPage;


