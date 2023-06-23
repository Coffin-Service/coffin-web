import React from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import NavbarAdmin from "../components/NavbarAdmin";
import axios from "../components/axios";
import { useEffect,useRef,useState } from "react";
import { Nav } from "../components/NavbarElements";

const PROF_URL = 'https://coffin-server-production.up.railway.app/api/employee/me/update-profile';

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    userRef.current.focus();
}, [])

  const [name, setName] = useState('');
  const [email,setEmail]=useState('');
  const [errMsg, setErrMsg] = useState('');

  const AuthToken = 'Bearer '.concat(localStorage.getItem('token'))

  const goBack = () =>{navigate(-1);}
  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(localStorage.getItem('token'));
    try {
      const response = await axios.patch(PROF_URL,
        {name:name, email:email },
        {headers:{'Authorization':AuthToken}}
      )
              console.log(response);
              // console.log(loginDetail);
              // console.log(loginDetail.name);
              // console.log(roles);
              setName('');
              setEmail('');
              goBack();
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
        }
    
    // const postPass = axios.put(PROF_URL,{
    //   headers:{'Authorization':AuthToken}
    // })
    //   .then(res=>console.log(res))
    //   // .then(res=>console.log(res.data.data))
    //   // .then(data=>console.log(data))
    //   .catch(err=>console.log(err))

  return (
    <>
      <Nav>
        <Link onClick={goBack} style={{color:"white",margin:'auto',marginLeft:'2%',fontWeight:'bold'}}>Back</Link>
      </Nav>

        <div className="font_color">
          {/* <h1>
            This is EditProfile
          </h1>
          <h2>
            Username is : {name}
          </h2> */}
        </div>

        <section style={{justifyContent:"center",alignItems:"center",margin:"auto"}}>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <h1>Edit</h1>
          <form style={{justifyContent:"center"}} onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
              <input
                  type="text"
                  id="email"
                  autoComplete="off" 
                  ref={userRef}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  style={{borderRadius:'30px',border:'none',paddingLeft:'5%',paddingRight:'5%'}}
              />

              <label htmlFor="name">Name</label>
              <input
                  type="text"
                  id="name"
                  autoComplete="off" 
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  style={{borderRadius:'30px',border:'none',paddingLeft:'5%',paddingRight:'5%'}}
              />

              <Link to="/edit_profile/pwd" style={{margin:'auto',marginTop:'5%'}}>
                Change Password 
              </Link>

              {/* <label htmlFor="password">Password:</label>
              <input
                  type="password"
                  id="password"

              /> */}
              <button style={{backgroundColor:'#F3B792',borderRadius:'30px',border:'none'}}>Confirm</button>
          </form>
          
          
      </section>

     
    </>
  );
};

export default EditProfile;
