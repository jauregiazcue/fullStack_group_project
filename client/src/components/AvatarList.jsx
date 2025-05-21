//mostrar los avatars, modo de visualizacion en rejilla n x m
// import Avatar from "./Avatar";

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
// const AvatarList = ({ columns, avatars, onClick }) => {
//   const avatarElements = [];
//   const rows = Math.ceil(avatars.length / columns);
//   let index = 0;

//   for (let x = 0; x < columns; x++) {
//     const row = [];
    
//     for (let y = 0; y < rows; y++) {
//       if (index >= avatars.length) break;
//       row.push(<Avatar key={index} avatarImageUrl={avatars[index].url} onClick={onClick}/>);
//       index++;
//     }
//     avatarElements.push(
//       <div key={x} className="avatar-list__row">
//         {row}
//       </div>
//     );
//   }

//   return <div className="avatar-list">{avatarElements}</div>;
// };
export default AvatarList;