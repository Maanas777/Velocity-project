import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-toastify/dist/ReactToastify.css";
import MoonLoader from 'react-spinners/MoonLoader';
import { axiosAdminInstance } from "../../../axiosInstances/userInstance";




interface Driver {
  _id: string;
  Drivername: string;
  email: string;
  phone: string;
  isBlocked: boolean;
}

function ApprovedDriver() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [updateUi, setupdateUi] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log("Loading set to false");
    }, 4000);
  }, []);

  useEffect(() => {
    fetchData();
  }, [updateUi]);

  const blockdriver = (userid: string) => {
    const submit = () => {
      confirmAlert({
        title: "Do you Really want to block the Driver",

        buttons: [
          {
            label: "Yes",
            onClick: () => {
              axiosAdminInstance
                .put(`/blockDriver/${userid}`)
                .then((response) => {
                  console.log(response.data);
                  toast.success(response.data);
                  setupdateUi((prev) => !prev);
                })
                .catch((error) => {
                  console.error(error);
                  toast.error(error);
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

  const Unblockdriver = (userid: string) => {
    const submit = () => {
      confirmAlert({
        title: "Do you Really want to Unblock the Driver",

        buttons: [
          {
            label: "Yes",
            onClick: () => {
              axiosAdminInstance
                .put(`/UnblockDriver/${userid}`)
                .then((response) => {
                  console.log(response.data);
                  toast.success(response.data);
                  setupdateUi((prev) => !prev);
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

  const fetchData = () => {
    axiosAdminInstance
      .get("/approvedDriver")
      .then((response) => {
        console.log(response.data.drivers);
        setDrivers(response.data.drivers);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {loading ? (
      <div className="loader-container">
          <MoonLoader color='#4c36d6' size={60} loading={loading} />
        </div>
      ) : (
        <div>
          <ToastContainer />
          <Table bordered hover size="lg">
            <thead>
              <tr>
                <th>Driver id</th>
                <th style={{ width: "170px" }}>Name</th>
                <th style={{ width: "170px" }}>E-mail</th>
                <th>Phone</th>
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
                  <td>
                    {driver.isBlocked ? (
                      <button
                        onClick={() => Unblockdriver(driver._id)}
                        style={{ margin: "5px", borderRadius: "5px" }}
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        onClick={() => blockdriver(driver._id)}
                        style={{ margin: "5px", borderRadius: "5px" }}
                      >
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}

export default ApprovedDriver;
