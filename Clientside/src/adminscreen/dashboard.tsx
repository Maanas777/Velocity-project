import React from "react";
import Sidebar from "../components/admin/sidebar/sidebar";
import Table from "../components/admin/table";
import "./dashboard.css";
// import { Col, Row } from 'react-bootstrap';
// import Navbar from '../components/admin/navbar/navbar';

const Dashboard = () => {
  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div className="container">
        <Table />
      </div>
    </div>
  );
};

export default Dashboard;
