import React, {useEffect,useState} from "react"
import { Link ,useLocation} from "react-router-dom"
import App from "../../App";
import NavbarPartCof from "../../components/NavbarPartnerCoffin";
import data from "../../mock-data-funeral-trans.json"
import axios from "../../components/axios";
import "./partner.css"
import bin from "../../picture/Trash.png"


const BASE_URL ="https://coffin-server-production.up.railway.app";
const COF_URL = `${BASE_URL}/api/employee/coffin-packages`;
const LOGIN_DETAIL_URL = `${BASE_URL}/api/employee/me`;

const PartCofServDataHis = () => {

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
      .then(res=>{
        setCofList(res.data.data)
        // console.log(res.data.data)
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

  const delFunList =(cofId)=>{
    
    const confirmBox = window.confirm(
      "Are you sure?"
    )
    if(confirmBox===true){
      console.log(COF_URL+'/'+cofId)
      const cofAPI = axios.delete(`${BASE_URL}/api/employee/coffin-packages/${cofId}`,{
        headers:{'Authorization':AuthToken}
      })
      .then(res=>{
        const deletedBox=window.alert("Action done (Please refresh the page)!")
      })
      .catch(err=>console.log(err))
    }
    // console.log(FUN_URL+funId);
    
  }

  function CommaAdd(amount){
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(amount);
  }

  return (

      <>

      {/* <h1>
        This is Coffin Service Data History Page for Partner
      </h1> */}
      
      <NavbarPartCof user={loginDetail.name}/>
      <div className="font_color">
        {/* <h1>
          This is Coffin Service Transaction History Page for Partner
        </h1> */}
        <h3 style={{color:'black',fontWeight:'bold',marginLeft:'3%',marginRight:'15%',padding:'1%',borderBottom:'1px solid gray'}}>Funeral Service Package</h3>
        
        <div style={{textAlign:"center"}}>
            <table className="center" style={{marginTop:'2%'}}>
              <thead>
                <tr>
                  <th style={{width:'10%'}}>Coffin Name</th>
                  <th style={{width:'20%'}}>Address</th>
                  <th style={{width:'5%'}}>Weight</th>
                  <th style={{width:'25%'}}>Dimensions</th>
                  <th style={{width:'5%'}}>Quantity</th>
                  <th style={{width:'15%'}}>Price</th>
                  <th style={{width:'8%'}}>Detail</th>
                  <th style={{width:'8%'}}>Action</th>
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
                    <td style={{borderTop:"1px solid #222",verticalAlign:'top',paddingTop:'2%'}}>{cof.name}</td>
                    <td style={{borderTop:"1px solid #222"}}>{cof.address}</td>
                    <td style={{borderTop:"1px solid #222"}}>{cof.weight}</td>
                    <td style={{borderTop:"1px solid #222"}}>{cof.dimensions}</td>
                    <td style={{borderTop:"1px solid #222"}}>{cof.quantity}</td>
                    <td style={{borderTop:"1px solid #222"}}>{CommaAdd(cof.price)}</td>
                    <td style={{borderTop:"1px solid #222"}}>
                      <button style={{marginTop:'auto',borderRadius:'40px',width:'110px',backgroundColor:'white'}}>
                        <Link to="/partner/coffin/service_data/detail" 
                          state={{packageId:cof.id,packageName:cof.name}} style={{color:'black'}}>
                          Detail
                        </Link>
                      </button>
                    </td>
                    <td style={{borderTop:"1px solid #222"}}>
                      <button onClick={(e)=>{
                      e.preventDefault();
                      delFunList(cof.id)}} 
                      style={{backgroundColor:'white',border:'none',outline:'none',marginTop:'10px'}}>
                        <img src={bin}/>
                      </button>
                    </td>
                  </tr>
                ))
              }   
              </tbody>
            </table>
        </div>
        
        <div style={{color:'black',fontWeight:'bold',marginLeft:'3%',marginRight:'15%',padding:'1%',borderBottom:'1px solid gray'}}></div>
       
          <button style={{width:'200px',borderRadius:'30px',backgroundColor:'#F3B792',marginLeft:'73%',alignSelf:'flex-end'}}>
            <Link to="/partner/coffin/service" style={{color:'black'}}>ADD</Link>
          </button>
        
      </div>
    </>
  );
};

export default PartCofServDataHis;
