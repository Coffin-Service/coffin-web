import React, {useEffect, useState} from "react"
import { Link } from "react-router-dom"
import data from "../../mock-data.json"
import NavbarAdmin from "../../components/NavbarAdmin";
import Admin from "../Admin";
import axios from "../../components/axios";
import AdminTrans from "../../AdminTrans";
import AdminAcc from "../AdminUser";

const COF_URL = 'https://coffin-server-production.up.railway.app/api/employee/coffin-packages';

const AdmCofHistory = () => {
  const [trans,setTrans]=useState(data);

  // const [active,setActive]=useState(true);

  const [cofList,setCofList]=useState([]);

  useEffect(()=>{
    console.log(localStorage.getItem('token'));
    refreshCofList();
  },[])
  
  // useEffect(()=>{
  //   tokens = JSON.parse(localStorage.getItem('token'));
  // },[])

  const AuthToken = 'Bearer '.concat(localStorage.getItem('token'))
  function refreshCofList(){
    const cofAPI = axios.get(COF_URL,
    {
      headers:{'Authorization':AuthToken}
    })
      .then(res=>setCofList(res.data.data))
      // .then(res =>console.log( res.data.data[0]))
      .catch(err=>console.log(err))
  }
  // const handleClick = () => {
  //   setActive(!active);
  // }
  return (
    <>
      {/* <Admin/> */}
      {/* <div>
        <ul>
          <li>
            <Link to="/admin/transaction/funeral">Funeral Service</Link>
          </li>
          <li>
            <Link to="/admin/transaction/coffin"
            style={{opacity:active?0.7:1}}>Coffin Service</Link>
          </li>
        </ul>
      </div> */}
      <div>
        {/* <h1>
          This is Admin Coffin Service Transaction History
        </h1> */}

        {/* <div>
          <table className="center"></table>
          <thead>
            <tr>
                <th className="custom_border">Action</th>
                <th className="custom_border">Transaction No.</th>
                <th className="custom_border">Status</th>
                <th className="custom_border">Transaction At</th>
                <th className="custom_border">Coffin Service</th>
                <th className="custom_border">Detail</th>
            </tr>
          </thead>
          <tbody>
            {
              cofList.map((coffin,idx)=>(
                <tr>
                  <td>{coffin.name}</td>
                </tr>
              ))
            }
          </tbody>
        </div> */}

        <AdminTrans/>

        <div style={{textAlign:"center"}}>
          <table className="center">
            <thead>
              <tr>
                <th className="custom_border">Action</th>
                <th className="custom_border">Transaction No.</th>
                <th className="custom_border">Status</th>
                <th className="custom_border">Transaction At</th>
                <th className="custom_border">Coffin Service</th>
                <th className="custom_border">Detail</th>
              </tr>
            </thead>
            <tbody>
              {trans.map((tran)=>(
                <tr>
                  <td>{tran.action}</td>
                  <td>{tran.transNo}</td>
                  <td>{tran.status}</td>
                  <td>{tran.date}</td>
                  <td>{tran.location}</td>
                  <td><button><Link to="/admin/transaction/coffin/detail/" 
                      state={{transNo:tran.transNo,transDate:tran.date}}>
                        Detail
                      </Link></button></td>
                </tr>
              ))}

              {cofList.map((cof)=>(
                  <tr>
                    <td>Action</td>
                    <td>{cof.id}</td>
                    <td>Status</td>
                    <td>Date</td>
                    <td>{cof.name}</td>
                    <td><button><Link to="/admin/transaction/coffin/detail/" 
                      state={{transNo:cof.id,transDate:'DATE'}}>
                        Detail
                      </Link></button></td>
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

export default AdmCofHistory;
