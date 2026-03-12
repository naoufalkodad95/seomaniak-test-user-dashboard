import React from 'react';

function UserAvatar({ sexe }) {
  const getAvatarConfig = () => {
    switch(sexe) {
      case 'Homme':
        return { bg: 'bg-primary', icon: 'bi-gender-male' };
      case 'Femme':
        return { bg: 'bg-danger', icon: 'bi-gender-female' };
          case 'Autre':
        return { bg: 'bg-gray', icon: 'bi-gender-Autre' };
      default:
        return { bg: 'bg-secondary', icon: 'bi-gender-trans' };
    }
  };

  const config = getAvatarConfig();

  return (
    <div className={`${config.bg} text-white rounded-circle p-2`} 
         style={{ width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <i className={`bi ${config.icon} fs-5`}></i>
    </div>
  );
}

export default UserAvatar;