import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
    
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const NavbarAdmin=() =>{
  return(
    
      <Nav>
        <NavMenu>
          <NavLink to="/admin/transaction/funeral" activeStyle style={{marginLeft:"-20rem"}}>
            Transaction
          </NavLink>
          <NavLink to="/admin/account_management/user" activeStyle style={{whiteSpace: "nowrap"}}>
            Account Management
          </NavLink>
          <NavLink to="/edit_profile" activeStyle style={{marginLeft:"70rem"}}>
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
export default NavbarAdmin;
