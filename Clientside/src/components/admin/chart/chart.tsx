import { axiosAdminInstance } from '../../../axiosInstances/userInstance';
import './chart.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

function AdminDashBoard() {



  const [users, setusers] = useState()
  const [drivers, setdrivers] = useState()
  const [totaltrips, settotaltrips] = useState()
  const [totalIncome, settotalIncome] = useState()
  const [monthlyIncome, setmonthlyIncome] = useState([])
  const [monthlyTrips, setMonthlyTrips] = useState([]);




  useEffect(() => {

  


    const fetchTotalUsers= async () => {
      try{
        const response = await axiosAdminInstance.get('/totalUsers');
        
        
        setusers(response.data);
  

      }
      catch(error){
        console.error('Error fetching total users:', error);
      }
     

    }

const fetchTotalDrivers=async()=>{

  try {
    const response = await axiosAdminInstance.get('/totalDrivers');

    setdrivers(response.data)

    
  } catch (error) {
    console.error('Error fetching total drivers:', error);
    
  }
}

const fetchTotalTrips=async()=>{

  try {
    const response = await axiosAdminInstance.get('/totalTrips');

    settotaltrips(response.data)

    
  } catch (error) {
    console.error('Error fetching total drivers:', error);
    
  }
}

const fetchTotalIncome=async()=>{

  try {
    const response = await axiosAdminInstance.get('/calculateTotalEarnings');
console.log(response.data);

const income=response.data.map((item)=>item.total
)

settotalIncome(income)
console.log(totalIncome,"income");


    
  } catch (error) {
    console.error('Error fetching total drivers:', error);
    
  }
}

const fetchMonthlyIncome = async () => {
  try {
    const response = await axiosAdminInstance.get('/monthlyIncome');
    console.log(response.data, 'monthlyincome');

    // Initialize the data with all months and totalIncome set to 0
    const allMonthsData = Array.from({ length: 12 }, (_, index) => ({
      _id: { month: index + 1 },
      totalIncome: 0,
    }));

    // Update the data with the actual income data
    response.data.forEach(item => {
      const month = item._id.month - 1; // Month number (0-11)
      allMonthsData[month] = item;
    });

    setmonthlyIncome(allMonthsData);
  } catch (error) {
    console.error('Error fetching monthly income:', error);
  }
}





async function fetchMonthlyTrips() {
 
    try {
      const response = await axiosAdminInstance.get('/monthlyTrips'); // Adjust the URL to your API
      setMonthlyTrips(response.data.monthlyTrips);
    } catch (error) {
      console.error('Error fetching monthly trips data:', error);
    }
  
}




fetchMonthlyTrips()
    fetchTotalUsers()
    fetchTotalDrivers()
    fetchTotalTrips()
    fetchTotalIncome()
    fetchMonthlyIncome()
   
  }, [])
  

  const transformedData = monthlyTrips.map((trip) => ({
    month: new Date(trip.year, trip.month - 1, 1).toLocaleDateString('en-US', {
      month: 'short',
    }),
    count: trip.totalTrips,
  }));







  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>
      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>Users</h3>
            {/* Icon component */}
          </div>
          <h1>{users}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Drivers</h3>
            {/* Icon component */}
          </div>
          <h1>{drivers}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Total Trips</h3>
            {/* Icon component */}
          </div>
          <h1>{totaltrips}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Total Earnings</h3>
            {/* Icon component */}
          </div>
          <h1>₹{totalIncome}</h1>
        </div>
      </div>




      <div className="charts">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={monthlyIncome }
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="_id.month"
              tickFormatter={(month) =>
                new Date(0, month - 1, 1).toLocaleDateString("en-US", {
                  month: "short",
                })
              }
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalIncome" fill="#82ca9d" name="Monthly Earnings" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={transformedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          name="Monthly Trips"
        />
      </LineChart>
    </ResponsiveContainer>

      </div>
    </main>
  );
}

export default AdminDashBoard;
