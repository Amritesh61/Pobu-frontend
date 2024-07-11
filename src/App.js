import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post('/webhook', {
          message: {
            from: {
              id: '123456789', // Replace with actual user ID from Telegram
              username: 'solbuyer' // Replace with actual username from Telegram
            }
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      <div className="banner-space">
        {/* Banner space */}
      </div>
      <div className="profile-container">
        <img src={`https://api.telegram.org/file/bot7219449810:AAGclhY1BmXfGCQMBLAKsb_5LbPBEh9ZT2U/${userData.profilePic}`} alt="Profile" className="profile-pic" />
        <h2>{userData.userName}</h2>
        <p>ID: {userData.userId}</p>
      </div>
      <div className="points-container">
        <p>Points: {userData.points}</p>
        <p>Referrals: {userData.referrals}</p>
      </div>
      <div className="status-container">
        <p>{userData.status}</p>
      </div>
    </div>
  );
}

export default App;
