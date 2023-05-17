import { Link } from "react-router-dom"
import NavbarPartnerCoffin from "../components/NavbarPartnerCoffin"
import NavbarPartnerFuneral from "../components/NavbarPartnerFuneral"

const Partner = () => {
    return (
        <section>
            <h1>Partner Page</h1>
            <br />
            <p>You must have been assigned an Partner role.</p>
            <br />
            <Link to="/partner/coffin">Go to the Partner-Cof page</Link>
            <br />
            <Link to="/partner/funeral">Go to the Partner-Funeral page</Link>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Partner
