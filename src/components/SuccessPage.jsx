// SuccessPage.jsx
import React from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import "./Success.css";
import Nav from './Nav';
const SuccessPage = () => {
    const location = useLocation();
    const { userName } = location.state || {}; // Destructure userName from location state, fallback to empty object if state is null/undefined
    const navigation = useNavigate()
    return (
        <>
        <Nav>
        <div className="menu-link">
      <ul>
        <li onClick={() => navigation("/")}>
          <Link to='/' className='loginlink'>Logout</Link>
        </li>
      </ul>
    </div>
    </Nav>
        <div className="container2">
         
            <section>
                <h1>Welcome, {userName}!</h1>
                <br />
                <p className='link'>
                    <Link to="/upload" className="button2">Upload Documents</Link>
                    <Link to="/data" className="button2" style={{ marginLeft: '10px' }}>Go to Data</Link>
                </p>
                {/* <div className="btn-container">
                    <Link to="/profile" className="button">Go to Profile</Link>
                    <Link to="/settings" className="button" style={{ marginLeft: '10px' }}>Settings</Link>
                </div> */}
            </section>
        </div>
        </>
    );
};

export default SuccessPage;

