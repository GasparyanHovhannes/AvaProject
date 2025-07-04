import React from 'react';
import { Avatar, Typography, Divider } from 'antd';
import './MasterProfileSection.css';
import REVIEW1 from '..\\..\\assets\\review1.png';

const { Title, Text } = Typography;

const MasterProfileSection: React.FC = () => {
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

      <Divider className="custom-divider" />

      <Title level={5} className="section-title">Personal Info</Title>
    </div>
  );
};

export default MasterProfileSection;
