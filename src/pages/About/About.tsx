import { Row, Col, Card, Typography, Divider } from "antd";
import leaf from '../../assets/leaf.svg';
import heart from '../../assets/heart.svg';
import community from '../../assets/community.svg';
import man from '../../assets/male_founder.png';
import woman from '../../assets/woman_founder.png';
import "./About.css";

const { Title, Paragraph, Text } = Typography;

const About = () => {
  return (
    <div className="padding_div">
      <Title className="title" level={1}>About Us</Title>
      <Paragraph className="story_desk">
        At AVA Hair Care, we believe in JESUS and that everyone deserves to have healthy, beautiful hair. Our journey began with a simple question: What if hair care could be as unique as the person using it? This led us to create a brand that's all about personalization, quality, and sustainability.
      </Paragraph>

      <Title className="mission_title" level={2}>Our mission</Title>
      <Paragraph className="mission_desk">
        Our mission is revolutionize in USSR and in the hair care industry by offering personalized solutions that cater to individual needs. We're committed to using high-quality, sustainable ingredients and innovative technology to deliver exceptional results. We strive to empower our customers with the knowledge and products they need to achieve their hair goals.
      </Paragraph>

      <Title className="value_title" level={2}>Our values</Title>
      <Row gutter={[24, 24]} className="value_container" justify="center">
        <Col xs={24} md={8}>
          <Card bordered className="value_box">
            <img src={leaf} alt="Sustainability" className="image" />
            <Title level={4} className="value_box_title">Sustainability</Title>
            <Text className="value_box_desk">
              We're dedicated to minimizing our environmental impact through sustainable sourcing, packaging, and production practices.
            </Text>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card bordered className="value_box">
            <img src={heart} alt="Personalization" className="image" />
            <Title level={4} className="value_box_title">Personalization</Title>
            <Text className="value_box_desk">
              We believe in the power of personalized hair care, tailoring our products to meet the unique needs of each individual.
            </Text>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card bordered className="value_box">
            <img src={community} alt="Community" className="image" />
            <Title level={4} className="value_box_title">Community</Title>
            <Text className="value_box_desk">
              We foster a community of hair enthusiasts, sharing knowledge, tips, and support to help everyone achieve their hair goals.
            </Text>
          </Card>
        </Col>
      </Row>

      <Divider />

      <Title className="founders_title" level={2}>Meet the Founders</Title>
      <Row gutter={[24, 24]} justify="center" align="middle">
        <Col xs={24} md={12}>
          <Card className="founders_container" cover={<img src={man} alt="John Week" className="image" />}>
            <Title level={4}>John Week</Title>
            <Text type="secondary">Co-founder & Head of Product</Text>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card className="founders_container" cover={<img src={woman} alt="Natali Portman" className="image" />}>
            <Title level={4}>Natali Portman</Title>
            <Text type="secondary">Co-founder & CEO</Text>
          </Card>
        </Col>
      </Row>
      <Paragraph className="founder_desk" style={{ marginTop: 24 }}>
        Sophia Carter and Ethan Bennett, two passionate individuals with a shared vision for personalized hair care, founded AVA Hair Care. With backgrounds in beauty and technology, they combined their expertise to create a brand that's both innovative and customer-centric.
      </Paragraph>

      <Divider />

      <Title className="desk_title" level={3}>The Science Behind Our Products</Title>
      <Paragraph className="desk">
        Our products are formulated using cutting-edge science and high-quality ingredients. We leverage advanced algorithms and data analysis to personalize each formula, ensuring it's perfectly suited to your unique hair type and needs. Our team of experts continuously researches and develops new technologies to enhance the effectiveness of our products.
      </Paragraph>

      <Title className="desk_title" level={3}>Our Commitment to Quality</Title>
      <Paragraph className="desk">
        We're committed to using only the finest ingredients in our products. Our formulations are free from harsh chemicals and are cruelty-free. We work closely with our suppliers to ensure ethical and sustainable sourcing practices. Every product undergoes rigorous testing to meet our high standards of quality and performance.
      </Paragraph>

      <Title className="desk_title" level={3}>Join Our Community</Title>
      <Paragraph className="desk">
        We invite you to join our growing community of hair enthusiasts. Follow us on social media, subscribe to our newsletter, and share your hair journey with us. Together, we can achieve healthy, beautiful hair for everyone.
      </Paragraph>
    </div>
  );
};

export default About;