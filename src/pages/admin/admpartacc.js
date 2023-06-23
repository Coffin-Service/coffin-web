import React, {useEffect, useState} from "react"
import { Link } from "react-router-dom"
import data from "../../mock-data-account.json";
import NavbarAdmin from "../../components/NavbarAdmin";
import axios from "../../components/axios";
import AdminAcc from "../AdminUser";
import Switch from "react-switch";
import TogglePartAcc from "./togglePartacc";
import AcceptPartAcc from "./acceptPartacc";
import dateFormat from "dateformat";

const BASE_URL = "https://coffin-server-production.up.railway.app"
const PART_URL = `${BASE_URL}/api/employee/employees`;

const AdmPartAcc = () => {

  const [trans,setTrans]=useState(data);

  const [checked,setChecked]=useState(false);
  const [isToggled,setIsToggled]=useState(false);
  // const handleClick = () => {
  //   setActive(!active);
  // }

  const [partnerList,setPartnerList]=useState([]);

  useEffect(()=>{
    console.log(localStorage.getItem('token'));
    refreshPartnerList();
  },[])

  const AuthToken = 'Bearer '.concat(localStorage.getItem('token'))
  function refreshPartnerList(){
    const admAPI = axios.get(PART_URL,
    {
      headers:{'Authorization':AuthToken}
    })
      .then(res=>{
        setPartnerList(res.data.data)
        console.log(res.data.data)
      })
      
      // .then(res =>console.log( res.data.data[0]))
      .catch(err=>console.log(err))
  }

  const handleChange =()=>{
    setChecked(!checked);
  }

  const ToggleItem =(id,e)=>{
    checked[id]=
    setChecked(e.target.checked);

  };

  return (
    <>
    <AdminAcc/> 
      
      <div>
        {/* <h1>
          This is Partner Account Management
        </h1> */}
         
        <div style={{textAlign:"center",marginTop:'3%'}}>
          <table className="center">
            <thead>
              <tr>
                <th style={{width:'25%',borderBottom:'1px solid black'}}>Email</th>
                <th style={{width:'8%',borderBottom:'1px solid black'}}>Status</th>
                <th style={{width:'20%',borderBottom:'1px solid black'}}>Issued Date</th>
                <th style={{width:'8%',borderBottom:'1px solid black'}}>Operating</th>
                <th style={{width:'12%',borderBottom:'1px solid black'}}>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* {trans.map((tran)=>(
                <tr>
                  <td>Yes/No </td>
                  <td>{tran.email}</td>
                  <td>{tran.status}</td>
                  <td>{tran.date}</td>
                  <td>{tran.accessbility}</td>
                  
                </tr>
              ))} */}

              {partnerList.map((part,i)=>(
                  <tr>
                    
                    <td style={{borderBottom:'1px solid black'}}>{part.email}</td>
                    <td style={{borderBottom:'1px solid black',textTransform:'capitalize'}}>{part.status}</td>
                    <td style={{borderBottom:'1px solid black'}}>{dateFormat(part.created_at,"dd mmmm yyyy")}</td>
                    {/* <td>{JSON.stringify(part.is_operating)}</td> */}
                    <td style={{borderBottom:'1px solid black'}}>
                      <TogglePartAcc key={i} part={part.id}/>
                    </td>
                    <td style={{borderBottom:'1px solid black'}}>
                      <AcceptPartAcc key={i} part={part.id}/>
                    </td>
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

export default AdmPartAcc;
