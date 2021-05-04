import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from '../App';
import Image from 'react-graceful-image'
import { baseUrl, fade, Loading } from '../utils';
import { toast } from 'react-toastify';

const MyProfile = () => {
    
    const { token } = useContext(TokenContext)
    const [user, setUser] = useState([])
    const [friendRequest, setFriendRequest] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    const handleAcceptRequest = (e) => {

        const checkIndex = () => {
            return {"id": e.target.value}
        }
        
        let index = friendRequest.findIndex(checkIndex)
        let first_part = friendRequest.slice(0,index)
        let second_part = friendRequest.slice(index+1)
        let new_friendRequest = first_part.concat(second_part)

        let formData = new FormData()
        formData.append("id", e.target.value)

        axios({
            method:"POST",
            url: `${baseUrl}api/v1/friends/new`,
            headers:{
                Authorization: `Bearer ${token}`
            },
            data: formData
        })
        .then(response=>{
            if (response.data.message){
                toast(`${response.data.message}`,{
                    autoClose:4000,
                    transition: fade,
                    hideProgressBar:true,
                    type:"success"
                })
                setFriendRequest(new_friendRequest)
            }
            if (response.data.error){
                toast(`${response.data.error}`,{
                    autoClose:4000,
                    transition: fade,
                    hideProgressBar:true,
                    type:"error"
                }) 
            }
        })
    }

    const handleDeclineRequest = (e) => {
        const checkIndex = () => {
            return {"id": e.target.value}
        }
        
        let index = friendRequest.findIndex(checkIndex)
        let first_part = friendRequest.slice(0,index)
        let second_part = friendRequest.slice(index+1)
        let new_friendRequest = first_part.concat(second_part)

        let formData = new FormData()
        formData.append("id", e.target.value)

        axios({
            method:"POST",
            url: `${baseUrl}api/v1/requests/delete`,
            headers:{
                Authorization: `Bearer ${token}`
            },
            data: formData
        })
        .then(response=>{
            if (response.data.message){
                toast(`${response.data.message}`,{
                    autoClose:4000,
                    transition: fade,
                    hideProgressBar:true,
                    type:"success"
                })
                setFriendRequest(new_friendRequest)
            }
            if (response.data.error){
                toast(`${response.data.error}`,{
                    autoClose:4000,
                    transition: fade,
                    hideProgressBar:true,
                    type:"error"
                }) 
            }
        })
    }

    useEffect(()=>{
        axios({
            method: "GET",
            url: `${baseUrl}api/v1/users/me`,
            headers: {
                Authorization : `Bearer ${token}`
            }
        })
        .then(response=>{
            setUser(response.data.data)
        })
    },[])
    
    useEffect(()=>{      
        axios({
            method:"GET",
            url: `${baseUrl}api/v1/requests/show/me`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(resp=>{
            setFriendRequest(resp.data.data)
            setIsLoading(false)
        })
    },[])
    

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
                        <div className="dropdown text-center mt-4">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownRequestButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Friend Request</button>
                            <div className="dropdown-menu" aria-labelledby="dropdownRequestButton">
                                {
                                    friendRequest.length != 0 ?
                                    
                                        friendRequest.map((f)=>{
                                            return(
                                                <>
                                                    <div className="d-flex justify-content-between mt-2">
                                                        <div className="dropdown-item">{f.name}</div>
                                                        <div className="d-flex">
                                                            <button className="btn btn-sm btn-success mr-2" value={f.id} onClick={handleAcceptRequest}>Accept</button>
                                                            <button className="btn btn-sm btn-danger mr-2" value={f.id} onClick={handleDeclineRequest}>Decline</button>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })
                    
                                    :
                                    <div className="dropdown-item">Currently there is no friend request.</div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mt-5 ml-5">
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

export default MyProfile;