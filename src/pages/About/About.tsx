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
            <Title level={4} className="value_box_title">Authenticity Over Perfection</Title>
            <Text className="value_box_desk">
              We embrace real hair, real struggles, and real progress. We support your journey, whether it’s frizzy, flat, fabulous - or all three.
            </Text>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card bordered className="value_box">
            <img src={heart} alt="Personalization" className="image" />
            <Title level={4} className="value_box_title">Education Over Sales</Title>
            <Text className="value_box_desk">
              We’re not here to sell you products. We’re here to help you understand your hair and make smart choices with confidence. Our goal is to empower you with knowledge.
            </Text>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card bordered className="value_box">
            <img src={community} alt="Community" className="image" />
            <Title level={4} className="value_box_title">Trust and Confidence Matter</Title>
            <Text className="value_box_desk">
              We provide honest, expert advice and only recommend products we truly stand behind. You can count on us to give clear, reliable guidance, so you feel confident.
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

      <Title className="desk_title" level={3}>Our Story</Title>
      <Paragraph className="desk">
        We saw your pain - struggling with your hair care, the wasted products, the confusion. That’s exactly the reason why Ava was born - to turn your hair care routine from a daily struggle into a magical ritual.
Thanks to the support of our first investors, Devhacks, we found the right professionals to join our vision - and that’s when our journey truly began. A journey dedicated to one goal: helping you transform your hair into its healthiest, most confident form.

      </Paragraph>

      <Title className="desk_title" level={3}>Our Mission</Title>
      <Paragraph className="desk">
        Less confusion. More confidence. Flawless hair.
      </Paragraph>

      <Title className="desk_title" level={3}>Join Our Community</Title>
      <Paragraph className="desk">
        We invite you to join our growing community of hair enthusiasts. Follow us on social media, subscribe to our newsletter, and share your hair journey with us. Together, we can achieve healthy, beautiful hair for everyone.
      </Paragraph>
    </div>
  );
};

export default About;