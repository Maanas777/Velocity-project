import Table from 'react-bootstrap/Table';
import {useEffect,useState} from 'react'
import axios from 'axios';


interface Driver {
  _id: string;
  Drivername: string;
  email: string;
  phone: string;
  RCNo: string;
  licenseno: string;
}

// const [error, setError] = useState<Error | null>(null);








function ApprovedDriver() {

  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3003/api/admin/approvedDriver')
    .then((response)=>{
      console.log(response.data.drivers);
      setDrivers(response.data.drivers);

    })


  }, [])
  

  return (
    <div>
    <Table bordered hover size="lg">
      <thead>
        <tr>
          <th>Driver id</th>
          <th style={{ width: '170px' }}>Name</th>
          <th style={{ width: '170px' }}>E-mail</th>
          <th>Phone</th>
    
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {drivers.map((driver, index) => (
          <tr key={index}>
            <td>{driver._id}</td>
            <td>{driver.Drivername}</td>
            <td>{driver.email}</td>
            <td>{driver.phone}</td>
           
          
          </tr>
        ))}
        {/* Add more rows with the same structure */}
      </tbody>
    </Table>
  </div>
  
 


  );
}

export default ApprovedDriver;