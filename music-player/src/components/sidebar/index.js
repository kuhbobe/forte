// Sidebar.js

import React, { useEffect, useState } from "react";
import "./sidebar.css";
import SidebarButton from "./sidebarButton";
import { MdFavorite } from "react-icons/md";
import { FaGripfire, FaPlay } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import apiClient, { clearAccessToken } from "../../spotify"; // Import clearAccessToken function

export default function Sidebar() {
  const [image, setImage] = useState("https://picsum.photos/536/354");

  useEffect(() => {
    apiClient.get("me").then((response) => {
      setImage(response.data.images[0].url);
    });
  }, []);

  const handleSignOut = () => {
    clearAccessToken(); // Call clearAccessToken function to sign out
    // You can also perform any other necessary sign-out actions here
    // For example, redirecting the user to the login page
    window.location.reload();
  };

  return (
    <div className="sidebar-container">
      <img src={image} className="profile-img" alt="profile" />
      <div>
        <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard />} />
        <SidebarButton title="Profile" to="/profile" icon={<FaGripfire />}/>
        <SidebarButton title="Player" to="/player" icon={<FaPlay />} />
        <SidebarButton
          title="Favorites"
          to="/favorites"
          icon={<MdFavorite />}
        />
        <SidebarButton title="Library" to="/" icon={<IoLibrary />} />
      </div>
      <SidebarButton
        title="Sign out"
        onClick={handleSignOut}
        icon={<FaSignOutAlt />}
      />
    </div>
  );
}
