import "./Patientpofile.css"
import { Button } from "antd";
import { signOut } from "firebase/auth";
import { auth } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearUser, selectUserData } from "../../features/userSlice";
import {Avatar, Typography, Divider, Card} from "antd";
import PatientImage from "../../assets/review2.png"

const { Title, Text } = Typography;

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUserData);

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
            : "No email available"}
        </Title>
        <Title level={4}>
          {user?.type
            ? `hair type = ${user.type}`
            : "No type available"
          }
        </Title>
      </div>
      <Button onClick={handleLogout} className="profile-btn">
        Logout
      </Button>
      <Divider className="custom-divider" />
      <Card>
        <Title level={5} className="shop-card">Shop</Title>
        <Text type="secondary">
          {(() => {
            const products = [
              { type: "1", name: "C" },
              { type: "2", name: "A" },
              { type: "3", name: "B" },
              { type: "4", name: "D" },
            ];
            if (!user?.type) return "This is your personal information section.";
            const matched = products.filter(p => p.type === user.type);
            return matched.length
              ? `Products for your hair type: ${matched.map(p => p.name).join(", ")}`
              : "No products for your hair type.";
          })()}
        </Text>
      </Card>
      <Card>
        <Title level={5} className="appointments-card">Appointments</Title>
        <Text type="secondary">This is your appointments section.</Text>
      </Card>
      <Card>
        <Title level={5} className="haircare-card">Hair Care</Title>
        <Text type="secondary">This is your settings section.</Text>
      </Card>
    </div>
  );
};

export default Profile;