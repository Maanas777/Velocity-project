import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { axiosDriverInstance } from "../../../axiosInstances/userInstance";
import "./driverDetails.css";
import { io } from "socket.io-client";
import { axiosInstance } from "../../../axiosInstances/userInstance";
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";


const socket = io("http://localhost:3003");

const cardBodyStyle = {
  backgroundColor: "#f1bf29",
};

const DriverDetails = () => {

  const nav=useNavigate()


  const [payment, setPayment] = useState(false);
  const [start, setstart] = useState(false);
  const [showModal, setShowModal] = useState(false);



  const driver = useLocation();
  console.log(driver, "driverrrr");

  const data = localStorage.getItem("userData");
  const userdetails = JSON.parse(data);
  console.log(userdetails.user.username);

  const user = userdetails.user.username;

  
  const id = driver?.state?.tripId;

  const driverName = driver?.state?.driverdetails?.driver?.Drivername;
  const VehicleModel = driver?.state?.driverdetails?.driver?.VehicleModel;
  const driverPhoto = driver?.state?.driverdetails?.driver?.vehiclePhoto;
  const contactNumber = driver?.state?.driverdetails?.driver?.phone;
  const distance = driver?.state?.distance;
  const fair = driver?.state?.fare;

  const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID;


const homeGo=()=>{
  nav('/userhome')
}

  const feedbackButton=()=>{
   nav('/review')

  }





useEffect(() => {
  
  socket.on("ride_started", (data) => {
    console.log(data);
    localStorage.setItem('startedRide', 'true');
    setstart(true);
  });
  
}, [])




useEffect(() => {
  
  socket.on("ride_completed", (data)=>{
    console.log(data);
    localStorage.removeItem('startedRide')
    setShowModal(true)
    const update=axiosDriverInstance.put(`/completeride/${id}`)
    console.log(update);
    

    
  });

}, [])




  useEffect(()=>{
    const isRideStarted = localStorage.getItem('startedRide') === 'true';
 
    if (isRideStarted) {
      console.log("hiii");
      
      setstart(true);
    }


  },[])







  useEffect(() => {
    const paymentComplete = async () => {
      try {
        const response = await axiosInstance.get(`/findTrip/${id}`);
        console.log(response.data.Isfarepaid, "paymentt");
        if (response.data.Isfarepaid) {
          setPayment(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    paymentComplete();
  }, []);




  const initPayment = (data) => {
    console.log(data, "dayeeeee");
    const options = {
      key: keyId || "",
      name: user,
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,

      handler: async (response) => {
        console.log(response, "respondeeee");
        try {
          const { data } = await axiosInstance.post(
            `/verify?nocache=${new Date().getTime()}`,
            response
          );
          console.log(data, "dattaaaaaaa");
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const { data } = await axiosInstance.post("/payment", { id });
      initPayment(data.data);
      setPayment(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">


      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card mt-5">
            <div className="card-header">
              <h2 style={{ fontWeight: "bolder", marginTop: "10px" }}>
                Driver Details
              </h2>
            </div>
            <div className="card-body-driver-details" style={cardBodyStyle}>
              <div className="row">
                <div className="col-md-6">
                  <h4 style={{ fontWeight: "bold" }}>Name</h4>
                  <p>{driverName}</p>
                  <h4 style={{ fontWeight: "bold" }}>Contact Number</h4>
                  <p>{contactNumber}</p>
                  <h4 style={{ fontWeight: "bold" }}>Total Distance</h4>
                  <p style={{ fontWeight: "bold" }}>{distance} kms</p>
                  <h4 style={{ fontWeight: "bold" }}>
                    {start ? (
                      <span style={{ color: "#b30c0ca8" }}>Ride Started....</span>
                    ) : (
                      "Amount to Pay"
                    )}
                  </h4>
                  <p style={{ fontWeight: "bold" }}>
                    {payment && !start ? (
                      <span>
                        Payment Completed, Driver will reach you soon....
                      </span>
                    ) : start ? null : (
                      <>
                        ₹{fair}
                        <button
                          className="payment"
                          onClick={handlePayment}
                          style={{ marginLeft: "2rem" }}
                        >
                          Pay Now
                        </button>
                      </>
                    )}
                  </p>{" "}
                </div>

                <div className="col-md-6">
                  <h4 style={{ fontWeight: "bold" }}>Vehicle</h4>
                  <p>{VehicleModel}</p>

                  <div>
                    <img
                      style={{
                        height: "13rem",
                        width: "18rem",
                        borderRadius: "20px",
                      }}
                      src={driverPhoto}
                      alt={VehicleModel}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      
       

      </div>


      <Modal
  show={showModal}
  onHide={() => setShowModal(false)}
  size="lg"
  aria-labelledby="contained-modal-title-vcenter"
  centered
  backdrop="static" // Prevents closing when clicking outside the modal
  keyboard={false} // Prevents closing when pressing the Esc key
  dialogClassName="custom-modalUser"

>
  <Modal.Header closeButton className="text-center" style={{ backgroundColor: '#3498db', color: 'white' }}>
    <Modal.Title id="contained-modal-title-vcenter">
    Thank you for choosing Velocity.
    </Modal.Title>
  </Modal.Header>
  <Modal.Body style={{ padding: '20px' }}>
    <p>Your trip has been completed. </p>
  </Modal.Body>
  <Modal.Footer style={{ backgroundColor: '#f2f2f2', textAlign: 'center' }}>
    <Button variant="primary" onClick={homeGo}>
      go to home
    </Button>
    <Button variant="primary" onClick={feedbackButton}>
   Feedback
    </Button>
  </Modal.Footer>
</Modal>



    </div>
  );
};

export default DriverDetails;
