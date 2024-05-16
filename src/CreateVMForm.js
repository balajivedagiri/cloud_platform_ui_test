// CreateVMForm.js

import React from 'react';
import { Link, Routes, Route } from 'react-router-dom'; // Import Routes and Route components
import CreateSingleVMForm from './CreateSingleVMForm'; // Import CreateSingleVMForm component
import CreateMultipleVMsForm from './CreateMultipleVMsForm'; // Import CreateMultipleVMForm component

const CreateVMForm = () => {
  return (
    <div className="create-vm-form">
      <h2>Create VM</h2>
      <div className="options-container">
        <Link to="/create-single-vm" className="option">
          Create Single VM
        </Link>
        <Link to="/create-multiple-vms" className="option">
          Create Multiple VMs
        </Link>
      </div>
      {/* Include routes for CreateSingleVMForm and CreateMultipleVMForm */}
      <Routes>
        <Route path="/create-single-vm" element={<CreateSingleVMForm />} />
        <Route path="/create-multiple-vms" element={<CreateMultipleVMsForm />} />
      </Routes>
    </div>
  );
};

export default CreateVMForm;
