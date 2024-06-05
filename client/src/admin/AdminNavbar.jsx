import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
// import Logo from "../img/logo.png";
import { Layout, Menu, Typography } from "antd";
import { SettingOutlined } from "@ant-design/icons";
const { Header } = Layout;
const { Text } = Typography;

const AdminNavbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigation = useNavigate();
  const items = [
    {
      key: "sub1",
      label: (
        <Text style={{ marginLeft: "10px", color: "white" }}>
          <SettingOutlined /> {currentUser.username ?? ""}
        </Text>
      ),
      children: [
        {
          key: "1",
          label: (
            <Text style={{ marginLeft: "10px", color: "white" }}>
              💀 Logout
            </Text>
          ),
        },
      ],
    },
  ];

  const onClick = (e) => {
    if (e.key === "1") {
      logout();
      navigation("/login");
    }
  };

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "10vh",
      }}
      width="100%"
    >
      <Link
        to="/"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={"https://lezzoo.com/images/Group.png"}
          alt="logo"
          style={{ height: "50px" }}
        />
      </Link>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          mode="horizontal"
          style={{
            lineHeight: "64px",
            marginLeft: "200px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "wheat",
          }}
        >
          <Link to="/admin/users">
            <Text
              style={{
                marginLeft: "20px",
                color: "white",
              }}
            >
              All-Users
            </Text>
          </Link>
        </div>

        {currentUser ? (
          <Menu
            onClick={onClick}
            style={{
              width: 200,
            }}
            mode="horizontal"
            items={items}
            theme="dark"
            color="white"
          />
        ) : (
          <Menu.Item key="login">
            <Link to="/login">Login</Link>
          </Menu.Item>
        )}
      </div>
    </Header>
  );
};

export default AdminNavbar;
