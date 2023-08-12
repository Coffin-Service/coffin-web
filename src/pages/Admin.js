import {Nav, NavLink, NavMenu } from "react-router-dom"
import NavbarAdmin from "../components/NavbarAdmin"
import { useRef, useState, useEffect, useContext } from 'react';
import { act } from "react-dom/test-utils";
import { Link } from "react-router-dom";
import axios from "../components/axios";

const BASE_URL ="https://coffin-server-production.up.railway.app";
const LOGIN_DETAIL_URL = `${BASE_URL}/api/employee/me`;
const DASHBOARD_URL = `${BASE_URL}/api/employee/dashboard`;

const Admin = () => {
    const [active,setActive]=useState(false);
    const [loginDetail,setLoginDetail]=useState([]);
    const [dbList,setDBList]=useState();

    useEffect(()=>{
        getLoginDetailRole();
        refreshDBList();
      },[])

      const AuthToken = 'Bearer '.concat(localStorage.getItem('token'));
      function refreshDBList(){
        const cofAPI = axios.get(DASHBOARD_URL,
        {
          headers:{'Authorization':AuthToken}
        })
          .then(res=>{
            setDBList(res.data.data);
            // console.log(res.data.data);
          })
          // .then(res =>console.log( res.data.data[0]))
          .catch(err=>console.log(err))
      }
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

    function CommaAdd(amount){
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR"
        }).format(amount);
    }
    const handleClick=()=>{
        setActive(!active);
    };
    return (
        <>
        <div className='bg-image'>
            <NavbarAdmin user={loginDetail.name}/>
            <div style={{color:'black',marginLeft:'3%'}}>
                <div style={{marginTop:'3%',borderBottom:'1px solid black',width:'90%',fontWeight:'bold'}}>Overall Update</div>
                <div style={{display:'flex',flexDirection:'row',marginTop:'1%'}}>
                    {/* <div style={{width:'auto',flexDirection:'column',marginLeft:'3%',backgroundColor:'transparent',borderRadius:'5px',padding:'0.5%',border:'1px solid rgba(0, 0, 0, 0.2)'}}>
                        <div style={{fontWeight:'bold'}}>Total Revenue : </div>
                        <div>{CommaAdd(dbList?.income?.total)}</div>
                    </div> */}
                    {/* <div style={{width:'auto',flexDirection:'column',marginLeft:'3%',backgroundColor:'transparent',borderRadius:'5px',padding:'0.5%',border:'1px solid rgba(0, 0, 0, 0.2)'}}>
                        <div style={{fontWeight:'bold'}}>Daily Revenue : </div>
                        <div>{CommaAdd(dbList?.income?.today)}</div>
                    </div> */}
                    <div style={{width:'10%',flexDirection:'column',marginLeft:'3%',backgroundColor:'transparent',borderRadius:'5px',padding:'0.5%',border:'1px solid rgba(0, 0, 0, 0.2)'}}>
                        <div style={{fontWeight:'bold'}}>Total orders :</div>
                        <div style={{display:'flex',justifyContent:'center'}}>{dbList?.all?.total_order_count}</div>
                    </div>
                    <div style={{width:'10%',flexDirection:'column',marginLeft:'3%',backgroundColor:'transparent',borderRadius:'5px',padding:'0.5%',border:'1px solid rgba(0, 0, 0, 0.2)'}}>
                        <div style={{fontWeight:'bold'}}>Completed:</div>
                        <div style={{display:'flex',justifyContent:'center'}}>{dbList?.all?.total_complete_order_count}</div>
                    </div>
                    <div style={{width:'10%',flexDirection:'column',marginLeft:'3%',backgroundColor:'transparent',borderRadius:'5px',padding:'0.5%',border:'1px solid rgba(0, 0, 0, 0.2)'}}>
                        <div style={{fontWeight:'bold'}}>Pending :</div>
                        <div style={{display:'flex',justifyContent:'center'}}>{dbList?.all?.total_pending_order_count}</div>
                    </div>
                    <div style={{width:'10%',flexDirection:'column',marginLeft:'3%',backgroundColor:'transparent',borderRadius:'5px',padding:'0.5%',border:'1px solid rgba(0, 0, 0, 0.2)'}}>
                        <div style={{fontWeight:'bold'}}>Cancelled :</div>
                        <div style={{display:'flex',justifyContent:'center'}}>{dbList?.all?.total_cancel_order_count}</div>
                    </div>
                    <div style={{width:'10%',flexDirection:'column',marginLeft:'3%',backgroundColor:'transparent',borderRadius:'5px',padding:'0.5%',border:'1px solid rgba(0, 0, 0, 0.2)'}}>
                        <div style={{fontWeight:'bold'}}>Expired :</div>
                        <div style={{display:'flex',justifyContent:'center'}}>{dbList?.all?.total_expired_order_count}</div>
                    </div>
                </div>

                <div style={{marginTop:'3%',borderBottom:'1px solid black',width:'90%',fontWeight:'bold'}}>Daily Update</div>
                <div style={{display:'flex',flexDirection:'row',marginTop:'1%'}}>
                    <div style={{width:'10%',flexDirection:'column',marginLeft:'3%',backgroundColor:'transparent',borderRadius:'5px',padding:'0.5%',border:'1px solid rgba(0, 0, 0, 0.2)'}}>
                        <div style={{fontWeight:'bold'}}>Total :</div>
                        <div style={{display:'flex',justifyContent:'center'}}>{dbList?.new?.total_new_order_count}</div>
                    </div>
                    <div style={{width:'10%',flexDirection:'column',marginLeft:'3%',backgroundColor:'transparent',borderRadius:'10%',padding:'0.5%',border:'1px solid rgba(0, 0, 0, 0.2)'}}>
                        <div style={{fontWeight:'bold'}}>Completed :</div>
                        <div style={{display:'flex',justifyContent:'center'}}>{dbList?.new?.total_new_complete_order_count}</div>
                    </div>
                    <div style={{width:'10%',flexDirection:'column',marginLeft:'3%',backgroundColor:'transparent',borderRadius:'10%',padding:'0.5%',border:'1px solid rgba(0, 0, 0, 0.2)'}}>
                        <div style={{fontWeight:'bold'}}>Pending :</div>
                        <div style={{display:'flex',justifyContent:'center'}}>{dbList?.new?.total_new_pending_order_count}</div>
                    </div>
                    <div style={{width:'10%',flexDirection:'column',marginLeft:'3%',backgroundColor:'transparent',borderRadius:'10%',padding:'0.5%',border:'1px solid rgba(0, 0, 0, 0.2)'}}>
                        <div style={{fontWeight:'bold'}}>Cancelled :</div>
                        <div style={{display:'flex',justifyContent:'center'}}>{dbList?.new?.total_new_cancel_order_count}</div>
                    </div>
                    <div style={{width:'10%',flexDirection:'column',marginLeft:'3%',backgroundColor:'transparent',borderRadius:'10%',padding:'0.5%',border:'1px solid rgba(0, 0, 0, 0.2)'}}>
                        <div style={{fontWeight:'bold'}}>Expired :</div>
                        <div style={{display:'flex',justifyContent:'center'}}>{dbList?.new?.total_new_expired_order_count}</div>
                    </div>
                </div>
            </div>
                {/* <br/>
                <div style={{flexDirection:"row"}}>
                    <NavLink onClick={handleClick} style={{color:"black",textDecoration:"none",paddingLeft:"4rem",fontWeight:active?"bold":"normal"}} 
                    to="/admin/transaction/funeral">Funeral Service</NavLink>
                    <NavLink style={{color:"black",textDecoration:"none",paddingLeft:"4rem"}} to="/admin/transaction/coffin">Coffin Service</NavLink>
                </div> */}
            </div>
        </>
    )
}

export default Admin
