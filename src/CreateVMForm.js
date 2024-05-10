// import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
// import Compute from './Compute';
// import React, { useState } from 'react';


import React, { useState } from 'react';
import axios from 'axios';
import './CreateVMForm.css'; // Import CSS file for styling

function CreateVMForm() {
  const [formData, setFormData] = useState({
    vm_name: '',
    datacenter_name: '',
    cluster_name: '',
    datastore_cluster_name: '',
    template_name: '',  
    cpu_count: 0,
    memory_mb: 0,
    num_disks: 0,
    disk_size_gb: 0,
    disk_type: '',
    network_port_group: ''
  });
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/create_vm', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setResponseMessage(response.data.result); // Assuming the API response contains a 'result' field
    } catch (error) {
      console.error(error);
      setResponseMessage('Error: Failed to create VM'); // Handle error response
    }
  };

  return (
    <div className="container">
      {/* <header>
        <img src="./logo.jpeg" alt="E& Enterprise Logo" />
      </header> */}
      <div className="content">
      <h2>Create VM</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>VM Name:</label>
          <input type="text" name="vm_name" value={formData.vm_name} onChange={handleChange} />
        </div>
        <div>
          <label>DataCenter Name:</label>
          <input type="text" name="datacenter_name" value={formData.datacenter_name} onChange={handleChange} />
        </div>
        <div>
          <label>Compute Cluster Name:</label>
          <input type="text" name="cluster_name" value={formData.cluster_name} onChange={handleChange} />
        </div>
        <div>
          <label>DataStore Cluster Name:</label>
          <input type="text" name="datastore_cluster_name" value={formData.datastore_cluster_name} onChange={handleChange} />
        </div>
        <div>  
          <label>Template Name:</label>
          <input type="text" name="template_name" value={formData.template_name} onChange={handleChange} />
        </div>
        <div>
          <label>CPU Count:</label>
          <input type="text" name="cpu_count" value={formData.cpu_count} onChange={handleChange} />
        </div>
        <div>
          <label>Memory in MB:</label>
          <input type="text" name="memory_mb" value={formData.memory_mb} onChange={handleChange} />
        </div>
        <div>
          <label>Number of Disks:</label>
          <input type="text" name="num_disks" value={formData.num_disks} onChange={handleChange} />
        </div> 
        <div>
          <label>Size of Disk in GB:</label>
          <input type="text" name="disk_size_gb" value={formData.disk_size_gb} onChange={handleChange} />
        </div>
        <div>  
          <label>Disk Type:</label>
          <input type="text" name="disk_type" value={formData.disk_type} onChange={handleChange} />
        </div>
        <div>
          <label>Port Group Name:</label>
          <input type="text" name="network_port_group" value={formData.network_port_group} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">Create VM</button>
        </div>
      </form>
      {responseMessage && responseMessage} {/* Display response message if available */}
    </div>
    </div>
  );
}

export default CreateVMForm;
