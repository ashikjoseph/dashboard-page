import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './settings.css'; 

function Settings() {
  const [settings, setSettings] = useState({
    username: 'Ashik',
    email: 'ashik@gmail.com',
    password: 'ashik123',
    notifications: false,
    theme: 'light',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: newValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isConfirmed = window.confirm("Are you sure you want to update your profile?");
    if (isConfirmed) {
      alert("Profile successfully updated");

      window.location.href = "/dashboard"; 
    }
  };

  return (
    <div className="admin-settings">
      <h2 style={{textAlign:"center"}}>Admin Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="profile-picture">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRvnCAL58JHR2UOR_kIDLd0YICJKqBVMtIjeTfJ6nUk7iZhrVuVGaB90bsmsJ04gRvLAk&usqp=CAU" alt="Profile" />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={settings.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={settings.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={settings.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
            />
            Receive notifications
          </label>
        </div>
        <Link to="/dashboard" className="btn-update" style={{textDecoration:"none"}} onClick={handleSubmit}>Update</Link>
      </form>
    </div>
  );
}

export default Settings;






