
import { useLocation } from "react-router-dom";
import './driverDetails.css'

// import Razorpay from 'razorpay'
import { axiosInstance } from "../../../axiosInstances/userInstance";



const cardBodyStyle = {
  backgroundColor: "#f1bf29",
};

const DriverDetails = () => {

  const driver = useLocation();

  const driverName = driver.state.driverdetails.Drivername;
  const VehicleModel = driver.state.driverdetails.VehicleModel;
  const driverPhoto = driver.state.driverdetails.vehiclePhoto;
  const contactNumber = driver.state.driverdetails.phone;
  const distance = driver.state.distance;
  const fair=driver.state.fare;

const keyId=import.meta.env.VITE_RAZORPAY_KEY_ID;



	const initPayment = (data) => {
    console.log(data,"dayeeeee")
		const options = {
			key:keyId || "",
			amount: data.amount,
			currency: data.currency,
			order_id: data.id,


			handler: async (response) => {
				try {
				
					const { data } = await axiosInstance.post('/verify',response)
					console.log(data);
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
			
			const { data } = await axiosInstance.post('/payment')
			console.log(data);
			initPayment(data.data);
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
            <div className="card-body" style={cardBodyStyle}>
              <div className="row">
                <div className="col-md-6">
                  <h4 style={{ fontWeight: "bold" }}>Name</h4>
                  <p>{driverName}</p>
                  <h4 style={{ fontWeight: "bold" }}>Contact Number</h4>
                  <p>{contactNumber}</p>
                  <h4 style={{ fontWeight: "bold" }}>Total Distance</h4>
                  <p style={{ fontWeight: "bold" }}>{distance} kms</p>
                  <h4 style={{ fontWeight: "bold" }}>Amount to Pay</h4>
                  <p style={{ fontWeight: "bold" }}>₹{fair}    
                  <button className="payment" onClick={handlePayment} style={{marginLeft:'2rem'}}>paynow</button> </p>

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
    </div>
  );
};

export default DriverDetails;
