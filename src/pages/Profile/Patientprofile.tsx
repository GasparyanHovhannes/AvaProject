import { Button } from "antd";
import { signOut } from "firebase/auth";
import { auth } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { clearUser } from "../../features/userSlice";

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    <div>
      <h1>Profile Page</h1>
      <Button type="primary" danger onClick={handleLogout}>
        Logout
      </Button>
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
