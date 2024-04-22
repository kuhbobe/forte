import React from 'react';
import '../dashboard.css'; // Import CSS file for styling

const DashboardPage = () => {
    return (
        <div className="dashboard-page">
            {/* Header */}
            <header className="header">
                <h1>Forte</h1>
                {/* Navigation, user profile, etc. */}
            </header>

            {/* Search */}
            <section className="search-section">
                <input type="text" placeholder="Search..." className="search-bar" />
            </section>

            {/* dashboard Content */}
            <div className="dashboard-content">
                {/* Featured Content */}
                <section className="section">
                    <h2>Featured Playlists</h2>
                    <div className="content">
                        {/* Featured playlists */}
                        <div className="playlist">
                            <img src="https://via.placeholder.com/150" alt="Playlist Cover" />
                            <p>Playlist Name</p>
                        </div>
                        <div className="playlist">
                            <img src="https://via.placeholder.com/150" alt="Playlist Cover" />
                            <p>Playlist Name</p>
                        </div>
                        {/* Add more playlists as needed */}
                    </div>
                </section>

                {/* Recommended Content */}
                <section className="section">
                    <h2>Recommended Albums</h2>
                    <div className="content">
                        {/* Recommended albums */}
                        <div className="album">
                            <img src="https://via.placeholder.com/150" alt="Album Cover" />
                            <p>Album Name</p>
                            <p>Artist Name</p>
                        </div>
                        <div className="album">
                            <img src="https://via.placeholder.com/150" alt="Album Cover" />
                            <p>Album Name</p>
                            <p>Artist Name</p>
                        </div>
                        {/* Add more albums as needed */}
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2024 Forte</p>
            </footer>
        </div>
    );
}

export default DashboardPage;