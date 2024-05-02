import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Library from "./library";
import Player from "./player";
import Profile from './profile';
import Feed from "./feed";
import Favorites from "./favorites";

export default function Home() {
    return (
        <Router>
            <Routes>
           <Route path="/" element= {<Library />} /> 
           <Route path="/feed" element= {<Feed />} /> 
           <Route path="/profile" element= {<Profile />} /> 
           <Route path="/player" element= {<Player />} /> 
           <Route path="/favorites" element= {<Favorites />} /> 
           </Routes>
            </Router>

    )
}

