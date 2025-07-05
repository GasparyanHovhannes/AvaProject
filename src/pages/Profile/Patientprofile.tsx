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
            : "No name available"}
        </Title>
      </div>
      <Button onClick={handleLogout} className="profile-btn">
        Logout
      </Button>
      <Divider className="custom-divider" />
      <Card>
        <Title level={5} className="shop-card">Shop</Title>
        <Text type="secondary">This is your personal information section.</Text>
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


// import "./Patientpofile.css";
// import {useState} from "react";
// import {Alert, Button, Divider, Flex, Space} from "antd";
// import AppointmentsTable from "./components/AppointmentsTable.tsx";
// import UserInfo from "./components/UserInfo.tsx";
// import {useNavigate} from "react-router-dom";
// import {BOOK_APPOINTMENT} from "../../routes/paths.ts";
// import {FileAddOutlined, LoginOutlined} from "@ant-design/icons";
// import EditUserInfo from "./components/EditUserInfo.tsx";
// import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
// import {auth} from "../../services/apiService.ts";
// import {signOut} from "firebase/auth";import { clearUser } from "../../features/userSlice.ts";
// import { setPatient } from "../../features/patientSlice.ts";

// const Profile = () => {
//   const navigate = useNavigate();
//   const [isEditing, setIsEditing] = useState(false);
//   const dispatch = useAppDispatch();

//     const handleEdit = () => {
//         setIsEditing(!isEditing);
//     };

//     const handleLogOutClick = async () => {
//         await signOut(auth);
//         localStorage.removeItem('authToken');
//         dispatch(clearUser());
//         dispatch(setPatient(null));
//         dispatch(setAppointments([]));
//         navigate('/login');
//     };

// return (
//     <>
//       <Flex align={"center"} justify={"end"}>
//           <Button onClick={handleLogOutClick} danger>
//              {translate("logOut")}
//              <LoginOutlined />
//           </Button>
//       </Flex>
//       {!isEditing ? (
//         <UserInfo onSetIsEditing={handleEdit} />
//       ) : (
//         <EditUserInfo onSetIsEditing={handleEdit} />
//       )}
//       <Divider>
//         <Space wrap>
//           {translate("yourApp")}
//           <Button
//             color="default"
//             variant="outlined"
//             onClick={() => navigate(BOOK_APPOINTMENT)}
//           >
//             <FileAddOutlined />
//             {translate("bookAppointment")}
//           </Button>
//         </Space>
//       </Divider>
//       {!!appointments?.length && <AppointmentsTable />}
//       {!appointments?.length && (
//         <Alert message={translate("alertMessage")} type="info" />
//       )}
//     </>
//   );
// };

// export default Profile;
