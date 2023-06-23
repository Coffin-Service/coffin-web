import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";

import "./styles.css"
import logo from"../picture/Logo.png" ;
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const NavbarAdmin=(props) =>{

  return(
    
      <Nav>
        <NavMenu>
          <div className="selectedLink">

            <NavLink to="/admin/transaction">
              Transaction
            </NavLink>
          
            <NavLink to="/admin/account_management">
              Account Management
            </NavLink>
          </div>
        </NavMenu>

        <NavMenu>
          <div>{props.user}</div>
          <NavLink activeStyle style={{marginLeft:"0rem"}} to="/edit_profile">
            <img src={logo} width="30" height="30"/>
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
