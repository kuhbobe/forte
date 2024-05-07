import React, { useEffect, useState } from 'react';
import './player.css';
import { useLocation } from 'react-router-dom';
import apiClient from '../spotify';
import SongCard from '../components/songCard';
import Queue from "../components/queue";
import AudioPlayer from "../components/audioPlayer";
import Widgets from "../components/widgets";

export default function Player() {
    const location = useLocation();
    const [tracks, setTracks] = useState([]);
    const [currentTrack, setCurrentTrack] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
  // from feed
    useEffect(() => {
        if (location.state && location.state.id) {
            apiClient
                .get("browse/categories/" + location.state.id + "/playlists", {
                    params: {
                        limit: 1 // You can adjust the limit as needed
                    }
                })
                .then((res) => {
                    const playlistId = res.data.playlists.items[0].id;
                    return apiClient.get("playlists/" + playlistId + "/tracks");
                })
                .then((res) => {
                    setTracks(res.data.items);
                    setCurrentTrack(res.data?.items[0]?.track);
                })
                .catch((error) => {
                    console.error('Error fetching playlist tracks:', error);
                });
        }
    }, [location.state]);
  
// from playlists
    useEffect(() => {
      if (location.state && location.state.id) {
          apiClient
              .get("playlists/" + location.state.id + "/tracks")
              .then((res) => {
                  setTracks(res.data.items);
                  setCurrentTrack(res.data?.items[0]?.track);
              })
              .catch((error) => {
                  console.error('Error fetching playlist tracks:', error);
              });
      }
  }, [location.state]);

// From Liked Songs
useEffect(() => {
  if (location.state && location.state.id) {
      apiClient
          .get("tracks/" + location.state.id)
          .then((res) => {
              // Wrap the fetched track data in an array to match the format of playlist tracks
              const trackData = [{ track: res.data }];
              setTracks(trackData);
              setCurrentTrack(res.data);
          })
          .catch((error) => {
              console.error('Error fetching track:', error);
          });
  }
}, [location.state]);




  
    useEffect(() => {
        setCurrentTrack(tracks[currentIndex]?.track);
    }, [currentIndex, tracks]);
  
    return (
        <div className="screen-containe flex">
            <div className="left-player-body">
                <AudioPlayer
                    currentTrack={currentTrack}
                    total={tracks}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                />
                <Widgets artistID={currentTrack?.album?.artists[0]?.id} />
            </div>
            <div className="right-player-body">
                <SongCard album={currentTrack?.album} />
                <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
            </div>
        </div>
    );
}
