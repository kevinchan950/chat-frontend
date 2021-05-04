import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { fade, Loading } from '../utils'
import Login from '../components/Login'
import Signup from '../components/Signup'

const HomePage = () => {

    const [isLogin, setIsLogin] = useState(false)
    const [isSignup, setIsSignup] = useState(false)

    const handleLogin = () => {
        setIsLogin(true)
    }

    const handleSignup = () => {
        setIsSignup(true)
    }

    if (isLogin) {
        return <Login setIsLogin={setIsLogin} setIsSignup={setIsSignup}/>
    }

    if (isSignup) {
        return <Signup setIsLogin={setIsLogin} setIsSignup={setIsSignup}/>
    }

    return (
        <>
            <div style={{height:"95vh"}}>
                <div className="section-1 d-flex justify-content-center align-items-center" style={{height:"50vh", backgroundImage:"url(https://images.unsplash.com/photo-1552359129-456ccf2ffd52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2700&q=80)"}}>
                    <div className="show-message">
                        <a onClick={handleLogin}>Login <i class="fas fa-sign-in-alt"></i></a>
                    </div>
                </div>
                <div className="section-2 d-flex justify-content-center align-items-center" style={{height:"50vh", backgroundImage:"url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2706&q=80)"}}>
                    <div className="show-message">
                        <a onClick={handleSignup}>Signup <i class="fas fa-user-plus"></i></a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;