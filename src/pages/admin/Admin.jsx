import React, {useState}from "react";

import NavbarAdmin from "../../components/NavbarAdmin";

export const  Admin = (props) => {
    const[email,setEmail]=useState('');
    const[pass,setPass]=useState('');

    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log(email);
    }
    return(
        <div>
            this is admin page
        </div>
    )
}