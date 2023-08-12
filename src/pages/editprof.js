import React from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import NavbarAdmin from "../components/NavbarAdmin";
import axios from "../components/axios";
import { useEffect,useRef,useState } from "react";
import { Nav } from "../components/NavbarElements";

const BASE_URL ="https://coffin-server-production.up.railway.app/";
const PROF_URL = `${BASE_URL}api/employee/me/update-profile`;
const LOGIN_DETAIL_URL = `${BASE_URL}api/employee/me`;

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    userRef.current.focus();
    getLoginDetailRole();
}, [])

  const [loginDetail,setLoginDetail]=useState([]);
  const [name, setName] = useState('');
  const [email,setEmail]=useState('');
  const [phone,setPhone]=useState('');
  const [errMsg, setErrMsg] = useState('');

  const AuthToken = 'Bearer '.concat(localStorage.getItem('token'))

  const goBack = () =>{navigate(-1);}
  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(localStorage.getItem('token'));
    try {
      const response = await axios.patch(PROF_URL,
        {name:name, email:email , phone_number:phone},
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
                    setErrMsg('Missing Email, Name or Phone Number');
                } else if (err.response?.status === 401) {
                    setErrMsg('Unauthorized');
                } else {
                    setErrMsg('Process Failed');
                }
                errRef.current.focus();
            }
        }
        function getLoginDetailRole(){
          // console.log(localStorage.getItem('token'));
          const AuthToken = 'Bearer '.concat(localStorage.getItem('token'))
          const getRole = axios.get(LOGIN_DETAIL_URL,{
              headers:{'Authorization':AuthToken}
            })
            .then(res=>
              {
                setLoginDetail(res.data.data);
                setEmail(res.data.data.email);
                setName(res.data.data.name);
                setPhone(res.data.data.phone_number);
              })
            // .then(res=>console.log(res.data.data))
            // .then(data=>console.log(data))
            .catch(err=>console.log(err))
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

              <label htmlFor="phone">Phone Number</label>
              <input
                  type="text"
                  id="phone"
                  autoComplete="off" 
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
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
