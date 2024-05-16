import React from 'react';
import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const location = useLocation();
  console.log('Location state:', location.state);
  console.log('location state message', location.state.message)
  //const vm_name = location.state && location.state.vm_name;
  const task_result = location.state && location.state.message
  // const message = location.state && location.state.message;

  return (
    <div>
      {/* <h2>VM {vm_name} is created successfully!</h2> */}
      <h2>{task_result}</h2>
      {/* {message && <p>{message}</p>} */}
    </div>
  );
};

export default SuccessPage;
