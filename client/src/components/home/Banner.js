import React from 'react'
import Carousel from 'react-material-ui-carousel';
import "../home/banner.css";
const Banner = () => {
  const data =[
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Beauty/GW/revised/final/Makeup-PCq._CB561353936_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img21/OHL/GATEWAY/April/Best/seller/BEST-SELLER-_-2X._CB561563452_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/Biss_2023/BISS_GW/GWNEW/GWNEW2/GW_PC_1500x600._CB572878474_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img24/Consumables/GW/Unrec/Pets-PC_GW_Hero_3000x1200_01._CB578900116_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/march/brands/GW/Under_1499_Tallhero_3000x1200._CB561212093_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img21/shoes/2024/Sports_Shoes/GW/ATF/Unrec/No_bank/Cat3/499_PC_3000._CB560430487_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/ATFGW/MHS_GW_Candle-holders_PC-under._CB560634205_.jpg",
    
  ]
  return (
    <>
    <Carousel
    className='carousel'
    autoPlay={true}
    animation="slide"
    indicators={false}
    navButtonsAlwaysVisible={true}
    cycleNavigation={true}
    navButtonsProps={{
      style:{
        background: "transparent",
        color: "black",
        borderRadius: 0,
        marginTop:-90,
        height: "200px"
      }
    }}
    >
      {
        data.map((imag,i)=>{
          return(
            <>
              <img src={imag} alt="image" key={i} className='Banner_img' />
            </>
          )
        })
      }
    </Carousel>
    </>
  )
}

export default Banner
