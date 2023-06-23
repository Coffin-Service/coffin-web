import { useRef, useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom"
import axios from '../../components/axios';
import NavbarPartnerFuneral from "../../components/NavbarPartnerFuneral"

const BASE_URL ="https://coffin-server-production.up.railway.app";
const LOGIN_DETAIL_URL = `${BASE_URL}/api/employee/me`;

const PartFun = () => {

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
            <NavbarPartnerFuneral user={loginDetail.name}/>
            <section style={{margin:'auto'}}>
                <h1>Welcome!</h1>
                <br />
                <p>Your account has been approved!</p>
                <br/>
                <p>Feel free to register your product and start selling</p>
                <div className="flexGrow">
                    <Link to="/">Logout</Link>
                </div>
            </section>
        </>
    )
}

export default PartFun
