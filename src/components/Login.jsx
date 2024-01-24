import { useRef, useState, useEffect, useContext } from 'react';
// import AuthContext from "../context/AuthProvider";
import {AuthContext} from "../context/AuthProvider"
import "./register.css";
import axios from '../api/axios';
import { Link } from 'react-router-dom';
const LOGIN_URL = 'https://project-taxbuddy.onrender.com/user/login';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();
    const [accessToken, setaccesstoken] = useState('');

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ "name":user, "password":pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    // withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data?.data[0]?.token));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.data[0]?.token;
            // const accessToken = response?.data?.accessToken;
            // const roles = response?.data?.roles;
            setAuth( {user,pwd,accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
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
        }
    }

    return (
        <div  className="container">
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p className='link'>
                        <Link to="/upload" style={{color:'black'}}>Go to Home</Link>
                    </p>
                </section>
            ) : (
                <section className='Register-section'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
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

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="link">
                            {/*put router link here*/}
                            <Link className="styled-link" to="/login" style={{color:'black'}}>Sign Up</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
        </div>
    )
}

export default Login