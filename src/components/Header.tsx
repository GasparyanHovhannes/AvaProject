import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  InfoCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { HOME_PAGE, ABOUT, PROFILE, LOGIN, DOCTOR_PAGE } from "../routes/paths";
import { useAppSelector } from "../app/hooks";
import {
  selectUserData,
  selectUserRole,
  selectUserEmailStatus,
} from "../features/userSlice";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const HeaderComponent = () => {
  const navigate = useNavigate();
  const userData = useAppSelector(selectUserData);
  const userRole = useAppSelector(selectUserRole);
  const userStatus = useAppSelector(selectUserEmailStatus);

  const isLoggedIn = Boolean(userData && userStatus);
  const profileLink =
    isLoggedIn && userRole === "doctor"
      ? DOCTOR_PAGE
      : isLoggedIn
      ? PROFILE
      : LOGIN;

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: <NavLink to={HOME_PAGE} style={{ color: "inherit" }}>Home</NavLink>,
    },
    {
      key: "about",
      icon: <InfoCircleOutlined />,
      label: <NavLink to={ABOUT} style={{ color: "inherit" }}>About</NavLink>,
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: <NavLink to={profileLink} style={{ color: "inherit" }}>Profile</NavLink>,
    },
  ];

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#001529",
      }}
    >
      <div style={{ color: "#fff", fontSize: "20px", marginRight: "auto" }}>
        MyApp
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["home"]} items={menuItems} />
    </Header>
  );
};

export default HeaderComponent;
