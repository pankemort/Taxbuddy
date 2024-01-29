// DataView.jsx

import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthProvider'; // Update with your actual AuthContext import
import axios from '../api/axios';
// import './DataView.css'; // Import the CSS file for styling

const DataView = () => {
  const { auth } = useContext(AuthContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(auth.token);
        const response = await axios.get('https://project-taxbuddy.onrender.com/getData', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token}`,
          },
        });

        setData(response.data?.data[1]);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [auth.token]);
  console.log(data);
  return (
    <div className="data-view-container">
      <h2>Data View</h2>
      {data ? (
        <div className="data-details">
          <p><strong>Form Name:</strong> {data.formName}</p>
          <p><strong>Part:</strong> {data.part}</p>
          <p><strong>Employee Name:</strong> {data.employeeName}</p>
          <p><strong>Employee Address:</strong> {data.employeeAddress}</p>
          <p><strong>Employer Name and Address:</strong> {data.employerNameAddress}</p>
          <p><strong>Assessment Year:</strong> {data.employerNameAddress}</p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default DataView;
