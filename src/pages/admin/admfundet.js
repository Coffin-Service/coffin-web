import React, {useState, Component} from "react"
import { Link,  useLocation, useParams } from "react-router-dom"
import NavbarAdmin from "../../components/NavbarAdmin";

const AdmFunDetail = () => {
  const location=useLocation()
  const {transNo,transDate} = location.state
  return (
    <>
      <NavbarAdmin/>
      <div>
        <h1>
          This is Admin Funeral Transaction Detail
        </h1>
        {/* <idTrans.Consumer>
          {(trans)=>{
          // return <p>trans No: {trans}</p>;
          console.log(trans);
          }}
        </idTrans.Consumer> */}
        {/* <div>user id: {transNo}</div> */}
        <table>
          <thead>
            <tr>
              <th>Detail</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Funeral Name:</td>
              <td>NONE</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>NONE</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </td>
            </tr>
            <tr>
              <td>Package Name</td>
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
              <td>Transaction No.</td>
              <td>{transNo}</td>
            </tr>
            <tr>
              <td>Transaction At</td>
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

export default AdmFunDetail;
