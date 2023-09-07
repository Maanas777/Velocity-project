import React from 'react'
import Navbar from '../components/user/navbar/userNav'
import Hero from '../components/user/hero section/hero'
import Footer from '../components/user/footer/footer.tsx'
import './home.css'

const Home = () => {
  return (
    <div >
      <div className='container-fluid'>
        <Navbar/>
        </div>
        <Hero/> 
       
        <div className='footerhero'>
        <Footer/>  
        </div>
         
    </div>

    
  )
}



export default Home
