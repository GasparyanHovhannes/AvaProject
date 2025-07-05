import { useEffect, useState } from 'react';
import {
  Card,
  Avatar,
  Button,
  Rate,
  Typography,
  Divider,
  Modal,
  DatePicker,
  message,
} from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import './Appointment.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUserData, selectUserRole } from '../../features/userSlice';
import {
  db,
  getAllDoctors,
  getAppointmentsForDoctor,
  setAppointment,
} from '../../services/apiService';
import type { Doctor } from '../../features/doctorSlice';
import REVIEW1 from '..\\..\\assets\\review1.png';
import { useNavigate } from "react-router-dom";
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';



const { Title, Text } = Typography;

const Appointment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);

  const navigate = useNavigate();
  const master = useAppSelector(selectUserData);
  const role = useAppSelector(selectUserRole);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getAllDoctors()
      .then(setDoctors)
      .catch((err) => console.error('Error fetching doctors:', err));
  }, []);

  const showModal = async (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);

    const appointments = await getAppointmentsForDoctor(doctor.email);
    const appointmentDates = appointments.map((a) => a.date.toDate());

    const profileUnavailable = doctor.unavailable;
    const unavailableFromProfile: Date[] = [];

    if (profileUnavailable instanceof Array) {
      for (const ts of profileUnavailable) {
        if (ts && typeof ts.toDate === 'function') {
          unavailableFromProfile.push(ts.toDate());
        }
      }
    } else if (
      profileUnavailable &&
      typeof profileUnavailable.toDate === 'function'
    ) {
      unavailableFromProfile.push(profileUnavailable.toDate());
    }

    setUnavailableDates([...appointmentDates, ...unavailableFromProfile]);
  };

  const handleOk = async () => {
    if (!selectedDate || !selectedDoctor) {
      message.warning('Please select a date.');
      return;
    }

    try {
      await setAppointment({
        doctor: selectedDoctor.email,
        client: master?.email ?? 'Anonymous',
        date: selectedDate.toDate(),
      });

      message.success(
        `Appointment booked with ${selectedDoctor.name} on ${selectedDate.format(
          'YYYY-MM-DD'
        )}`
      );

      setIsModalOpen(false);
      setSelectedDoctor(null);
      setSelectedDate(null);
    } catch (err) {
      console.error(err);
      message.error('Failed to book appointment.');
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
    setSelectedDate(null);
  };

  const isDateUnavailable = (current: Dayjs) => {
    return unavailableDates.some((date) =>
      dayjs(date).isSame(current, 'day')
    );
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
                <Text type="secondary">There may be some dates unavailable</Text>
                <Button
                  className="view-profile-btn"
                  onClick={() => showModal(doctor)}
                >
                  Book an appointment
                </Button>
                <Button
                  className="chat-btn"
                  style={{ marginLeft: 8, marginTop: 8 }}
                  onClick={async () => {
                    // Используем email доктора для doctor_id
                    const userId = master?.email ?? 'Anonymous';
                    const doctorEmail = doctor.email;
                    // 1. Проверить, есть ли уже чат
                    const q = query(
                      collection(db, "chats"),
                      where("user_id", "==", userId),
                      where("doctor_id", "==", doctorEmail)
                    );
                    const snap = await getDocs(q);
                    if (snap.empty) {
                      // 2. Если нет — создать чат
                      await addDoc(collection(db, "chats"), {
                        user_id: userId,
                        doctor_id: doctorEmail,
                        created: new Date()
                      });
                    }
                    // 3. Перейти на страницу чатов
                    navigate("/chats");
                  }}
                  type="default"
                >
                  Chat with
                </Button>
              </div>
            </div>

            <div className="rating-section">
              <Rate
                disabled
                allowHalf
                value={
                  doctor.yearsOfExperience
                    ? Math.min(5, doctor.yearsOfExperience / 2)
                    : 4.5
                }
              />
              <Text strong style={{ marginLeft: 8 }}>
                {doctor.yearsOfExperience ?? '4+'} yrs
              </Text>
            </div>

            <Divider />

            <div className="comments-section">
              <Text type="secondary">No comments loaded from DB</Text>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        title={`Book Appointment with ${selectedDoctor?.name}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Confirm"
      >
        <DatePicker
          style={{ width: '100%' }}
          onChange={setSelectedDate}
          disabledDate={isDateUnavailable}
        />
      </Modal>
    </div>
  );
};


export default Appointment;

