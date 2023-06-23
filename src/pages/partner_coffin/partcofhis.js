import React, {useEffect,useState} from "react"
import { Link } from "react-router-dom"
import App from "../../App";
import NavbarPartCof from "../../components/NavbarPartnerCoffin";
import data from "../../mock-data-funeral-trans.json"
import axios from "../../components/axios";
import dateFormat from "dateformat";

const BASE_URL ="https://coffin-server-production.up.railway.app";
const COF_URL = `${BASE_URL}/api/employee/coffin-transactions`;
const LOGIN_DETAIL_URL = `${BASE_URL}/api/employee/me`;

const PartCofServHis = () => {
  const [trans,setTrans]=useState(data);
  
  const [cofList,setCofList]=useState([]);
  const [loginDetail,setLoginDetail]=useState([]);

  useEffect(()=>{
    console.log(localStorage.getItem('token'));
    refreshCofList();
    getLoginDetailRole();
  },[])

  const AuthToken = 'Bearer '.concat(localStorage.getItem('token'))
  function refreshCofList(){
    const cofAPI = axios.get(COF_URL,
    {
      headers:{'Authorization':AuthToken}
    })
      .then(res=>setCofList(res.data.data))
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
  
  return (
    <>
      <NavbarPartCof user={loginDetail.name}/>
      <div>
        {/* <h1>
          This is Coffin Service Transaction History Page for Partner
        </h1> */}
        <h3 style={{color:'black',fontWeight:'bold',marginLeft:'3%',marginRight:'15%',padding:'1%',borderBottom:'1px solid gray'}}>Transaction</h3>
        <h3 style={{color:'black',fontWeight:'bold',marginLeft:'3%',marginRight:'15%',padding:'1%'}}>History</h3>
        
        <div style={{textAlign:"center",marginTop:'1%'}}>
            <table className="center">
              <thead>
                <tr>
                  <th style={{borderBottom:'1px solid black',width:'18%'}}>Transaction No.</th>
                  <th style={{borderBottom:'1px solid black',width:'10%'}}>Status</th>
                  <th style={{borderBottom:'1px solid black',width:'18%'}}>Transaction Date</th>
                  <th style={{borderBottom:'1px solid black',width:'18%'}}>Coffin Name</th>
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
                        <Link to="/partner/coffin/transaction/detail/" 
                        state={{transNo:tran.transNo,transDate:tran.date}}>
                          Detail
                        </Link>
                      </button>
                    </td>
                  </tr>
                ))} */}

                {cofList.map((cof)=>(
                  <tr>
                    <td style={{borderBottom:'1px solid black'}}>{cof.id}</td>
                    <td style={{borderBottom:'1px solid black',textTransform:'capitalize'}}>{cof.status}</td>
                    <td style={{borderBottom:'1px solid black'}}>
                      {
                        cof.transaction_at===null?`${dateFormat(cof.created_at,"d mmmm yyyy")}`:`${dateFormat(cof.transaction_at,"d mmmm yyyy")}`
                      }
                      </td>
                    <td style={{borderBottom:'1px solid black'}}>{cof.name}</td>
                    <td style={{textAlign:'left'}}>
                      <button style={{margin:'auto',borderRadius:'40px',width:'110px',backgroundColor:'white'}}>
                        <Link to="/partner/coffin/transaction/detail/" 
                          state={{transNo:cof.id}} style={{color:'black'}}>
                          Detail
                        </Link>
                      </button>
                    </td>
                  </tr>
                ))
              }   
              </tbody>
            </table>
        </div>

        {/* <div style={{display:'flex'}}>
          <button style={{marginLeft:'auto'}}>
            <Link to="/partner/coffin/service">ADD</Link>
            </button>
        </div> */}
      </div>
    </>
  );
};

export default PartCofServHis;
