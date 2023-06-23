import { useRef, useState, useEffect, useContext } from 'react';
// import AuthContext from "../components/AuthProvider";
import useAuth from '../hooks/useAuth.js';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from"../picture/Logo.png" ;

import axios from '../components/axios.js';
import AuthContext from '../components/AuthProvider.js';
const BASE_URL ="https://coffin-server-production.up.railway.app/";
const LOGIN_URL = `${BASE_URL}api/employee/auth/login`;
const LOGIN_DETAIL_URL = `${BASE_URL}api/employee/me`;
const LOGOUT_URL = `${BASE_URL}api/employee/auth/revoke`;

const Login = () => {
  const { auth,setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const fromAdm = location.state?.from?.pathname || "/admin";
  const fromFuneral = location.state?.from?.pathname || "/partner/funeral";
  const fromCoffin = location.state?.from?.pathname || "/partner/coffin";

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
    console.log(loginDetail.name);
    logOut();
    // getLoginDetailRole();
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
                  getLoginDetailRole(email,pwd);
                //   console.log('tryin to login');
                //   const getToken = await getLoginDetailRole();
                //   const roles = loginDetail.name;
                //   console.log(loginDetail);
                //   console.log("checking if role is "+loginDetail?.name);
                //   console.log(roles);
                    // navigateRole();
                //   setAuth({email, pwd, roles, accessToken });
                  setEmail('');
                  setPwd('');
                    // navigate(from, { replace: true });
                  
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
        // const AuthToken = 'Bearer '.concat(localStorage.getItem('token'))
        // const roles = loginDetail?.name;
        // getLoginDetailRole(email,pwd);
        // setAuth({email, pwd, roles, AuthToken });
        // setEmail('');
        // setPwd('');
        // navigateRole();
    }
        
            function getLoginDetailRole(email,pwd){
                // console.log(localStorage.getItem('token'));
                const AuthToken = 'Bearer '.concat(localStorage.getItem('token'))
                const getRole = axios.get(LOGIN_DETAIL_URL,{
                    headers:{'Authorization':AuthToken}
                  })
                    .then(res=>
                        {
                            setLoginDetail(res.data.data);
                            // console.log(res.data.data);
                            const roles = res.data.data.name;
                            setAuth({email, pwd, roles, AuthToken });
                            navigateRole(roles);
                        })
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
    
            function navigateRole(role){
                // e.preventDefault();
                // console.log("try to navigate to"+role);
                if(role==="Admin"){navigate(fromAdm,{replace:true});}
                if(role==="funeral"){navigate(fromFuneral,{replace:true});}
                if(role==="Coffin"){navigate(fromCoffin,{replace:true});}
            }

            function logOut(){
                console.log(localStorage.getItem('token'));
                const AuthToken = 'Bearer '.concat(localStorage.getItem('token'))
                const logOut = axios.post(LOGOUT_URL,
                    null,
                    {
                    headers:{'Authorization':AuthToken}
                  })
                    .then(res=>{console.log(res.data);setLoginDetail([])})
                    .catch(err=>console.log(err))
            }
  return (

      <section style={{justifyContent:"center",alignItems:"center",margin:"auto"}}>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          {/* <h1>Sign In</h1> */}
          <form onSubmit={handleSubmit} style={{padding:'30px'}}>
            <img src={logo} style={{width:'130px',minWidth:'50px',maxWidth:'200px',margin:'auto'}}/>
              <label htmlFor="email" style={{margin:'auto',padding:'10px'}}>Email</label>
              <input
                  type="text"
                  id="email"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  style={{borderRadius:'20px'}}
              />

              <label htmlFor="password" style={{margin:'auto',padding:'10px'}}>Password</label>
              <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  style={{borderRadius:'20px'}}
              />
              <button style={{borderRadius:'25px',backgroundColor:'#f3b792'}}>Login</button>
          </form>
          <p style={{margin:'auto',justifyContent:'center',alignItems:'center',textAlign:'center',padding:'20px'}}>
              Don't have an account?<br />
              <span>
                  <Link to="/register" >Register</Link>
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
