// App.js

import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css'; // Import CSS file for styling
import Compute from './Compute';
import CreateVMForm from './CreateVMForm';
import UpdateVMForm from './UpdateVMForm';
import ListVMs from './ListVMs';
import CreateCustomerFolder from './CreateCustomerFolder';
import CreateSingleVMForm from './CreateSingleVMForm'; // Import CreateSingleVMForm component
import companyLogo from './company-logo.png'; // Import your company logo image file
import SuccessPage from './SuccessPage';
import ErrorPage from './ErrorPage';
import StatusPage from './StatusPage';
// import { ApiProvider } from './ApiContext'; // Import ApiProvider
import { ApiResponseProvider } from './ApiResponseContext';

function App() {
  return (
    <Router>
      <ApiResponseProvider> {/* Wrap the Routes with ApiProvider */}
        <div className="container">
          <header className="header">
            <div className="logo-container">
              <img className="logo" src={companyLogo} alt="Company Logo" />
              <div>
                <div className="company-name">e& Enterprise Cloud</div>
              </div>
            </div>
            <nav className="navbar">
              <ul className="nav-menu">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <div className="nav-link">Compute</div>
                  <ul className="sub-menu">
                    <li className="sub-menu-item">
                      <Link to="/compute/createcustomer" className="sub-menu-link">Create Customer</Link>
                    </li>
                    <li className="sub-menu-item">
                      <Link to="/compute/create" className="sub-menu-link">Create VM</Link>
                    </li>
                    <li className="sub-menu-item">
                      <Link to="/compute/update" className="sub-menu-link">Update VM</Link>
                    </li>
                    <li className="sub-menu-item">
                      <Link to="/compute/list" className="sub-menu-link">List VMs</Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link to="/storage" className="nav-link">Storage</Link>
                </li>
                <li className="nav-item">
                  <Link to="/networking" className="nav-link">Networking</Link>
                </li>
                <li className="nav-item">
                  <Link to="/backup" className="nav-link">Backup</Link> {/* Updated link for Backup */}
                </li>
                <li className="nav-item">
                  <Link to="/monitoring" className="nav-link">Monitoring</Link> {/* Updated link for Monitoring */}
                </li>
              </ul>
            </nav>
          </header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/compute/*" element={<Compute />}>
              <Route path="createcustomer" element={<CreateCustomerFolder />} />
              <Route path="create" element={<CreateVMForm />} />
              <Route path="update" element={<UpdateVMForm />} />
              <Route path="list" element={<ListVMs />} />
            </Route>
            <Route path="/create-single-vm" element={<CreateSingleVMForm />} /> {/* Move this route outside Compute */}
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/status" element={<StatusPage />} />
            {/* Add routes for other services */}
          </Routes>
        </div>
      </ApiResponseProvider>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Welcome to e& Enterprise Cloud</h1>
      {/* Add any additional content for the Home page */}
    </div>
  );
}

export default App;
