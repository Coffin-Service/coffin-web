import React from "react"
import { useLocation } from "react-router-dom"
import NavbarPartCof from "../../components/NavbarPartnerCoffin";

const PartCofServHisDet = () => {
  const location=useLocation()
  const {transNo,transDate} = location.state
  return (
    <>
    <NavbarPartCof/>
    <div>
      <h1>
        This is Coffin Service Transaction History Page DETAIL for Partner
      </h1>

      <table>
          <thead>
            <tr>
              <th>Detail</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Coffin Name:</td>
              <td>NONE</td>
            </tr>
            
            <tr>
              <td>Price (Rp)</td>
              <td>NONE</td>
            </tr>
            <tr>
              <td>Transaction No</td>
              <td>{transNo}</td>
            </tr>
            <tr>
              <td>Transaction at</td>
              <td>{transDate}</td>
            </tr>
            <tr>
              <td>Delivery Location</td>
              <td>NONE</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>NONE</td>
            </tr>
            
          </tbody>
        </table>

        
    </div>
    </>
  );
};

export default PartCofServHisDet;
