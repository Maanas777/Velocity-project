import React from "react";
// import 'antd/dist/reset.css';
import { Routes, Route } from "react-router-dom";
import { Menu } from "antd";
import {
  DashboardOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";


import Table from "../table";







const navbar = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100vh",
      }}
    >
      <Header />

      <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
        <Sidemenu />
        <Content />
      </div>

      <Footer />
    </div>
  );
};

function Header() {
  return (
    <div
      style={{
        height: "5rem",
        backgroundColor: "lightskyblue",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
      }}
    >
      Admin Pannel
    </div>
  );
}

function Footer() {
  return (
    <div
      style={{
        height: "5rem",
        backgroundColor: "#A7ACC3",
        color: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
      }}
    >
      Footer
    </div>
  );
}

function Sidemenu() {
  return (
    <div style={{ paddingBottom: "4rem" }}>
      <Menu mode="vertical" style={{ height: "60vh" }}>
        <Menu.Item style={{ marginBottom: "10px" }} icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item
          style={{ marginBottom: "10px" }}
          icon={<DashboardOutlined />}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          style={{ marginBottom: "10px" }}
          icon={<UnorderedListOutlined />}
        >
          Drivers
        </Menu.Item>
        <Menu.Item
          style={{ marginBottom: "10px" }}
          icon={<UserSwitchOutlined />}
        >
          Driver verification
        </Menu.Item>
      </Menu>
    </div>
  );
}

function Content() {
  return (
    <div>
      <Routes>
        <Route path="table" element={Table}></Route>
        <Route path="Drivers" element={<div>Drivers</div>}></Route>
      </Routes>
    </div>
  );
}

export default navbar;
