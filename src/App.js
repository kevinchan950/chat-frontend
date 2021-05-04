import 'bootstrap/dist/css/bootstrap.min.css'
import "react-toastify/dist/ReactToastify.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './App.css';
import { ToastContainer } from 'react-toastify'
import NavBar from './containers/NavBar'
import HomePage from './pages/HomePage';
import MainPage from './pages/MainPage'
import Footer from './containers/Footer'
import { Route } from 'react-router-dom'
import React, { useState } from 'react'
import MyProfile from './pages/MyProfile';
import UserProfile from './pages/UserProfile';
import Friendlist from './components/Friendlist';

function App() {
  
  const [token, setToken] = useState(localStorage.getItem("token"))

  return (
    <>
      <TokenContext.Provider value={{token, setToken}}>
        <ToastContainer />
        
        {
          token?
          <>
            <NavBar />
            <Friendlist />
            <Route exact path = "/">
              <MainPage />
            </Route>

            <Route exact path="/myprofile">
              <MyProfile />
            </Route>

            <Route exact path="/user/:id">
              <UserProfile />
            </Route>

            <Footer />
          </>
          :
          <>
            <Route exact path = "/">
              <HomePage />
              <Footer />
            </Route>
          </>
        }
      </TokenContext.Provider>
    </>
  );
}

export default App;
export const TokenContext = React.createContext()
