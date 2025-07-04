import React from 'react';
import { Typography, Row, Col, Card, Space } from 'antd';
import {
  EditOutlined,
  ExperimentOutlined,
  GiftOutlined,
} from '@ant-design/icons';

import './JourneySection.css';

const { Title, Paragraph, Text } = Typography;

const steps = [
  {
    title: 'Take the Quiz',
    description: 'Answer a few questions about your hair type, concerns, and goals.',
    icon: <EditOutlined style={{ fontSize: 24, color: '#1b120e' }} />,
  },
  {
    title: 'Get Your Personalized Formula',
    description: 'Receive a custom-formulated hair care routine designed specifically for you.',
    icon: <ExperimentOutlined style={{ fontSize: 24, color: '#1b120e' }} />,
  },
  {
    title: 'Enjoy Your Results',
    description: 'Experience the difference with products tailored to your unique needs.',
    icon: <GiftOutlined style={{ fontSize: 24, color: '#1b120e' }} />,
  },
];

const JourneySection: React.FC = () => {
  return (
    <div className="journey-section">
      <div className="journey-content">
        <Title level={2} className="journey-heading">
          Your Journey to Healthier Hair
        </Title>
        <Paragraph className="journey-description">
          Our personalized approach ensures you get the best care for your hair type and concerns.
        </Paragraph>
      </div>
      <Row gutter={[16, 16]} justify="center">
        {steps.map((step, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card className="journey-card" bordered>
              <Space direction="vertical" size="small">
                <div className="journey-icon">{step.icon}</div>
                <Text className="journey-title">{step.title}</Text>
                <Text className="journey-text">{step.description}</Text>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default JourneySection;
