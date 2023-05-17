import React, {createContext, useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import data from "../../mock-data.json"
import NavbarAdmin from "../../components/NavbarAdmin";
import Admin from "../Admin";
import AdmFunDetail from "./admfundet";
import { click } from "@testing-library/user-event/dist/click";
import AdminTrans from "../../AdminTrans";

// const idTrans= createContext();

const AdmFunHistory = () => {

  const [trans,setTrans]=useState(data);

  const [active,setActive]=useState(true);
  const handleClick = () => {
    setActive(!active);
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
                <th className="custom_border">Action</th>
                <th className="custom_border">Transaction No.</th>
                <th className="custom_border">Status</th>
                <th className="custom_border">Transaction At</th>
                <th className="custom_border">Funeral Service</th>
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
                  <td>
                    <button>
                      <Link to="/admin/transaction/funeral/detail/" 
                      state={{transNo:tran.transNo,transDate:tran.date}}>
                        Detail
                      </Link>
                    {/* <button onClick={event=>openDetail(event,"hello")}>Detail */}
                      {/* <AdmFunDetail userID={tran.transNo}/>0 */}
                      {/* <idTrans.Provider value={"hello"}>
                        <Link to="/admin/transaction/funeral/detail/">Detail</Link>
                        
                      </idTrans.Provider> */}
                      {/* <Link 
                        to={{
                          pathname:"/admin/transaction/funeral/detail/",
                          state: {id: tran.transNo}
                        }}
                        >Detail</Link> */}
                        {/* <Link 
                        to="/admin/transaction/funeral/detail"
                        state={{id:"hello"}}>
                          Detail
                        </Link> */}
                    </button>
                  </td>
                </tr>
                
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdmFunHistory;
// export {idTrans};