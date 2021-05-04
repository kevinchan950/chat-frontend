import Loader from 'react-loader-spinner';
import { cssTransition } from 'react-toastify'

export const swirl = cssTransition({
    enter: "swirl-in-fwd",
    exit: "swirl-out-bck"
});

export const fade = cssTransition({
    enter: "fade-in",
    exit: "fade-out"
})

export const Loading = () => {
    return (
        <>
            <div style={{position:"absolute", top:"50vh", left:"50vw"}}>
                <Loader 
                    type="ThreeDots"
                    color="#1E90FF"
                />  
            </div>
        </>
    )
}

export const baseUrl = 'http://127.0.0.1:5000/'