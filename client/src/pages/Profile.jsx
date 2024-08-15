import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/Auth';
import './Profile.css';

const Profile = () => {
  const { user, AuthorizationToken } = useAuth();
  const [photoUrl, setPhotoUrl] = useState('');
  const [profileData, setProfileData] = useState({
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:7000/api/v1/auth/user-auth2', {
        headers: {
          Authorization: AuthorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.ok && data.user) {
          setProfileData({
            email: data.user.email || '',
            phone: data.user.phone || '',
            address: data.user.address || '',
          });

          // Handle photo URL if available
          if (data.user.photo && data.user.photo.url) {
            setPhotoUrl(data.user.photo.url);
          } else {
            setPhotoUrl('');
          }
        }
      } else {
        console.error("Error fetching user profile:", await response.text());
      }
    } catch (error) {
      console.error("Error during user profile fetch:", error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-photo">
          {photoUrl ? (
            <img src={photoUrl} alt="User Profile" className="profile-image" />
          ) : (
            <div className="placeholder-image">No Photo</div>
          )}
        </div>
        <div className="profile-info">
          <h1 className="profile-name">Profile</h1>
          <div className="profile-form">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                readOnly
                className="profile-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={profileData.phone}
                readOnly
                className="profile-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <textarea
                id="address"
                name="address"
                value={profileData.address}
                readOnly
                className="profile-field"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
