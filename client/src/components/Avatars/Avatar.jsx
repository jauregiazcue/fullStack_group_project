// imagen del avatar de usuario
import React from "react";
import "./Avatar.css";

const Avatar = ({ avatarImageUrl }) => {
    return (
      <div className="avatar__container">
        <img src={avatarImageUrl} alt="avatar" />
      </div>
    );
};

export default Avatar;