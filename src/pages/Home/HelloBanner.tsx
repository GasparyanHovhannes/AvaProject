import React from 'react';
import { Button, Typography } from 'antd';
import './HelloBanner.css';
import { NavLink } from 'react-router-dom';
import { APPOINMENT, SUBSCRIPTION } from '../../routes/paths'; // Adjust the import path as necessary

const { Title, Paragraph } = Typography;

const HelloBanner: React.FC = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <Title level={2} style={{ color: 'white' }}>
          Personalized Hair Care, Just for You
        </Title>
        <Paragraph style={{ color: 'white', maxWidth: 400 }}>
          Discover the perfect hair care routine tailored to your unique needs.
        </Paragraph>
        <Button size="large" style={{ backgroundColor: '#e8752a', borderColor: '#e8752a', color: 'white' }}>
          <NavLink to={APPOINMENT} style={{ color: 'white', textDecoration: 'none' }}>
            Take the Quiz
          </NavLink>
        </Button>
      </div>
    </div>
  );
};

export default HelloBanner;
