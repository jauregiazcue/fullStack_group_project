
const BASE_URL = "http://localhost:3000";

const AvatarList = ({ avatars, currentAvatar, onSelect }) => {
  return (
    <div className="avatar__list">
      {avatars.map((avatar, index) => (
        <img
          key={index}
          src={BASE_URL + avatar}
          alt={`avatar-${index}`}
          className={`avatar-option ${
            currentAvatar === avatar ? "selected" : ""
          }`}
          onClick={() => onSelect(avatar)}
        />
      ))}
    </div>
  );
};

export default AvatarList;