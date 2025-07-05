import React from 'react';
import { Avatar, Typography, Divider } from 'antd';
import './MasterProfileSection.css';
import REVIEW1 from '..//..//assets//review1.png';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch,useAppSelector } from '../../app/hooks';
import { clearUser, selectUserData } from '../../features/userSlice';
import { Button } from 'antd';


const { Title } = Typography;

const MasterProfileSection: React.FC = () => {
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const master = useAppSelector(selectUserData);

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
        />
        <Title level={4} className="username">
          {master?.name
            ? `${master.name}`
            : "No name available"}
        </Title>
        <Title level={4}>
          {master?.email
            ? `${master.email}`
            : "No email available"}
        </Title>
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