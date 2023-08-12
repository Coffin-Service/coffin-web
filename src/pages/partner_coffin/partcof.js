import { useRef, useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom"
import axios from '../../components/axios';
import NavbarPartnerCoffin from "../../components/NavbarPartnerCoffin";
import dateFormat from 'dateformat';
import './partner.css';

const BASE_URL ="https://coffin-server-production.up.railway.app";
const LOGIN_DETAIL_URL = `${BASE_URL}/api/employee/me`;
const DASHBOARD_URL = `${BASE_URL}/api/employee/dashboard`;
const FUN_URL = `${BASE_URL}/api/employee/coffin-transactions`;

const PartCof = () => {


    useEffect(()=>{
        getLoginDetailRole();
        refreshDBList();
        refreshCofList();
      },[])

      const customDate = new Date("2023-05-11 00:00:00");
      const date = `${customDate.getDate()}/${customDate.getMonth()+1}/${customDate.getFullYear()}`;
      const [cofList,setCofList]=useState([]);
    const [loginDetail,setLoginDetail]=useState([]);
    const [dbList,setDBList]=useState();

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

      function refreshCofList(){
        const cofAPI = axios.get(FUN_URL,
        {
          headers:{'Authorization':AuthToken}
        })
          .then(res=>{
            setCofList(res.data.data);
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
    return (
        <>
            <div className='bg-image'>
            {/* </div> */}
            <NavbarPartnerCoffin user={loginDetail.name}/>
            {/* <section style={{margin:''}}> */}
            
            <div style={{color:'black',marginTop:'5%'}}>
                <div style={{display:'flex',flexDirection:'row'}}>
                    <div style={{width:'auto',flexDirection:'column',marginLeft:'3%',backgroundColor:'transparent',borderRadius:'5px',padding:'0.5%',border:'1px solid rgba(0, 0, 0, 0.2)'}}>
                        <div style={{fontWeight:'bold'}}>Total Revenue : </div>
                        <div>{CommaAdd(dbList?.income?.total)}</div>
                    </div>
                    <div style={{width:'auto',flexDirection:'column',marginLeft:'3%',backgroundColor:'transparent',borderRadius:'5px',padding:'0.5%',border:'1px solid rgba(0, 0, 0, 0.2)'}}>
                        <div style={{fontWeight:'bold'}}>Daily Revenue : </div>
                        <div>{CommaAdd(dbList?.income?.today)}</div>
                    </div>
                    <div style={{width:'10%',flexDirection:'column',marginLeft:'3%',backgroundColor:'transparent',borderRadius:'5px',padding:'0.5%',border:'1px solid rgba(0, 0, 0, 0.2)'}}>
                        <div style={{fontWeight:'bold'}}>Total orders :</div>
                        <div style={{display:'flex',justifyContent:'center'}}>{dbList?.all?.total_order_count}</div>
                    </div>
                    <div style={{width:'14%',flexDirection:'column',marginLeft:'3%',backgroundColor:'transparent',borderRadius:'5px',padding:'0.5%',border:'1px solid rgba(0, 0, 0, 0.2)'}}>
                        <div style={{fontWeight:'bold'}}>Completed orders :</div>
                        <div style={{display:'flex',justifyContent:'center'}}>{dbList?.all?.total_complete_order_count}</div>
                    </div>
                    <div style={{width:'10%',flexDirection:'column',marginLeft:'3%',backgroundColor:'transparent',borderRadius:'10%',padding:'0.5%',border:'1px solid rgba(0, 0, 0, 0.2)'}}>
                        <div style={{fontWeight:'bold'}}>New orders :</div>
                        <div style={{display:'flex',justifyContent:'center'}}>{dbList?.new?.total_pending_order_count}</div>
                    </div>
                </div>

                <div style={{marginTop:'3%',marginLeft:'3%',fontWeight:'bold',borderBottom:'1px solid black',width:'90%'}}>Upcoming Order </div>

                <div style={{textAlign:"center",marginTop:'1%'}}>
                    <table className="center">
                        <thead>
                        <tr>
                            <th style={{borderBottom:'1px solid black',width:'18%'}}>Transaction No.</th>
                            <th style={{borderBottom:'1px solid black',width:'18%'}}>Name</th>
                            <th style={{borderBottom:'1px solid black',width:'15%'}}>Order Date</th>
                            <th style={{borderBottom:'1px solid black',width:'18%'}}>Price</th>
                            <th style={{borderBottom:'1px solid black',width:'8%'}}>Quantity</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* dateFormat(fun?.start_at,"d/m/yyyy")===date) */}
                        {cofList.map((cof)=>(dateFormat(cof?.created_at,"d/m/yyyy")===date)?(
                            
                            <tr>
                                
                                <td style={{borderBottom:'1px solid black'}}>{cof?.id}</td>
                                <td style={{borderBottom:'1px solid black',textTransform:'capitalize'}}>{cof?.user?.name}</td>
                                <td style={{borderBottom:'1px solid black'}}>
                                {
                                    dateFormat(cof.start_at,"d mmmm yyyy")
                                    // console.log(dateIsValid(new {fun.transaction_at}))
                                    // fun.transaction_at===null?`${dateFormat(fun.created_at,"d mmmm yyyy")}`:`${dateFormat(fun?.transaction_at,"d mmmm yyyy")}`
                                }
                                </td>
                                <td style={{borderBottom:'1px solid black'}}>{CommaAdd(cof?.total_amount)}</td>
                                <td style={{borderBottom:'1px solid black'}}>{cof?.quantity}</td>
                                <td></td>
                                <td style={{textAlign:'left'}}>
                                <button style={{margin:'auto',borderRadius:'40px',width:'110px',backgroundColor:'transparent'}}>
                                    <Link to="/partner/funeral/transaction/detail/" 
                                    state={{transNo:cof.id}} style={{color:'black'}}>
                                        Detail
                                    </Link>
                                </button></td>
                                
                            </tr>
                            ):(null))
                        }   
                        </tbody>
                    </table>
                </div>

            </div>

            <div style={{borderBottom:'1px solid black',marginTop:'3%',color:'black'}}></div>
            </div>
        </>
    )
}

export default PartCof
