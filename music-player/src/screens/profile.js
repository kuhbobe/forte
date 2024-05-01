import React, { useState, useEffect } from 'react';
import APIKit from '../spotify';
import './profile.css';

export default function Profile() {
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await APIKit.get('me');
            setUserProfile(response.data);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    return (
        <div className='screen-container'>
            <div className='lib-body'>
                {userProfile ? (
                    <div className="user-profile">
                        {userProfile.images && userProfile.images.length > 0 && (
                            <img src={userProfile.images[0].url} alt="Profile" className="profile-image" />
                        )}
                        <p className="profile-name">{userProfile.display_name ? userProfile.display_name : 'No Display Name'}</p>
                        {userProfile.email && (
                            <p className="profile-email">{userProfile.email}</p>
                        )}
                        {userProfile.country && (
                            <p className="profile-country">{userProfile.country}</p>
                        )}
                        {userProfile.followers && (
                            <p className="profile-followers">Followers: {userProfile.followers.total}</p>
                        )}
                        {userProfile.product && (
                            <p className="profile-product">Subscription: {userProfile.product}</p>
                        )}
                        {userProfile.external_urls && (
                            <a href={userProfile.external_urls.spotify} className="profile-spotify-url" target="_blank" rel="noopener noreferrer">Spotify Profile</a>
                        )}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}
