import { useEffect, useState } from 'react';
import React from 'react';
import { Avatar, Typography, Divider, Button } from 'antd';
import './MasterProfileSection.css';
import REVIEW1 from '..//..//assets//review1.png';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearUser, selectUserData } from '../../features/userSlice';
import { type Appointment } from '../../features/appointmentsSlice';
import { getAppointmentsForDoctor } from '../../services/apiService';
import dayjs from 'dayjs';

const { Title } = Typography;

const MasterProfileSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const master = useAppSelector(selectUserData);
  const [appointments, setAppointments] = useState<Appointment[]>([]);


  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    if (master?.email) {
      getAppointmentsForDoctor(master.email)
        .then(setAppointments)
        .catch(console.error);
    }
  }, [master?.email]);

  return (
    <div className="profile-container">
      <div className="avatar-section">
        <Avatar size={96} src={REVIEW1} />
        <Title level={4} className="username">{master?.name ?? "No name available"}</Title>
        <Title level={4}>{master?.email ?? "No email available"}</Title>
      </div>

      <Button
        onClick={() => navigate("/chats")}
        className="profile-btn"
        style={{ marginRight: 12}}
      >
        Chats
      </Button>
      <Button className="log-out-btn" onClick={handleLogout}>
        Log Out
      </Button>

      <Divider className="custom-divider" />
      <Title level={5} className="section-title">My Appointments</Title>

      <div className="appointments-section">
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          appointments.map((appt) => (
            <div key={appt.doc_id} className="appointment-card">
              <p><strong>Client:</strong> {appt.client}</p>
              <p><strong>Date:</strong> {dayjs(appt.date.toDate()).format("YYYY-MM-DD HH:mm")}</p>
            </div>
          ))
        )}
      </div>

    </div>
  );
};


export default MasterProfileSection;