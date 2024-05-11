// Compute.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateVMForm from './CreateVMForm'; // Import the CreateVMForm component
import UpdateVMForm from './UpdateVMForm'; // Import the UpdateVMForm component
import ListVMs from './ListVMs'; // Import the ListVMs component
import CreateCustomerFolder from './CreateCustomerFolder'; // Import the CreateCustomerFolder component
import CreateSingleVMForm from './CreateSingleVMForm'; // Import the CreateSingleVMForm component
// import CreateMultipleVMForm from './CreateMultipleVMForm'; // Import the CreateMultipleVMForm component

function Compute() {
  return (
    <div>
      <h3>Compute</h3>

      {/* Define nested routes within the Compute component */}
      <Routes>
        <Route path="create/*" element={<CreateVMForm />}>
          {/* Nested routes for creating VMs */}
          <Route path="single" element={<CreateSingleVMForm />} />
          {/* <Route path="multiple" element={<CreateMultipleVMForm />} /> */}
        </Route>
        <Route path="createcustomer" element={<CreateCustomerFolder />} />
        <Route path="update" element={<UpdateVMForm />} />
        <Route path="list" element={<ListVMs />} />
        {/* Add more routes if needed */}
      </Routes>
    </div>
  );
}

export default Compute;
