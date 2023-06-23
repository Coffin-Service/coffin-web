import React, {useEffect, useState} from "react"
import {nanoid} from "nanoid";
import { Link } from "react-router-dom"
import NavbarPartnerFuneral from "../../components/NavbarPartnerFuneral"
import data from "../../mock-data-funeral.json"
import EditableRow from "./editRowFuneral";
import ReadOnlyRow from "./readRowFuneral";
import axios from "../../components/axios";
import e from "cors";
import bin from "../../picture/Trash.png"

const BASE_URL ="https://coffin-server-production.up.railway.app";
const FUN_URL = `${BASE_URL}/api/employee/funeral-packages`;
const LOGIN_DETAIL_URL = `${BASE_URL}/api/employee/me`;

const PartFunServDataHis = () => {
  // const [trans,setTrans]=useState(data);

  const [active,setActive]=useState(true);

  const [funList,setFunList]=useState([]);
  const [localFunList,setLocalFunList]=useState(funList);
  const [loginDetail,setLoginDetail]=useState([]);

  const AuthToken = 'Bearer '.concat(localStorage.getItem('token'));

  useEffect(()=>{
    // console.log(localStorage.getItem('token'));
    refreshFunList();
    getLoginDetailRole();
    // console.log(funList);
  },[])

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

  const handleClick = () => {
    setActive(!active);
  }


  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    packageName: "",
    category: "",
    categoryName: "",
    price: "",
    facility:""
  });

  const [editFormData, setEditFormData] = useState({
    packageName: "",
    category: "",
    categoryName: "",
    price: "",
    facility:""
  });

  const [trans, setTrans] = useState(data);


  function refreshFunList(){
    const cofAPI = axios.get(FUN_URL,
    {
      headers:{'Authorization':AuthToken}
    })
      .then(res=>{
        setFunList(res.data.data);
        // console.log(funList);
        // console.log(funList.categories.facilities.logo)
      })
      // .then(res =>console.log(res.data))
      .catch(err=>console.log(err))
  }

  const delFunList =(funId)=>{
    
    const confirmBox = window.confirm(
      "Are you sure?"
    )
    if(confirmBox===true){
      console.log(FUN_URL+'/'+funId)
      const cofAPI = axios.delete(`${BASE_URL}/api/employee/funeral-packages/${funId}`,{
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
      <NavbarPartnerFuneral user={loginDetail.name}/>
      <div>
        {/* <h1>
          This is Funeral Service Data History Page for Partner
        </h1> */}
         <h3 style={{color:'black',fontWeight:'bold',marginLeft:'3%',marginRight:'15%',padding:'1%',borderBottom:'1px solid gray'}}>Funeral Service Package</h3>
        
        <div style={{textAlign:"center"}}>
          <form>
          <table className="center" style={{marginTop:'2%'}}>
            <thead>
              <tr>
                <th style={{width:'15%'}}>Package Name</th>
                <th style={{width:'25%'}}>Category</th>
                <th style={{width:'12%'}}>Price (Rp)</th>
                <th style={{width:'17%'}}>Facility</th>
                <th style={{width:'8%'}}>Detail</th>
                <th style={{width:'8%'}}>Actions</th>
                <th></th>
              </tr>
            </thead>
            <tbody >

              {funList.map((fun)=>(
                <tr>
                  <td style={{borderTop:"1px solid #222",verticalAlign:'top',paddingTop:'2%'}}>{fun.name}</td>

                  <td style={{borderTop:"1px solid #222",verticalAlign:'top'}}>
                    {
                      fun.categories.map((cat)=>(
                        // <tr>{cat.name}</tr>
                        <div style={{marginTop:'7%'}}>
                          <table className="custom_table font_color">
                            <thead>
                              <tr>
                                <th className="custom_rowName" style={{margin:'auto',padding:'0.5',verticalAlign:'top',textAlign:'center'}}>{cat.name}</th>
                              </tr>
                            </thead>
                          </table>
                        </div>
                        ))
                    }
                  </td>

                  <td style={{borderTop:"1px solid #222",verticalAlign:'top'}}>
                    {
                      fun.categories.map((cat)=>(
                        <div style={{marginTop:'15%'}}>
                          <table className="custom_table font_color">
                            <thead>
                              <tr>
                                <th className="custom_rowName" style={{margin:'auto',padding:'0.5',verticalAlign:'top',textAlign:'center'}}>
                                  {CommaAdd(cat.price)}
                                </th>
                              </tr>
                            </thead>
                          </table>
                        </div>
                        ))
                    }
                  </td>

                  <td style={{borderTop:"1px solid #222",verticalAlign:'top',display:'flex',flexDirection:'row',textAlign:'left'}}>
                    {
                      fun.categories.map((cat)=>(
                          <div style={{margin:'auto'}}>
                            {cat.facilities.map((fac)=>(
                              <div style={{marginTop:'10%'}}>
                                <div>{fac.name}</div>
                                {/* <img src={fac.logo}/> */}
                                {/* <div>
                                  <table className="custom_table font_color" style={{border:'1px solid black'}}>
                                    
                                      <tr style={{margin:'auto'}}>
                                        <td className="custom_rowName" style={{display:'flex',justifyContent:'left'}}>
                                          <img src={fac.logo}/>
                                        </td>
                                      </tr>
                                    
                                  </table>
                                </div> */}
                              </div>
                              ))}
                          </div>
                        ))
                    }
                  </td>
                  
                  <td style={{borderTop:"1px solid #222"}}>
                    <button style={{marginTop:'auto',borderRadius:'40px',width:'110px',backgroundColor:'white'}}>
                      <Link to="/partner/funeral/service_data/detail" 
                        state={{packageId:fun.id,packageName:fun.name}} style={{color:'black'}}>
                          Detail
                      </Link>
                    </button>
                  </td>

                  <td style={{borderTop:"1px solid #222",padding:'1%'}}>
                    <button onClick={(e)=>{
                      e.preventDefault();
                      delFunList(fun.id)}}
                      style={{backgroundColor:'white',border:'none',outline:'none',marginTop:'10px'}}>
                      <img src={bin}/>
                    </button>
                  </td>

                </tr>
              ))}   

            </tbody>
          </table>
          
          <div style={{color:'black',fontWeight:'bold',marginLeft:'3%',marginRight:'15%',padding:'1%',borderBottom:'1px solid gray'}}></div>
          <button style={{width:'200px',borderRadius:'30px',backgroundColor:'#F3B792',marginRight:'23%',alignSelf:'flex-end'}}>
            <Link to="/partner/funeral/service_data/add" style={{color:'black'}}>
              Add Package
            </Link>
          </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PartFunServDataHis;
