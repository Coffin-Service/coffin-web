import React, { useState} from "react"
import { Link } from "react-router-dom"
import data from "../../mock-data-account.json";
import NavbarAdmin from "../../components/NavbarAdmin";
import AdminAcc from "../AdminUser";

const AdmUserAcc = () => {
  const [trans,setTrans]=useState(data);

  const [active,setActive]=useState(true);
  const handleClick = () => {
    setActive(!active);
  }
  return (
    <>
    <AdminAcc/>
      <div>
        <ul>
          <li>
            <Link to="/admin/account_management/user" 
            >User</Link>
          </li>
          <li>
            <Link to="/admin/account_management/partner" 
            style={{opacity:active?0.7:1}}>Partner</Link>
          </li>
        </ul>
      </div>
      <div>
        <h1>
          This is User Account Management
        </h1>

        <div style={{textAlign:"center"}}>
          <table className="center">
            <thead>
              <tr>
                <th>Email</th>
                <th>Status</th>
                <th>Transaction At</th>
                <th>Operating</th>
              </tr> 
            </thead>
            <tbody>
              {trans.map((tran)=>(
                <tr>
                  <td>{tran.email}</td>
                  <td>{tran.status}</td>
                  <td>{tran.date}</td>
                  <td>{tran.accessbility}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
};

export default AdmUserAcc;
