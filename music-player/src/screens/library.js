import React, { useState, useEffect } from 'react';
import APIKit from '../spotify';
import './library.css';
import { IconContext } from 'react-icons';
import { AiFillPlayCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export default function Library() {
    const [playlists, setPlaylists] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPlaylists, setFilteredPlaylists] = useState(null);

    useEffect(() => {
        APIKit.get('me/playlists').then((response) => {
            setPlaylists(response.data.items);
        });
    }, []);

    useEffect(() => {
        if (playlists) {
            const filtered = playlists.filter((playlist) =>
                playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredPlaylists(filtered);
        }
    }, [searchQuery, playlists]);

    const navigate = useNavigate();
    const playPlaylist = (id) => {
        navigate('/player', { state: { id: id } });
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="screen-container">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search playlists..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            <div className="library-body">
                {filteredPlaylists && Array.isArray(filteredPlaylists) ? (
                    filteredPlaylists.map((playlist) => (
                        <div className="playlist-card" key={playlist.id} onClick={() => playPlaylist(playlist.id)}>
                            {playlist.images && Array.isArray(playlist.images) && playlist.images.length > 0 && (
                                <img src={playlist.images[0]?.url} className="playlist-image" alt="Playlist-Art" />
                            )}
                            <p className="playlist-title">{playlist.name}</p>
                            <p className="playlist-subtitle">{playlist.tracks.total} Songs</p>
                            <div className="playlist-fade">
                                <IconContext.Provider value={{ size: '50px', color: '#2d8fcf' }}>
                                    <AiFillPlayCircle />
                                </IconContext.Provider>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="loading-text">Loading playlists...</p>
                )}
            </div>
        </div>
    );
}
