import Nav from '../../components/user/navbar/userNav'
import DriverDetails from '../../components/user/driverDetails/driverDetails'
import bg from './India_uberMOTO_Blog_960x480.avif'

const Driverdetails = () => {
 
  
  
  return (
    <div>
        <Nav/>
        <div style={{backgroundColor:'blue',height:'84vh', backgroundImage: `url(${bg})`}}>

       
        <DriverDetails/>
        </div>

    </div>
  )
}

export default Driverdetails
