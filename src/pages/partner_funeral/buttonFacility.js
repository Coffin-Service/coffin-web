import React, {useEffect, useState} from "react"
import { Link, useLocation } from "react-router-dom"
import data from "../../mock-data-account.json";
import NavbarAdmin from "../../components/NavbarAdmin";
import axios from "../../components/axios";
import AdminAcc from "../AdminUser";
import Switch from "react-switch";
import { useContext } from "react";
import PartCof from "../partner_coffin/partcof";
import { Button } from "@mui/material";


let facilityToAdd=[];

const BASE_URL="https://coffin-server-production.up.railway.app";
const FUN_URL = `${BASE_URL}/api/employee/funeral-packages`;
const FAC_URL =`${BASE_URL}/api/employee/funeral-facilities`;

const ButtonFacility = (props) => {

  const [facilityId,setFacilityId]=useState(null);
  const [disabled,setDisabled]=useState(false);
  const [facility,setFacility]=useState([]);
  const AuthToken = 'Bearer '.concat(localStorage.getItem('token'));

  useEffect(()=>{
    getData();
  },[])

  function handleFac(id){
    // setFacility(facility=>({tags:[tags.facility,id]}));
    // console.log(facility);
    facilityToAdd.push(id)
    // setFacility((facility)=>([facility,id]))

    console.log("facilityadded"+facilityToAdd);
  }

  function getData(){
    const admAPI = axios.get(FAC_URL,
      {
        headers:{'Authorization':AuthToken}
      })
        .then(res=>{
          // setPartnerList(res.data.data);
          // console.log("from button: ")
          // console.log(res.data.data);
          // setOperate(res.data.data.is_operating)
          res.data.data.map((data)=>{
            if(props.fac.includes(data.id))
              {
                setFacility(data);
                //execute only once?
                // console.log(data)
                // if(operate===null){
                  // setDisabled(!disabled);
                
                  // if(partner?.is_operating===true){
                  //   {setOperate((now)=>);console.log('op true')}
                  // }
                  // else{
                  //   {setOperate((now)=>false);console.log('op false')}
                  // }
                // }

              }
              // console.log(operate);
          })
        })
        .catch(err=>console.log(err))
  }
  function handleClick(e){
    e.preventDefault()
    setDisabled(!disabled)
  }
  return (
    <>
      <button onClick={(e)=>{handleClick(e);setFacilityId(facility.id)}} style={{border:disabled?'1px solid black':'none'}}>
            <div>
              <img src={facility.logo}/>
              <div>{facility.name}</div> 
            </div>
      </button>
    </>
  );
};

export default ButtonFacility;
