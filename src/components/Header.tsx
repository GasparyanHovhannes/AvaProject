// import { Layout, Menu } from "antd";
// import {
//   HomeOutlined,
//   InfoCircleOutlined,
//   UserOutlined,
//   TeamOutlined,
// } from "@ant-design/icons";
// import { NavLink } from "react-router-dom";
// import { HOME_PAGE, ABOUT, PROFILE, LOGIN, DOCTOR_PAGE, PARTNERS, MASTER_PROFILE, SHOP } from "../routes/paths";
// import { useAppSelector } from "../app/hooks";
// import {
//   selectUserData,
//   selectUserRole,
//   selectUserEmailStatus,
// } from "../features/userSlice";
// import { useNavigate } from "react-router-dom";

// const { Header } = Layout;

// const HeaderComponent = () => {
//   const navigate = useNavigate();
//   const userData = useAppSelector(selectUserData);
//   const userRole = useAppSelector(selectUserRole);
//   const userStatus = useAppSelector(selectUserEmailStatus);

//   const isLoggedIn = Boolean(userData && userStatus);
//   const profileLink =
//     isLoggedIn && userRole === "doctor"
//       ? DOCTOR_PAGE
//       : isLoggedIn
//       ? PROFILE
//       : LOGIN;

//   const menuItems = [
//     {
//       key: "home",
//       icon: <HomeOutlined />,
//       label: <NavLink to={HOME_PAGE} style={{ color: "inherit" }}>Home</NavLink>,
//     },
//     {
//       key: "about",
//       icon: <InfoCircleOutlined />,
//       label: <NavLink to={ABOUT} style={{ color: "inherit" }}>About</NavLink>,
//     },
//     {
//       key: "profile",
//       icon: <UserOutlined />,
//       label: <NavLink to={profileLink} style={{ color: "inherit" }}>Profile</NavLink>,
//     },
//   ];

//   return (

//     <Header style={{ display: "flex", alignItems: "center", backgroundColor: "#FFFFFF", borderBottom: "solid rgba(0, 0, 0, 0.5) 1px", width: "100%", padding: "0" }}>



//       <div style={{ color: "#000", fontSize: "20px", marginRight: "auto", marginLeft: "32px" }}>
//         <NavLink to={HOME_PAGE} style={{ color: 'inherit' }}>Áva</NavLink>
//       </div>
//       <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
//         <Menu.Item key="1" icon={<HomeOutlined />} style={{backgroundColor: "white", color: "black"}}>
//           <NavLink to={HOME_PAGE} style={{ color: 'inherit' }}>Home</NavLink>
//         </Menu.Item>
//         <Menu.Item key="2" icon={<InfoCircleOutlined />} style={{backgroundColor: "white", color: "black"}}>
//           <NavLink to={ABOUT} style={{ color: 'inherit' }}>About us</NavLink>
//         </Menu.Item>
//         <Menu.Item key="3" icon={<UserOutlined />}>
//           <NavLink to={profileLink} style={{ color: 'inherit' }}>Profile</NavLink>
//         </Menu.Item>
//         <Menu.Item key="4" icon={<TeamOutlined />}>
//           <NavLink to={PARTNERS} style={{ color: 'inherit' }}>Our Partners</NavLink>
//         </Menu.Item>
//         <Menu.Item key="4" icon={<UserOutlined />}>
//           <NavLink to={SHOP} style={{ color: 'inherit' }}>Shop</NavLink>
//         </Menu.Item>
//       </Menu>

//     </Header>
//   );
// };

// export default HeaderComponent;
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  InfoCircleOutlined,
  UserOutlined,
  TeamOutlined,
  ShoppingOutlined
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import {
  HOME_PAGE,
  ABOUT,
  PROFILE,
  LOGIN,
  PARTNERS,
  MASTER_PROFILE,
  SHOP
} from "../routes/paths";
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
      ? MASTER_PROFILE
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
      label: <NavLink to={ABOUT} style={{ color: "inherit" }}>About us</NavLink>,
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: (
        <NavLink to={profileLink} style={{ color: "inherit" }}>
          {isLoggedIn ? "Profile" : "Login"}
        </NavLink>
      ),
    },
    {
      key: "partners",
      icon: <TeamOutlined />,
      label: <NavLink to={PARTNERS} style={{ color: "inherit" }}>Our Partners</NavLink>,
    },
    {
      key: "shop",
      icon: <ShoppingOutlined />,
      label: <NavLink to={SHOP} style={{ color: "inherit" }}>Shop</NavLink>,
    },
  ];

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderBottom: "solid rgba(0, 0, 0, 0.5) 1px",
        width: "100%",
        padding: "0",
      }}
    >
      <div
        style={{
          color: "#000",
          fontSize: "20px",
          marginRight: "auto",
          marginLeft: "32px",
        }}
      >
        <NavLink to={HOME_PAGE} style={{ color: "inherit" }}>
          Áva
        </NavLink>
      </div>

      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={["home"]}
        items={menuItems}
        style={{ backgroundColor: "white", color: "black" }}
      />
    </Header>
  );
};

export default HeaderComponent;