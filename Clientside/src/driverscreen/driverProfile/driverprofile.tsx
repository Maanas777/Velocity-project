import DriverNav from "../../components/driver/drivernav/driverNav";

import React, { useState } from "react";
import { useEffect } from "react";
import { login } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import Footer from "../../components/user/footer/footer";
import profile from "../assets/pngwing.com (1).png";

import axios from "axios";

function Profile() {
  const dispatch = useDispatch();
  const driver = useSelector(selectUser);

  const [isEditing, setIsEditing] = useState(false);
  const [Drivername, setDrivername] = useState(
    driver?.driver?.Drivername || ""
  );
  const [email, setEmail] = useState(driver?.driver?.email || "");
  const [phone, setPhone] = useState(driver?.driver?.phone || "");
  const [isLoading, setIsLoading] = useState(true);





  
  useEffect(() => {
    const initializeUserData = async () => {
      const storedDriverData = localStorage.getItem("DriverData");
  
      if (storedDriverData) {
        const parsedDriverData = JSON.parse(storedDriverData);
        dispatch(login(parsedDriverData));
        console.log(parsedDriverData.driver?.Drivername);
  
        if (parsedDriverData && parsedDriverData.driver) {
          setDrivername(parsedDriverData.driver.Drivername || '');
          setEmail(parsedDriverData.driver.email || '');
          setPhone(parsedDriverData.driver.phone || '');
        } else if (parsedDriverData) {
          setDrivername(parsedDriverData.Drivername || '');
          setEmail(parsedDriverData.email || '');
          setPhone(parsedDriverData.phone || '');
        } else {
          setDrivername('');
          setEmail('');
          setPhone('');
        }
  
        setIsLoading(false);
      }
    };
  
    initializeUserData();
  }, [dispatch]);
  




  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const userid = localStorage.getItem("DriverData");

    const parsedUserData = JSON.parse(userid);
    const userId = parsedUserData?._id;
    const userId2 = parsedUserData.driver?._id;
    console.log(userId, "00990");
    console.log(userId2, "madnawdsafd");

    try {
      if (userId || userId2) {
        console.log("User data available.");
        const updatedUserData = {
          Drivername,
          email,
          phone,
        };

        const response = await axios.put(
          `http://localhost:3003/api/drivers/editprofile/${
            userId ? userId : userId2
          }`,
          updatedUserData
        );

        if (response.data.updateUser) {
          const updatedUser = response.data.updateUser;
          dispatch(login(updatedUser));
          localStorage.setItem("DriverData", JSON.stringify(updatedUser));
          setIsEditing(false);
        } else {
          console.log("Server did not respond with updated user data.");
        }
      } else {
        console.log("User data not available yet.");
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
      <DriverNav />
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
                    <h5>{Drivername}</h5>

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
                              value={Drivername}
                              onChange={(e) => setDrivername(e.target.value)}
                            />
                          ) : (
                            <p className="text-muted">{Drivername}</p>
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
