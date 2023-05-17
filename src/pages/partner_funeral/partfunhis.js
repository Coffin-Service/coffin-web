import React, {useEffect,useState} from "react"
import { Link } from "react-router-dom"
import NavbarPartnerFuneral from "../../components/NavbarPartnerFuneral"
import data from "../../mock-data-funeral-trans.json"
import axios from "../../components/axios"

const FUN_URL = 'https://coffin-server-production.up.railway.app/api/employee/funeral-transactions';

const PartFunServHis = () => {
  const [trans,setTrans]=useState(data);

  const [funList,setFunList]=useState([]);

  useEffect(()=>{
    console.log(localStorage.getItem('token'));
    refreshFunList();
  },[])

  const AuthToken = 'Bearer '.concat(localStorage.getItem('token'))
  function refreshFunList(){
    const cofAPI = axios.get(FUN_URL,
    {
      headers:{'Authorization':AuthToken}
    })
      .then(res=>setFunList(res.data.data))
      // .then(res =>console.log( res.data.data[0]))
      .catch(err=>console.log(err))
  }
  return (
    <>
    <NavbarPartnerFuneral/>
      <div>
        <h1>
          This is Funeral Service Transaction History Page for Partner
        </h1>
        
        <div style={{textAlign:"center"}}>
          <table className="center">
            <thead>
              <tr>
                <th>Action</th>
                <th>Transaction No.</th>
                <th>Status</th>
                <th>Transaction At</th>
                <th>Package Name</th>
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
                      <Link to="/partner/funeral/transaction/detail/" 
                      state={{transNo:tran.transNo,transDate:tran.date}}>
                        Detail
                      </Link>
                    </button>
                  </td>
                </tr>
              ))}

              {funList.map((fun)=>(
                  <tr>
                    <td>Action</td>
                    <td></td>
                    <td>Status</td>
                    <td>Date</td>
                    <td></td>
                    <td><button><Link to="/admin/transaction/coffin/detail/" 
                      state={{}}>
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

export default PartFunServHis;
