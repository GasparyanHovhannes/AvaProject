import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Radio,
  Typography,
} from 'antd';
import {
  CalendarOutlined,
  PercentageOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import './SubscriptionForm.css';
import { useNavigate } from 'react-router';
import { APPOINTMENT, PROFILE } from '../../routes/paths';



const { Title, Paragraph } = Typography;



const SubscriptionForm: React.FC = () => {
  const [form] = Form.useForm();
  const [subscriptionOption, setSubscriptionOption] = useState('monthly');
  const navigate = useNavigate();

const handleSubmit = () => {
  sessionStorage.setItem("subscribed", "true"); // Save subscription status
  navigate("/profile"); // Redirect to profile
};


  return (
    <div className="subscription-container">
      <Card className="subscription-card">
        <Title level={3}>Subscribe & Save</Title>
        <Paragraph>
          Unlock exclusive benefits and savings with an AVA Hair Care subscription.
          Enjoy personalized hair care delivered right to your door, on your schedule.
        </Paragraph>

        <div className="benefits-section">
          <div className="benefit">
            <CalendarOutlined className="benefit-icon" />
            <div>
              <strong>Convenience</strong>
              <Paragraph className="benefit-text">
                Never run out of your favorite hair care essentials. Your personalized formula will
                be delivered automatically, ensuring you always have what you need.
              </Paragraph>
            </div>
          </div>
          <div className="benefit">
            <PercentageOutlined className="benefit-icon" />
            <div>
              <strong>Exclusive Savings</strong>
              <Paragraph className="benefit-text">
                Enjoy a 15% discount on every subscription order, plus free shipping on all deliveries.
              </Paragraph>
            </div>
          </div>
          <div className="benefit">
            <SettingOutlined className="benefit-icon" />
            <div>
              <strong>Flexibility</strong>
              <Paragraph className="benefit-text">
                Easily adjust your delivery schedule, skip a shipment, or cancel your subscription
                anytime, with no commitments.
              </Paragraph>
            </div>
          </div>
        </div>

        <Title level={5}>Subscription Options</Title>
        <Radio.Group
          value={subscriptionOption}
          onChange={(e) => setSubscriptionOption(e.target.value)}
          className="subscription-options"
        >
          <Radio.Button value="one-time">1 consultation / 3.99$</Radio.Button>
          <Radio.Button value="three-time">3 consultation (Expires in 3 Months) / 5.99$</Radio.Button>
          <Radio.Button value="eight-time">8 consultation (Expires in 6 Months) / 20.99$</Radio.Button>
          <Radio.Button value="twenty-time">20 consultation (Expires in 12 Months) / 30.99$</Radio.Button>
        </Radio.Group>

        <Form form={form} layout="vertical" onFinish={handleSubmit} className="payment-form">
          <Form.Item
            label="Card Number"
            name="cardNumber"
            rules={[{ required: true, message: 'Please enter your card number' }]}
          >
            <Input placeholder="Enter card number" />
          </Form.Item>

          <div className="row-group">
            <Form.Item
              label="Expiration Date"
              name="expiry"
              rules={[{ required: true, message: 'Enter expiry date' }]}
            >
              <Input placeholder="MM/YY" />
            </Form.Item>

            <Form.Item
              label="CVV"
              name="cvv"
              rules={[{ required: true, message: 'Enter CVV' }]}
            >
              <Input placeholder="CVV" />
            </Form.Item>
          </div>

          <Form.Item
            label="Billing Address"
            name="billingAddress"
            rules={[{ required: true, message: 'Enter billing address' }]}
          >
            <Input placeholder="Enter billing address" />
          </Form.Item>

          <Paragraph className="secure-text">
            Your transactions are secure and encrypted.
          </Paragraph>

          <Form.Item layout='vertical'>
            <Button htmlType="submit" className="subscribe-btn" onClick={() => navigate(APPOINTMENT)}>
              Subscribe Now
            </Button>
            <Button className="back-btn" onClick ={() => navigate(PROFILE)}>
              Back
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SubscriptionForm;