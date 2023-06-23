import React, {useEffect, useState} from "react"
import { Link, useLocation } from "react-router-dom"
import data from "../../mock-data-account.json";
import NavbarAdmin from "../../components/NavbarAdmin";
import axios from "../../components/axios";
import AdminAcc from "../AdminUser";
import Switch from "react-switch";
import { useContext } from "react";
import PartCof from "../partner_coffin/partcof";


const BASE_URL = "https://coffin-server-production.up.railway.app"
const PART_URL = `${BASE_URL}/api/employee/employees`;

const TogglePartAcc = (props) => {

  // const location=useLocation()
  // const {transNo} = location.state
  const [partnerList,setPartnerList]=useState([]);
  const [partner,setPartner]=useState({});
  const [operate,setOperate]=useState(null);
  
  // console.log(props.part)

  const AuthToken = 'Bearer '.concat(localStorage.getItem('token'));
  useEffect(()=>{
    // console.log(localStorage.getItem('token'));
    getData();
    // console.log(partner);
    // console.log(partner.is_operating)
    // console.log(PART_URL+'/'+props.part+'/status/'+(operate?'active':'deactivate'))
  },[])
  
  const handleCheck=()=>{
    setOperate((now)=>!now)
  }

  function getData(){
    const admAPI = axios.get(PART_URL,
      {
        headers:{'Authorization':AuthToken}
      })
        .then(res=>{
          setPartnerList(res.data.data);
          
          // setOperate(res.data.data.is_operating)
          res.data.data.map((data)=>{
            if(props.part.includes(data.id))
              {
                setPartner(data);
                //execute only once?
                // console.log(data)
                if(operate===null){
                  setOperate(data?.is_operating);
                
                  // if(partner?.is_operating===true){
                  //   {setOperate((now)=>);console.log('op true')}
                  // }
                  // else{
                  //   {setOperate((now)=>false);console.log('op false')}
                  // }
                }

              }
              // console.log(operate);
          })
        })
        .catch(err=>console.log(err))
  }
  
  const handleChange=()=> {
    console.log(AuthToken)
    console.log('old status '+operate); 
    setOperate(!operate);//change stat
    console.log('new status '+operate);
    // if(partner?.is_operating===true){
    //   {setOperate((now)=>true);console.log('its true')}
    // }
    // else{
    //   {setOperate((now)=>false);console.log('its false')}
    // }
    
    // const patchAPI = axios.patch(PART_URL+'/'+props.part+'/status/'+(operate?'activate':'deactivate'),
    const patchAPI = axios.patch(`${BASE_URL}/api/employee/employees/${props.part}/status/${operate?'deactivate':'activate'}`,
      null,
      {
        headers:{'Authorization':AuthToken}
      })
        .then(res=>{
          console.log(res); 
        })
        .catch(err=>console.log(err))
    
    // console.log('new status '+operate);
  }
  return (
    <>
      <Switch
        checked={operate}
        onChange={()=>handleChange()}
      />
    </>
  );
};

export default TogglePartAcc;
