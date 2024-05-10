// CreateCustomerFolder.js


import React, { useState, useEffect } from 'react';

function CreateCustomerFolder() {
  const [formData, setFormData] = useState({
    datacenter_name: '',
    parent_folder: '',
    folder_name: '',
  });
  const [datacenters, setDatacenters] = useState([]);
  const [parentFolders, setParentFolders] = useState([]);

  useEffect(() => {
    fetchDatacenters();
  }, []);

  const fetchDatacenters = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/list_datacenters');
      if (!response.ok) {
        throw new Error('Failed to fetch datacenters');
      }
      const data = await response.json();
      setDatacenters(data.datacenters);
    } catch (error) {
      console.error('Error fetching datacenters:', error.message);
    }
  };

  const fetchParentFolders = async (selectedDatacenter) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/list_folders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ datacenter_name: selectedDatacenter }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch parent folders');
      }
      const data = await response.json();
      setParentFolders(data.parent_folders);
    } catch (error) {
      console.error('Error fetching parent folders:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    let formattedValue;
    if (name === 'parent_folder') {
      // Check if the entered value contains a '/'
      if (value.includes('/')) {
        // Split the value by '/' and trim whitespace from each part
        const folderList = value.split('/').map(folder => folder.trim());
        formattedValue = folderList;
      } else {
        formattedValue = [value]; // Convert single folder name to list
      }
    } else {
      formattedValue = value;
    }
  
    // Set the formatted value in the state
    setFormData({ ...formData, [name]: formattedValue, [name+"_display"]: value });
  };

  const handleParentFolderClick = () => {
    if (formData.datacenter_name) {
      fetchParentFolders(formData.datacenter_name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/api/create_customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create customer folder');
      }
      console.log('Customer folder created successfully');
    } catch (error) {
      console.error('Error creating customer folder:', error.message);
    }
  };

  return (
    <div>
      <h2>Create Customer Folder</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="datacenter_name">Datacenter Name:</label>
          <select
            id="datacenter_name"
            name="datacenter_name"
            value={formData.datacenter_name}
            onChange={handleChange}
          >
            <option value="">Select a datacenter</option>
            {datacenters.map((datacenter) => (
              <option key={datacenter} value={datacenter}>
                {datacenter}
              </option>
            ))}
          </select>
        </div>
        <div>
            <label htmlFor="parent_folder">Parent Folder:</label>
            <input
                type="text"
                id="parent_folder"
                name="parent_folder"
                value={formData.parent_folder_display || ''}
                onChange={handleChange}
                onClick={handleParentFolderClick}
                placeholder="Enter or select a parent folder"
            />

            {parentFolders && parentFolders.length > 0 && (
                <select
                id="parent_folder_dropdown"
                onChange={handleChange}
                >
                {parentFolders.map((folder) => (
                    <option key={folder} value={folder}>
                    {folder}
                    </option>
                ))}
                </select>
            )}
        </div>
        <div>
          <label htmlFor="folder_name">Folder Name:</label>
          <input
            type="text"
            id="folder_name"
            name="folder_name"
            value={formData.folder_name}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Folder</button>
      </form>
    </div>
  );
}

export default CreateCustomerFolder;
