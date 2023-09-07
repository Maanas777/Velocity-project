import React from 'react'
import Navbar from '../components/user/navbar/userNav'
import Hero from '../components/user/hero section/hero'
import Footer from '../components/user/footer/footer.tsx'
import './home.css'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/> 
       
        <div className='footerhero'>
        <Footer/>  
        </div>
         
    </div>

    
  )
}



export default Home
