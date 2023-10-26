import { axiosAdminInstance } from '../../../axiosInstances/userInstance';
import './chart.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

function AdminDashBoard() {
  const monthlyIncomeData = [
    { _id: 1, totalIncome: 5000 },
    { _id: 2, totalIncome: 7500 },
    { _id: 3, totalIncome: 6200 },
    { _id: 4, totalIncome: 8000 },
    { _id: 5, totalIncome: 6900 },
    { _id: 6, totalIncome: 9000 },
    { _id: 7, totalIncome: 8500 },
    { _id: 8, totalIncome: 7400 },
    { _id: 9, totalIncome: 9500 },
    { _id: 10, totalIncome: 8700 },
    { _id: 11, totalIncome: 9200 },
    { _id: 12, totalIncome: 8200 },
  ];

  const monthlyCoursesData = [
    { _id: 1, count: 100 },
    { _id: 2, count: 120 },
    { _id: 3, count: 90 },
    { _id: 4, count: 110 },
    { _id: 5, count: 95 },
    { _id: 6, count: 130 },
    { _id: 7, count: 115 },
    { _id: 8, count: 105 },
    { _id: 9, count: 125 },
    { _id: 10, count: 110 },
    { _id: 11, count: 120 },
    { _id: 12, count: 112 },
  ];

  const [users, setusers] = useState()
  const [drivers, setdrivers] = useState()
  const [totaltrips, settotaltrips] = useState()
  const [totalIncome, settotalIncome] = useState()




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







    fetchTotalUsers()
    fetchTotalDrivers()
    fetchTotalTrips()
    fetchTotalIncome()
   
  }, [])
  








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
            data={monthlyIncomeData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="_id"
              tickFormatter={(month) =>
                new Date(0, month - 1, 1).toLocaleDateString("en-US", {
                  month: "short",
                })
              }
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalIncome" fill="#82ca9d" name="Monthly Sales" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={monthlyCoursesData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="_id"
              tickFormatter={(month) =>
                new Date(0, month - 1, 1).toLocaleDateString("en-US", {
                  month: "short",
                })
              }
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name="Monthly Courses"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default AdminDashBoard;
