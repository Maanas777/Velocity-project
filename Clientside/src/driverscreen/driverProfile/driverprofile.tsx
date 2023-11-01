import DriverNav from "../../components/driver/drivernav/driverNav";
import  { useState } from "react";
import "./driverprofile.css";
import { useEffect } from "react";
import { axiosDriverInstance } from "../../axiosInstances/userInstance";
import { login } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import Footer from "../../components/user/footer/footer";
import profile from "./4333097.jpg";
import ClipLoader from "react-spinners/ClipLoader";



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
  const [loading, setLoading] = useState(false);

  const [trips, setTrips] = useState([]);



  









  useEffect(() => {
    const initializeUserData = async () => {

      setLoading(true);
      const storedDriverData = localStorage.getItem("DriverData");

      if (storedDriverData) {
        const parsedDriverData = JSON.parse(storedDriverData);
        dispatch(login(parsedDriverData));
        console.log(parsedDriverData.driver?.Drivername);

        if (parsedDriverData && parsedDriverData.driver) {
          setDrivername(parsedDriverData.driver.Drivername || "");
          setEmail(parsedDriverData.driver.email || "");
          setPhone(parsedDriverData.driver.phone || "");
        } else if (parsedDriverData) {
          setDrivername(parsedDriverData.Drivername || "");
          setEmail(parsedDriverData.email || "");
          setPhone(parsedDriverData.phone || "");
        } else {
          setDrivername("");
          setEmail("");
          setPhone("");
        }

    
      }
      setLoading(false);
    };

    initializeUserData();
  }, [dispatch]);

  const handleEditClick = () => {
    setIsEditing(true);
  };



  const userid = localStorage.getItem("DriverData");

  const parsedUserData = JSON.parse(userid);
  const userId = parsedUserData?._id;
  const userId2 = parsedUserData.driver?._id;
  console.log(userId, "00990");
  console.log(userId2, "madnawdsafd");





  const handleSaveClick = async () => {



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




  useEffect(()=>{

    axiosDriverInstance.get(`/driverhistory/${ userId ? userId : userId2}`)
    .then((response)=>{
      console.log(response);
      setTrips(response?.data?.trips);
      setLoading(false);
      
    }).catch((error)=>{
      console.log(error);
    
      
    })
  
  
  },[])
  
  return (
    <div>
      <DriverNav />

      {loading ? (
   <ClipLoader
   color='#36d7b7'
   loading={loading}

   size={150}
   aria-label="Loading Spinner"
   data-testid="loader"
 />
):(
      <div>
        <section className="driverprofilebackground vh-100">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="borerProfile col col-lg-12 mb-4 mb-lg-0 ">
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
                        className="driver-profile-img"
                        src={profile}
                        style={{
                          width: "15rem",
                          height: "18rem",
                          paddingTop: "20%",
                        }}
                        alt=""
                      />
                      <h5 style={{ color: "black" }}>{Drivername}</h5>

                      {!isEditing && (
                        <button
                          style={{ marginTop: "10px" }}
                          className="btn btn-primary"
                          onClick={handleEditClick}
                        >
                          Edit Profile
                        </button>
                      )}
                    </div>
                    <div className="col-md-8">
                      <div className="card-body p-4">
                        <h6 style={{ fontWeight: "bold" }} >Information</h6>
                        <hr className="mt-0 mb-4" />
                        <div className="row pt-1">
                          <div className="col-6 mb-3">
                            <h6 style={{ fontWeight: "bold" }} >DriverName</h6>
                            {isEditing ? (
                              <input
                                type="text"
                                value={Drivername}
                                onChange={(e) => setDrivername(e.target.value)}
                              />
                            ) : (
                              <p style={{ fontWeight: "bold" }}  className="text-muted">{Drivername}</p>
                            )}
                          </div>
                          <div className="col-6 mb-3">
                            <h6 style={{ fontWeight: "bold" }} >Email</h6>
                            {isEditing ? (
                              <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            ) : (
                              <p style={{ fontWeight: "bold" }}  className="text-muted">{email}</p>
                            )}
                          </div>

                          <div className="col-6 mb-3">
                            <h6 style={{ fontWeight: "bold" }} >Phone</h6>
                            {isEditing ? (
                              <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                              />
                            ) : (
                              <p style={{ fontWeight: "bold" }}  className="text-muted">{phone}</p>
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
                        <div className="text-trip-history">
                          <h4 className="trip-history-title">Trip History</h4>
                        </div>
                        <div className="trip-history">
                          {trips.map((trip, index)=>(
                            <div key={trip._id} className="trip-item">
                              <div className="profile-date">
                                <div className="trip-location">
                                  <h5 style={{ fontWeight: "bolder" }}>
                                    {trip.pickuplocation.name} To{" "}
                                    {trip.destination.name}
                                  </h5>
                                </div>
                                <p className="date-time">
                                  <span className="date">
                                    {new Date(
                                      trip.createdAt
                                    ).toLocaleDateString(undefined, {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    })}
                                  </span>
                                  <span className="time">
                                    Time:{" "}
                                    {new Date(
                                      trip.createdAt
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </span>
                                </p>
                                <div className="driver-details">
                                  <p className="driver-name">
                                    <span className="label">User Name:</span>{" "}
                                    {trip.user.username}-
                                  </p>
                                  <p className="driver-phone">
                                    {trip.user.phone}
                                  </p>
                                </div>
                                <p className="fare">
                                  <span className="label">Fare:</span> ₹
                                  {trip.fare}
                                </p>
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
      )}
    </div>

  );
  
}

export default Profile;
