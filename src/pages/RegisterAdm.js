import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../components/axios.js";
import { Link } from "react-router-dom";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const REGISTER_URL = 'https://coffin-server-production.up.railway.app/api/employee/auth/register';

const RegisterAdm = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const [email, setEmail]=useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus]=useState(false);

  const [type, setType]=useState('');
  const [validType, setValidType] = useState(false);
  const [typeFocus, setTypeFocus]=useState(false);

  useEffect(() => {
      userRef.current.focus();
  }, [])

  useEffect(() => {
      setValidName(USER_REGEX.test(user));
  }, [user])

  useEffect(() => {
      setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
}, [email])


  useEffect(() => {
      setErrMsg('');
  }, [user, pwd,email])
  
  const handleSubmit = async (e) => {
      e.preventDefault();
      // if button enabled with JS hack
      const v1 = USER_REGEX.test(user);
      const v2 = PWD_REGEX.test(pwd);
      const v3 = EMAIL_REGEX.test(email);
      
      if (!v1 || !v2 || !v3 ){
          setErrMsg("Invalid Entry");
          return;
      }
      try {
        console.log(type);
          const response = await axios.post(REGISTER_URL,
              { name:user, email:email, password:pwd, type:type},
              {
                header:{'Content-Type': 'application/json','Connection':'keep-alive'}
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

  return (
      <>
          {success ? (
              <section style={{justifyContent:"center",alignItems:"center",margin:"auto"}}>
                  <h1>Success!</h1>
                  <p>
                      <span className="line">
                          <Link to="/">Sign In</Link>
                      </span>
                  </p>
              </section>
          ) : (
              <section>
                  <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                  <h1>Register</h1>
                  <form onSubmit={handleSubmit}>
                      <label htmlFor="username">
                          Username:
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
                      />
                      <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                          <FontAwesomeIcon icon={faInfoCircle} />
                          4 to 24 characters.<br />
                          Must begin with a letter.<br />
                          Letters, numbers, underscores, hyphens allowed.
                      </p>


                      <label htmlFor="password">
                          Password:
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
                      />
                      <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                          <FontAwesomeIcon icon={faInfoCircle} />
                          8 to 24 characters.<br />
                          Must include uppercase and lowercase letters, a number and a special character.<br />
                          Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                      </p>
                      
                      <label htmlFor="email">
                          Email:
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
                          aria-invalid={validName ? "false" : "true"}
                          aria-describedby="uidnote"
                          onFocus={() => setEmailFocus(true)}
                          onBlur={() => setEmailFocus(false)}
                      />
                      <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                          <FontAwesomeIcon icon={faInfoCircle} />
                          Invalid email<br />
                      </p>

                      <label htmlFor="type">
                          Type:
                          {/* <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                          <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} /> */}
                      </label>
                      {/* <input
                          type="text"
                          id="type"
                          
                          autoComplete="off"
                          onChange={(e) => setType(e.target.value)}
                          value={type}
                          required
                          aria-invalid={validName ? "false" : "true"}
                          aria-describedby="uidnote"
                          onFocus={() => setTypeFocus(true)}
                          onBlur={() => setTypeFocus(false)}
                      /> */}
                      <select 
                        id="type"
                        value={type}
                        onChange={(e)=>setType(e.target.value)}>
                        <option value="funeral">Funeral</option>
                        <option value="coffin">Coffin</option>
                      </select>
                      {/* <h1>{type}</h1> */}
                      <button disabled={!validName || !validPwd || !validEmail ? true : false}>Sign Up</button>
                  </form>
                  <p>
                      Already registered?<br />
                      <span className="line">
                          <Link to="/">Sign In</Link>
                      </span>
                  </p>
              </section>
          )}
      </>
  )
}

export default RegisterAdm












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
