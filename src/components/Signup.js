import React, { useState, useContext } from 'react'
import { TokenContext } from '../App'
import { Link, useHistory} from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { swirl, baseUrl } from '../utils'

const Signup = ({setIsLogin, setIsSignup}) => {
    
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isValidateUsername, setIsValidateUsername] = useState(false)
    const [isValidateEmail, setIsValidateEmail] = useState(false)
    const [isValidatePassword, setIsValidatePassword] = useState(false)

    const [usernametimeoutID, setUsernameTimeoutID] = useState(0)
    const [emailtimeoutID, setEmailTimeoutID] = useState(0)
    const [passwordtimeoutID, setPasswordTimeoutID] = useState(0)

    const {setToken} = useContext(TokenContext)
    const history = useHistory()

    const handleSignupSubmit = (e) => {
        e.preventDefault()
        
        let formData = new FormData()
        formData.append("username", username)
        formData.append("email", email)
        formData.append("password", password)
        
        axios.post(`${baseUrl}api/v1/sessions/signup`,formData)
        .then(response=>{
            localStorage.setItem("token", response.data.token)
            setToken(response.data.token)
            toast("Signup Successful!",{
                autoClose:4000,
                transition: swirl,
                hideProgressBar:true,
                type:"success"
            })
            setIsSignup(false)
            history.push("/")
        })
    }

    const handleSwap = () => {
        setIsLogin(true)
        setIsSignup(false)
    }

    const handleClose = () => {
        setIsSignup(false)
    }

    const handleSignupUsername = (e) => {
        checkValidateUsername(e.target.value)
        setUsername(e.target.value)
    }

    const handleSignupEmail = (e) => {
        checkValidateEmail(e.target.value)
        setEmail(e.target.value)
    }

    const handleSignupPassword = (e) => {
        checkValidatePassword(e.target.value)
        setPassword(e.target.value)
    }

    const checkValidateEmail = (email) => {
        clearTimeout(emailtimeoutID)
        if(email.trim().length == 0){
            toast("Email cannot be blank!", {
                autoClose:4000,
                transition: swirl,
                hideProgressBar:true,
                type:"error"
            })
        setIsValidateEmail(false)
        }
        else{
            const newEmailTimeoutID = setTimeout(()=>{
                axios.get(`${baseUrl}api/v1/sessions/signup/checkemail=` + email)
                .then(response=>{
                    if (response.data.exist){
                        toast("Email has been registered!",{
                            autoClose:4000,
                            transition: swirl,
                            hideProgressBar:true,
                            type: "error"
                        })
                        setIsValidateEmail(false)
                    }
                    else if (!response.data.exist && email.match(/\w+@\w+.\w+/)){
                        setIsValidateEmail(true)
                    }
                    else{
                        toast("Email format is incorrect!",{
                            autoClose:4000,
                            transition: swirl,
                            hideProgressBar:true,
                            type:"error"
                        })
                        setIsValidateEmail(false)
                    }
                })
            },2000)
            setEmailTimeoutID(newEmailTimeoutID)    
        }
    }

    const checkValidateUsername = (username) => {
        clearTimeout(usernametimeoutID)
        if(username.trim().length == 0){
            toast("Username cannot be blank!", {
                autoClose:4000,
                transition: swirl,
                hideProgressBar:true,
                type:"error"
            })
            setIsValidateUsername(false)
        }
        else if (username.trim().length < 8){
            const newUsernameTimeoutID = setTimeout(()=>{
                toast("Username must have at least 8 characters!",{
                    autoClose:4000,
                    transition: swirl,
                    hideProgressBar:true,
                    type:"error"
                })
                setIsValidateUsername(false)
            },1000)
            setUsernameTimeoutID(newUsernameTimeoutID)
        }
        else{
            const newUsernameTimeoutID = setTimeout(()=>{
                axios.get(`${baseUrl}api/v1/sessions/signup/checkusername=` + username)
                .then(response=>{
                    if (response.data.exist){
                        toast("Username has been registered!",{
                            autoClose:4000,
                            transition: swirl,
                            hideProgressBar:true,
                            type:"error"
                        })
                        setIsValidateUsername(false)
                    }
                    else {
                        setIsValidateUsername(true)
                    }
                })
            },2000)
            setUsernameTimeoutID(newUsernameTimeoutID)
        }
    }

    const checkValidatePassword = (password) => {
        clearTimeout(passwordtimeoutID)
        if(password.trim().length == 0){
            toast("Password cannot be blank!", {
                autoClose:4000,
                transition: swirl,
                hideProgressBar:true,
                type:"error"
            })
            setIsValidatePassword(false)
        }
        else if (password.trim().length < 8){
            const newPasswordTimeoutID = setTimeout(()=>{
                toast("Password must have at least 8 characters!",{
                    autoClose:4000,
                    transition: swirl,
                    hideProgressBar:true,
                    type:"error"
                })
                setIsValidatePassword(false)
            }, 1000)
            setPasswordTimeoutID(newPasswordTimeoutID)
        }
        else if (password.match(/[A-Z]/g) && password.match(/[a-z]/g) && password.match(/\d/g) && password.match(/\w+/g)){
            const newPasswordTimeoutID = setTimeout(()=>{
            }, 500)
            setIsValidatePassword(true)
            setPasswordTimeoutID(newPasswordTimeoutID)
        }
        else {
            const newPasswordTimeoutID = setTimeout(()=>{
                toast("Password need at least one uppercase, one lowercase, one digit and one special character!",{
                    autoClose:4000,
                    transition: swirl,
                    hideProgressBar:true,
                    type:"error"
                })
                setIsValidatePassword(false)
            }, 1000)
            setPasswordTimeoutID(newPasswordTimeoutID)
        }
    }
    
    const checkForm = () =>{
        if (isValidateEmail && isValidatePassword && isValidateUsername){
            return false
        }
        else {
            return true
        }
    }

    return (
        <>
            <div className="Form-container">
                <div className="Form-content">
                    <h1>Signup Form</h1>
                    <form onSubmit={handleSignupSubmit}>
                        <div className="form-group">
                            <label for="loginSignupUsername">Username</label>
                            <input type='text' className='form-control' onChange={handleSignupUsername}></input>
                        </div>
                        <div className="form-group">
                            <label for="loginSignupEmail">Email</label>
                            <input type='email' className='form-control' onInput={handleSignupEmail}></input>
                        </div>
                        <div className="form-group">
                            <label for="loginSignupPassword">Password</label>
                            <input type='password' className='form-control' onChange={handleSignupPassword}></input>
                        </div>
                        <div className="small font-italic">
                            <span>Already a member? <Link onClick={handleSwap}>Login Now!</Link> <i class="fas fa-arrow-circle-left"></i></span>
                        </div>
                        <div className="button-group">
                            <div className="text-center btn-signup">
                                <button className="btn btn-primary mt-3" disabled={checkForm()} style={{ width:"30%", borderRadius : "12px"}}>
                                    Signup
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

export default Signup;