import React, { createContext, useContext, useState } from 'react';

const ApiResponseContext = createContext();

export const useApiResponse = () => useContext(ApiResponseContext);

export const ApiResponseProvider = ({ children }) => {
  const [apiResponse, setApiResponse] = useState(null);

  const updateApiResponse = (response) => {
    setApiResponse(response);
  };

  return (
    <ApiResponseContext.Provider value={{ apiResponse, updateApiResponse }}>
      {children}
    </ApiResponseContext.Provider>
  );
};
