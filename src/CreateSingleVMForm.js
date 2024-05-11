

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateSingleVMForm.css';

const CreateSingleVMForm = () => {
  const [formData, setFormData] = useState({
    vmName: '',
    datacenterName: '',
    customerFolder: '',
    clusterName: '',
    datastoreClusterName: '',
    templateName: '',
    memoryMb: '',
    cpuSockets: '',
    coresPerSocket: '',
    dataDisks: [], // Removed dataDisks state
    networkPortGroups: [''], 
    vmCustomizationJson: '',
  });

  const [datacenters, setDatacenters] = useState([]);
  const [customerFolders, setCustomerFolders] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [datastoreClusters, setDatastoreClusters] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [networkPortGroupsList, setNetworkPortGroupsList] = useState([]);

  useEffect(() => {
    fetchDatacenters();
  }, []);

  useEffect(() => {
    if (formData.datacenterName) {
      fetchCustomerFolders(formData.datacenterName);
      fetchClusters(formData.datacenterName);
      fetchDatastoreClusters(formData.datacenterName);
      fetchTemplates(formData.datacenterName);
    }
  }, [formData.datacenterName]);

  useEffect(() => {
    if (formData.datacenterName && formData.clusterName) {
      fetchNetworkPortGroups(formData.datacenterName, formData.clusterName);
    }
  }, [formData.datacenterName, formData.clusterName]);

  const fetchDatacenters = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/list_datacenters');
      setDatacenters(response.data.datacenters);
    } catch (error) {
      console.error('Error fetching datacenters:', error);
    }
  };

  const fetchCustomerFolders = async (selectedDatacenter) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/list_folders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ datacenter_name: selectedDatacenter }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch customer folders');
      }
      const data = await response.json();
      setCustomerFolders(data.folders);
    } catch (error) {
      console.error('Error fetching customer folders:', error.message);
    }
  };

  const fetchClusters = async (selectedDatacenter) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/clusters', {
        datacenter_name: selectedDatacenter,
      });
      setClusters(response.data.clusters);
    } catch (error) {
      console.error('Error fetching clusters:', error);
    }
  };

  const fetchDatastoreClusters = async (selectedDatacenter) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/datastore_clusters', {
        datacenter_name: selectedDatacenter,
      });
      setDatastoreClusters(response.data.datastore_clusters);
    } catch (error) {
      console.error('Error fetching datastore clusters:', error);
    }
  };

  const fetchTemplates = async (datacenterName) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/templates_objects', {
        datacenter_name: datacenterName
      });
      setTemplates(response.data.templates);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const fetchNetworkPortGroups = async (datacenterName, clusterName) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/networks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ datacenter_name: datacenterName, cluster_name: clusterName }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch network port groups');
      }
      const data = await response.json();
      setNetworkPortGroupsList(data.networks);
    } catch (error) {
      console.error('Error fetching network port groups:', error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'datacenterName') {
      fetchCustomerFolders(value);
      fetchClusters(value);
      fetchDatastoreClusters(value);
      fetchTemplates(value);
    }
  };

  const handleVmCustomizationChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, vmCustomizationJson: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      vm_name: formData.vmName,
      datacenter_name: formData.datacenterName,
      customer_folder: formData.customerFolder,
      cluster_name: formData.clusterName,
      datastore_cluster_name: formData.datastoreClusterName,
      template_name: formData.templateName,
      memory_mb: formData.memoryMb,
      cpu_sockets: formData.cpuSockets,
      cores_per_socket: formData.coresPerSocket,
      data_disks: formData.dataDisks.map(({ diskSizeGb, diskType }) => ({
        disk_size_gb: diskSizeGb,
        disk_type: diskType
      })),
      network_cards: formData.networkPortGroups,
      vm_customization: JSON.parse(formData.vmCustomizationJson),
    };
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/create_vm', payload);
      console.log('Response from API:', response.data);
    } catch (error) {
      console.error('Error creating VM:', error.message);
    }
  };

  const handleDiskChange = (index, event) => {
    const { name, value } = event.target;
    const newDataDisks = [...formData.dataDisks];
    
    // Ensure "diskSizeGb" is stored as a number
    newDataDisks[index][name] = name === 'diskSizeGb' ? parseFloat(value) : value;
    
    setFormData({ ...formData, dataDisks: newDataDisks });
  };

  const addDataDisk = () => {
    setFormData({ ...formData, dataDisks: [...formData.dataDisks, { diskSizeGb: '', diskType: '' }] });
  };

  const removeDataDisk = (index) => {
    const newDataDisks = [...formData.dataDisks];
    newDataDisks.splice(index, 1);
    setFormData({ ...formData, dataDisks: newDataDisks });
  };

  const handleAddNetworkPortGroup = () => {
    setFormData({ ...formData, networkPortGroups: [...formData.networkPortGroups, ''] });
  };

  const handleRemoveNetworkPortGroup = (index) => {
    const updatedNetworkPortGroups = [...formData.networkPortGroups];
    updatedNetworkPortGroups.splice(index, 1);
    setFormData({ ...formData, networkPortGroups: updatedNetworkPortGroups });
  };

  const handleNetworkPortGroupChange = (index, event) => {
    const { value } = event.target;
    const updatedNetworkPortGroups = [...formData.networkPortGroups];
    updatedNetworkPortGroups[index] = value;
    setFormData({ ...formData, networkPortGroups: updatedNetworkPortGroups });
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

        {/* Customer Folders */}
        <div className="form-group">
          <label htmlFor="customerFolder">Customer Folder:</label>
          <select
            id="customerFolder"
            name="customerFolder"
            value={formData.customerFolder}
            onChange={handleChange}
            className="form-input-small"
            required
          >
            <option value="">Select Customer Folder</option>
            {customerFolders.map((folder, index) => (
              <option key={index} value={folder}>
                {folder}
              </option>
            ))}
          </select>
        </div>

        {/* Cluster Name */}
        <div className="form-group">
          <label htmlFor="clusterName">Cluster Name:</label>
          <select
            id="clusterName"
            name="clusterName"
            value={formData.clusterName}
            onChange={handleChange}
            className="form-input-small"
            required
          >
            <option value="">Select Cluster Name</option>
            {clusters.map((cluster, index) => (
              <option key={index} value={cluster}>
                {cluster}
              </option>
            ))}
          </select>
        </div>

        {/* Datastore Cluster Name */}
        <div className="form-group">
          <label htmlFor="datastoreClusterName">Datastore Cluster Name:</label>
          <select
            id="datastoreClusterName"
            name="datastoreClusterName"
            value={formData.datastoreClusterName}
            onChange={handleChange}
            className="form-input-small"
            required
          >
            <option value="">Select Datastore Cluster Name</option>
            {datastoreClusters.map((datastoreCluster, index) => (
              <option key={index} value={datastoreCluster}>
                {datastoreCluster}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
            <label htmlFor="templateName">OS Template Name:</label>
            <select
                id="templateName"
                name="templateName"
                value={formData.templateName}
                onChange={handleChange}
                className="form-input-small"
                required
            >
                <option value="">Select OS Template</option>
                {templates.map((template, index) => (
                <option key={index} value={template}>
                    {template}
                </option>
                ))}
            </select>
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
          {formData.networkPortGroups.map((networkPortGroup, index) => (
            <div key={index}>
              <select
                value={networkPortGroup}
                onChange={(event) => handleNetworkPortGroupChange(index, event)}
                className="form-input-small"
                required
              >
                <option value="">Select Network Port Group</option>
                {networkPortGroupsList.map((network, index) => (
                  <option key={index} value={network}>
                    {network}
                  </option>
                ))}
              </select>
              {formData.networkPortGroups.length > 1 && (
                <button type="button" onClick={() => handleRemoveNetworkPortGroup(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddNetworkPortGroup}>
            Add Network Port Group
          </button>
        </div>



        {/* VM Customization JSON */}
        <div className="form-group">
          <label htmlFor="vmCustomizationJson">VM Customization JSON:</label>
          <textarea
            id="vmCustomizationJson"
            name="vmCustomizationJson"
            value={formData.vmCustomizationJson}
            onChange={handleVmCustomizationChange}
            className="form-textarea"
            rows="6"
          />
        </div>
        {/* Data Disks */}
        {formData.dataDisks.map((disk, index) => (
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
