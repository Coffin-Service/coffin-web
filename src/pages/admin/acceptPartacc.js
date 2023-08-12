import React, {useEffect, useState} from "react"
import { Link, useLocation } from "react-router-dom"
import data from "../../mock-data-account.json";
import NavbarAdmin from "../../components/NavbarAdmin";
import axios from "../../components/axios";
import AdminAcc from "../AdminUser";
import Switch from "react-switch";
import { useContext } from "react";
import PartCof from "../partner_coffin/partcof";
import { act } from "react-dom/test-utils";


const BASE_URL = "https://coffin-server-production.up.railway.app"
const PART_URL = `${BASE_URL}/api/employee/employees`;

const AcceptPartAcc = (props) => {

  // const location=useLocation()
  // const {transNo} = location.state
  const [partnerList,setPartnerList]=useState([]);
  const [partner,setPartner]=useState({});
  const [operate,setOperate]=useState(null);
  const [action,setAction]=useState(false);
  
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
          console.log(res.data.data);
          // setOperate(res.data.data.is_operating)
          res.data.data.map((data)=>{
            if(props.part.includes(data.id)){
              if((data.status)==='pending')
                {
                  setAction(true);
                }
                console.log(operate);
          }})
        })
        .catch(err=>console.log(err))
  }
  
   
  const handleAccept=()=>{

    const confirmBox = window.confirm(
      "Are you sure?"
    )

    if(confirmBox===true){
      const patchAPI = axios.post(`${BASE_URL}/api/employee/employees/${props.part}/verify/accept`,
        null,
        {
          headers:{'Authorization':AuthToken}
        })
          .then(res=>{
            console.log(res); 
          })
          .catch(err=>console.log(err))
      }
  }
  const handleDeny=()=>{

    const confirmBox = window.confirm(
      "Are you sure?"
    )

    if(confirmBox===true){
      const patchAPI = axios.post(`${BASE_URL}/api/employee/employees/${props.part}/verify/deny`,
        null,
        {
          headers:{'Authorization':AuthToken}
        })
          .then(res=>{
            console.log(res); 
          })
          .catch(err=>console.log(err))
    }
  }
  return (
    <>
      {/* <Switch
        checked={operate}
        onChange={()=>handleChange()}
      /> */}
      <div style={{display:'flex',flexDirection:'row',backgroundColor:'transparent',borderRadius:'10px'}}>
        <button style={{margin:'auto',border:'none',outline:'none',backgroundColor:'transparent',color:'green',fontWeight:'bold',display:action?'':'none'}} onClick={()=>action?handleAccept():null}>
          Accept
        </button>
        <button style={{margin:'auto',border:'none',outline:'none',backgroundColor:'transparent',color:'red',fontWeight:'bold',display:action?'':'none'}} onClick={()=>action?handleDeny():null}>
          Deny {console.log()}
        </button>
        {/* need to fix later */}
        <div style={{display:!action?'':'none',margin:'auto',backgroundColor:'transparent'}}>
          Done
        </div>
      </div>
    </>
  );
};

export default AcceptPartAcc;
