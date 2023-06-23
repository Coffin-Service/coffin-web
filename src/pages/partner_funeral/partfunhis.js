import React, {useEffect,useState} from "react"
import { Link } from "react-router-dom"
import NavbarPartnerFuneral from "../../components/NavbarPartnerFuneral"
import data from "../../mock-data-funeral-trans.json"
import axios from "../../components/axios"
import dateFormat from "dateformat"

const BASE_URL ="https://coffin-server-production.up.railway.app";
const FUN_URL = `${BASE_URL}/api/employee/funeral-transactions`;
const LOGIN_DETAIL_URL = `${BASE_URL}/api/employee/me`;

const PartFunServHis = () => {
  const [trans,setTrans]=useState(data);

  const [funList,setFunList]=useState([]);
  const [loginDetail,setLoginDetail]=useState([]);

  useEffect(()=>{
    console.log(localStorage.getItem('token'));
    refreshFunList();
    getLoginDetailRole();
  },[])

  const AuthToken = 'Bearer '.concat(localStorage.getItem('token'))
  function refreshFunList(){
    const cofAPI = axios.get(FUN_URL,
    {
      headers:{'Authorization':AuthToken}
    })
      .then(res=>{
        setFunList(res.data.data);
        console.log(funList);
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
  

  return (
    <>
    <NavbarPartnerFuneral user={loginDetail.name}/>
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
                <th style={{borderBottom:'1px solid black',width:'18%'}}>Transaction Date</th>
                <th style={{borderBottom:'1px solid black',width:'18%'}}>Package Name</th>
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

              {funList.map((fun)=>(
                  <tr>
                    <td style={{borderBottom:'1px solid black'}}>{fun.id}</td>
                    <td style={{borderBottom:'1px solid black',textTransform:'capitalize'}}>{fun.status}</td>
                    <td style={{borderBottom:'1px solid black'}}>
                      {
                        // dateFormat(fun.transaction_at,"d mmmm yyyy")
                        // console.log(dateIsValid(new {fun.transaction_at}))
                        fun.transaction_at===null?`${dateFormat(fun.created_at,"d mmmm yyyy")}`:`${dateFormat(fun.transaction_at,"d mmmm yyyy")}`
                      }
                    </td>
                    <td style={{borderBottom:'1px solid black'}}>{fun.name}</td>
                    <td style={{textAlign:'left'}}>
                      <button style={{margin:'auto',borderRadius:'40px',width:'110px',backgroundColor:'white'}}>
                        <Link to="/partner/funeral/transaction/detail/" 
                          state={{transNo:fun.id}} style={{color:'black'}}>
                            Detail
                        </Link>
                      </button></td>
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

export default PartFunServHis;
