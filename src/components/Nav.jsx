import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Nav = ({ children }) => {
  const navigate = useNavigate();

  return (
    <nav className='main-nav'>
      <div className='logo'>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h2>
            <span>T</span>ax
            <span>B</span>uddy
          </h2>
        </Link>
      </div>
      {/* <div className="menu-link">
        <ul>
          <li onClick={() => navigate("/login")}>
            <Link to='/login' className='loginlink'>Login</Link>
          </li>
        </ul>
      </div> */}
       <div className="nav-links">
        {children}
      </div>
    </nav>
  );
};

export default Nav;

