import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../components/axios.js";
import { Link, useNavigate, useLocation } from "react-router-dom";
import './style.css';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const BASE_URL ="https://coffin-server-production.up.railway.app/";
const REGISTER_URL = `${BASE_URL}api/employee/auth/register`;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();


  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const [email, setEmail]=useState('');
  const [validEmail, setValidEmail] = useState(true);
  const [emailFocus, setEmailFocus]=useState(false);

  const [funeral,setFuneral]=useState(false);
  const [coffin,setCoffin]=useState(false);

  useEffect(() => {
      userRef.current.focus();
  }, [])

  useEffect(() => {
      setValidName(USER_REGEX.test(user));
  }, [user])

  useEffect(() => {
      setValidPwd(PWD_REGEX.test(pwd));
      setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd])

  useEffect(()=>{
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  useEffect(() => {
      setErrMsg('');
  }, [user, pwd, matchPwd, email])

  const handleSubmit = async (e) => {
      e.preventDefault();

      
      // if button enabled with JS hack
      const v1 = USER_REGEX.test(user);
      const v2 = PWD_REGEX.test(pwd);
      const v3 = EMAIL_REGEX.test(email);
      
      if (!v1 || !v2 || !v3) {
          setErrMsg("Invalid Entry");
          return;
      }
      try {
          const response = await axios.post(REGISTER_URL,
              { name:user, email:email, password:pwd, type:funeral?'funeral':'coffin'},
              {
                header:{}
              }
            //   {
                
            //     headers: {'Authorization':'Bearer{{employee_token}}','Content-Type': 'application/json' ,'Accept':'application/json'},
            //     withCredentials: false
            //   }
          ).then(function(response){
            console.log(response);
          }).catch(function(error){
            console.log(error);
          });

          // TODO: remove console.logs before deployment
          console.log(JSON.stringify(response?.data));
          //console.log(JSON.stringify(response))
          setSuccess(true);
          //clear state and controlled inputs
          setUser('');
          setPwd('');
          setMatchPwd('');
          setEmail('');
          
      } catch (err) {
          if (!err?.response) {
              setErrMsg('No Server Response');
          } else if (err.response?.status === 409) {
              setErrMsg('Username Taken');
          } else {
              setErrMsg('Registration Failed')
          }
          errRef.current.focus();
      }
    
  }

  const handleFuneral=(e)=>{
    e.preventDefault();
    setCoffin(funeral);

    setFuneral(!funeral);
  }

  const handleCoffin=(e)=>{
    e.preventDefault();
    setFuneral(coffin);

    setCoffin(!coffin)
  }

  return (
      <>
          {success ? (
              <section style={{justifyContent:"center",alignItems:"center",margin:"auto"}}>
                  <h1>Register Success!</h1>
                  <p>Please wait for your account to be approved and check your email.</p>
                  <p>
                      <span className="line">
                          <Link to="/login">Login</Link>
                      </span>
                  </p>
              </section>
          ) : (
              <section style={{justifyContent:"center",alignItems:"center",margin:"auto"}}>
                  <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                  <h1>Register</h1>
                  <form onSubmit={handleSubmit}>
                      <label htmlFor="username"  style={{margin:'auto',padding:'10px'}}>
                          Username
                          <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                          <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                      </label>
                      <input
                          type="text"
                          id="username"
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setUser(e.target.value)}
                          value={user}
                          required
                          aria-invalid={validName ? "false" : "true"}
                          aria-describedby="uidnote"
                          onFocus={() => setUserFocus(true)}
                          onBlur={() => setUserFocus(false)}
                          style={{borderRadius:'20px'}}
                      />
                      <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                          <FontAwesomeIcon icon={faInfoCircle} />
                          4 to 24 characters.<br />
                          Must begin with a letter.<br />
                          Letters, numbers, underscores, hyphens allowed.
                      </p>

                      <label htmlFor="email" style={{margin:'auto',padding:'10px'}}>
                          Email
                          <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                          <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                      </label>
                      <input
                          type="text"
                          id="email"
                          
                          autoComplete="off"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          required
                          aria-invalid={validEmail ? "false" : "true"}
                          aria-describedby="uidnote"
                          onFocus={() => setEmailFocus(true)}
                          onBlur={() => setEmailFocus(false)}
                          style={{borderRadius:'20px'}}
                      />
                      <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                          <FontAwesomeIcon icon={faInfoCircle} />
                          Invalid email format
                      </p>

                      <label htmlFor="password"  style={{margin:'auto',padding:'10px'}}>
                          Password
                          <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                          <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                      </label>
                      <input
                          type="password"
                          id="password"
                          onChange={(e) => setPwd(e.target.value)}
                          value={pwd}
                          required
                          aria-invalid={validPwd ? "false" : "true"}
                          aria-describedby="pwdnote"
                          onFocus={() => setPwdFocus(true)}
                          onBlur={() => setPwdFocus(false)}
                          style={{borderRadius:'20px'}}
                      />
                      <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                          <FontAwesomeIcon icon={faInfoCircle} />
                          8 to 24 characters.<br />
                          Must include uppercase and lowercase letters, a number and a special character.<br />
                          Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                      </p>


                      <label htmlFor="confirm_pwd"  style={{margin:'auto',padding:'10px'}}>
                          Confirm Password
                          <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                          <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                      </label>
                      <input
                          type="password"
                          id="confirm_pwd"
                          onChange={(e) => setMatchPwd(e.target.value)}
                          value={matchPwd}
                          required
                          aria-invalid={validMatch ? "false" : "true"}
                          aria-describedby="confirmnote"
                          onFocus={() => setMatchFocus(true)}
                          onBlur={() => setMatchFocus(false)}
                          style={{borderRadius:'20px'}}
                      />
                      <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                          <FontAwesomeIcon icon={faInfoCircle} />
                          Must match the first password input field.
                      </p>
                      
                      <div style={{display:'flex',flexDirection:'row',borderRadius:'10px',marginTop:'5%'}}>
                        <button style={{margin:'auto',border:'none',backgroundColor:funeral?"#6e7073":"#2F3B54",fontWeight:'bold'}} onClick={(e)=>handleFuneral(e)}>
                            Funeral
                        </button>
                        <button style={{margin:'auto',border:'none',backgroundColor:coffin?"#6e7073":"#2F3B54",fontWeight:'bold'}} onClick={(e)=>handleCoffin(e)}>
                            Coffin
                        </button>
                      </div>


                      <button disabled={!validName || !validPwd || !validMatch || !validEmail ? true : false } 
                      style={{borderRadius:'25px',backgroundColor:'#f3b792'}}>
                        Register
                      </button>
                  </form>
                  <p style={{margin:'auto',justifyContent:'center',alignItems:'center',textAlign:'center',padding:'20px'}}>
                      Already have an account?<br />
                      <span className="line">
                          <Link to="/login">Login</Link>
                      </span>
                  </p>
              </section>
          )}
      </>
  )
}

