import AvatarList from './AvatarList';

//Componente que usa AvatarList para seleccion de avatar
const AvatarSelector = ({ avatars, currentAvatar, onAvatarSelect }) => {
  return (
    <div className="avatar-selector">
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
