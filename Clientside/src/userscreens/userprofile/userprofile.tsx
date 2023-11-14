import  { useState } from "react";
import { useEffect } from "react";
import { axiosInstance } from "../../axiosInstances/userInstance";
import { login } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import UserNav from "../../components/user/navbar/userNav";
import Footer from "../../components/user/footer/footer";
import profile from "../assets/4333097.jpg";
import "./userprofile.css";



interface Trip{
  _id:string;
  pickuplocation:{
    name:string;

  },
  destination:{
    name:string;
  },
  createdAt:string;

  driverDetails:{
    name:string,
    phone:string
  }
  fare:number


}






function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userId = user?.user?._id;

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.user?.name || "");
  const [email, setEmail] = useState(user?.user?.email || "");
  const [phone, setPhone] = useState(user?.user?.phone || "");
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeUserData = async () => {
      const storedUserData = localStorage.getItem("userData");

      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);

        dispatch(login(parsedUserData));

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

    const parsedUserData = storedUserData?JSON.parse(storedUserData):null;

    const id = parsedUserData.user?._id;

    axiosInstance.get(`/finduser/${id ? id : userId}`).then((response) => {
      const user = response.data.user;
      if (user) {
        const trips = user.trips;
        setTrips(trips);
      } else {
        console.error("User data is undefined.");
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(trips);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const userid = localStorage.getItem("userData");
    const parsedUserData = userid?JSON.parse(userid):null;
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

      const response = await axiosInstance.put(
        `/editProfile/${
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
                      className="driver-profile-img"
                      src={profile}
                      style={{
                        width: "15rem",
                        height: "18rem",
                        paddingTop: "20%",
                      }}
                      alt=""
                    />
                    <h5 style={{ color: "black" }}>{username}</h5>

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
                      <h6 style={{ fontWeight: "bold" }}>Information</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6 style={{ fontWeight: "bold" }}>Username</h6>
                          {isEditing ? (
                            <input
                              type="text"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                          ) : (
                            <p
                              className="text-muted"
                              style={{ fontWeight: "bold" }}
                            >
                              {username}
                            </p>
                          )}
                        </div>
                        <div className="col-6 mb-3">
                          <h6 style={{ fontWeight: "bold" }}>Email</h6>
                          {isEditing ? (
                            <input
                              type="text"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          ) : (
                            <p
                              className="text-muted"
                              style={{ fontWeight: "bold" }}
                            >
                              {email}
                            </p>
                          )}
                        </div>

                        <div className="col-6 mb-3">
                          <h6 style={{ fontWeight: "bold" }}>Phone</h6>
                          {isEditing ? (
                            <input
                              type="text"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          ) : (
                            <p
                              className="text-muted"
                              style={{ fontWeight: "bold" }}
                            >
                              {phone}
                            </p>
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
                          {trips.map((trip, ) => (
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
                                    <span className="label">Driver Name:</span>{" "}
                                    {trip.driverDetails.name}-
                                  </p>
                                  <p className="driver-phone">
                                    {trip.driverDetails.phone}
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
  );
}

export default Profile;
