// Create a new context file (e.g., ApiContext.js)
import React, { createContext, useContext, useState } from 'react';

// Create the API context
const ApiContext = createContext();

// Create a custom hook to use the API context
export const useApi = () => useContext(ApiContext);

// Create a provider for the API context
export const ApiProvider = ({ children }) => {
  const [apiResponse, setApiResponse] = useState(null);

  // Function to update the API response
  const updateApiResponse = (response) => {
    setApiResponse(response);
  };

  return (
    <ApiContext.Provider value={{ apiResponse, updateApiResponse }}>
      {children}
    </ApiContext.Provider>
  );
};
