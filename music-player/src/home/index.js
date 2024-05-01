import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from "../components/sidebar";
import Library from "../screens/library";
import Player from "../screens/player";
import Profile from '../screens/profile';
import Feed from "../screens/feed";
import Favorites from "../screens/favorites";
import Login from "../screens/login"
import'./home.css'
import { setClientToken } from '../spotify';

export default function Home() {

    const [token, setToken] = useState("");

    useEffect(() => {
        const token = window.localStorage.getItem("token")
        const hash = window.location.hash;
        window.location.hash = ""
        if(!token && hash) {
        const _token = hash.split("&")[0].split("=")[1]
        window.localStorage.setItem("token", _token)
        setToken(_token)            
        setClientToken(_token)
        } else {
            setToken(token);
            setClientToken(token)
        }

    }, []);
    return !token ? (
        <Login /> 
    ) : (

        <Router>
            <div className="main-body">
       
            <Sidebar />
            <Routes>
           <Route path="/" element= {<Library />} /> 
           <Route path="/feed" element= {<Feed />} /> 
           <Route path="/profile" element= {<Profile />} /> 
           <Route path="/player" element= {<Player />} /> 
           <Route path="/favorites" element= {<Favorites />} /> 
           </Routes>
           </div>
            </Router>

    )
}

