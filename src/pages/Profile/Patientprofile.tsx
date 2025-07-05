import "./Patientpofile.css"
import { Button } from "antd";
import { signOut } from "firebase/auth";
import { auth } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearUser, selectUserData, selectUserSubscriptionStatus } from "../../features/userSlice";
import {Avatar, Typography, Divider, Card, Modal} from "antd";
import PatientImage from "../../assets/review2.png"
import appointmentImage from "../../assets/appointment-card.jpg";
import { APPOINMENT, SHOP, SUBSCRIPTION } from "../../routes/paths";
import shopImage from "../../assets/shop-card.jpg";
import careImage from "../../assets/haire-care-card.jpg";
import { useState } from "react";

const { Title, Text } = Typography;

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUserData);
  const subscribed = useAppSelector(selectUserSubscriptionStatus);
    const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };


  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="profile-container">
      <h1>Profile Page</h1>
      <div className="profile-info">
        <Avatar className="profile-avatar"
          size={96}
          src={PatientImage}
        />
        <Title level={4} className="username">
          {user?.name
            ? `${user.name}`
            : "No name available"}
        </Title>
        <Title level={4}>
          {user?.email
            ? `${user.email}`
            : "No name available"}
        </Title>
      </div>
      <Button onClick={handleLogout} className="profile-btn">
        Logout
      </Button>
      <Divider className="custom-divider" />
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }} className="profile-cards-wrapper">
      <Card
        className="appointments-card"
        onClick={() => navigate(subscribed ? APPOINMENT : SUBSCRIPTION)}
        hoverable
        style={{ width: 220 }}
        cover={
          <img
            alt="Appointments"
            src={appointmentImage}
            style={{ height: 400, objectFit: "cover" }}
          />
        }
      >
        <Title level={5} className="appointments-card">
          Appointments
        </Title>
        <Text type="secondary">This is your appointments section.</Text>
      </Card>

      <Card
        className="shop-card"
        onClick={() => navigate(subscribed ? SHOP : SUBSCRIPTION)}
        hoverable
        style={{ width: 400, minHeight: 400, cursor: "pointer" }}
        cover={
          <img
            alt="Another"
            src={shopImage}
            style={{ height: 400, objectFit: "cover" }}
          />
        }
      >
        <Title level={5}>Shop</Title>
        <Text type="secondary">This is another section.</Text>
      </Card>
      <Card
        className="care-card"
        hoverable
        onClick={handleCardClick}
        style={{ width: 400, minHeight: 400, cursor: "pointer" }}
        cover={
          <img
            alt="Example"
            src={careImage}
            style={{ height: 400, objectFit: "cover" }}
          />
        }
      >
        <Title level={5}>Click Me</Title>
        <Text type="secondary">This card opens a popup</Text>
      </Card>

      <Modal
        title="Important Information"
        open={isModalOpen}
        onCancel={handleClose}
        onOk={handleClose}
        okText="Ok"
      >
        <p>This is some extra information for the user.</p>
        <p>You can add anything here: text, forms, images, etc.</p>
      </Modal>
    </div>
    </div>
  );
};

export default Profile;


