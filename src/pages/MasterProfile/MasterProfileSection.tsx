import React from 'react';
import { Avatar, Typography, Divider, Button } from 'antd';
import './MasterProfileSection.css';
import REVIEW1 from '..\\..\\assets\\review1.png';
import { useAppDispatch } from '../../app/hooks';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/apiService';
import { clearUser } from '../../features/userSlice';
import { useNavigate } from 'react-router-dom';
const { Title, Text } = Typography;

const MasterProfileSection: React.FC = () => {
  
const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="profile-container">
      <div className="avatar-section">
        <Avatar
          size={96}
          src = {REVIEW1}
          alt="Sophia Carter"
        />
        <Title level={4} className="username">Sophia Carter</Title>
        <Text type="secondary">sophia.carter@email.com</Text>
      </div>
      <Button className = "log-out-btn" onClick={handleLogout}>
        Log Out
      </Button>

      <Divider className="custom-divider" />

      <Title level={5} className="section-title">Personal Info</Title>
    </div>
  );
};


export default MasterProfileSection;


