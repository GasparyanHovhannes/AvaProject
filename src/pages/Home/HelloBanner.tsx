import React from 'react';
import { Button, Typography } from 'antd';
import './HelloBanner.css';
import { NavLink } from 'react-router-dom';
import { QUIZ } from '../../routes/paths'; 

const { Title, Paragraph } = Typography;

const HelloBanner: React.FC = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <Title level={2} style={{ color: 'white' }}>
          One hair type:yours
        </Title>
        <Paragraph style={{ color: 'white', maxWidth: 400 }}>
          Unsure of your hair type? Take our quick test, designed by professionals, to discover your unique hair profile and embrace your natural beauty.
        </Paragraph>
        <Button size="large" style={{ backgroundColor: '#e8752a', borderColor: '#e8752a', color: 'white' }}>
          <NavLink to={QUIZ} style={{ color: 'white', textDecoration: 'none' }}>
            Take the Quiz
          </NavLink>
        </Button>
      </div>
    </div>
  );
};

export default HelloBanner;
