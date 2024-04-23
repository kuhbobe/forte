import React from "react";
import "./sidebar.css";
import SidebarButton from "./sidebarButton"

export default function Sidebar() {
    return (

            <div className="sidebar-container">
                <img
                    src="https://picsum.photos/536/354"
                    className="profile-img"
                    alt="profile"
                />
            <div>
                <SidebarButton title="" to="" icon={}/>
                <SidebarButton />
                <SidebarButton />
                <SidebarButton />
                <SidebarButton />
            </div>
            <SidebarButton />
            </div>
    );
}
