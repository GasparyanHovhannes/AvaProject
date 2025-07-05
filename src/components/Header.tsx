import { Layout, Menu, Typography, Drawer, Button } from "antd";
import {
  HomeOutlined,
  InfoCircleOutlined,
  UserOutlined,
  TeamOutlined,
  ShoppingOutlined,
  MenuOutlined
} from "@ant-design/icons";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
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
import React, { useState } from "react";

const { Header } = Layout;
const { Text } = Typography;

const HeaderComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const [drawerOpen, setDrawerOpen] = useState(false);

  // Определяем, мобильный ли экран
  const isMobile = window.innerWidth < 768;

  // Для активного пункта меню
  const getSelectedKey = () => {
    if (location.pathname.startsWith("/about")) return "about";
    if (location.pathname.startsWith("/profile")) return "profile";
    if (location.pathname.startsWith("/partners")) return "partners";
    if (location.pathname.startsWith("/shop")) return "shop";
    return "home";
  };

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderBottom: "solid rgba(0, 0, 0, 0.5) 1px",
        width: "100%",
        padding: "0",
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: "#000",
          fontSize: "20px",
          marginRight: "auto",
          marginLeft: "32px",
          fontWeight: 700,
          letterSpacing: 2,
        }}
      >
        <NavLink to={HOME_PAGE} style={{ color: "inherit", textDecoration: "none", width: "50px" }}>
          <Text strong style={{ fontSize: 24, color: "#1b120e" }}>Áva</Text>
        </NavLink>
      </div>

      {/* Бургер-меню для мобильных */}
      {isMobile ? (
        <>
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 24 }} />}
            onClick={() => setDrawerOpen(true)}
            style={{ marginRight: 16 }}
          />
          <Drawer
            title="Menu"
            placement="right"
            onClose={() => setDrawerOpen(false)}
            open={drawerOpen}
            bodyStyle={{ padding: 0 }}
          >
            <Menu
              mode="vertical"
              selectedKeys={[getSelectedKey()]}
              items={menuItems}
              onClick={() => setDrawerOpen(false)}
            />
          </Drawer>
        </>
      ) : (
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[getSelectedKey()]}
          items={menuItems}
          style={{ backgroundColor: "white", color: "black", minWidth: 400 }}
        />
      )}
    </Header>
  );
};

export default HeaderComponent;