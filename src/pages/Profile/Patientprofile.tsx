import "./Patientpofile.css"
import { Button, Avatar, Typography, Divider, Card, Modal } from "antd";
import { signOut } from "firebase/auth";
import { auth } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  clearUser,
  selectUserData,
  selectUserSubscriptionStatus,
} from "../../features/userSlice";
import appointmentImage from "../../assets/appointment-card.jpg";
import shopImage from "../../assets/shop-card.jpg";
import careImage from "../../assets/haire-care-card.jpg";
import PatientImage from "../../assets/review2.png";
import { useState, useEffect } from "react";
import { getHairCareTextByType } from "../../services/apiService";
import { APPOINMENT, SHOP, SUBSCRIPTION } from "../../routes/paths";

const { Title, Text } = Typography;

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUserData);
  const hairType = user?.type || "No hair type available";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hairTip, setHairTip] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false); 

  const handleCardClick = (path: string) => {
    if (isSubscribed) {
      navigate(path);
    } else {
      navigate(SUBSCRIPTION);
    }
  };

  const handleHairCareClick = () => {
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

  useEffect(() => {
    const fetchHairTip = async () => {
      if (typeof user?.type === "number") {
        const tip = await getHairCareTextByType(user.type);
        setHairTip(tip);
      }
    };

    fetchHairTip();
  }, [user?.type]);

  return (
    <div className="profile-container">
      <h1>Profile Page</h1>

      <div className="profile-info">
        <Avatar className="profile-avatar" size={96} src={PatientImage} />
        <Title level={4} className="username">{user?.name || "No name available"}</Title>
        <Title level={4}>{user?.email || "No email available"}</Title>
        <Title level={4}>Hair Type: {hairType}</Title>
      </div>

      <Button onClick={handleLogout} className="profile-btn">
        Logout
      </Button>

      <Divider className="custom-divider" />

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }} className="profile-cards-wrapper">

        <Card
          className="appointments-card"
          onClick={() => handleCardClick(APPOINMENT)}
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
          <Title level={5}>Appointments</Title>
          <Text type="secondary">Book appointments (if subscribed).</Text>
        </Card>
        <Card
          className="shop-card"
          onClick={() => navigate(SHOP)}
          hoverable
          style={{ width: 400, minHeight: 400, cursor: "pointer" }}
          cover={
            <img
              alt="Shop"
              src={shopImage}
              style={{ height: 400, objectFit: "cover" }}
            />
          }
        >
          <Title level={5}>Shop</Title>
          <Text type="secondary">Access the shop (if subscribed).</Text>
        </Card>
        <Card
          className="care-card"
          onClick={handleHairCareClick}
          hoverable
          style={{ width: 400, minHeight: 400, cursor: "pointer" }}
          cover={
            <img
              alt="Hair Care"
              src={careImage}
              style={{ height: 400, objectFit: "cover" }}
            />
          }
        >
          <Title level={5}>Your Hair Care</Title>
          <Text type="secondary">Click to view personalized care tips.</Text>
        </Card>
      </div>

      <Modal
        title="Your Hair Care Tip"
        open={isModalOpen}
        onCancel={handleClose}
        onOk={handleClose}
        okText="Ok"
      >
        <p>
          Keep your hair healthy by washing it regularly with a 
          gentle shampoo and conditioner. Avoid excessive heat styling and harsh chemicals. 
          Eat a balanced diet, stay hydrated, and trim your hair regularly to prevent split ends. 
          Protect your hair from sun damage and use nourishing treatments to maintain shine and strength.
        </p>
      </Modal>
    </div>
  );
};

export default Profile;
