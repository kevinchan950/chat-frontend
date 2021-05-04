import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from '../App';
import { baseUrl } from '../utils';

const Friendlist = () => {
    
    const { token } = useContext(TokenContext)
    const [friends, setFriends] = useState([])

    useEffect(()=>{
        axios({
            method:"GET",
            url: `${baseUrl}api/v1/friends/me`,
            headers: {
                Authorization : `Bearer ${token}`
            }
        })
        .then(response=>{
            setFriends(response.data.data)
        })
    },[])

    return(
        <>
            <div className="friend-list">
            <i class="fas fa-arrow-right"></i>Hover me  
                <div className="friend-list-content mt-2">
                    Friends:
                    <ul>
                    {
                        friends.length == 0?
                        <>
                            <h1>Currently there is no friend.</h1>
                        </>
                        :
                            friends.map((f)=>{
                                return(
                                    <>
                                        <li><a>{f.name}</a></li>
                                        {
                                            f.is_online?
                                            <p className="small font-italic text-success">Online</p>
                                            :
                                            <p className="small font-italic text-secondary">Offline</p>
                                        }
                                    </>
                                )
                            })
                    }
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Friendlist;