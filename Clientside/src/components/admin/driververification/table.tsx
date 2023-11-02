import  { useEffect, useState } from "react";
import axios from "axios";
import './tables.css'
import { ToastContainer, toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-toastify/dist/ReactToastify.css";
import Table from "react-bootstrap/Table";

interface Driver {
  _id: string;
  Drivername: string;
  email: string;
  phone: string;
  RCNo: string;
  licenseno: string;
  VehicleModel:string;
  vehicleNo:string;
  vehiclePhoto:string;


}

function ResponsiveExample() {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3003/api/admin/driver").then((response) => {
      setDrivers(response.data.drivers);
      console.log(response.data.drivers);
    });
  }, []);

  const acceptdriver = (id: string) => {
    const submit = () => {
      confirmAlert({
        title: "Confirm to submit",
        message: "Are you sure to accept him as driver.",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              axios
                .put(`http://localhost:3003/api/admin/acceptdriver/${id}`)
                .then((response) => {
                  console.log(response.data);
                  toast.success(response.data);
                })
                .catch((error) => {
                  console.error(error);
                });
            },
          },
          {
            label: "No",
          },
        ],
      });
    };

    submit();
  };

  return (
  
    <div >
        <div className="verification">
      <ToastContainer />
      <Table bordered hover size="lg">
        <thead>
          <tr>
            <th>Driver id</th>
            <th style={{ width: "170px" }}>Name</th>
            <th style={{ width: "170px" }}>E-mail</th>
            <th>Phone</th>
            <th>RC No</th>
            <th>License No</th>
            <th style={{ width: "4rem" }}>Vehicle Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver, index) => (
            <tr key={index}>
              <td>{driver._id}</td>
              <td>{driver.Drivername}</td>
              <td>{driver.email}</td>
              <td>{driver.phone}</td>
              <td>{driver.RCNo}</td>
              <td>{driver.licenseno}</td>
              <td>
                <div>
                  <img src={driver.vehiclePhoto} alt="" />
                </div>
                <div style={{ width: "15rem" }}>
                 <span style={{color: "blue", fontWeight: "bold"}}> Model:</span>
                  <span style={{ fontWeight: "bold" }}>
                    {driver.VehicleModel}
                    <br />
                  </span>
                </div>
                <div>
                  <span style={{ color: "blue", fontWeight: "bold" }}>
                    vehicle No:{" "}
                  </span>
                  <span style={{ fontWeight: "bold" }}>{driver.vehicleNo}</span>
                </div>{" "}
              </td>
              <td>
                <div style={{ display: "flex" }}>
                  <button
                    onClick={() => acceptdriver(driver._id)}
                    style={{ margin: "5px", borderRadius: "5px" }}
                  >
                    Accept
                  </button>
                  <button style={{ margin: "5px", borderRadius: "5px" }}>
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {/* Add more rows with the same structure */}
        </tbody>
      </Table>
    </div>
    </div>
  );
}

export default ResponsiveExample;
