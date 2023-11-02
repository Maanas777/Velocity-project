
import Navbar from '../../components/admin/navbar/navbar'
// import Table from "../components/admin/table";
import Chart from "../../components/admin/chart/chart";
import "./dashboard.css";


const Dashboard = () => {
  return (
    <div>
      
    <Navbar/>
    <div className="container">
    <Chart/>
    </div>
   
       
      </div>
   
  );
};

export default Dashboard;
