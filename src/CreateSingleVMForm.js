// CreateSingleVMForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateSingleVMForm.css';

const CreateSingleVMForm = () => {
  const [formData, setFormData] = useState({
    vmName: '',
    datacenterName: '',
    clusterName: '',
    datastoreClusterName: '',
    templateName: '',
    cpuSockets: '',
    coresPerSocket: '',
    memoryMb: '',
    networkPortGroup: '',
  });

  const [dataDisks, setDataDisks] = useState([{ diskSizeGb: '', diskType: '' }]);
  const [datacenters, setDatacenters] = useState([]);

  useEffect(() => {
    fetchDatacenters();
  }, []);

  const fetchDatacenters = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/list_datacenters');
      setDatacenters(response.data.datacenters);
    } catch (error) {
      console.error('Error fetching datacenters:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDiskChange = (index, event) => {
    const { name, value } = event.target;
    const newDataDisks = [...dataDisks];
    newDataDisks[index][name] = value;
    setDataDisks(newDataDisks);
  };

  const addDataDisk = () => {
    setDataDisks([...dataDisks, { diskSizeGb: '', diskType: '' }]);
  };

  const removeDataDisk = (index) => {
    const newDataDisks = [...dataDisks];
    newDataDisks.splice(index, 1);
    setDataDisks(newDataDisks);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted with data:', formData, dataDisks);
  };

  return (
    <div className="create-single-vm-form">
      <h2>Create Single VM</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="vmName">VM Name:</label>
          <input
            type="text"
            id="vmName"
            name="vmName"
            value={formData.vmName}
            onChange={handleChange}
            className="form-input-small"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="datacenterName">Datacenter Name:</label>
          <select
            id="datacenterName"
            name="datacenterName"
            value={formData.datacenterName}
            onChange={handleChange}
            className="form-input-small"
            required
          >
            <option value="">Select Datacenter</option>
            {datacenters.map((datacenter, index) => (
              <option key={index} value={datacenter}>
                {datacenter}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="clusterName">Cluster Name:</label>
          <input
            type="text"
            id="clusterName"
            name="clusterName"
            value={formData.clusterName}
            onChange={handleChange}
            className="form-input-small"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="datastoreClusterName">Datastore Cluster Name:</label>
          <input
            type="text"
            id="datastoreClusterName"
            name="datastoreClusterName"
            value={formData.datastoreClusterName}
            onChange={handleChange}
            className="form-input-small"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="templateName">OS Template Name:</label>
          <input
            type="text"
            id="templateName"
            name="templateName"
            value={formData.templateName}
            onChange={handleChange}
            className="form-input-small"
            required
          />
        </div>
        <div className="form-group">
          <div className="cpu-group">
            <div className="cpu-socket">
              <label htmlFor="cpuSockets">CPU Sockets:</label>
              <input
                type="text"
                id="cpuSockets"
                name="cpuSockets"
                value={formData.cpuSockets}
                onChange={handleChange}
                className="form-input-small"
                required
              />
            </div>
            <div className="cores-per-socket">
              <label htmlFor="coresPerSocket">Cores per Socket:</label>
              <input
                type="text"
                id="coresPerSocket"
                name="coresPerSocket"
                value={formData.coresPerSocket}
                onChange={handleChange}
                className="form-input-small"
                required
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="memoryMb">Memory (MB):</label>
          <input
            type="text"
            id="memoryMb"
            name="memoryMb"
            value={formData.memoryMb}
            onChange={handleChange}
            className="form-input-small"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="networkPortGroup">Network Port Group:</label>
          <input
            type="text"
            id="networkPortGroup"
            name="networkPortGroup"
            value={formData.networkPortGroup}
            onChange={handleChange}
            className="form-input-small"
            required
          />
        </div>
        {/* Data Disks */}
        {dataDisks.map((disk, index) => (
          <div key={index} className="data-disk">
            <h3>Data Disk {index + 1}</h3>
            <div className="form-group">
              <label htmlFor="diskSizeGb">Disk Size (GB):</label>
              <input
                type="number"
                id="diskSizeGb"
                name="diskSizeGb"
                value={disk.diskSizeGb}
                onChange={(event) => handleDiskChange(index, event)}
                className="form-input-small"
              />
            </div>
            <div className="form-group">
              <label htmlFor="diskType">Disk Type:</label>
              <input
                type="text"
                id="diskType"
                name="diskType"
                value={disk.diskType}
                onChange={(event) => handleDiskChange(index, event)}
                className="form-input-small"
              />
            </div>
            <button type="button" onClick={() => removeDataDisk(index)} className="btn-remove">
              Remove Data Disk
            </button>
          </div>
        ))}
        <button type="button" onClick={addDataDisk} className="btn-add">
          Add Data Disk
        </button>
        <button type="submit" className="btn-submit">
          Create VM
        </button>
      </form>
    </div>
  );
};

export default CreateSingleVMForm;
