
import './index.css'
import {Routes,Route} from 'react-router-dom'

import Login from './userscreens/login/login'
import Signup from './userscreens/signup/signup'
import Driversignup from './driverscreen/signup/signup'


function App() {


  return (
    <Routes>
      
      <Route path='/' element={<Signup/>}></Route>
      <Route path='login' element={<Login/>}></Route>
      <Route path='driversignup' element={<Driversignup/>}></Route>
        
      </Routes>
  )
}

export default App
