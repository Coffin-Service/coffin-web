import React, {useEffect, useState} from "react"
import { Link, json } from "react-router-dom"
import data from "../../mock-data-account.json";
import NavbarAdmin from "../../components/NavbarAdmin";
import AdminAcc from "../AdminUser";
import axios from "../../components/axios";
import ToggleUserAcc from "./toggleUseracc";
import dateFormat from "dateformat";

const BASE_URL = "https://coffin-server-production.up.railway.app"
const USER_URL = `${BASE_URL}/api/employee/users`;

const AdmUserAcc = () => {
  const [trans,setTrans]=useState(data);

  const [active,setActive]=useState(true);
  const handleClick = () => {
    setActive(!active);
  }
  const [userList,setUserList]=useState([]);

  useEffect(()=>{
    console.log(localStorage.getItem('token'));
    refreshUserList();
  },[])

  const AuthToken = 'Bearer '.concat(localStorage.getItem('token'))
  function refreshUserList(){
    const admAPI = axios.get(USER_URL,
    {
      headers:{'Authorization':AuthToken}
    })
      .then(res=>{
        setUserList(res.data.data)
        console.log(res.data.data)
      })
      
      // .then(res =>console.log( res.data.data[0]))
      .catch(err=>console.log(err))
  }

  return (
    <>
    <AdminAcc/>
      {/* <div>
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
      </div> */}
      <div>
        {/* <h1>
          This is User Account Management
        </h1> */}

        <div style={{textAlign:"center",marginTop:'3%'}}>
          <table className="center">
            <thead>
              <tr>
                <th style={{width:'25%',borderBottom:'1px solid black'}}>Email</th>
                <th style={{width:'8%',borderBottom:'1px solid black'}}>Status</th>
                <th style={{width:'20%',borderBottom:'1px solid black'}}>Transaction At</th>
                <th style={{width:'8%',borderBottom:'1px solid black'}}>Operating</th>
                <th></th>
              </tr> 
            </thead>
            <tbody>
              {/* {trans.map((tran)=>(
                <tr>
                  <td>{tran.email}</td>
                  <td>{tran.status}</td>
                  <td>{tran.date}</td>
                  <td>{tran.accessbility}</td>
                  
                </tr>
              ))} */}

              {userList.map((user,i)=>(
                  <tr>
                    <td style={{borderBottom:'1px solid black'}}>{user.email}</td>
                    <td style={{borderBottom:'1px solid black',textTransform:'capitalize'}}>{user.status}</td>
                    <td style={{borderBottom:'1px solid black'}}>{dateFormat(user.created_at,"dd mmmm yyyy")}</td>
                    <td style={{borderBottom:'1px solid black'}}><ToggleUserAcc key={i} user={user.id}/></td>
                    {/* <td>{JSON.stringify(part.is_operating)}</td> */}
                    <td>

                    </td>
                  </tr>
                ))
              } 
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
};

export default AdmUserAcc;
