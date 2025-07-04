import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import './PartnersSection.css';
import salon3 from 'C:\\Users\\Asus\\AvaProject\\AvaProject\\src\\assets\\salon3.png'
import salon2 from 'C:\\Users\\Asus\\AvaProject\\AvaProject\\src\\assets\\salon2.jpg'
import salon1 from 'C:\\Users\\Asus\\AvaProject\\AvaProject\\src\\assets\\salon1.jpg'

const { Title, Paragraph, Text } = Typography;

const partners = [
  {
    image: salon1,
    title: 'Evita beauty salon',
    description:
      'A leading research and development firm specializing in hair care formulations. Our partnership ensures access to cutting-edge ingredients and technologies.',
  },
  {
    image: salon2,
    title: 'Beauty Shop',
    description:
      "Committed to sustainable practices, this company provides eco-friendly packaging solutions that align with our brands values.",
  },
  {
    image: salon3,
    title: 'Dove Lady Shop',
    description:
      'A network of top-tier salons worldwide, enabling us to reach a broader audience and gather valuable feedback from professionals.',
  },
];

const PartnersSection: React.FC = () => {
  return (
    <div className="partners-section">
      <Title level={4} className="partners-title">Our Partners</Title>
      <Paragraph className="partners-sub">
        Collaborating with industry leaders to bring you the best in personalized hair care.
      </Paragraph>
      <Row gutter={[16, 16]} justify="center">
        {partners.map((partner) => (
          <Col xs={24} sm={12} md={8} key={partner.title}>
            <Card
              className="partner-card"
              cover={<img src={partner.image} alt={partner.title} style={{ borderRadius: 12 }} />}
              bordered={false}
            >
              <Text strong>{partner.title}</Text>
              <Paragraph type="secondary" style={{ marginTop: 4 }}>{partner.description}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
      <Paragraph className="partners-footer">
        These partnerships are integral to our mission of delivering exceptional, personalized hair care solutions. We are proud to work alongside these organizations, leveraging their expertise and resources to enhance our products and services.
      </Paragraph>
    </div>
  );
};

export default PartnersSection;
