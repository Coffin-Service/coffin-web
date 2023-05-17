import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";

import "./styles.css"
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const NavbarAdmin=() =>{
  const selectedLink = ""
  const normalLink = ""
  return(
    
      <Nav>
        <NavMenu>
          <div className="selectedLink">

            <NavLink 
              style={({ isActive }) => ({
                color: isActive ? 'red' : 'black',
                background: isActive ? 'yellow' : 'white',
              })}
              to="/admin/transaction" 
              >
              Transaction
            </NavLink>
          
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? 'red' : 'black',
                background: isActive ? 'yellow' : 'white',
              })}
              to="/admin/account_management"
              >
              Account Management
            </NavLink>

            <NavLink 
              style={({ isActive }) => ({
                color: isActive ? 'red' : 'black',
                background: isActive ? 'yellow' : 'white',
              })}
            >
              EditProfile
            </NavLink>
            {/* to="/edit_profile" */}
          </div>
        </NavMenu>
      </Nav>
  );
};
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
{/* reportWebVitals(); */}
export default NavbarAdmin;
