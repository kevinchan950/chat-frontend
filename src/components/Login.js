import React, { useContext, useState } from 'react'
import axios from 'axios'
import { TokenContext } from '../App';
import { toast } from 'react-toastify'
import { Link, useHistory } from 'react-router-dom'
import { baseUrl, fade } from '../utils'


const Login = ({setIsLogin, setIsSignup}) => {
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const { setToken } = useContext(TokenContext)
    const history = useHistory()

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        
        let formData = new FormData()
        formData.append("username", username)
        formData.append("password", password)
        
        axios({
            method: "POST",
            url: `${baseUrl}api/v1/sessions/login`,
            data: formData
        })
        .then(response=>{
            if (response.data.token){
                localStorage.setItem("token", response.data.token)
                setToken(response.data.token)
                toast(response.data.message, {
                    autoClose:4000,
                    transition: fade,
                    hideProgressBar:true,
                    type: 'success'
                })
                setIsLogin(false)
                history.push("/")
            }
            if (response.data.error){
                toast(response.data.error, {
                    autoClose:4000,
                    transition: fade,
                    hideProgressBar:true,
                    type: 'error'
                })
            }
        })
    }

    const handleClose = () => {
        setIsLogin(false)
    }

    const handleSwap = () => {
        setIsLogin(false)
        setIsSignup(true)
    }

    const handleLoginUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleLoginPassword = (e) => {
        setPassword(e.target.value)
    }
    
    return(
        <>
            <div className="Form-container">
                <div className="Form-content">
                    <h1>Login Form</h1>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="form-group">
                            <label for="loginInputUsername">Username</label>
                            <input type='text' className='form-control' onChange={handleLoginUsername}></input>
                        </div>
                        <div className="form-group">
                            <label for="loginInputPassword">Password</label>
                            <input type='password' className='form-control' onChange={handleLoginPassword}></input>
                        </div>
                        <div className="small font-italic">
                            <span>Not a member? <Link onClick={handleSwap}>Signup Now!</Link> <i class="fas fa-arrow-circle-left"></i></span>
                        </div>
                        <div className="button-group">
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary mt-3"  style={{ width:"30%", borderRadius : "12px"}}>
                                    Login
                                </button>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-danger mt-3"  style={{ width:"30%", borderRadius : "12px"}} onClick={handleClose}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;