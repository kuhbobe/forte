import React, { useEffect, useState } from "react";
import "./sidebar.css";
import SidebarButton from "./sidebarButton";
import { MdFavorite } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { TbCircleLetterF } from "react-icons/tb";
import apiClient, { clearAccessToken } from "../../spotify";
import profileImage from "./f-logo.jpeg"; // Update the path as per your folder structure


export default function Sidebar() {
  const [image, setImage] = useState("https://picsum.photos/536/354");

  useEffect(() => {
    apiClient.get("me").then((response) => {
      setImage(response.data.images[0].url);
    });
  }, []);

  const handleSignOut = () => {
    clearAccessToken();
    window.location.reload();
  };

  return (
    <div className="sidebar-container">
      <div className="logo-icon">
      <img src={profileImage} className="logo-img" alt="logo" />
      </div>
      <div>
        <SidebarButton title="" to="/profile" icon={<img src={image} className="profile-icon" alt="profile" />} />
        <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard />} />
        <SidebarButton title="Player" to="/player" icon={<FaPlay />} />
        <SidebarButton title="Favorites" to="/favorites" icon={<MdFavorite />} />
        <SidebarButton title="Library" to="/" icon={<IoLibrary />} />
      </div>
      <SidebarButton title="Sign out" onClick={handleSignOut} icon={<FaSignOutAlt />} />
    </div>
  );
}
