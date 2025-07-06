import React from 'react';
import { Button, Typography } from 'antd';
import './HelloBanner.css';

import { NavLink, useNavigate } from 'react-router-dom';
import { QUIZ, LOGIN, PROFILE} from '../../routes/paths'; 
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUserData, selectUserRole, selectUserEmailStatus } from '../../features/userSlice';


const { Title, Paragraph } = Typography;

const HelloBanner: React.FC = () => {
    const userData = useAppSelector(selectUserData);
    const userRole = useAppSelector(selectUserRole);
    const userStatus = useAppSelector(selectUserEmailStatus);
    const navigate = useNavigate()
    const isLoggedIn = Boolean(userData && userStatus);
  const isDoctor = userRole === "doctor";

  const handleClick = () => {
    if (!isLoggedIn) {
      navigate(LOGIN);
    } else if (!isDoctor) {
      navigate(QUIZ);
    }
  };
  return (
    <div className="hero-container">
      <div className="hero-content">
        <Title level={2} style={{ color: 'white' }}>
          One hair type:yours
        </Title>
        <Paragraph style={{ color: 'white', maxWidth: 400 }}>
          Unsure of your hair type? Take our quick test, designed by professionals, to discover your unique hair profile and embrace your natural beauty.
        </Paragraph>
        <Button size="large" onClick={handleClick} style={{ backgroundColor: '#e8752a', borderColor: '#e8752a', color: 'white' }} >
            Take the Quiz
        </Button>
      </div>
    </div>
  );
};

export default HelloBanner;
