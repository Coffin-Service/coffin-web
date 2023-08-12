import React, {useEffect,useState} from "react"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import NavbarAdmin from "../../components/NavbarAdmin"
import data from "../../mock-data-funeral-trans.json"
import axios from "../../components/axios"
import dateFormat from "dateformat"

const BASE_URL ="https://coffin-server-production.up.railway.app";
const DONO_URL = `${BASE_URL}/api/employee/donation-transactions`;
const LOGIN_DETAIL_URL = `${BASE_URL}/api/employee/me`;

const DonationHisDet = () => {
  const location=useLocation()
  const {transNo} = location.state;

  const [trans,setTrans]=useState(data);

  const [donoList,setDonoList]=useState([]);
  const [loginDetail,setLoginDetail]=useState([]);

  useEffect(()=>{
    console.log(localStorage.getItem('token'));
    console.log(transNo);
    refreshFunList();
    getLoginDetailRole();
  },[])

  const AuthToken = 'Bearer '.concat(localStorage.getItem('token'))
  function refreshFunList(){
    const cofAPI = axios.get(DONO_URL+'/'+transNo,
    {
      headers:{'Authorization':AuthToken}
    })
      .then(res=>{
        setDonoList(res.data.data);
        console.log(res.data.data);
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

  function dateIsValid(date){
    return date instanceof Date && !isNaN(date);
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
    <NavbarAdmin user={loginDetail.name}/>
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
                <td style={{width:'15%',fontWeight:'bold'}}>Amount</td>
                  <td>{CommaAdd(donoList?.total_complete_donation)}</td>
                </tr>
                <tr>
                <td style={{width:'15%',fontWeight:'bold'}}>Donater</td>
                  <td>{donoList?.total_complete_donation_count}</td>
                </tr>
                <tr>
                  <td style={{width:'15%',fontWeight:'bold'}}>Donation open</td>
                  <td>{dateFormat(donoList?.funeral_attendance?.start_at,"d mmmm yyyy")}</td>
                </tr>
                <tr>
                  <td style={{fontWeight:'bold'}}>Donation close</td>
                  <td>{dateFormat(donoList?.funeral_attendance?.end_at,"d mmmm yyyy")}</td>
                </tr>
                <div style={{borderBottom:'1px solid black', paddingTop:'5%'}}>Deceased Detail</div>
                <tr>
                  <td style={{fontWeight:'bold'}}>Name</td>
                  <td>{donoList?.funeral_attendance?.name}</td>
                </tr>
                <tr>
                  <td style={{fontWeight:'bold'}}>Birth Date</td>
                  <td>{dateFormat(donoList?.funeral_attendance?.born_at,"d mmmm yyyy")}</td>
                </tr>
                <tr>
                  <td style={{fontWeight:'bold'}}>Deceased Date</td>
                  <td>{dateFormat(donoList?.funeral_attendance?.die_at,"d mmmm yyyy")}</td>
                </tr>
                <tr>
                  {/* <img src={deceasedImg} width={350} height={250}/> */}
                </tr>

                <div style={{borderBottom:'1px solid black', paddingTop:'5%'}}>Customer Detail</div>
                <tr>
                  <td style={{fontWeight:'bold'}}>Name</td>
                  <td>{donoList?.user?.name}</td>
                </tr>
                <tr>
                  <td style={{fontWeight:'bold'}}>Email</td>
                  <td>{donoList?.user?.email}</td>
                </tr>
                <tr>
                  <td style={{fontWeight:'bold'}}>Phone Number</td>
                  <td>{donoList?.user?.phone_number}</td>
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

export default DonationHisDet;
