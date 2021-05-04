import React, { useContext, useState } from 'react'
import { TokenContext } from '../App';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import { fade, baseUrl } from '../utils';
import axios from 'axios';

const Modal = () => {
    
    const { token, setToken } = useContext(TokenContext)

    const history = useHistory()

    const [isLogin, setIsLogin] = useState(false)
    const [isSignup, setIsSignup] = useState(false)

    const handleLogin = () => {
        setIsLogin(true)
    }

    const handleSignup = () => {
        setIsSignup(true)
    }

    const handleLogout = () => {
        axios({
            method:"POST",
            url: `${baseUrl}api/v1/sessions/logout`,
            headers:{
                Authorization : `Bearer ${token}`
            }
        })
        .then(response=>{
            localStorage.clear()
            setToken(localStorage.getItem("token"))
            toast(response.data.message,{
                autoClose: 4000,
                transition: fade,
                hideProgressBar:true,
                type: 'success'
            })
            history.push("/")
        })
    }

    if (isLogin) {
        return <Login setIsLogin={setIsLogin} setIsSignup={setIsSignup}/>
    }

    if (isSignup) {
        return <Signup setIsLogin={setIsLogin} setIsSignup={setIsSignup}/>
    }

    return(
        <>
            <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Account
            </a>
            {
                token?
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="/myprofile">My Profile</a>
                <div className="dropdown-divider"></div>
                    <a className="dropdown-item" onClick={handleLogout}>Logout</a>
                </div>
                :
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" onClick={handleLogin}>Login</a>
                <div className="dropdown-divider"></div>
                    <a className="dropdown-item" onClick={handleSignup}>Signup</a>
                </div>
            }
        </>
    );
};

export default Modal