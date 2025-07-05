import { useEffect, useState } from 'react';
import { Card, Avatar, Button, Rate, Progress, Typography, Divider, Space, Modal, DatePicker, message } from 'antd';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import './Appointment.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUserData, selectUserRole } from '../../features/userSlice';
import { getAllDoctors } from '../../services/apiService';
import type { Doctor } from '../../features/doctorSlice'; 
import REVIEW1 from '..\\..\\assets\\review1.png';
import { setAppointment } from '../../services/apiService';
import { collection, getDocs, doc, setDoc, addDoc } from 'firebase/firestore';
import { db } from '../../services/apiService'; 
import type { Appointment } from '../../features/appointmentsSlice';


const { Title, Text } = Typography;

const Appointment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
   // Adjust type as needed

  const master = useAppSelector(selectUserData);
  const role = useAppSelector(selectUserRole);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getAllDoctors()
      .then(setDoctors)
      .catch(err => console.error("Error fetching doctors:", err));
  }, []);

  const showModal = (doctorEmail: string) => {
    setSelectedDoctor(doctorEmail);
    setIsModalOpen(true);
  };

const handleOk = async () => {
  if (!selectedDate) {
    message.warning("Please choose a date.");
    return;
  }

  try {
    await setAppointment({
      doctor: selectedDoctor!,
      client: master?.email ?? "Anonymous",
      date: selectedDate.toDate(), 
    });

    message.success(`Appointment booked with ${selectedDoctor} on ${selectedDate.format('YYYY-MM-DD')}`);
    setIsModalOpen(false);
    setSelectedDoctor(null);
    setSelectedDate(null);
  } catch (err) {
    console.error(err);
    message.error("Failed to book appointment.");
  }
};


  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
    setSelectedDate(null);
  };

  

  return (
  <div className="consultation-container">
    <Title level={2}>Available Masters</Title>

    <div className="card-wrapper">
      {doctors.map((doctor, index) => (
        <Card key={index} className="doctor-card">
          <Avatar size={64} src={REVIEW1} />
          <div className="doctor-header">
            <div className="doctor-info">
              <Title level={4}>{doctor.name}</Title>
              <Text type="secondary">{doctor.gender || 'Doctor'}</Text>
              <br />
              <Button className="view-profile-btn" onClick={() => showModal(doctor.email)}>
                Book an appointment
              </Button>
            </div>
          </div>

          <div className="rating-section">
            <Rate
              disabled
              allowHalf
              value={doctor.yearsOfExperience ? Math.min(5, doctor.yearsOfExperience / 2) : 4.5}
            />
            <Text strong style={{ marginLeft: 8 }}>{doctor.yearsOfExperience ?? '4+'} yrs</Text>
          </div>

          <Divider />

          <div className="comments-section">
            <Text type="secondary">No comments loaded from DB</Text>
          </div>
        </Card>
      ))}
    </div>

    <Modal
      title={`Book Appointment with ${selectedDoctor}`}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Confirm"
    >
      <DatePicker
        style={{ width: '100%' }}
        onChange={(date) => setSelectedDate(date)}
      />
    </Modal>
  </div>
);
};

export default Appointment;
