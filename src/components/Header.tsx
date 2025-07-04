import { Layout, Menu } from "antd";
import { HomeOutlined, InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { HOME_PAGE, ABOUT, PROFILE  } from "../routes/paths";

const { Header } = Layout;

const HeaderComponent = () => {
  return (
    <Header style={{ display: "flex", alignItems: "center", backgroundColor: "#001529" }}>
      <div style={{ color: "#fff", fontSize: "20px", marginRight: "auto" }}>
        MyApp
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <NavLink to={HOME_PAGE} style={{ color: 'inherit' }}>Home</NavLink>
        </Menu.Item>
        <Menu.Item key="2" icon={<InfoCircleOutlined />}>
          <NavLink to={ABOUT} style={{ color: 'inherit' }}>About</NavLink>
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
          <NavLink to={PROFILE} style={{ color: 'inherit' }}>Profile</NavLink>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default HeaderComponent;
