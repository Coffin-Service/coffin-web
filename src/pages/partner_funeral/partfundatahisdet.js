import React, {useState, Component} from "react"
import { Link,  useLocation, useParams } from "react-router-dom"
import NavbarPartFun from "../../components/NavbarPartnerFuneral";
import './partner.css'

const PartFunServDataHisDet = () => {
  const location=useLocation()
  const {packageName,category} = location.state
  return (
    <>
    <NavbarPartFun/>
      <div>
        <h1>
          This is Funeral Service Data History Page DETAIL for Partner
        </h1>
      </div>
      <table className="custom_table font_color">
          <thead>
            <tr>
              <th className="custom_rowName">Detail</th>
              <th className="custom_rowDesc"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="custom_cell">Package Name:</td>
              <td className="custom_cell">{packageName}</td>
            </tr>
            <tr>
              <td className="custom_cell">Category</td>
              <td className="custom_cell">n</td>
            </tr>
            <tr>
              <td className="custom_cell">Category Name</td>
              <td className="custom_cell">NONE</td>
            </tr>
            <tr>
              <td className="custom_cell">Price (Rp)</td>
              <td className="custom_cell">NONE</td>
            </tr>
            <tr>
              <td className="custom_cell">Category Name</td>
              <td className="custom_cell">NONE</td>
            </tr>
            <tr>
              <td className="custom_cell">Price (Rp)</td>
              <td className="custom_cell">NONE</td>
            </tr>
            <tr>
              <td className="custom_cell">Facility</td>
            </tr>
          </tbody>
        </table>
        <div>
          <img src=""/>
          <img src=""/>
          <img src=""/>
        </div>
    </>
  );
};

export default PartFunServDataHisDet;
