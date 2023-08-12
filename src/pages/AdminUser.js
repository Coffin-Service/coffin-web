
import {Nav, NavLink, NavMenu } from "react-router-dom"
import NavbarAdmin from "../components/NavbarAdmin";
import { useRef, useState, useEffect, useContext } from 'react';
import { act } from "react-dom/test-utils";
import './style.css'
import axios from "../components/axios";

const BASE_URL ="https://coffin-server-production.up.railway.app";
const LOGIN_DETAIL_URL = `${BASE_URL}/api/employee/me`;

const AdminAcc = () => {

    useEffect(()=>{
        getLoginDetailRole();
      },[])

    const [loginDetail,setLoginDetail]=useState([]);

    function getLoginDetailRole(){
        console.log(localStorage.getItem('token'));
        const AuthToken = 'Bearer '.concat(localStorage.getItem('token'))
        const getRole = axios.get(LOGIN_DETAIL_URL,{
            headers:{'Authorization':AuthToken}
          })
            .then(res=>{setLoginDetail(res.data.data)})
            // .then(res=>console.log(res.data.data))
            // .then(data=>console.log(data))
            .catch(err=>console.log(err))
    }

    return (
        <>
        <div className=''>
            <NavbarAdmin user={loginDetail.name}/>
            {/* <section>
                <h1>Admins Accound Page</h1>
                <br />
                <p>You must have been assigned an Admin role.</p>
                <br/>
                <Link to="/admin/account_management/user">User</Link>
                <br/>
                <Link to="/admin/account_management/partner">Partner</Link>

                <div className="flexGrow">
                    <Link to="/">Home</Link>
                </div>
            </section> */}
            <h3 style={{color:'black',fontWeight:'bold',marginLeft:'3%',marginRight:'15%',padding:'1%',borderBottom:'1px solid gray'}}>Account Management</h3>
        
            <div style={{flexDirection:"row",marginTop:'1%',marginLeft:'3%'}} className="selectedLinks">
                    <NavLink style={{color:'black' ,textDecoration:"none",paddingLeft:"4rem"}} 
                    to="/admin/account_management/user">User</NavLink>
                    <NavLink style={{color:'black',textDecoration:"none",paddingLeft:"4rem"}} to="/admin/account_management/partner">Partner</NavLink>
            </div>
        </div>
            
        </>
    )
}

export default AdminAcc
