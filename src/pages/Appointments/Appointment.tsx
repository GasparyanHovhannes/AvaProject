// import { useEffect, useState } from 'react';
// import {
//   Card,
//   Avatar,
//   Button,
//   Rate,
//   Typography,
//   Divider,
//   Modal,
//   DatePicker,
//   message,
// } from 'antd';
// import type { Dayjs } from 'dayjs';
// import dayjs from 'dayjs';
// import './Appointment.css';

// import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import { selectUserData, selectUserRole } from '../../features/userSlice';
// import { getAllDoctors, setAppointment } from '../../services/apiService';
// import type { Doctor } from '../../features/doctorSlice';

// import REVIEW1 from '../../assets/review1.png';

// const { Title, Text } = Typography;

// const Appointment = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
//   const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
//   const [unavailableDates, setUnavailableDates] = useState<Dayjs[]>([]);
//   const [doctors, setDoctors] = useState<Doctor[]>([]);

//   const master = useAppSelector(selectUserData);
//   const role = useAppSelector(selectUserRole);
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     getAllDoctors()
//       .then(setDoctors)
//       .catch(err => console.error("Error fetching doctors:", err));
//   }, []);

// const showModal = (email: string) => {
//   const doc = doctors.find(d => d.email === email);
//   setSelectedDoctor(email);
//   setIsModalOpen(true);

//   const dates = doc?.unavailable?.map(ts => dayjs(ts.toDate()).startOf('day')) ?? [];
//   setUnavailableDates(dates);
// };


//   const handleOk = async () => {
//     if (!selectedDate) {
//       message.warning("Please choose a date.");
//       return;
//     }

//     try {
//       await setAppointment({
//         doctor: selectedDoctor!,
//         client: master?.email ?? "Anonymous",
//         date: selectedDate.toDate(),
//       });

//       message.success(`Appointment booked with ${selectedDoctor} on ${selectedDate.format('YYYY-MM-DD')}`);
//       setIsModalOpen(false);
//       setSelectedDoctor(null);
//       setSelectedDate(null);
//       setUnavailableDates([]);
//     } catch (err) {
//       console.error(err);
//       message.error("Failed to book appointment.");
//     }
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     setSelectedDoctor(null);
//     setSelectedDate(null);
//     setUnavailableDates([]);
//   };

//   return (
//     <div className="consultation-container">
//       <Title level={2}>Available Masters</Title>

//       <div className="card-wrapper">
//         {doctors.map((doctor, index) => (
//           <Card key={index} className="doctor-card">
//             <Avatar size={64} src={REVIEW1} />
//             <div className="doctor-header">
//               <div className="doctor-info">
//                 <Title level={4}>{doctor.name}</Title>
//                 <Text type="secondary">{doctor.gender || 'Doctor'}</Text>
//                 <br />
//                 <Button className="view-profile-btn" onClick={() => showModal(doctor.email)}>
//                   Book an appointment
//                 </Button>
//               </div>
//             </div>

//             <div className="rating-section">
//               <Rate
//                 disabled
//                 allowHalf
//                 value={doctor.yearsOfExperience ? Math.min(5, doctor.yearsOfExperience / 2) : 4.5}
//               />
//               <Text strong style={{ marginLeft: 8 }}>
//                 {doctor.yearsOfExperience ?? '4+'} yrs
//               </Text>
//             </div>

//             <Divider />

//             <div className="comments-section">
//               <Text type="secondary">No comments loaded from DB</Text>
//             </div>
//           </Card>
//         ))}
//       </div>

//       <Modal
//         title={`Book Appointment with ${selectedDoctor}`}
//         open={isModalOpen}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         okText="Confirm"
//       >
//         <DatePicker
//           style={{ width: '100%' }}
//           onChange={(date) => setSelectedDate(date)}
//           disabledDate={(current) =>
//             unavailableDates.some(date => date.isSame(current.startOf('day'), 'day'))
//           }
//         />
//       </Modal>
//     </div>
//   );
// };

// export default Appointment;
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
  getAllDoctors,
  getAppointmentsForDoctor,
  setAppointment,
} from '../../services/apiService';
import type { Doctor } from '../../features/doctorSlice';
import REVIEW1 from '..\\..\\assets\\review1.png';

const { Title, Text } = Typography;

const Appointment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);

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
