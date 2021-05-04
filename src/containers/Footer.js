import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className="container-fluid fixed-bottom bg-theme text-white" style={{height:"5vh"}}>
                <div className="text-center">
                <i class="fas fa-comment"></i> Chat
                </div>
                <div className="text-center">
                    Copyright <i class="far fa-copyright"></i> 2021 All Rights Reserved
                </div>
            </footer>
        </>
    );
};

export default Footer;