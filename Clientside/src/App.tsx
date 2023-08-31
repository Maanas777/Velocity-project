
import './index.css'
import {Routes,Route} from 'react-router-dom'

import Login from './userscreens/login/login'
import Signup from './userscreens/signup/signup'
import Driversignup from './driverscreen/signup/signup'
import DriverLogin from './driverscreen/login/driverLogin'
import Nav from './components/admin/nav/nav'


function App() {



  return (

    <Routes>
      
      <Route path='/' element={<Signup/>}></Route>
      <Route path='login' element={<Login/>}></Route>
      <Route path='driversignup' element={<Driversignup/>}></Route>
      <Route path='driverlogin' element={<DriverLogin/>}></Route>
      <Route path='nav' element={<Nav/>}></Route>
      
        
      </Routes>
  )
}

export default App
