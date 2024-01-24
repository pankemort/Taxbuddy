import React from 'react'
import "@fontsource/poppins/400.css";
import "./home.css"
import {Link,Route,Routes,useNavigate} from "react-router-dom";
import Register from './Register';

const Home = () => {
  const navigation = useNavigate()
  return (
    
    <>

     
    
    <nav className='main-nav'>
        <div className='logo'>
            <h2>
                <span>T</span>ax
                <span>B</span>uddy
            </h2>
        </div>


     <div className="menu-link">
     <ul>
            <li onClick={()=>navigation("/login")}>
              
              <Link to='/login' className='loginlink'>  Login </Link>
              
            </li>
      </ul>
      </div> 
    </nav>

    <section className='hero-section'>
      <p>Welcome to </p>
      <h1>TAXBUDDY</h1>
    </section>
    <Routes>
        
        <Route path='/login' element={<Register/>}>

   </Route>
   </Routes>



    







    </>
  )
}

export default Home