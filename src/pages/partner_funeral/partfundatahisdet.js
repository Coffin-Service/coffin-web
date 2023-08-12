import React, {useEffect,useState, Component} from "react"
import { Link,  useLocation, useParams } from "react-router-dom"
import NavbarPartFun from "../../components/NavbarPartnerFuneral";
import './partner.css'
import axios from "../../components/axios";

const BASE_URL ="https://coffin-server-production.up.railway.app";
const FUN_URL = `${BASE_URL}/api/employee/funeral-packages`;
const LOGIN_DETAIL_URL = `${BASE_URL}/api/employee/me`;

const PartFunServDataHisDet = () => {
  const location=useLocation()
  const {packageId,packageName} = location.state

  const [funList,setFunList]=useState([]);
  const [tempFunList,setTempFunList]=useState([]);

  const [length,setLength] = useState();
  const [loginDetail,setLoginDetail]=useState([]);

  const AuthToken = 'Bearer '.concat(localStorage.getItem('token'));

  useEffect(()=>{
    console.log(localStorage.getItem('token'));
    refreshFunList();
    getLoginDetailRole();
    // console.log(funList);
    // checkFun(packageId);
  },[])


  // useEffect(()=>{
  //   checkFun(packageId);
  //   console.log(packageId+packageName)
  // },[])
  
  function refreshFunList(){
    const cofAPI = axios.get(FUN_URL,
    {
      headers:{'Authorization':AuthToken}
    })
      .then(res=>{
        setFunList(res?.data.data);
        console.log(funList);

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

  function checkFun(funId){
    // console.log(funId);
    console.log(funId.includes(funList))
    if(funId.includes(funList)){
      setTempFunList(funList.categories);
      // setLength(tempFunList.length);
      console.log(tempFunList);
    }
    // funList.map((fun)=>
    //   {
    //     if(funId===fun.id)
    //     {
    //       setTempFunList(fun);
    //       console.log("matched");
    //       console.log(tempFunList);
    //     }
    //   }
      // fun.id===funId?console.log('match'):console.log('failed');
      
    // )

  }

  
  const delFunList =(funId)=>{
    
    const confirmBox = window.confirm(
      "Are you sure?"
    )
    if(confirmBox===true){
      console.log(FUN_URL+'/'+funId)
      const cofAPI = axios.delete(`${BASE_URL}/api/employee/coffin-packages/${funId}`,{
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
    <div className='bg-image'>
    <NavbarPartFun user={loginDetail.name}/>
      <div>
        {/* <h1>
          This is Funeral Service Data History Page DETAIL for Partner
        </h1> */}
      </div>
      <h3 style={{color:'black',fontWeight:'bold',marginLeft:'3%',marginRight:'15%',padding:'1%',borderBottom:'1px solid gray'}}>Detail</h3>
      
      <table className="custom_table font_color"  style={{marginLeft:'4%',marginTop:'1%'}}>
          <thead>
            <tr>
              <th style={{textAlign:'left',width:'40%'}}></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
              {/* <td>Category :</td> */}
            {/* {
              funList.map((fun)=>
                packageId.includes(fun.id)?(
                <tr>
                  <td>Package Name</td>
                  <td>{fun.name}</td>
                </tr>

              ):null)
            } */}
            <tr>
              <td style={{flexDirection:"row",display:'flex'}}>
                <div>PackageName</div> 
                <div style={{marginLeft:'11%'}}>{packageName}</div>
              </td>
            </tr>
            {
              funList.map((fun)=>
                packageId.includes(fun.id)?(
                  <tr>
                    
                      {
                        
                        <table>
                            {
                              fun.categories.map((cat)=>(
                                <tbody>
                                  <tr>
                                    <td style={{borderTop:"1px solid #222"}}>Category</td>
                                    <td style={{textAlign:'left',borderTop:"1px solid #222"}}>{cat.name}</td>
                                  </tr>
                                  <tr>
                                    <td>Price</td>
                                    <td style={{textAlign:'left'}}>{CommaAdd(cat.price)}</td>
                                  </tr>
                                  <tr>
                                    <td>Facility</td>
                                    <td style={{display:'flex',flexDirection:'row',textAlign:'center'}}>
                                      {
                                        cat.facilities.map((fac)=>(
                                          <div style={{marginLeft:'3%'}}>
                                            <img src={fac.logo}></img>
                                            <div>{fac.name}</div>
                                          </div>
                                        ))
                                      }
                                    </td>
                                  </tr>
                                </tbody>
                              ))
                            }
                        </table>
                            // <div>{cat.price}</div>
                          
                      }
                    
                
                  </tr>
              ):null)
            }
      
            {/* <tr>
              <td className="custom_cell">Package Name:</td>
              <td className="custom_cell">{packageName}</td>
            </tr>
            <tr>
              <td className="custom_cell">Category</td>
              <td className="custom_cell">
                {
                  funList.map((fun)=>{
                    
                    if(packageId.includes(fun.id)){
                      console.log("success");
                      return <div>{fun.name}</div>
                    }
                  })
                }
              </td>
              
            </tr>
            <tr>
              <td className="custom_cell">Category Name</td>
              <td className="custom_cell">NONE</td>
            </tr>
            <tr>
              <td className="custom_cell">Price (Rp)</td>
              <td className="custom_cell">NONE</td>
            </tr>
            <tr>
              <td className="custom_cell">Category Name</td>
              <td className="custom_cell">NONE</td>
            </tr>
            <tr>
              <td className="custom_cell">Price (Rp)</td>
              <td className="custom_cell">NONE</td>
            </tr>
            <tr>
              <td className="custom_cell">Facility</td>
            </tr>

            <tr>
              <td className="custom_cell">Package Name:</td>
              {
                  funList.map((fun)=>{
                    
                    if(packageId.includes(fun.id)){
                      console.log("success");
                      return <td>{fun.name}</td>
                    }
                  })
              }
            </tr>

            <tr>
              <td>Category</td>
            {
              funList.map((fun)=>{
                if(packageId.includes(fun.id)){
                  fun.categories.map((cat)=>{
                    console.log(cat);
                    return <td>{cat.name}</td>
                  })
                }
              })
            }
            </tr> */}

          </tbody>
        </table>
        <button onClick={(e)=>{
            e.preventDefault();
            delFunList(packageId)}} 
            style={{color:'white',backgroundColor:'red',width:'8%',borderRadius:'30px',marginTop:'10%',marginLeft:'75%'}}>
              Delete
        </button>
        </div>
    </>
  );
};

export default PartFunServDataHisDet;
