import React, {useState}from "react";
import logo from '../picture/Logo.png';

export const Register = (props) => {
    const[email,setEmail]=useState('');
    const[pass,setPass]=useState('');
    const[name,setName]=useState('');

    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log(email);
    }

    return(
        <div className="auth-form-container">
            <form className="register-form">
                <img src={logo} width="200" height="200"/>
                <label className="label-form" htmlFor="name">Name</label>
                <input className="input-form" size="30"value={name} onChange={(e)=>setName(e.target.value)} placeholder="Sarah" id="name" name="name"/>
                <label className="label-form" htmlFor="email">Email</label>
                <input className="input-form" value={email} onChange={(e)=>setEmail(e.target.value)} type ="email" placeholder="myemail@gmail.com" id="email" name="email"/>
                <label className="label-form" htmlFor="password">Password</label>
                <input className="input-form" value={pass} onChange={(e)=>setPass(e.target.value)} type ="password" placeholder="******" id="password" name="password"/>
                <label className="label-form" htmlFor="partner">Partner</label>
                <div className="label-form">
                    <input type="radio" value="funeral" id="funeral" name="funeral"/>
                    <label htmlFor="funeral">Funeral Service</label>
                </div>
                <div className="label-form">
                    <input type="radio" value="coffin" id="partner" name="coffin"/>
                    <label htmlFor="partner">Coffin Service</label>
                </div>
                <button className="login-tbn" type="submit">Register</button>
            </form>
            <button className="link-btn" onClick={()=>{props.onFormSwitch('login')}}>Already an account?<br/> Login here</button>
        </div>
    )
}