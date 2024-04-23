import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from "../components/sidebar";
import Library from "../screens/library";
import Player from "../screens/player";
import Trending from "../screens/trending";
import Feed from "../screens/feed";
import Favorites from "../screens/favorites";
import'./home.css'

export default function Home() {
    return (
        <Router>
            <div className="main-body">
            <Sidebar />
            <Routes>
           <Route path="/" element= {<Library />} /> 
           <Route path="/feed" element= {<Feed />} /> 
           <Route path="/trending" element= {<Trending />} /> 
           <Route path="/player" element= {<Player />} /> 
           <Route path="/favorites" element= {<Favorites />} /> 
           </Routes>
           </div>
            </Router>

    )
}

