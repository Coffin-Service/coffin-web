import {Nav, NavLink, NavMenu } from "react-router-dom"
import NavbarAdmin from "../components/NavbarAdmin"
import { useState } from "react"
import { act } from "react-dom/test-utils";
import { Link } from "react-router-dom";
// import data from "./mock-data.json"

const Admin = () => {
    const [active,setActive]=useState(false);
    const handleClick=()=>{
        setActive(!active);
    };
    return (
        <>
            <NavbarAdmin/>
            <section>
                <h1>Admins Page</h1>
                <br />
                <p>You must have been assigned an Admin role.</p>

                <div className="flexGrow">
                    <Link to="/">Home</Link>
                </div>
            </section>
                {/* <br/>
                <div style={{flexDirection:"row"}}>
                    <NavLink onClick={handleClick} style={{color:"black",textDecoration:"none",paddingLeft:"4rem",fontWeight:active?"bold":"normal"}} 
                    to="/admin/transaction/funeral">Funeral Service</NavLink>
                    <NavLink style={{color:"black",textDecoration:"none",paddingLeft:"4rem"}} to="/admin/transaction/coffin">Coffin Service</NavLink>
                </div> */}
            
        </>
    )
}

export default Admin