import React from 'react'
import Offers from '../component/Offers'
import ProductsSection from '../component/Products'
import Header from '../component/Header'
import Footer from '../component/Footer'


const Home = () => {

  return (
    <div className='home' 
      style={{
        overflow:"hidden"
      }}
    >
  <Header/>

              <Offers/>
   

              <ProductsSection/>

      <Footer/>
      
            
    </div>
  )
}

export default Home
