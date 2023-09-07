import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-toastify/dist/ReactToastify.css';

interface User {
  _id: string;
  username: string;
  email: string;
  phone: string;
  isBlocked: boolean;
}

function Adminuser() {
  const [users, setusers] = useState<User[]>([]);
  const [updateUi, setupdateUi] = useState(false)

  useEffect(() => {
    fetchData()
   
  }, [updateUi]);


  const fetchData = () => {
    axios.get("http://localhost:3003/api/admin/users")
      .then((response) => {
        console.log(response.data.users);
        setusers(response.data.users);
      })
      .catch((error) => {
        console.error(error);
      });
  };



  const blockuser = (userid: string) => {
    const submit = () => {
      confirmAlert({
        title: "Do you Really want to block the User",
 
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              axios
                .put(`http://localhost:3003/api/admin/blockUser/${userid}`)
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

  const Unblockuser = (userid: string) => {
    const submit = () => {
      confirmAlert({
        title: "Do you Really want to Unblock the User",
      
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              axios
                .put(`http://localhost:3003/api/admin/UnblockUser/${userid}`)
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


















  return (
    <div>
         <ToastContainer/>
      <Table bordered hover size="lg">
        <thead>
          <tr>
            <th>User id</th>
            <th>Name</th>
            <th>E-mail</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>

              <td>
                {user.isBlocked ? (
                  <button
                    onClick={() => Unblockuser(user._id)}
                    style={{ margin: "5px", borderRadius: "5px" }}
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    onClick={() => blockuser(user._id)}
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
  );
}

export default Adminuser;
