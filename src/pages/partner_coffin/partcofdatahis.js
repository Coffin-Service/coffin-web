import React, {useEffect,useState} from "react"
import { Link } from "react-router-dom"
import App from "../../App";
import NavbarPartCof from "../../components/NavbarPartnerCoffin";
import data from "../../mock-data-funeral-trans.json"
import axios from "../../components/axios";


const COF_URL = 'https://coffin-server-production.up.railway.app/api/employee/coffin-packages';

const PartCofServDataHis = () => {

  const [trans,setTrans]=useState(data);
  
  const [cofList,setCofList]=useState([]);

  useEffect(()=>{
    console.log(localStorage.getItem('token'));
    refreshCofList();
  },[])

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
  return (
    <div>
      <h1>
        This is Coffin Service Data History Page for Partner
      </h1>

      <>
      <NavbarPartCof/>
      <div>
        <h1>
          This is Coffin Service Transaction History Page for Partner
        </h1>

        <div style={{textAlign:"center"}}>
            <table className="center">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Transaction No.</th>
                  <th>Status</th>
                  <th>Transaction At</th>
                  <th>Coffin Name</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                {trans.map((tran)=>(
                  <tr>
                    <td>{tran.action}</td>
                    <td>{tran.transNo}</td>
                    <td>{tran.status}</td>
                    <td>{tran.date}</td>
                    <td>{tran.package}</td>
                    <td>
                      <button>
                        <Link to="/partner/coffin/transaction/detail/" 
                        state={{transNo:tran.transNo,transDate:tran.date}}>
                          Detail
                        </Link>
                      </button>
                    </td>
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

        <div style={{display:'flex'}}>
          <button style={{marginLeft:'auto'}}>
            <Link to="/partner/coffin/service">ADD</Link>
            </button>
        </div>
      </div>
    </>
    </div>
  );
};

export default PartCofServDataHis;
