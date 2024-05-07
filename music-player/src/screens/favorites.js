import React, { useState, useEffect } from 'react';
import APIKit from '../spotify';
import './favorites.css';
import { IconContext } from 'react-icons';
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

export default function Library() {
    const [likedSongs, setLikedSongs] = useState([]);

    useEffect(() => {
        const fetchLikedSongs = async (offset = 0, limit = 50) => {
            try {
                const response = await APIKit.get('me/tracks', {
                    params: {
                        limit: limit,
                        offset: offset
                    }
                });
                const newLikedSongs = response.data.items;
                setLikedSongs(prevLikedSongs => [...prevLikedSongs, ...newLikedSongs]);
                if (response.data.next) {
                    fetchLikedSongs(offset + limit, limit);
                }
            } catch (error) {
                console.error('Error fetching liked songs:', error);
            }
        };

        fetchLikedSongs();
    }, []); // <- Empty dependency array signifies that this effect runs only once on mount

    const navigate = useNavigate();
    const playSong = (id) => {
        navigate('/player', { state: { id: id } });
    }

    return (
        <div className='screen-container'>
            <div className='library-body'>
                {likedSongs && likedSongs.length > 0 ? (
                    <ul className="song-list">
                        {likedSongs.map((song) => (
                            <li key={song.track.id} className="song-item" onClick={() => playSong(song.track.id)}>
                                <div className="song-info">
                                    {song.track.album.images && Array.isArray(song.track.album.images) && song.track.album.images.length > 0 && (
                                        <img src={song.track.album.images[0]?.url} className="song-image" alt="Song-Art" />
                                    )}
                                    <div className="song-details">
                                        <p className="song-title">{song.track.name}</p>
                                        <p className="song-subtitle">{song.track.artists.map(artist => artist.name).join(', ')}</p>
                                    </div>
                                </div>
                                <div className="song-actions">
                                    <IconContext.Provider value={{ size: "20px", color: "#2d8fcf" }}>
                                        <AiFillPlayCircle />
                                    </IconContext.Provider>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="loading-text">Loading liked songs...</p>
                )}
            </div>
        </div>
    );
}
