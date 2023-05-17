import { useRef, useState, useEffect, useContext } from 'react';
// import AuthContext from "../components/AuthProvider";
import useAuth from '../hooks/useAuth.js';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../components/axios.js';
import AuthContext from '../components/AuthProvider.js';
const LOGIN_URL = 'https://coffin-server-production.up.railway.app/api/employee/auth/login';
const LOGIN_DETAIL_URL = 'https://coffin-server-production.up.railway.app/api/employee/me';

const Login = () => {
  const { auth,setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const [token,setToken]=useState([]);
  const [loginDetail,setLoginDetail]=useState([]);

  useEffect(() => {
      userRef.current.focus();
  }, [])

  useEffect(() => {
      setErrMsg('');
  }, [email, pwd])

  useEffect(()=>{
    if(auth){
        console.log(auth);

    }
  },[auth])

  useEffect(()=>{
    getLoginDetailRole();
  },[])

  const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
          const response = await axios.post(LOGIN_URL,
            { email:email, password:pwd },
            {}
          )
                  const accessToken = response?.data.data.access_token;
                  localStorage.setItem('token',accessToken);
                //   const getToken = await getLoginDetailRole();
                  const roles = loginDetail.name;
                  console.log(loginDetail);
                  console.log(loginDetail.name);
                  console.log(roles);
                  setAuth({email, pwd, roles, accessToken });
                  setEmail('');
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
        
            function getLoginDetailRole(){
                console.log(localStorage.getItem('token'));
                const AuthToken = 'Bearer '.concat(localStorage.getItem('token'))
                const getRole = axios.get(LOGIN_DETAIL_URL,{
                    headers:{'Authorization':AuthToken}
                  })
                    .then(res=>setLoginDetail(res.data.data))
                    // .then(res=>console.log(res.data.data))
                    // .then(data=>console.log(data))
                    .catch(err=>console.log(err))
            }
            // useEffect(()=>{
            //     const token = JSON.parse(localStorage.getItem('token'));
            //     if(token){
            //         setToken(token);
            //     }
            // })

  return (

      <section style={{justifyContent:"center",alignItems:"center",margin:"auto"}}>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email:</label>
              <input
                  type="text"
                  id="email"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
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
