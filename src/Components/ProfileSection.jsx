import React from 'react';

const ProfileSection = ({ name, email, profilePicture }) => {
  return (
    <div>
      <div className="profile-picture">
        <img src={profilePicture} alt="Profile" />
      </div>
      <div className="profile-info">
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default ProfileSection;
