// DataView.jsx

import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthProvider'; // Update with your actual AuthContext import
import axios from '../api/axios';
import Loader from './Loader';
import Nav from './Nav';
import './Dataview.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
const DataView = () => {
  const { auth } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigate()
  

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
        if(response.data?.data[1]){

        
        setData(response.data?.data[1]); 
      }
      } catch (error) {
        console.error('Error fetching data:', error.message)
        ;
      }finally{
        setIsLoading(false);
      }
    };
    if(auth.token){

  
    fetchData();
  }
  else{
    navigation('/login1');
  }
  }, [auth.token]);
  console.log(data);
  return (
    <>
   <Nav/>
   <div className="parent-container">
    <div className="data-view-container">
      <h2 className='dataview'  style={{ textAlign: 'center' }}> View Data </h2>
      {isLoading ? (
         // Render loader if isLoading is true
         <div className="loaderdata"> <Loader /></div>
       
      ) : (
      data ? (
        <div className="data-details">
          <p className='pdata'><strong>Form Name:</strong> {data.formName}</p>
          <p className='pdata'><strong>Part:</strong> {data.part}</p>
          <p className='pdata'><strong>Employee Name:</strong> {data.employeeName}</p>
          <p className='pdata'><strong>Employee Address:</strong> {data.employeeAddress}</p>
          <p className='pdata'><strong>Employer Name and Address:</strong> {data.employerNameAddress}</p>
          <p className='pdata'><strong>Assessment Year:</strong> {data.employerNameAddress}</p>
          {/* Add more fields as needed */}
        </div>
       
      ) : (
        <p>No data available</p>
      )
      )}
    </div>
    </div>
    </>
  );
};

export default DataView;
