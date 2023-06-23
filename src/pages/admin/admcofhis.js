import React, {useEffect, useState} from "react"
import { Link } from "react-router-dom"
import data from "../../mock-data.json"
import NavbarAdmin from "../../components/NavbarAdmin";
import Admin from "../Admin";
import axios from "../../components/axios";
import AdminTrans from "../AdminTrans";
import AdminAcc from "../AdminUser";
import dateFormat from "dateformat";

const BASE_URL="https://coffin-server-production.up.railway.app/";
const ADM_URL=`${BASE_URL}api/employee/transactions`;

const AdmCofHistory = () => {
  const [trans,setTrans]=useState(data);

  const [admList,setAdmList]=useState([]);

  const [active,setActive]=useState(true);
  const AuthToken = 'Bearer '.concat(localStorage.getItem('token'));

  const [cofList,setCofList]=useState([]);

  useEffect(()=>{
    // console.log(localStorage.getItem('token'));
    getData();
  },[])

  function getData(){
    const admAPI = axios.get(ADM_URL+'?type=coffin',
      {
        headers:{'Authorization':AuthToken}
      })
        .then(res=>{
          setAdmList(res.data.data);
          console.log(res.data.data);
          // console.log(funList.categories.facilities.logo)
        })
        // .then(res =>console.log(res.data))
        .catch(err=>console.log(err))
  }
  // useEffect(()=>{
  //   tokens = JSON.parse(localStorage.getItem('token'));
  // },[])

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
                <th className="custom_border">Transaction No.</th>
                <th className="custom_border">Status</th>
                <th className="custom_border">Transaction At</th>
                <th className="custom_border">Coffin Service</th>
                <th className="custom_border">Detail</th>
              </tr>
            </thead>
            <tbody>
              {/* {trans.map((tran)=>(
                <tr>
                  <td>{tran.action}</td>
                  <td>{tran.transNo}</td>
                  <td>{tran.status}</td>
                  <td>{tran.date}</td>
                  <td>{tran.location}</td>
                  <td><button><Link to="/admin/transaction/coffin/detail/" 
                      state={{transNo:tran.transNo}}>
                        Detail
                      </Link></button></td>
                </tr>
              ))} */}

              {admList.map((adm)=>(
                  <tr>
                    <td>{adm.id}</td>
                    <td style={{textTransform:'capitalize'}}>{adm.status}</td>
                    <td>
                    {
                      dateFormat(adm.created_at,"d mmmm yyyy")
                    }
                    </td>
                    <td>{adm.name}</td>
                    <td><button><Link to="/admin/transaction/coffin/detail/" 
                      state={{transNo:adm.id}} style={{color:'black'}}>
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
