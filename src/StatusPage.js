import React from 'react';
import { useApiResponse } from './ApiResponseContext';

const StatusPage = () => {
  // Access the API response data using the useApiResponse hook
  const { apiResponse } = useApiResponse();

  return (
    <div>
      <h2>Status Page</h2>
      {apiResponse ? (
        <div>
          <h3>API Response:</h3>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      ) : (
        <p>No API response available.</p>
      )}
    </div>
  );
};

export default StatusPage;
