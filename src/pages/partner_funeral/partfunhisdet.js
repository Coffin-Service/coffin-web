import React from "react"
import { useLocation } from "react-router-dom"
import NavbarPartnerFuneral from "../../components/NavbarPartnerFuneral"
import './partner.css'

const PartFunServHisDet = () => {
  const location=useLocation()
  const {transNo,transDate} = location.state
  return (
    <>
      <NavbarPartnerFuneral/>
      <div className="font_color">
        <h1>
          This is Funeral Service Transaction History Page DETAIL for Partner
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
              <td>Package Name:</td>
              <td>NONE</td>
            </tr>
            <tr>
              <td>Category</td>
              <td>NONE</td>
            </tr>
            <tr>
              <td>Category Name</td>
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
              <td>Status</td>
              <td>NONE</td>
            </tr>
            
            <tr>
              <td>Facility</td>
            </tr>
          </tbody>
        </table>

        <div>
          <img src=""/>
          <img src=""/>
          <img src=""/>
        </div>
      </div>
    </>
  );
};

export default PartFunServHisDet;
