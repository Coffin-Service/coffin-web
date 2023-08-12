import {Nav, NavLink, NavMenu } from "react-router-dom"
import NavbarAdmin from "../components/NavbarAdmin";
import { useRef, useState, useEffect, useContext } from 'react';
import { act } from "react-dom/test-utils";
import './style.css'
import axios from "../components/axios";

const BASE_URL ="https://coffin-server-production.up.railway.app";
const LOGIN_DETAIL_URL = `${BASE_URL}/api/employee/me`;

const AdminTrans = () => {

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
                <h1>Admins Page</h1>
                <br />
                <p>You must have been assigned an AdminTrans role.</p>

                <div className="flexGrow">
                    <Link to="/">Home</Link>
                </div>
            </section> */}
                <br/>
                <div style={{flexDirection:"row"}} className="selectedLinks">
                    <NavLink style={{color:"black",textDecoration:"none",paddingLeft:"4rem"}} 
                    to="/admin/transaction/funeral">Funeral Service</NavLink>
                    <NavLink style={{color:"black",textDecoration:"none",paddingLeft:"4rem"}} to="/admin/transaction/coffin">Coffin Service</NavLink>
                </div>
        </div>
        </>
    )
}

export default AdminTrans
