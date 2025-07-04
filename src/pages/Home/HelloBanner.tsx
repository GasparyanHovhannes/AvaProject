import React from 'react';
import { Button, Typography } from 'antd';
import './HelloBanner.css';

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
        <Button type="primary" size="large">
          Take the Quiz
        </Button>
      </div>
    </div>
  );
};

export default HelloBanner;
