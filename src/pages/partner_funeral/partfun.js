import { useRef, useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom"
import axios from '../../components/axios';
import NavbarPartnerFuneral from "../../components/NavbarPartnerFuneral"
import dateFormat from 'dateformat';
import placeholder from "../../picture/placeholder.png";
import './partner.css';

const BASE_URL ="https://coffin-server-production.up.railway.app";
const LOGIN_DETAIL_URL = `${BASE_URL}/api/employee/me`;
const DASHBOARD_URL = `${BASE_URL}/api/employee/dashboard`;
const FUN_URL = `${BASE_URL}/api/employee/funeral-transactions`;
const VIEW_URL = `${BASE_URL}/api/employee/funeral-services`;

// const styles = {
//     header: {
//       backgroundImage: {'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeiF7nMwP-MSiNmsbbf2kDneK_bLQ8SidSRfl-Hezb5WEFlcfx)'},
//       height: '100vh',
//       backgroundPosition: 'center',
//       backgroundRepeat: 'no-repeat',
//       backgroundSize: 'cover'
//     },
  
//     content: {
//       height: '100%',
//       width: '100%',
//       backgroundColor: 'rgba(0, 0, 0, 0.5)',
//       color: 'white'
//     }
//   }

const PartFun = () => {

    useEffect(()=>{
        getLoginDetailRole();
        refreshDBList();
        refreshFunList();
        getFuneralService()
        console.log(date);
      },[])

    //   const current = new Date();
      const customDate = new Date("2023-06-01 00:00:00");
      const date = `${customDate.getDate()}/${customDate.getMonth()+1}/${customDate.getFullYear()}`;
      const [funList,setFunList]=useState([]);

    const [funeralImage,setFuneralImage]=useState();
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

      function refreshFunList(){
        const cofAPI = axios.get(FUN_URL,
        {
          headers:{'Authorization':AuthToken}
        })
          .then(res=>{
            setFunList(res.data.data);
            // console.log(res.data.data);
          })
          // .then(res =>console.log( res.data.data[0]))
          .catch(err=>console.log(err))
      }

      function getFuneralService(){
        const funeralAPI = axios.get(VIEW_URL,
        {
          headers:{'Authorization':AuthToken}
        })
          .then(res=>{
            
            if(res.data.data.image===0||res.data.data.image===null){setFuneralImage(placeholder)}
            else{setFuneralImage(res.data.data.image);}
    
            console.log(res.data.data.image);
            // console.log(res.data.data);
          })
          // .then(res =>console.log( res.data.data))
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
            <NavbarPartnerFuneral user={loginDetail.name}/>
            {/* <section style={{margin:''}}> */}
            
            <div style={{color:'black'}}>
                <img src={funeralImage} width="15%" height="15%" style={{display:'flex', margin:'auto'}}/>
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
                            <th style={{borderBottom:'1px solid black',width:'18%'}}>Deceased Name</th>
                            <th style={{borderBottom:'1px solid black',width:'18%'}}>Reservation Date</th>
                            <th style={{borderBottom:'1px solid black',width:'18%'}}>Price</th>
                            <th style={{borderBottom:'1px solid black',width:'15%'}}>Package Name</th>
                            <th style={{borderBottom:'1px solid black',width:'10%'}}>Category</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* dateFormat(fun?.start_at,"d/m/yyyy")===date) */}
                        {funList.map((fun)=>(dateFormat(fun?.start_at,"d/m/yyyy")===date)?(
                            
                            <tr>
                                
                                <td style={{borderBottom:'1px solid black'}}>{fun?.id}</td>
                                <td style={{borderBottom:'1px solid black',textTransform:'capitalize'}}>{fun?.funeral_attendance.name}</td>
                                <td style={{borderBottom:'1px solid black'}}>
                                {
                                    dateFormat(fun.start_at,"d mmmm yyyy")
                                    // console.log(dateIsValid(new {fun.transaction_at}))
                                    // fun.transaction_at===null?`${dateFormat(fun.created_at,"d mmmm yyyy")}`:`${dateFormat(fun?.transaction_at,"d mmmm yyyy")}`
                                }
                                </td>
                                <td style={{borderBottom:'1px solid black'}}>{CommaAdd(fun?.price)}</td>
                                <td style={{borderBottom:'1px solid black'}}>{fun?.name}</td>
                                <td style={{borderBottom:'1px solid black'}}>{fun?.category_name}</td>
                                <td></td>
                                <td style={{textAlign:'left'}}>
                                <button style={{margin:'auto',borderRadius:'40px',width:'110px',backgroundColor:'transparent'}}>
                                    <Link to="/partner/funeral/transaction/detail/" 
                                    state={{transNo:fun.id}} style={{color:'black'}}>
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

export default PartFun
