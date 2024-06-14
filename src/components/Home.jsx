import React, { useEffect, useRef } from 'react'
import "@fontsource/poppins/400.css";
import "./home.css"
import {Link,Route,Routes,useNavigate} from "react-router-dom";
import Register from './Register';
import Nav from './Nav';
import ExternalLink from './ExternalLink';
import Consultancy from '../images/consultancy.png'
import Question from '../images/question.png'
import { Link as ScrollLink, Element } from 'react-scroll';
import About2 from '../images/aboutus2.svg'
import About1 from '../images/aboutus1.svg'
import About3 from '../images/aboutus3.svg'
const Home = () => {
  const navigation = useNavigate()
  
  // const handleRedirect = () => {
  //   window.location.href = 'https://mediafiles.botpress.cloud/d3850678-ee5b-4847-b826-c67ce945541f/webchat/bot.html';
  // };
  const aboutRef = useRef(null);

  useEffect(() => {
    const aboutSection = aboutRef.current;
    const aboutItems = aboutSection.querySelectorAll('.about-us-item');

    const observerOptions = {
      root: null,
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // observer.unobserve(entry.target); // Optional: Stop observing once the element is visible
        }else {
          entry.target.classList.remove('visible');
        }
      });
    }, observerOptions);

    aboutItems.forEach(item => observer.observe(item));

    return () => {
      aboutItems.forEach(item => observer.unobserve(item));
    };
  }, []);

  return (
    
    <>

     
    
    {/* <nav className='main-nav'>
        <div className='logo'>
           <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}> 
       
            <h2>
                <span>T</span>ax
                <span>B</span>uddy
            </h2>
            </Link>
        </div>


     <div className="menu-link">
     <ul>
            <li onClick={()=>navigation("/login")}>
              
              <Link to='/login' className='loginlink'>  Login </Link>
              
            </li>
      </ul>
      </div> 
    </nav> */}



    {/* <nav className='main-nav'> 
    <Nav /> 
    <div className="menu-link">
     <ul>
            <li onClick={()=>navigation("/login")}>
              
              <Link to='/login' className='loginlink'>  Login </Link>
              
            </li>
      </ul>
      </div> 
    </nav> */}
      <Nav>
        <div className="menu-link">
          <ul>
            <li onClick={() => navigation("/login")}>
              <Link to='/login' className='loginlink'>Login</Link>
            </li>
          </ul>
        </div>
      </Nav>

    
    

    <section className='hero-section'>
     
      
      <h1>TAXBUDDY</h1>
      <p>Say goodbye to tax headaches. We handle the filing, you keep the savings </p>
      <ScrollLink to="about-us" smooth={true} duration={500} className='scroll-link'>
          Learn More About Us
        </ScrollLink>
      <div className='options-container'>
          <div className='option'>
            <img src={Consultancy} alt='File ITR Yourself' />
            <h2>Consult Us</h2>
            <p>Unlock hidden tax savings with our personalized recommendations.</p>
            <ExternalLink href='https://mediafiles.botpress.cloud/d3850678-ee5b-4847-b826-c67ce945541f/webchat/bot.html' className='btnhome'>Click here</ExternalLink>
          </div>
          <div className='option'>
            <img src={Question} alt='Hire a Tax Expert' />
            <h2>Ask Us</h2>
            <p>Got tax questions? We've got answers. Ask away!</p>
           <div id='btn2'>  <ExternalLink href='https://taxbuddy-qna-bot.streamlit.app/'  className='btnhome' id='btn2'>Click here</ExternalLink></div>
          </div>
        </div>
    </section>

    {/* about us */}
    {/* <div className="divider"></div> */}

<section id="about-us" className="about-section" ref={aboutRef}>
  <div className="about-us-content">
    <div className="about-us-item">
      <img src={About1} alt="Maximum Tax Savings" />
      <h3>Who are we</h3>
      <p>We are a dedicated team  committed to making tax filing simple and stress-free. Our mission is to ensure maximum savings and compliance for both businesses and individuals.</p>
    </div>
    <div className="about-us-item">
      <img src={About2} alt="Unparalleled Speed" />
      <h3>What do we do</h3>
      <p>We provide comprehensive tax filing and a tax planning recommendation chatbot . Our streamlined process ensures you get the maximum refund in the shortest time possible.</p>
    </div>
    <div className="about-us-item">
      <img src={About3} alt="Accurate Compliance" />
      <h3>How do we do</h3>
      <p>Utilizing the latest technology, we stay ahead of tax regulations. Our user-friendly platform will guide you through every step of the tax filing process.</p>
    </div>
  </div>
</section>

    <Routes>
        
        <Route path='/login' element={<Register/>}>

   </Route>
   </Routes>



    







    </>
  )
}

export default Home