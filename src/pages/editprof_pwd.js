import React from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import NavbarAdmin from "../components/NavbarAdmin";
import axios from "../components/axios";
import { useEffect,useRef,useState } from "react";
import { Nav } from "../components/NavbarElements";
import show from "../picture/mdi_show.png";
import show_open from "../picture/mdi_show_open.png"

const PROF_URL = 'https://coffin-server-production.up.railway.app/api/employee/me/auth/change-password';

const EditProfilePwd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    userRef.current.focus();
}, [])

  const [password, setPassword] = useState('');
  const [showPassword,setShowPassword] = useState(false);
  const [oldPassword,setOldPassword]=useState('');
  const [showOldPassword,setShowOldPassword]=useState(false);
  const [newPassword,setNewPassword]=useState('');
  const [showNewPassword,setShowNewPassword]=useState(false);
  const [errMsg, setErrMsg] = useState('');

  const AuthToken = 'Bearer '.concat(localStorage.getItem('token'))
  const goBack = () =>{navigate(-1);}

  const togglePass = (e,num) =>{
    e.preventDefault();
    if(num===1)
      setShowOldPassword(!showOldPassword);
    else if(num===2)
      setShowPassword(!showPassword);
    else if(num==3)
      setShowNewPassword(!showNewPassword);
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(localStorage.getItem('token'));
    try {
      const response = await axios.post(PROF_URL,
        {old_password:oldPassword,password:password,password_confirmation:newPassword },
        {headers:{'Authorization':AuthToken}}
      )
              console.log(response);
              // console.log(loginDetail);
              // console.log(loginDetail.name);
              // console.log(roles);
              // setName('');
              // setEmail('');
                // navigate(from, { replace: true });
              goBack();
              
            } catch (err) {
                if (!err?.response) {
                    setErrMsg('Wrong Password');
                } else if (err.response?.status === 400) {
                    setErrMsg('Wrong Password');
                } else if (err.response?.status === 401) {
                    setErrMsg('Wrong Password');
                } else {
                    setErrMsg('Wrong Password');
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

        <section style={{justifyContent:"center",alignItems:"center",margin:"auto",marginTop:'6%'}}>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <h1>Edit</h1>
          <form style={{justifyContent:"center"}} onSubmit={handleSubmit}>
          

              <label htmlFor="oldPassword">Old Password</label>
              <div style={{display:'flex',flexDirection:'row',border:'1px solid gray',borderRadius:'30px',backgroundColor:'white'}}>
                <input
                    type={showOldPassword?"text":"password"}
                    id="oldPassword"
                    ref={userRef}
                    onChange={(e) => setOldPassword(e.target.value)}
                    value={oldPassword}
                    style={{border:'none',borderRadius:'30px',outline:'none',paddingLeft:'5%',paddingRight:'3%',width:'85%'}}
                />
                <img src={showOldPassword?show_open:show} width='35' height='35' style={{margin:'auto',marginRight:'4%',borderRadius:'30%'}}  onClick={(e)=>{togglePass(e,1)}}/>
              </div>

              <label htmlFor="newPassword">New Password:</label>
              <div style={{display:'flex',flexDirection:'row',border:'1px solid gray',borderRadius:'30px',backgroundColor:'white'}}>
                <input
                    type={showPassword?"text":"password"}
                    id="newPassword"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    style={{border:'none',borderRadius:'30px',outline:'none',paddingLeft:'5%',paddingRight:'3%',width:'85%'}}
                />
                <img src={showPassword?show_open:show} width='35' height='35' style={{margin:'auto',marginRight:'4%',borderRadius:'30%'}}  onClick={(e)=>{togglePass(e,2)}}/>
             </div>

              <label htmlFor="confPassword">Confirm Password:</label>
              <div style={{display:'flex',flexDirection:'row',border:'1px solid gray',borderRadius:'30px',backgroundColor:'white'}}>
                <input
                    type={showNewPassword?"text":"password"}
                    id="confPassword"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    style={{border:'none',borderRadius:'30px',outline:'none',paddingLeft:'5%',paddingRight:'3%',width:'85%'}}
                />
                <img src={showNewPassword?show_open:show} width='35' height='35' style={{margin:'auto',marginRight:'4%',borderRadius:'30%'}}  onClick={(e)=>{togglePass(e,3)}}/>
              </div>

              <button style={{backgroundColor:'#F3B792',borderRadius:'30px',border:'none'}}>Confirm</button>
          </form>
          
      </section>

     
    </>
  );
};

export default EditProfilePwd;
