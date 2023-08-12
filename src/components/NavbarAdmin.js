import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
    import axios from '../components/axios.js';
import "./styles.css"
import logo from"../picture/Logo.png" ;
import logout from "../picture/logout_icon.png";
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
const BASE_URL ="https://coffin-server-production.up.railway.app/";
const LOGOUT_URL = `${BASE_URL}api/employee/auth/revoke`;

const NavbarAdmin=(props) =>{

  function logOut(){
    console.log(localStorage.getItem('token'));
    const AuthToken = 'Bearer '.concat(localStorage.getItem('token'))
    const logOut = axios.post(LOGOUT_URL,
        null,
        {
        headers:{'Authorization':AuthToken}
      })
        .then(res=>{console.log(res.data);})
        .catch(err=>console.log(err))
  }

  return(
    
      <Nav>
        <NavMenu>
          <div className="selectedLink">

          <NavLink to="/admin/dashboard">
              Dashboard
            </NavLink>

            <NavLink to="/admin/transaction">
              Transaction
            </NavLink>
          
            <NavLink to="/admin/account_management">
              Account Management
            </NavLink>

            <NavLink to="/admin/donation">
              Donation
            </NavLink>
          </div>
        </NavMenu>

        <NavMenu>
          <div>{props.user}</div>
          <NavLink activeStyle style={{marginLeft:"0rem"}} to="/edit_profile">
            <img src={logo} width="30" height="30"/>
          </NavLink>
          <NavLink activeStyle style={{marginLeft:"0rem"}} to="/login" onClick={logOut}>
            <img src={logout} width="30" height="30"/>
          </NavLink>
        </NavMenu>
      </Nav>
  );
};
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
{/* reportWebVitals(); */}
export default NavbarAdmin;
