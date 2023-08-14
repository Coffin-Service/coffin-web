import React, {useEffect,useState} from "react"
import { Link } from "react-router-dom"
import NavbarAdmin from "../../components/NavbarAdmin"
import data from "../../mock-data-funeral-trans.json"
import axios from "../../components/axios"
import dateFormat from "dateformat"

const BASE_URL ="https://coffin-server-production.up.railway.app";
const DONO_URL = `${BASE_URL}/api/employee/donation-transactions`;
const LOGIN_DETAIL_URL = `${BASE_URL}/api/employee/me`;

const DonationHis = () => {
  const [trans,setTrans]=useState(data);

  const [donoList,setDonoList]=useState([]);
  const [loginDetail,setLoginDetail]=useState([]);

  useEffect(()=>{
    console.log(localStorage.getItem('token'));
    refreshFunList();
    getLoginDetailRole();
  },[])

  const AuthToken = 'Bearer '.concat(localStorage.getItem('token'))
  function refreshFunList(){
    const cofAPI = axios.get(DONO_URL,
    {
      headers:{'Authorization':AuthToken}
    })
      .then(res=>{
        setDonoList(res.data.data);
        console.log(donoList);
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

  function dateIsValid(date){
    return date instanceof Date && !isNaN(date);
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
    <NavbarAdmin user={loginDetail.name}/>
      <div>
        {/* <h1>
          This is Funeral Service Transaction History Page for Partner
        </h1> */}
        <h3 style={{color:'black',fontWeight:'bold',marginLeft:'3%',marginRight:'15%',padding:'1%',borderBottom:'1px solid gray'}}>Transaction</h3>
        <h3 style={{color:'black',fontWeight:'bold',marginLeft:'3%',marginRight:'15%',padding:'1%'}}>History</h3>
        
        <div style={{textAlign:"center"}}>
          <table className="center">
            <thead>
              <tr>
                <th style={{borderBottom:'1px solid black',width:'18%'}}>Transaction No.</th>
                <th style={{borderBottom:'1px solid black',width:'10%'}}>Status</th>
                <th style={{borderBottom:'1px solid black',width:'18%'}}>Created Date</th>
                <th style={{borderBottom:'1px solid black',width:'18%'}}>Expired Date</th>
                <th style={{borderBottom:'1px solid black',width:'18%'}}>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* {trans.map((tran)=>(
                <tr>
                  <td>{tran.action}</td>
                  <td>{tran.transNo}</td>
                  <td>{tran.status}</td>
                  <td>{tran.date}</td>
                  <td>{tran.package}</td>
                  <td>
                    <button>
                      <Link to="/partner/funeral/transaction/detail/" 
                      state={{transNo:tran.transNo,transDate:tran.date}}>
                        Detail
                      </Link>
                    </button>
                  </td>
                </tr>
              ))} */}

              {donoList.map((dono)=>(dono.total_complete_donation>0)?(
                  <tr>
                    <td style={{borderBottom:'1px solid black'}}>{dono.id}</td>
                    <td style={{borderBottom:'1px solid black',textTransform:'capitalize'}}>{dono.status}</td>
                    <td style={{borderBottom:'1px solid black'}}>
                      {
                        dateFormat(dono.start_at,"d mmmm yyyy")
                        // dateFormat(fun.transaction_at,"d mmmm yyyy")
                        // console.log(dateIsValid(new {fun.transaction_at}))
                        // dono.transaction_at===null?`${dateFormat(dono.created_at,"d mmmm yyyy")}`:`${dateFormat(dono.transaction_at,"d mmmm yyyy")}`
                      }
                    </td>
                    <td style={{borderBottom:'1px solid black',textTransform:'capitalize'}}>{dateFormat(dono.end_at,"d mmmm yyyy")}</td>
                    <td style={{borderBottom:'1px solid black',textTransform:'capitalize'}}>{CommaAdd(dono.total_complete_donation)}</td>
                    <td style={{textAlign:'left'}}>
                      <button style={{margin:'auto',borderRadius:'40px',width:'110px',backgroundColor:'transparent'}}>
                        <Link to="/admin/donation/detail" 
                          state={{transNo:dono.id}} style={{color:'black'}}>
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
      </div>
    </>
  );
};

export default DonationHis;
