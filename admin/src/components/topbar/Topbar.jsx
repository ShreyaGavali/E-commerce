import React from 'react';
import "./topbar.css";
import logo from '../../assets/Tirologo.webp';

const Topbar = () => {
  return (
    <div className="topbar">
        <div className="topbarWrapper">
          <div className="topLeft">
            <span className="logo">TIRO.Admin</span>
          </div>
          <div className="topRight">
            <div className="topbarIconContainer">
            <i className="fa-lg fa-regular fa-bell"></i>
            <span className="topIconBadge">2</span>
            </div>
            <div className="topbarIconContainer">
            <i className="fa-lg fa-solid fa-globe"></i>
            <span className="topIconBadge">2</span>
            </div>
            <div className="fa-lg topbarIconContainer">
            <i className="fa-solid fa-gear"></i>
            </div>
            <img src={logo} alt="" className="topAvatar" />
          </div>
        </div>
    </div>
  )
}

export default Topbar