// CreateMultipleVMsForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './CreateMultipleVMsForm.css';


const CreateVMsFromJSON = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [jsonInput, setJsonInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleJsonChange = (event) => {
    setJsonInput(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post('http://127.0.0.1:5000/api/create_vms', JSON.parse(jsonInput));
      console.log('Response from API:', response.data);
      console.log('Response from API:', response.data.results);
      setSuccessMessage(response.data.message); // Assuming the API returns a success message

      setLoading(false);
      navigate('/success', { state: { message: response.data.results } })
    } catch (error) {
      setError('Failed to create VMs. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create VMs from JSON</h2>
      <textarea
        value={jsonInput}
        onChange={handleJsonChange}
        rows={10}
        cols={50}
        placeholder="Paste JSON here..."
      />
      <br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Creating...' : 'Create VMs'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
    </div>
  );
};

export default CreateVMsFromJSON;
