import React, {createContext, useEffect, useState} from "react"
import { Link,  useLocation, useParams } from "react-router-dom"
import NavbarAdmin from "../../components/NavbarAdmin";
import axios from "../../components/axios";
import dateFormat from "dateformat";

const BASE_URL="https://coffin-server-production.up.railway.app";
const ADM_URL=`${BASE_URL}/api/employee/transactions`;
const LOGIN_DETAIL_URL = `${BASE_URL}/api/employee/me`;

const AdmFunDetail = () => {
  const location=useLocation()
  const {transNo} = location.state
  const [admList,setAdmList]=useState([]);
  const [loginDetail,setLoginDetail]=useState([]);
  
  const AuthToken = 'Bearer '.concat(localStorage.getItem('token'));

  useEffect(()=>{
    // console.log(localStorage.getItem('token'));
    getData();
    getLoginDetailRole();
    // console.log(funList);
  },[])

  function getData(){
    const admAPI = axios.get(ADM_URL+'/'+transNo,
      {
        headers:{'Authorization':AuthToken}
      })
        .then(res=>{
          setAdmList(res.data.data);
          console.log(res.data);
          // console.log(res.data.data.facilities);
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
        .then(res=>{setLoginDetail(res.data.data);})
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
      <NavbarAdmin user={loginDetail.name}/>
      <div style={{color:'black',marginLeft:'5%',marginTop:'3%'}}>
        {/* <h1>
          This is Admin Funeral Transaction Detail
        </h1> */}
        {/* <idTrans.Consumer>
          {(trans)=>{
          // return <p>trans No: {trans}</p>;
          console.log(trans);
          }}
        </idTrans.Consumer> */}
        {/* <div>user id: {transNo}</div> */}
        <table>
          <thead>
            <tr>
              <th style={{textAlign:'left'}}>Detail</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Funeral Name:</td>
              <td>{admList?.name}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{admList?.address}</td>
            </tr>
            <tr>
              <td style={{borderBottom:'1px solid black'}}>Description</td>
              <td style={{borderBottom:'1px solid black'}}>{admList?.description}</td>
            </tr>
            <tr>
              <td>Package Name</td>
              <td>{admList?.package_name}</td>
            </tr>
            <tr>
              <td>Category Name</td>
              <td>{admList?.category_name}</td>
            </tr>
            <tr>
              <td>Price (Rp)</td>
              <td>{CommaAdd(admList?.price)}</td>
            </tr>
            <tr>
              <td>Transaction No.</td>
              <td>{admList?.transaction_id}</td>
            </tr>
            <tr>
              <td>Transaction At</td>
              <td>{admList?.transaction_at===null?`${dateFormat(admList?.transaction_at,"d mmmm yyyy")}`:`${dateFormat(admList?.created_at,"d mmmm yyyy")}`}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{admList?.status}</td>
            </tr>
            <tr>
              <td>Facility</td>
              <td style={{display:'flex',flexDirection:'row'}}>
                {admList?.facilities?.map((fac)=>(
                  <div style={{marginRight:'3%',textAlign:'center'}}>
                    <img src={fac.logo}/>
                    <div>{fac.name}</div>
                  </div>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <img src=""/>
          <img src=""/>
          <img src=""/>
        </div>
      </div>
    </>
  );
};

export default AdmFunDetail;
