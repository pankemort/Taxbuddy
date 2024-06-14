import { useRef, useState, useEffect, useContext } from 'react';
// import AuthContext from "../context/AuthProvider";
import AuthContext from "../context/AuthProvider"
// import "./register.css";
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import Loader from './Loader';

const LOGIN_URL = 'https://project-taxbuddy.onrender.com/user/login';


const Login = () => {
    const {setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();
    const [accessToken, setaccesstoken] = useState('');
    const navigate = useNavigate(); // Use navigate for programmatic navigation

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userName, setUserName] = useState(''); // State to store user's name

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            
            
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ "name":user, "password":pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    // withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data?.data[0]?.token));
            console.log(JSON.stringify(response));
            // const accessToken = response?.data?.data[0]?.token;
            // setaccesstoken(response?.data?.data[0]?.token)
            // const accessToken = response?.data?.accessToken;
            // const roles = response?.data?.roles;
            setAuth({token:response?.data?.data[0]?.token});
            setUserName(user); // Set the user's name once logged in
            setUser('');
            setPwd('');
            // setSuccess(true);
            navigate('/success', { state: { userName: user } }); // Navigate to SuccessPage with userName
        } catch (err) {
            if (!err?.response) {
                console.log(err)
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }finally{
            setIsLoading(false);

        }
    }

    return (
        
        <>
        <nav className='main-nav'>
        <div className='logo'>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2>
                <span>T</span>ax
                <span>B</span>uddy
            </h2>
         </Link>
        </div>
        </nav>
        
    < div className="container">
            {/* {success ? (    
                <section>
                    <h1>Welcome, {userName}!</h1>
                    <br />
                    <p className='link'>
                        <Link to="/upload" style={{color:'black'}}>Upload Documents</Link>
                        <Link to="/Data" style={{color:'black', marginLeft:'10px'} } >Go to Data</Link>
                    </p>
                </section>
            ) : ( */}
                <section className='Register-section'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <div className='formouter'>
                    <h1 className='letsgo'>Sign In</h1>
                    <form onSubmit={handleSubmit} className='forminner'>
                    <div className='signupusername'>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                    </div>
                    <div className='signuppwd'>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        </div>
                        {/* <div className='signupbtn'>
                        <button>Sign In</button>
                        </div> */}
                          <div className="signupbtn">
                  {isLoading ? (
                    <Loader /> // Render the Loader component if loading is true
                  ) : (
                    <button type="submit">Sign In</button>
                  )}
                </div>
                    </form>
                   
                    <p>
                        Need an Account?<br />
                        <span className="link">
                            {/*put router link here*/}
                            <Link className="styled-link" to="/login" style={{color:'black'}}>Sign Up</Link>
                        </span>
                    </p>
                    </div>
                </section>
            {/* )} */}
      
        </div>
         </>
    )
}

export default Login