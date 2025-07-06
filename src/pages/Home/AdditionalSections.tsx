import React from 'react';
import { Typography, List, Avatar, Rate, Space, Row, Col, Card, Button } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import './AdditionalSections.css';
import REVIEW1 from '..//..//assets//review1.png';
import REVIEW2 from '..//..//assets//review2.png';  
import REVIEW3 from '..//..//assets//review3.png';

const { Title, Paragraph, Text } = Typography;

const stories = [
  {
    name: 'Sophia Bennett',
    ago: '2 months ago',
    avatar: REVIEW1,
    text: "Thanks Ava for giving me this opportunity that I never knew I needed. The consultations are life-changers, my hair’s shining",
    likes: 12,
    dislikes: 1,
  },
  {
    name: 'Olivia Carter',
    ago: '3 months ago',
    avatar: REVIEW2,
    text: 'So thoughtful that they offer the delievery, saves so much time💖 Btw Ana hairstylist is my favorite person now😍',
    likes: 15,
    dislikes: 0,
  },
  {
    name: 'Emma Davis',
    ago: '4 months ago',
    avatar: REVIEW3,
    text: 'I love that ÁVA takes the guesswork out of hair care. The quiz was easy, and the products are perfect for my hair type. Highly recommend!',
    likes: 10,
    dislikes: 2,
  },
];

const tips = [
  {
    title: 'The Ultimate Guide to Healthy Hair',
    description: 'Learn the secrets to achieving and maintaining healthy, beautiful hair.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAb9MJqMPgz_XpzA9lgt0lybCrSimw8AZgLqgbUtdI-5u7oUjpwtDTCFfhuRJnQbuWcItb5ESyyoKaGqOuUuL8qUpdeM-u3cXnu1Db9OcckX4vXghj5RJT7qN9Z9jv5xnc6ejXAJmC0TwKUEeSIc3RbPy6rhwlEll1nLFOOZC7up8fg-aqEpg-kCqAppsXwYU3U0kcw-XQhqpTBir8hDKYR2EmcIK-puK3s3BpxxGRFPRsLYGZs8CppYV-vWVC11EmKVWv9Wt34qaU',
  },
  {
    title: 'Common Hair Care Mistakes to Avoid',
    description: 'Discover the common pitfalls in hair care and how to correct them.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzTcvrXAEJW_ZuuPPsGaUkxoDueSUWv30redV-_gNmUPwRflBMnDPLChnlwmECsq4_wjQHqz9UdGXCXi1Oj3Il6Qja5tQG-GALsa-Z_5QaedX0YOmi6t9trT4wTsdQbT1YPbzDMpHpyBdMGLlg5D7DWAqre2vka-UPn0jj4fqGWJwxxVxs8ObzhIPUhGbU_ejiHp8xt-MvxjBAAaO79h4sdAXjIehXv7ZDPjHcVWP-9HYchOOtpXw5zqUHIlA3Vj7yspW9sc82HSU',
  },
  {
    title: 'How to Choose the Right Products for Your Hair Type',
    description: 'Find out how to identify your hair type and select the best products.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTaFUFuYIZ9S3KfT5_lk5eAhFlEVRwc1jy54NKFPrbH7Jvervi4b5WjHyW1YBnxTq0a8jGVM_1gOfOZnhMoNAdBk6UpDbkZRAtCebpy7UVVVMXhdRheQ0XNCXi1lJpxWJgP1IQF64_mcSAVYwohDYOSJXIFEhIsIAt72HGIrk80olNyGtXHiufVPCRzdleAI0M4yY13pVARlqSZpyLHk1ECxb5z24jLVIbZI5EUfn0mubUFoO62q-lArAw-5zUtgsWX_46A3DLkGY',
  },
  {
    title: 'How to Choose the Right Products for Your Hair Type',
    description: 'Find out how to identify your hair type and select the best products.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTaFUFuYIZ9S3KfT5_lk5eAhFlEVRwc1jy54NKFPrbH7Jvervi4b5WjHyW1YBnxTq0a8jGVM_1gOfOZnhMoNAdBk6UpDbkZRAtCebpy7UVVVMXhdRheQ0XNCXi1lJpxWJgP1IQF64_mcSAVYwohDYOSJXIFEhIsIAt72HGIrk80olNyGtXHiufVPCRzdleAI0M4yY13pVARlqSZpyLHk1ECxb5z24jLVIbZI5EUfn0mubUFoO62q-lArAw-5zUtgsWX_46A3DLkGY',
  },
];

export const CustomerStoriesSection: React.FC = () => {
  return (
    <div className="customer-section">
      <Title level={4} className="customer-title">Customer Stories</Title>
      <List
        itemLayout="vertical"
        dataSource={stories}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<Text strong>{item.name}</Text>}
              description={<Text type="secondary" style={{ fontSize: 12 }}>{item.ago}</Text>}
            />
            <Rate disabled defaultValue={5} style={{ fontSize: 16, color: '#ea7d47' }} />
            <Paragraph style={{ marginTop: 8 }}>{item.text}</Paragraph>
            <Button>
              <LikeOutlined /><span>{item.likes}</span>
              </Button>
              <Button>
                <DislikeOutlined /><span>{item.dislikes}</span>
                </Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export const TipsSection: React.FC = () => {
  return (
    <div className="tips-section">
      <Title level={4} className="tips-title">Weekly Hair Care Tips</Title>
      <Row gutter={[16, 16]}>
        {tips.map((tip) => (
          <Col xs={24} sm={12} md={8} key={tip.title}>
            <Card
              className="tip-card"
              cover={<img src={tip.image} alt={tip.title} />}
              hoverable
            >
              <Text strong>{tip.title}</Text>
              <Paragraph type="secondary" style={{ marginTop: 4 }}>{tip.description}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
