import React, {useEffect,useState} from "react"
import { useLocation } from "react-router-dom"
import NavbarPartCof from "../../components/NavbarPartnerCoffin";
import axios from "../../components/axios";
import './partner.css';
import dateFormat from "dateformat";

const BASE_URL ="https://coffin-server-production.up.railway.app";
const COF_URL = `${BASE_URL}/api/employee/coffin-transactions`;
const LOGIN_DETAIL_URL = `${BASE_URL}/api/employee/me`;

const PartCofServHisDet = () => {
  const location=useLocation()
  const {transNo} = location.state;

  const [cofList,setCofList]=useState();
  const [loginDetail,setLoginDetail]=useState([]);

  useEffect(()=>{
    // console.log(localStorage.getItem('token'));
    refreshCofList();
    getLoginDetailRole()
  },[])

  const AuthToken = 'Bearer '.concat(localStorage.getItem('token'))
  const refreshCofList= async()=>{
    console.log(COF_URL+'/'+transNo)
    const cofAPI = await axios.get(COF_URL+'/'+transNo,
    {
      headers:{'Authorization':AuthToken}
    })
      .then(res=>{
        setCofList(res.data.data);
        console.log(cofList);
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
    <NavbarPartCof user={loginDetail.name}/>
    <div className="font_color">
      {/* <h1>
        This is Coffin Service Transaction History Page DETAIL for Partner
      </h1> */}

      <h3 style={{color:'black',fontWeight:'bold',marginLeft:'5%',marginRight:'15%',padding:'1%',borderBottom:'1px solid gray'}}>Detail</h3>

      <table style={{marginLeft:'7%'}}>
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>

              <tr>
                <td style={{fontWeight:'bold'}}>Status</td>
                <td style={{textTransform:'capitalize'}}>{cofList?.status}</td>
              </tr>
              <tr>
                <td  style={{width:'15%',fontWeight:'bold'}}>Coffin Name:</td>
                <td>{cofList?.name}</td>
              </tr>
              <tr>
                <td style={{fontWeight:'bold'}}>Transaction No</td>
                <td>{cofList?.transaction_id}</td>
              </tr>
              <tr>
                <td style={{fontWeight:'bold'}}>Transaction date</td>
                <td>
                  {
                    cofList?.transaction_at===null?`${dateFormat(cofList?.created_at,"d mmmm yyyy")}`:`${dateFormat(cofList?.created_at,"d mmmm yyyy")}`
                  }
                </td>
              </tr>
              <tr>
                <td style={{fontWeight:'bold'}}>Delivery Location</td>
                <td>{cofList?.delivery_address}</td>
              </tr>
              
              <tr>
                <td style={{fontWeight:'bold'}}>Price (Rp)</td>
                <td>{CommaAdd(cofList?.price)}</td>
              </tr>
              <tr>
                <td style={{fontWeight:'bold'}}>Shipping (Rp)</td>
                <td>{CommaAdd(cofList?.shipping_fee)}</td>
              </tr>
              <tr>
                <td style={{fontWeight:'bold'}}>Total Price (Rp)</td>
                <td>{CommaAdd(cofList?.total_amount)}</td>
              </tr>
              <tr>
                <td style={{fontWeight:'bold'}}>Quantity</td>
                <td>{cofList?.quantity}</td>
              </tr>
              <div style={{borderBottom:'1px solid black',marginTop:'5%'}}>Buyer Detail</div>
              <tr>
                <td style={{fontWeight:'bold'}}>Name</td>
                <td>{cofList?.user.name}</td>
              </tr>
              <tr>
                <td style={{fontWeight:'bold'}}>Email</td>
                <td>{cofList?.user.email}</td>
              </tr>
              <tr>
                <td style={{fontWeight:'bold'}}>Phone</td>
                <td>{cofList?.user.phone_number}</td>
              </tr>


          </tbody>
        </table>

        
    </div>
    </div>
    </>
  );
};

export default PartCofServHisDet;
