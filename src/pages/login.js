import { useRef, useState, useEffect, useContext } from 'react';
// import AuthContext from "../components/AuthProvider";
import useAuth from '../hooks/useAuth.js';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../components/axios.js';
const LOGIN_URL = '/auth';

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

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
              JSON.stringify({ user, pwd }),
              {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true
              }
          );
          console.log(JSON.stringify(response?.data));
          //console.log(JSON.stringify(response));
          const accessToken = response?.data?.accessToken;
          const roles = response?.data?.roles;
          setAuth({ user, pwd, roles, accessToken });
          setUser('');
          setPwd('');
          navigate(from, { replace: true });
      } catch (err) {
          if (!err?.response) {
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

      <section>
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
              <span className="line">
                  <Link to="/register">Sign Up</Link>
              </span>
          </p>
      </section>

  )
}

export default Login


// import React from "react"
// import { useNavigate } from "react-router-dom";

// const Login = (props) => {
//   // const navigate = useNavigate();
//   const onClick=()=>{
    
//   }
//   return (
//     <div>
//       <h1>
//         This is Login Page
//       </h1>
//       <button onClick={()=> {props.handleClick('admin')}}>
//         Login as Admin
//       </button>
//       <button onClick={()=> {props.handleClick('part_fun')}}>
//         Login as Partner - Funeral
//       </button>
//       <button onClick={()=> {props.handleClick('part_cof')}}>
//         Login as Partner - Coffin
//       </button>
//     </div>
//   );
// };

// export default Login;
