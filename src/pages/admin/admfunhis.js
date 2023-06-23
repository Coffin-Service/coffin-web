import React, {createContext, useEffect, useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import data from "../../mock-data.json"
import NavbarAdmin from "../../components/NavbarAdmin";
import Admin from "../Admin";
import AdmFunDetail from "./admfundet";
import { click } from "@testing-library/user-event/dist/click";
import AdminTrans from "../AdminTrans";
import axios from "../../components/axios";
import dateFormat from "dateformat";

// const idTrans= createContext();
const BASE_URL="https://coffin-server-production.up.railway.app/";
const ADM_URL=`${BASE_URL}api/employee/transactions`;

const AdmFunHistory = () => {

  const [trans,setTrans]=useState(data);
  const [admList,setAdmList]=useState([]);

  const [active,setActive]=useState(true);
  const AuthToken = 'Bearer '.concat(localStorage.getItem('token'));

  const handleClick = () => {
    setActive(!active);
  }
    useEffect(()=>{
      // console.log(localStorage.getItem('token'));
      getData();
      // console.log(funList);
    },[])

  function getData(){
    const admAPI = axios.get(ADM_URL+'?type=funeral',
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

  // const myID="Hello";
  // const openDetail = (event,id) => (
  //   <AdmFunDetail />
  // )
  // const[stat,setStat]=({
  //   idNum:10,
  // });
  // const handleState=(num)=>{
  //   this.setStat({idNum:num});
  // }
  
  // const navigate = useNavigate();
  // const createPost=(id)=>{
  //   navigate('/admin/transaction/funeral/detail/',
  //     {
  //       state:{id:0}
  //     });
  // };
  // const [data,setData]=useState({
  //   id:0
  // });
  // const navigate = useNavigate();
  // const openDetail =(Num) =>{
  //   navigate("/admin/transaction/funeral/detail",{
  //     state:{
  //       Num: 0
  //     }
  //   });
  // };
  return (
    <>
      <AdminTrans/>
      {/* <div>
        <ul>
          <li>
            <Link to="/admin/transaction/funeral" 
            style={{opacity:active?0.7:1}}>Funeral Service</Link>
          </li>
          <li>
            <Link to="/admin/transaction/coffin" >Coffin Service</Link>
          </li>
        </ul>
      </div> */}
      <div>
        {/* <h1>
          This is Admin Funeral Service Transaction History
        </h1> */}
        <div style={{textAlign:"center"}}>
          <table className="center">
            <thead>
              <tr>
                <th className="custom_border">Transaction No.</th>
                <th className="custom_border">Status</th>
                <th className="custom_border">Transaction At</th>
                <th className="custom_border">Funeral Service</th>
                <th className="custom_border">Detail</th>
              </tr>
            </thead>
            <tbody>
 

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
                    <td>
                    <button>
                      <Link to="/admin/transaction/funeral/detail/" 
                      state={{transNo:adm.id}} style={{color:'black'}}>
                        Detail
                      </Link>
                    </button>
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

export default AdmFunHistory;
// export {idTrans};