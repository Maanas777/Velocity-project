import React from 'react'
import Bikes from '../../components/user/selectRide/bikes'
import Nav from '../../components/user/navbar/userNav'
import Footer from '../../components/user/footer/footer'

const bikes = () => {
  return (
    <div>
        <Nav/>
        <Bikes/>
        <Footer/>
      
    </div>
  )
}

export default bikes
