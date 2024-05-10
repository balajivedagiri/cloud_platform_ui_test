import React, { useState, useEffect } from 'react';
import './CreateCustomerFolder.css'; // Import CSS file for styles

function CreateCustomerFolder() {
  const [formData, setFormData] = useState({
    datacenter_name: '',
    parent_folder: '',
    folder_name: '',
  });
  const [datacenters, setDatacenters] = useState([]);
  const [parentFolders, setParentFolders] = useState([]);
  const [isNewFolder, setIsNewFolder] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // Define isSubmitting state
  const [statusMessage, setStatusMessage] = useState('');

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
      console.log('Fetching parent folders...');
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
      console.log('Parent folders:', data.folders);
      setParentFolders(data.folders); // Update to use "folders" array from response
    } catch (error) {
      console.error('Error fetching parent folders:', error.message);
    }
  };

  const handleRadioChange = async (e) => {
    setIsNewFolder(e.target.value === 'new');
    setFormData({ ...formData, parent_folder: '' });
    if (e.target.value === 'existing' && formData.datacenter_name) {
      await fetchParentFolders(formData.datacenter_name);
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
    if (formData.datacenter_name && !isNewFolder) {
      fetchParentFolders(formData.datacenter_name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set isSubmitting to true when form is submitted
    try {
      const { datacenter_name, parent_folder, folder_name } = formData;
      const flatParentFolder = parent_folder.flatMap(folder => folder.split('/'));
      const requestBody = {
        datacenter_name,
        parent_folder: flatParentFolder,
        folder_name
      };
      const response = await fetch('http://127.0.0.1:5000/api/create_customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = 'Failed to create customer folder';
        //const parsedError = JSON.parse(errorData);
        //console.log(parsedError)
        console.log(errorData.error);
        if (errorData && errorData.msg) {
          errorMessage += `: ${errorData.msg}`;
        }
        throw new Error(errorMessage);
      }
      setStatusMessage('Customer folder created successfully'); // Set success message
    } catch (error) {
      setStatusMessage(`Error creating customer folder: ${error.message}`); // Set error message
    } finally {
      setIsSubmitting(false); // Set isSubmitting back to false after submission is complete
    }
  };

  return (
    <div>
      <h2>Create Customer Folder</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Datacenter Name:</label>
          <select
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
          <label>
            New Folder
            <input
              type="radio"
              name="folder_option"
              value="new"
              checked={isNewFolder}
              onChange={handleRadioChange}
            />
          </label>
          <label>
            Existing Folder
            <input
              type="radio"
              name="folder_option"
              value="existing"
              checked={!isNewFolder}
              onChange={handleRadioChange}
            />
          </label>
        </div>

        {!isNewFolder && parentFolders && parentFolders.length > 0 && (
          <div>
            <label>
              Parent Folder:
              <select
                name="parent_folder"
                value={formData.parent_folder}
                onChange={handleChange}
                onClick={handleParentFolderClick}
              >
                <option value="">Select a parent folder</option>
                {parentFolders.map((folder) => (
                  <option key={folder} value={folder}>
                    {folder}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
        {isNewFolder && (
          <div>
            <label>
              Parent Folder:
              <input
                type="text"
                id="parent_folder"
                name="parent_folder"
                value={formData.parent_folder_display || ''}
                onChange={handleChange}
                onClick={handleParentFolderClick}
                placeholder="Enter or select a parent folder"
            />
            </label>
          </div>
        )}
        <div>
          <label>Folder Name:</label>
          <input
            type="text"
            name="folder_name"
            value={formData.folder_name}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <div className="loader"></div> // Display rotating circle when submitting
          ) : (
            "Create Folder"
          )}
        </button>
        {typeof statusMessage === 'string' && statusMessage && (
          <div
            className={`status-message ${statusMessage.startsWith("Error") ? "error" : "success"}`}
          >
            {statusMessage}
          </div>
        )}
      </form>
    </div>
  );
}

export default CreateCustomerFolder;
