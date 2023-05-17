import { Link } from "react-router-dom"
import NavbarPartnerCoffin from "../../components/NavbarPartnerCoffin"

const PartCof = () => {
    return (
        <>
            <NavbarPartnerCoffin/>
            <section>
                <h1>Partner Coffin Page</h1>
                <br />
                <p>You must have been assigned an Partner Coffin role.</p>
                <div className="flexGrow">
                    <Link to="/">Home</Link>
                </div>
            </section>
        </>
    )
}

export default PartCof