export default Register












// import React, { useRef, useState, useEffect } from 'react';
// import {faCheck,faTimes, faInfoCircle, faFontAwesome} from "@fortawesome/free-solid-svg-icons";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

// const USER_REGEX = /^[a-zA-z][a-zA-Z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

// const Register = () => {
//   const userRef = useRef();
//   const errRef = userRef();

//   const[user,setUser]=useState('');
//   const[validName,setValidName]=useState(false);
//   const[userFocus,setUserFocus]=useState(false);

//   const[pwd,setPwd]=useState('');
//   const[validPwd,setValidPwd]=useState(false);
//   const[pwdFocus,setPwdFocus]=useState(false);

//   const[errMsg,setErrMsg]=useState('');
//   const[success,setSuccess]=useState(false);

//   useEffect(()=>{
//     userRef.current.focus();
//   },[])

//   useEffect(()=>{
//     const result = USER_REGEX.test(user);
//     console.log(result);
//     console.log(user);
//     setValidName(result);
//   },[user])

//   useEffect(()=>{
//     const result = PWD_REGEX.test(pwd)
//     console.log(result);
//     console.log(pwd);
//     setValidPwd(result);
//   },[pwd])

//   useEffect(()=>{
//     setErrMsg('');
//   },[user,pwd])
//   return (
//     <section>
//       <p ref={errRef} className={errMsg?"errmsg" : "offscreen"} aria-live="assertive">
//         {errMsg}
//       </p>
//       <h1>Register</h1>
//       <form>
//         <label htmlFor="username">
//           Username: 
//           <span className={validName?"valid":"hide"}>
//             <FontAwesomeIcon icon={faCheck}/>
//           </span>
//           <span className={validName|| !user ?"hide":"invalid"}>
//             <FontAwesomeIcon icon={faTimes}/>
//           </span>
//         </label>
//         <input
//           type="text"
//           id="username"
//           ref={userRef}
//           autoComplete="off"
//           onChange={(e)=>setUser(e.target.value)}
//           required
//           aria-invalid={validName?"false":"true"}
//           aria-describedby="uidnote"
//           onFocus={()=>setUserFocus(true)}
//           onBlur={()=>setUserFocus(false)}
//         />

//         <p id="uidnote" className={userFocus&&user&&!validName?"instructions":"offscreen"}>
//           <FontAwesomeIcon icon={faInfoCircle}/>
//           4 to 24 characters.<br/>
//           Must begin with a letter. <br/>
//           Letters, number, underscores, hyphens allowed.
//         </p>
//       </form>
//     </section>
//   )
// }

// export default Register;
