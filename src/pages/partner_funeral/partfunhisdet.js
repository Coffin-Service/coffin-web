import React, {useEffect,useState} from "react"
import { useLocation } from "react-router-dom"
import NavbarPartnerFuneral from "../../components/NavbarPartnerFuneral"
import './partner.css'
import axios from "../../components/axios"
import dateFormat from "dateformat"

const BASE_URL ="https://coffin-server-production.up.railway.app";
const FUN_URL = `${BASE_URL}/api/employee/funeral-transactions`;
const LOGIN_DETAIL_URL = `${BASE_URL}/api/employee/me`;

const PartFunServHisDet = () => {
  const location=useLocation()
  const {transNo} = location.state;

  
  const [funList,setFunList]=useState();
  const [loginDetail,setLoginDetail]=useState([]);
  const [deceasedImg,setDeceasedImg]=useState();

  const AuthToken = 'Bearer '.concat(localStorage.getItem('token'))
  useEffect(()=>{
    // console.log(localStorage.getItem('token'));
    refreshFunList();
    getLoginDetailRole();
  },[])

  function refreshFunList(){
    const cofAPI = axios.get(FUN_URL+'/'+transNo,
    {
      headers:{'Authorization':AuthToken}
    })
      .then(res=>{
        setFunList(res.data.data);
        console.log(res.data.data);
        setDeceasedImg(res.data.data.funeral_attendance.image);
        console.log(res.data.data.funeral_attendance.image)
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

  function CommaAdd(amount){
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(amount);
  }
  return (
    <>
      <div className='bg-image'>
      <NavbarPartnerFuneral user={loginDetail.name}/>
      <div className="font_color">
        {/* <h1>
          This is Funeral Service Transaction History Page DETAIL for Partner
        </h1> */}
        <h3 style={{color:'black',fontWeight:'bold',marginLeft:'3%',marginRight:'15%',padding:'1%',borderBottom:'1px solid gray'}}>Detail</h3>

        <table className="center">
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          <tr>
                <td style={{fontWeight:'bold'}}>Status</td>
                  <td style={{textTransform:'capitalize'}}>{funList?.status}</td>
                </tr>
                <tr>
                  <td style={{width:'15%',fontWeight:'bold'}}>Package Name</td>
                  <td>{funList?.package_name}</td>
                </tr>
                <tr>
                  <td style={{fontWeight:'bold'}}>Category</td>
                  <td>{funList?.package_name}</td>
                </tr>
                <tr>
                  <td style={{fontWeight:'bold'}}>Category Name</td>
                  <td>{funList?.category_name}</td>
                </tr>
                <tr>
                  <td style={{fontWeight:'bold'}}>Price (Rp)</td>
                  <td>{CommaAdd(funList?.price)}</td>
                </tr>
                <tr>
                  <td style={{fontWeight:'bold'}}>Transaction No</td>
                  <td>{funList?.transaction_id}</td>
                </tr>
                <tr>
                  <td style={{fontWeight:'bold'}}>Transaction Start</td>
                  <td>
                    {/* {funList?.transaction_at} */}
                    {
                      funList?.transaction_at===null?`${dateFormat(funList?.start_at,"d mmmm yyyy")}`:`${dateFormat(funList?.start_at,"d mmmm yyyy")}`
                    }
                  </td>
                </tr>
                <tr>
                  <td style={{fontWeight:'bold'}}>Transaction End</td>
                  <td>
                    {/* {funList?.transaction_at} */}
                    {
                      funList?.transaction_at===null?`${dateFormat(funList?.end_at,"d mmmm yyyy")}`:`${dateFormat(funList?.end_at,"d mmmm yyyy")}`
                    }
                  </td>
                </tr>
                
                <tr>
                  <td style={{fontWeight:'bold'}}>Facility</td>
                </tr>
                <tr>
                  <div style={{marginLeft:'5%',display:'flex',flexDirection:'row'}}>
                    {
                      funList?.facilities.map((fac)=>(
                        <div style={{marginLeft:'3%',textAlign:'center'}}>
                          <img src={fac.logo} width='50' height='50'/> 
                          <div>{fac.name}</div>
                        </div>
                      ))
                    }
                  </div>
                </tr>
                
                <div style={{borderBottom:'1px solid black',marginTop:'10%'}}>Deceased Detail</div>
                <tr>
                  <td style={{fontWeight:'bold'}}>Name</td>
                  <td>{funList?.funeral_attendance.name}</td>
                </tr>
                <tr>
                  <img src={deceasedImg} width={200} height={200}/>
                </tr>

                <div style={{borderBottom:'1px solid black',marginTop:'10%'}}>Buyer Detail</div>
                <tr>
                  <td style={{fontWeight:'bold'}}>Name</td>
                  <td>{funList?.user.name}</td>
                </tr>
                <tr>
                  <td style={{fontWeight:'bold'}}>Email</td>
                  <td>{funList?.user.email}</td>
                </tr>
                <tr>
                  <td style={{fontWeight:'bold'}}>Phone Number</td>
                  <td>{funList?.user.phone_number}</td>
                </tr>
                
          </tbody>
        </table>
        {/* <div style={{marginLeft:'5%',display:'flex',flexDirection:'row'}}>
          {
            funList?.facilities.map((fac)=>(
              <div style={{marginLeft:'3%',textAlign:'center'}}>
                <img src={fac.logo} width='50' height='50'/> 
                <div>{fac.name}</div>
              </div>
            ))
          }
        </div> */}

        <div>
          <img src=""/>
          <img src=""/>
          <img src=""/>
        </div>
      </div>
      </div>
    </>
  );
};

export default PartFunServHisDet;
