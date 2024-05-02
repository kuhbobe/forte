import React from "react";
import "./albumInfo.css";

export default function AlbumInfo({ album }) {
  const artists = [];
  album?.artists?.forEach((element) => {
    artists.push(element.name);
  });

  return (
    <div className="albumInfo-card">
      <div className="albumName-container">
        <div className="marquee">
          <p>{album?.name && artists?.length > 0 ? `${album.name} - ${artists.join(", ")}` : ''}</p>
        </div>
      </div>
      <div className="album-info">
        <p>{album?.name && artists?.length > 0 ? `${album.name} is an ${album.album_type} by ${artists.join(", ")} with ${album.total_tracks} track(s)` : ''}</p>
      </div>
      <div className="album-release">
        <p>
          Release Date: {album?.release_date ? album.release_date : ''}
          {album?.release_date ? null : <span className="alt-text">(No release date available)</span>}
        </p>
      </div>
    </div>
  );
}
