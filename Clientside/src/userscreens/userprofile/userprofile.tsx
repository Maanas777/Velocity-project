import React, { useState } from "react";
import { useEffect } from "react";
import {axiosInstance} from "../../axiosInstances/userInstance";
import { login } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import UserNav from "../../components/user/navbar/userNav";
import Footer from "../../components/user/footer/footer";
import profile from "../assets/pngwing.com (1).png";
import "./userprofile.css";
import axios from "axios";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userId = user?.user?._id;
  console.log(userId, "packupaafhsakjfhsakjfh");

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.user?.name || "");
  const [email, setEmail] = useState(user?.user?.email || "");
  const [phone, setPhone] = useState(user?.user?.phone || "");
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeUserData = async () => {
      const storedUserData = localStorage.getItem("userData");

      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        console.log(parsedUserData, "parsed");

        dispatch(login(parsedUserData));
        console.log(parsedUserData.username, "uhhhkjhkjhjkhj");

        if (parsedUserData && parsedUserData.user) {
          setUsername(parsedUserData.user.username || "");
          setEmail(parsedUserData.user.email || "");
          setPhone(parsedUserData.user.phone || "");
        } else if (parsedUserData) {
          setUsername(parsedUserData.username || "");
          setEmail(parsedUserData.email || "");
          setPhone(parsedUserData.phone || "");
        } else {
          setUsername("");
          setEmail("");
          setPhone("");
        }
      }

      setIsLoading(false);
    };

    initializeUserData();
  }, [dispatch]);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    const parsedUserData = JSON.parse(storedUserData);
    console.log(parsedUserData.user?._id, "parsed");
    const id = parsedUserData.user?._id; 
    console.log(id, "hallooeerhfdfjfn");

    axiosInstance.get(`/finduser/${id ? id : userId}`).then((response) => {
      const user = response.data.user;
      if (user) {
        const trips = user.trips;
        setTrips(trips);
      } else {
        console.error("User data is undefined.");
      }
    });
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const userid = localStorage.getItem("userData");
    const parsedUserData = JSON.parse(userid);
    const userId = parsedUserData._id;
    const userId2 = parsedUserData.user?._id;

    try {
      if (!userid) {
        console.log("User data not available yet.");
        return;
      }

      const updatedUserData = {
        username,
        email,
        phone,
      };

      const response = await axios.put(
        `http://localhost:3003/api/users/editProfile/${
          userId ? userId : userId2
        }`,
        updatedUserData
      );

      if (response.data.updateUser) {
        const updatedUser = response.data.updateUser;

        dispatch(login(updatedUser));
        localStorage.setItem("userData", JSON.stringify(updatedUser));
        setIsEditing(false);
      } else {
        console.log("Server did not respond with updated user data.");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <UserNav />
      <section className="userprofilebackground vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className=" borerProfile col col-lg-12 mb-4 mb-lg-0 ">
              <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                <div className="row g-0">
                  <div
                    className="col-md-4 gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                  >
                    <img
                      src={profile}
                      style={{
                        width: "9rem",
                        height: "13rem",
                        paddingTop: "20%",
                      }}
                      alt=""
                    />
                    <h5>{username}</h5>

                    {!isEditing && (
                      <button
                        className="btn btn-primary"
                        onClick={handleEditClick}
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h6>Information</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Username</h6>
                          {isEditing ? (
                            <input
                              type="text"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                          ) : (
                            <p className="text-muted">{username}</p>
                          )}
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Email</h6>
                          {isEditing ? (
                            <input
                              type="text"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          ) : (
                            <p className="text-muted">{email}</p>
                          )}
                        </div>

                        <div className="col-6 mb-3">
                          <h6>Phone</h6>
                          {isEditing ? (
                            <input
                              type="text"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          ) : (
                            <p className="text-muted">{phone}</p>
                          )}
                        </div>
                      </div>
                      {isEditing ? (
                        <button
                          className="btn btn-success"
                          onClick={handleSaveClick}
                        >
                          Save
                        </button>
                      ) : null}
                      <div>
                        <h4
                          className="
                       "
                        >
                          Trip History
                        </h4>
                        <div className="history">
                          {trips.map((trip, index) => (
                            <div key={trip._id}>
                              <div className="triphistoryUser">
                              <div className="profiledate">
                                <p>
                                  {" "}
                                  {new Date(trip.createdAt).toLocaleDateString(
                                    undefined,
                                    {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    }
                                  )}
                                </p>
                                <p>
                                  {" "}
                                  Time :{" "}
                                  {new Date(trip.createdAt).toLocaleTimeString(
                                    [],
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}
                                </p>
                                </div>
                                <p>
                                  Pickup Location: {trip.pickuplocation.name}
                                </p>
                                <p>Destination: {trip.destination.name}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Profile;
