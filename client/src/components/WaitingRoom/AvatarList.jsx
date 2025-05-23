// Componente de lista de avatares
const AvatarList = ({ avatars, currentAvatar, onSelect }) => {
  return (
    <div className="avatar-list">
      {avatars.map((avatar, index) => (
        <img
          key={index}
          src={avatar.avatarUrl}
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