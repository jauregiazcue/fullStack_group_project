//mostrar los avatars, modo de visualizacion en rejilla n x m
import React from "react";
import Avatar from "./Avatar";

const AvatarList = ({ rows, columns, size, avatars }) => {
    return (
      <div className="avatar-list">
        {
        let cont=0;
        for (let x=0; x<columns; x++) 
            (<div className="avatar-list__row">)
                for (let y=0; y<rows; y++) (
                    <Avatar key={y} avatarImageUrl={avatars[y].url} />
                )
            </div>
        }}
            
                (element => {
            
        });((avatar) => (
          <Avatar key={avatar.id} avatarImageUrl={avatar.url} />
        ))}
      </div>
    );
};

export default AvatarList;