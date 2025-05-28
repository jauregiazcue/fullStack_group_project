
import AvatarList from './AvatarList';

const AvatarSelector = ({ avatars, currentAvatar, onAvatarSelect }) => {
  return (
    <div className="avatar__elector">
      <h3>Selecciona tu avatar</h3>
      <AvatarList
        avatars={avatars}
        currentAvatar={currentAvatar}
        onSelect={onAvatarSelect}
      />
    </div>
  );
};

export default AvatarSelector;
