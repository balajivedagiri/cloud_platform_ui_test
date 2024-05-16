import React from 'react';
import { useLocation } from 'react-router-dom';

const StatusPage = () => {
  const location = useLocation();
  const responseData = location.state?.responseData;

  return (
    <div>
      {responseData ? (
        <div>
          <h1>VM Creation Successful</h1>
          <h2>VM Details:</h2>
          <p>VM Name: {responseData.vmName}</p>
          {/* Display other VM details here */}
        </div>
      ) : (
        <div>
          <h1>VM Creation Status Page</h1>
          <p>Waiting for VM creation...</p>
        </div>
      )}
    </div>
  );
};

export default StatusPage;
