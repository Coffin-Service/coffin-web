import React, {useEffect,useState, Component} from "react"
import { Link,  useLocation, useParams } from "react-router-dom"
import NavbarPartCof from "../../components/NavbarPartnerCoffin";
import './partner.css'
import axios from "../../components/axios";
import bin from "../../picture/Trash.png"


const BASE_URL ="https://coffin-server-production.up.railway.app";
const COF_URL = `${BASE_URL}/api/employee/coffin-packages`;
const LOGIN_DETAIL_URL = `${BASE_URL}/api/employee/me`;

const PartCofServDataHisDet = () => {
  const location=useLocation()
  const {packageId,packageName} = location.state

  const [cofList,setCofList]=useState([]);
  const [loginDetail,setLoginDetail]=useState([]);
  const AuthToken = 'Bearer '.concat(localStorage.getItem('token'));

  useEffect(()=>{
    console.log(localStorage.getItem('token'));
    refreshCofList();
    getLoginDetailRole()
    // console.log(funList);
    // checkFun(packageId);
  },[])

  function refreshCofList(){
    console.log(COF_URL+'/'+packageId)
    const cofAPI = axios.get(COF_URL+'/'+packageId,
    {
      headers:{'Authorization':AuthToken}
    })
      .then(res=>{
        setCofList(res?.data.data);
        console.log(res.data.data);

        // console.log(funList.categories.facilities.logo)
      })
      // .then(res =>console.log(res.data))
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
      <NavbarPartCof user={loginDetail.name}/>
      <div>
        {/* <h1>
          This is Coffin Service Data History Page DETAIL for Partner
        </h1> */}
      </div>
      <h3 style={{color:'black',fontWeight:'bold',marginLeft:'3%',marginRight:'15%',padding:'1%',borderBottom:'1px solid gray'}}>Detail</h3>
        
      <table className="custom_table font_color" style={{marginLeft:'4%',marginTop:'1%'}}>
          <thead>
            <tr>
              <th style={{textAlign:'left'}}></th>
            </tr>

          </thead>
          <tbody>
            <tr>
              <td style={{fontWeight:'bold'}}>Coffin Name</td>
              <td>{cofList?.name}</td>
            </tr>
            <tr>
              <td style={{fontWeight:'bold'}}>Weight</td>
              <td>{cofList?.weight}</td>
            </tr>
            <tr>
              <td style={{fontWeight:'bold'}}>Dimension</td>
              <td>{cofList?.dimensions}</td>
            </tr>
            <tr>
              <td style={{fontWeight:'bold'}}>Quantity</td>
              <td>{cofList?.quantity}</td>
            </tr>
            <tr>
              <td style={{fontWeight:'bold'}}>Price</td>
              <td>{CommaAdd(cofList?.price)}</td>
              {/* <td>{CommaFormatted(cofList?.price)}</td> code error fix later date */}
            </tr>
            <tr>
              <td style={{fontWeight:'bold'}}>Address</td>
              <td>{cofList?.address}</td>
            </tr>
            <tr>
              <td style={{fontWeight:'bold'}}>Description</td>
              <td>{cofList?.description}</td>
            </tr>

          </tbody>
        </table>
        <button onClick={(e)=>{
            e.preventDefault();
            delFunList(packageId)}} 
            style={{color:'white',backgroundColor:'red',width:'8%',borderRadius:'30px',marginTop:'10%',marginRight:'15%',alignSelf:'flex-end'}}>
              Delete
        </button>
    </>
  );
};

export default PartCofServDataHisDet;
