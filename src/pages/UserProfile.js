import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { baseUrl, fade, Loading } from '../utils';
import Image from 'react-graceful-image'
import { TokenContext } from '../App';
import { toast } from 'react-toastify';

const UserProfile = () => {
    
    const { id } = useParams()
    const { token } = useContext(TokenContext)
    const [user, setUser] = useState([])
    const [isRequest, setIsRequest] = useState(null)
    const [isFriend, setIsFriend] = useState(null)

    const [isLoading, setIsLoading] = useState(true)

    const handleAddFriend = () => {
        let formData = new FormData()
        formData.append("id", id)

        axios({
            method:"POST",
            url: `${baseUrl}api/v1/requests/new`,
            headers: {
                Authorization : `Bearer ${token}`
            },
            data: formData
        })
        .then(response=>{
            if (response.data.message){
                toast(`${response.data.message}`,{
                    autoClose:4000,
                    transition:fade,
                    hideProgressBar:true,
                    type:"success"
                })
                setIsRequest(true)
            }
            if (response.data.error){
                toast(`${response.data.error}`,{
                    autoClose:4000,
                    transition:fade,
                    hideProgressBar:true,
                    type:"error"
                }) 
            }
        })
    }

    useEffect(()=>{
        axios({
            method: "GET",
            url: `${baseUrl}api/v1/users/${id}`,
        })
        .then(response=>{
            setUser(response.data.data)
        })
    },[id])

    useEffect(()=>{

        axios({
            method: "GET",
            url: `${baseUrl}api/v1/requests/check/${id}`,
            headers:{
                Authorization : `Bearer ${token}`
            }
        })
        .then(response=>{
            console.log(response)
            setIsRequest(response.data.exist)
            setIsLoading(false)
        })
    },[id])

    useEffect(()=>{
        axios({
            method:"GET",
            url: `${baseUrl}api/v1/friends/check/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response=>{
            setIsFriend(response.data.is_friend)
        })
    },[id])
    
    if (isLoading){
        return <Loading />
    }

    return(
        <>
            <div className="container-fluid" style={{height:"90vh"}}>
                <div className="row" style={{height:"100%"}}>
                    <div className="col-lg-4 my-auto">
                        <Image src={user.profile_picture} style={{borderRadius:"50%", width:"100%"}}/>
                        <h1 className="text-center mt-5">{user.username}</h1>
                        <h3 className="text-center mt-5">Email: {user.email}</h3>
                        {
                            isRequest?
                            <>
                                <div className="text-center mt-4">
                                    <button className="btn btn-secondary">Friend Request Sent</button>
                                </div>
                            </>
                            :
                            <>
                            </>
                        }
                        {
                            isFriend?
                            <>
                                <div className="text-center mt-4">
                                    <button className="btn btn-danger">Unfriend</button>
                                </div>
                            </>
                            :
                            <>
                            </>
                        }
                        {
                            !isRequest && !isFriend ?
                            <>
                                <div className="text-center mt-4">
                                    <button className="btn btn-primary" onClick={handleAddFriend}>Add Friend</button>
                                </div>
                            </>
                            :
                            <>
                            </>
                        }        
                    </div>
                    <div className="col-lg-5 mt-5 ml-5">
                        <h1>Info:</h1>
                        <p>lorem Ipsum</p>
                        <hr style={{border:"3px outset"}}/>
                        <h1>Hobby:</h1>
                        <p>lorem Ipsum</p>
                        <hr style={{border:"3px outset"}}/>
                        <h1>Interest:</h1>
                        <p>lorem Ipsum</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;