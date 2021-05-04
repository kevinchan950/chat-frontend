import Modal from './Modal';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../utils'
import { TokenContext } from '../App';


const NavBar = () => {
    
    const { token } = useContext(TokenContext)

    const [searchTimeoutID, setSearchTimeoutID] = useState(0)
    const [searchResult, setSearchResult] = useState([])
    const [searchMessage, setSearchMessage] = useState(null)

    const handleFilterSearch = (e) => {
        if (e.target.value ==""){
            setSearchMessage(null)
            setSearchResult([])
        }
        else {
            clearTimeout(searchTimeoutID)
            const newSearchTimeoutID = setTimeout(()=>{
                axios({
                    method: "GET",
                    url : `${baseUrl}api/v1/users/search=${e.target.value}`,
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                })
                .then(response=>{
                    if (response.data.data){
                        setSearchMessage(null)
                        setSearchResult(response.data.data)
                    }
                    else if (response.data.error){
                        setSearchResult([])
                        setSearchMessage(response.data.error)
                    }
                })
            }, 1500)
            setSearchTimeoutID(newSearchTimeoutID)
        }
    }
    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-theme sticky-top">
                <a className="navbar-brand text-white" href="/"><i class="fas fa-comment"></i> Chat</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active dropdown">
                            <Modal />
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" placeholder="Search for user" aria-label="Search" onKeyUp={handleFilterSearch}/>
                            {
                                searchResult.length == 0?
                                undefined
                                :
                                <div className="search-container">
                                {
                                    searchResult.map((s)=>{
                                        return(
                                            <div>
                                                <a href={`/user/${s.id}`}>{s.username}</a>
                                            </div>
                                        )
                                    })
                                }
                                </div>
                            }
                            {
                                searchMessage ?
                                <div className="search-container">
                                    <a>{searchMessage}</a>
                                </div>
                                :
                                <>
                                </>
                            }
                    </form>
                </div>
            </nav>
        </>
    );
};

export default NavBar;