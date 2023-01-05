import React, {useState}from "react";
import logo from '../picture/Logo.png';

export const Login = (props) => {
    const[email,setEmail]=useState('');
    const[pass,setPass]=useState('');

    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log(email);
    }
    return(
        <div className="auth-form-container">
            <form className="login-form">
                <img src={logo} width="200" height="200"/>
                <label className="label-form" htmlFor="email">Email</label>
                <input className="input-form" size="30" value={email} onChange={(e)=>setEmail(e.target.value)} type ="email" placeholder="myemail@gmail.com" id="email" name="email"/>
                <label className="label-form" htmlFor="password">Password</label>
                <input className="input-form" value={pass} onChange={(e)=>setPass(e.target.value)} type ="password" placeholder="******" id="password" name="password"/>
                <button className="login-btn" type="submit" onClick={()=>{props.onFormSwitch('admin')}}>Login</button>
            </form>
            <button className="link-btn" onClick={()=>{props.onFormSwitch('register')}}>Don't have an account?<br/> Register here</button>
        </div>
    )
}