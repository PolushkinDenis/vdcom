import React, { useState } from "react";
import './Login.css'
import { useDispatch } from "react-redux";
import {authSlice} from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const auth = () => {
        if(login !== "" && password !== "") {
            const userData = {
                login,
                password,
                auth: true
            }
            dispatch(authSlice.actions.login(userData))
            navigate('/clients')
        }
    }

    return (
        <div className="login">
            <h1>Logo</h1>
            <p>Welcome To CRM System</p>
            <p>Sign In To Your Account</p>
            <div className="form">
                <div className="form__login">
                    <span>Login</span>
                    <input type="text" onChange={e => setLogin(e.target.value)}></input>
                </div>
                <div className="form__login">
                    <span>Password</span>
                    <input type="password" onChange={e => setPassword(e.target.value)}></input>
                </div>
                <div className="form__button">
                    <button onClick={auth}>SIGN IN</button>
                </div>
            </div>
        </div>

    )
}

export default Login