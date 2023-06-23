import {Nav, NavLink, NavMenu } from "react-router-dom"
import NavbarAdmin from "../components/NavbarAdmin"
import { useRef, useState, useEffect, useContext } from 'react';
import { act } from "react-dom/test-utils";
import { Link } from "react-router-dom";
import axios from "../components/axios";

const BASE_URL ="https://coffin-server-production.up.railway.app";
const LOGIN_DETAIL_URL = `${BASE_URL}/api/employee/me`;

const Admin = () => {
    const [active,setActive]=useState(false);
    const [loginDetail,setLoginDetail]=useState([]);

    useEffect(()=>{
        getLoginDetailRole();
      },[])

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

    const handleClick=()=>{
        setActive(!active);
    };
    return (
        <>
            <NavbarAdmin user={loginDetail.name}/>
            <section style={{margin:'auto'}}>
                <h1>Welcome!</h1>
                <br />
                <p>This page is reserved for Admin</p>
                <br/>
                <p>You can manage Mobile User and Web User account access</p>
                <div className="flexGrow">
                    <Link to="/">Logout</Link>
                </div>
            </section>
                {/* <br/>
                <div style={{flexDirection:"row"}}>
                    <NavLink onClick={handleClick} style={{color:"black",textDecoration:"none",paddingLeft:"4rem",fontWeight:active?"bold":"normal"}} 
                    to="/admin/transaction/funeral">Funeral Service</NavLink>
                    <NavLink style={{color:"black",textDecoration:"none",paddingLeft:"4rem"}} to="/admin/transaction/coffin">Coffin Service</NavLink>
                </div> */}
            
        </>
    )
}

export default Admin
