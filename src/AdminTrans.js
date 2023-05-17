import {Nav, NavLink, NavMenu } from "react-router-dom"
import NavbarAdmin from "./components/NavbarAdmin";
import { useState } from "react"
import { act } from "react-dom/test-utils";
// import data from "./mock-data.json"

const AdminTrans = () => {

    return (
        <>
            <NavbarAdmin/>
            {/* <section>
                <h1>Admins Page</h1>
                <br />
                <p>You must have been assigned an AdminTrans role.</p>

                <div className="flexGrow">
                    <Link to="/">Home</Link>
                </div>
            </section> */}
                <br/>
                <div style={{flexDirection:"row"}}>
                    <NavLink style={{color:"black",textDecoration:"none",paddingLeft:"4rem"}} 
                    to="/admin/transaction/funeral">Funeral Service</NavLink>
                    <NavLink style={{color:"black",textDecoration:"none",paddingLeft:"4rem"}} to="/admin/transaction/coffin">Coffin Service</NavLink>
                </div>
            
        </>
    )
}

export default AdminTrans
