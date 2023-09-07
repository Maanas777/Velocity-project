import React from 'react'
import VerifiedDriver from '../components/admin/drivers/verified_driver'
import Sidebar from '../components/admin/sidebar/sidebar' 

const verified_driver = () => {
  return (
    <div>
        <Sidebar/>
        <div className='container'>
        <VerifiedDriver/>
        </div>
    </div>
  )
}

export default verified_driver