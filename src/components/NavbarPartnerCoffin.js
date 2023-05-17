import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
    
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const NavbarPartCof=() =>{
  return(
    
      <Nav>
        <NavMenu>
          {/* <NavLink to="/partner/coffin/service" activeStyle style={{marginLeft:"0rem", whiteSpace:'nowrap'}}>
            Coffin Service
          </NavLink> */}
          <NavLink to="/partner/coffin/transaction" activeStyle style={{marginLeft:"0rem", whiteSpace: "nowrap"}}>
            Coffin Transaction
          </NavLink>
          <NavLink to="/partner/coffin/service_data" activeStyle style={{whiteSpace: "nowrap"}}>
            Coffin Service Data
          </NavLink>
          <NavLink to="/edit_profile" activeStyle style={{marginLeft:"0rem"}}>
            EditProfile
          </NavLink>
        </NavMenu>
      </Nav>
  );
};
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
{/* reportWebVitals(); */}
export default NavbarPartCof;
