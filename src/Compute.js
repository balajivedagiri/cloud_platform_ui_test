// Compute.js

import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import CreateVMForm from './CreateVMForm'; // Import the CreateVMForm component
import UpdateVMForm from './UpdateVMForm'; // Import the CreateVMForm component
import ListVMs from './ListVMs'; // Import the CreateVMForm component
import CreateCustomerFolder from './CreateCustomerFolder'; // Import the CreateCustomerFolder component 

function Compute() {
  return (
    <div>
      <h3>Compute</h3>

      {/* Define nested routes within the Compute component */}
      <Routes>
        <Route path="createcustomer" element={<CreateCustomerFolder />} />
        <Route path="create" element={<CreateVMForm />} />
        <Route path="update" element={<UpdateVMForm />} />
        <Route path="list" element={<ListVMs />} />
        {/* Add more routes if needed */}
      </Routes>
    </div>
  );
}

export default Compute;
