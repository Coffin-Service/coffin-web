import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";

import './styles.css'
import logo from"../picture/Logo.png" ;
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const NavbarPartFun=(props) =>{
  return(
      <>
      <Nav>
        <NavMenu>
          <div className="selectedLink">
          <NavLink to="/partner/funeral/service" activeStyle style={{marginLeft:"0rem", whiteSpace:'nowrap'}}>
            Funeral Service
          </NavLink>
          <NavLink to="/partner/funeral/transaction" activeStyle style={{whiteSpace: "nowrap"}}>
            Funeral Transaction
          </NavLink>
          <NavLink to="/partner/funeral/service_data" activeStyle style={{whiteSpace: "nowrap"}}>
            Funeral Service Data
          </NavLink>
          </div>
        </NavMenu>
        
        <NavMenu>
          <div>{props.user}</div>
          <NavLink to="/edit_profile" style={{marginLeft:"0rem",textAlign:"right"}}>
          <img src={logo} width="30" height="30"/>
          </NavLink>
        </NavMenu>
        </Nav>
      
      </>
  );
};
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
{/* reportWebVitals(); */}
export default NavbarPartFun;
