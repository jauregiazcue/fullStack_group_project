// imagen del avatar de usuario
import React from "react";
import "./Avatar.css";

const Avatar = ({ avatarImageUrl, onClick }) => {
    return (
      <div className="avatar__container">
        <img src={avatarImageUrl} alt="avatar" onClick={onClick}/>
      </div>
    );
};

export default Avatar;