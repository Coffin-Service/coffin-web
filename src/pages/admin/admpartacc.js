import React, {useEffect, useState} from "react"
import { Link } from "react-router-dom"
import data from "../../mock-data-account.json";
import NavbarAdmin from "../../components/NavbarAdmin";
import axios from "../../components/axios";
import AdminAcc from "../AdminUser";
// import Switch from "react-switch";
import Switch from "@mui/material/Switch";
import FormControlLabel from '@mui/material/FormControlLabel';
// import FormGroup from '@mui/material/FormGroup';
// import Switch from "../../custom_switch/switch";


const PART_URL = 'https://coffin-server-production.up.railway.app/api/employee/employees';

const AdmPartAcc = () => {

  const [trans,setTrans]=useState(data);

  const [checked,setChecked]=useState([]);
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
    const cofAPI = axios.get(PART_URL,
    {
      headers:{'Authorization':AuthToken}
    })
      .then(res=>setPartnerList(res.data.data))
      
      // .then(res =>console.log( res.data.data[0]))
      .catch(err=>console.log(err))
  }

  const handleChange =(e)=>{
    // e.preventDefault();
    console.log("trying to change status");
    setChecked(e.target.checked);
    // if(e.target.value=="on"){
    //   setChecked(true);
    // }
    // else{
    //   setChecked(false);
    // }
    // console.log(e.target.value)
    console.log(checked);
  }

  const ToggleItem =(id,e)=>{
    checked[id]=
    setChecked(e.target.checked);
    // return (
    //   <div className="single-history" key={id}>
    //     <button
    //       className="h-head"
    //       onClick={() => setToggleThisElement((prev) => !prev)}
    //     >
    //       click this btn for toggle h-info block {id}
    //     </button>

    //     {toggleThisElement && <div className="h-info">{discription}</div>}
    //   </div>
    // );
  };

  return (
    <>
    <AdminAcc/>
      {/* <div>
        <ul>
          <li>
            <Link to="/admin/account_management/user" 
            style={{opacity:active?0.7:1}}>User</Link>
          </li>
          <li>
            <Link to="/admin/account_management/partner" >Partner</Link>
          </li>
        </ul>
      </div> */}
      
      <div>
        <h1>
          This is Partner Account Management
        </h1>

        <div style={{textAlign:"center"}}>
          <table className="center">
            <thead>
              <tr>
                <th>Action</th>
                <th>Email</th>
                <th>Status</th>
                <th>Issued Date</th>
                <th>Operating</th>
              </tr>
            </thead>
            <tbody>
              {trans.map((tran)=>(
                <tr>
                  <td>Yes/No </td>
                  <td>{tran.email}</td>
                  <td>{tran.status}</td>
                  <td>{tran.date}</td>
                  <td>{tran.accessbility}</td>
                  
                </tr>
              ))}

              {partnerList.map((part,i)=>(
                  <tr>
                    <td>Action</td>
                    <td>{part.id}</td>
                    <td>{part.status}</td>
                    <td>{part.created_at}</td>
                    {/* <td>{JSON.stringify(part.is_operating)}</td> */}
                    <td>
                        <Switch
                          checked={checked}
                          onChange={this.ToggleItem.bind(this,i)}
                        />
                        {/* <FormGroup> */}
                          {/* <FormControlLabel
                            control={ 
                              <Switch
                              // rounded={true}
                              // isToggled={partnerList.values===part.is_operating}
                              // onToggle={()=>setIsToggled(!isToggled)}
                              // defaultChecked
                              
                              checked={checked}
                              onChange={handleChange}
                              inputProps={{'aria-label':'controlled'}}
                              />
                            }
                          /> */}
                          {/* </FormGroup> */}
                        {/* {checked?<div>1st</div>:<div>2nd</div>} */}
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
