import React from 'react'
import ProductsSection from '../component/Products'
import Header from '../component/Header'
import Footer from '../component/Footer'


const Home = () => {

  return (
    <div className='home' 
      style={{
        paddingTop:"5rem",
        overflow:"hidden"
      }}
    >
  <Header/>

              {/* <Offers/> */}
   

              <ProductsSection/>

      <Footer/>
      
            
    </div>
  )
}

export default Home
