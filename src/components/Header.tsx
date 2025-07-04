import { Layout, Menu } from "antd";
import { HomeOutlined, InfoCircleOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { HOME_PAGE, ABOUT, MASTER_PROFILE, PARTNERS  } from "../routes/paths";

const { Header } = Layout;

const HeaderComponent = () => {
  return (
    <Header style={{ display: "flex", alignItems: "center", backgroundColor: "#FFFFFF", borderBottom: "solid rgba(0, 0, 0, 0.5) 1px",  padding: "0" }}>
      <div style={{ color: "#000", fontSize: "20px", marginRight: "auto", marginLeft: "32px" }}>
        <NavLink to={HOME_PAGE} style={{ color: 'inherit' }}>Áva</NavLink>
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<HomeOutlined />} style={{backgroundColor: "white", color: "black"}}>
          <NavLink to={HOME_PAGE} style={{ color: 'inherit' }}>Home</NavLink>
        </Menu.Item>
        <Menu.Item key="2" icon={<InfoCircleOutlined />} style={{backgroundColor: "white", color: "black"}}>
          <NavLink to={ABOUT} style={{ color: 'inherit' }}>About us</NavLink>
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
          <NavLink to={MASTER_PROFILE} style={{ color: 'inherit' }}>Profile</NavLink>
        </Menu.Item>
        <Menu.Item key="4" icon={<TeamOutlined />}>
          <NavLink to={PARTNERS} style={{ color: 'inherit' }}>Our Partners</NavLink>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default HeaderComponent;
