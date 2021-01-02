import React, { Component } from "react";
import Slider from "react-slick";
import Button from "components/website/button/Button";
import asset from "plugins/assets/asset";

export default class BannerHome extends Component {
  render() {

    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,

    };

    return (
      <div>
        <Slider {...settings}>
          <div >
            <div style={{display:"flex", justifyContent:"center", padding:"30px 0",backgroundColor:"rgba(33,33,44,0.6)"}}>
                <Button
                  height={50}
                >
                  View  all news
                </Button> 
              </div>
           
            <img style={{width:"100%", height:"auto"}} src={asset("/images/slide-banner.png")} /> 
          </div>
          <div>
            <h3>2</h3>
           
            {/* <img src={asset("/images/slide-banner.png")} />  */}
          </div>
            <img src={asset("/images/slide-banner.png")} /> 
          <div>
            <h3>4</h3>
            <img src={asset("/images/slide-banner.png")} /> 
          </div>
        </Slider>
      </div>
    );
  }
}