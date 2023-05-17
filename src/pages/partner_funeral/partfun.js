import { Link } from "react-router-dom"
import NavbarPartnerFuneral from "../../components/NavbarPartnerFuneral"

const PartFun = () => {
    return (
        <>
            <NavbarPartnerFuneral/>
            <section>
                <h1>Partner Funeral Page</h1>
                <br />
                <p>You must have been assigned an Partner Funeral role.</p>
                <div className="flexGrow">
                    <Link to="/">Home</Link>
                </div>
            </section>
        </>
    )
}

export default PartFun
