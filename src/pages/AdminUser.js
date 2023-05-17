import { NavLink } from "react-router-dom"
import NavbarAdmin from "../components/NavbarAdmin"
// import data from "./mock-data.json"

const AdminAcc = () => {
    return (
        <>
            <NavbarAdmin/>
            {/* <section>
                <h1>Admins Accound Page</h1>
                <br />
                <p>You must have been assigned an Admin role.</p>
                <br/>
                <Link to="/admin/account_management/user">User</Link>
                <br/>
                <Link to="/admin/account_management/partner">Partner</Link>

                <div className="flexGrow">
                    <Link to="/">Home</Link>
                </div>
            </section> */}
            <div style={{flexDirection:"row"}}>
                    <NavLink style={{color:"black",textDecoration:"none",paddingLeft:"4rem"}} 
                    to="/admin/account_management/user">User</NavLink>
                    <NavLink style={{color:"black",textDecoration:"none",paddingLeft:"4rem"}} to="/admin/account_management/partner">Partner</NavLink>
                </div>
            
        </>
    )
}

export default AdminAcc
