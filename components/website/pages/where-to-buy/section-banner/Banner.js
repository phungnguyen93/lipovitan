import { useState, useEffect, useContext } from "react";
import { useInView } from 'react-intersection-observer';
import Slider from "react-slick";
import Button from "components/website/button/Button";
import TitleStyle1 from "components/website/pages/where-to-buy/section-banner/title/TitleStyle1";
import asset from "plugins/assets/asset";
import { MainContent } from "components/website/contexts/MainContent";
// import ItemsScaleEffect from "components/website/pages//where-to-buy/section-banner/item-banner/ItemsEffect.js";

import useWindowSize from "components/website/hooks/useWindowsSize"
import Link from "next/link";

export default function WhereToBuy () {
  
  const Language = {
    en: {
      name: "en",
      description: "",
      title:["E-COMMERCE", "CHANEL"],
    },
    vi: {
        name: "vi",
        description: "",
        title:["KÊNH", "ONLINE"],

    }
  }

  const valueLanguageContext = useContext(MainContent);

  const [dataBannerTop, setDataBannerTop] = useState();
  
    let description = (
    <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae porta mauris. Aliquam commodo, ligula at maximus rutrum, arcu dolor eleifend nisi, ut fringilla tellus dolor 
    </>
    )

    // detect screen size
    const [responsiveMaxScreen, setResponsiveMaxScreen] = useState(false);

  
    const windowSize = useWindowSize();
    //check responsive
    useEffect(()=>{
      if(windowSize.width > 1440){
        setResponsiveMaxScreen(true);
      }else{
        setResponsiveMaxScreen(false);
      }
    },[windowSize]);

    useEffect(() => {
  
      if (valueLanguageContext.languageCurrent) {
  
          setDataBannerTop(Language[`${valueLanguageContext.languageCurrent}`])
       
      }
        
    }, []);
  
  
    useEffect(() => {
       
        if (valueLanguageContext.languageCurrent) {
  
          setDataBannerTop(Language[`${valueLanguageContext.languageCurrent}`])
  
        }
  
    }, [valueLanguageContext.languageCurrent]);

    return (
      <section className={"bannerBottom"}>
      <div className="slideBanner">
        {
          dataBannerTop 
            ?<TitleStyle1
              textLine1={dataBannerTop.title[0]}
              textLine2={dataBannerTop.title[1]}
              // textM={dataBannerTop.textM}
              /> 
            :<></>
        }
          {/* <TitleStyle1/> */}
          {
            windowSize.width <600 ? (<>
              <img className={"bgBannerBottom"}
                src={asset("/images/bg-session-banner-where-to-buy-bottom-m.jpg")}
              />
              {/* <p className="description">
                  {description}
              </p>     */}
            </>) : (<>
              <img className={"bgBannerBottom"}
                src={asset("/images/bg-session-banner-where-to-buy-bottom.jpg")}
            />
            </>)
          }
          <div className={"logoTiki"}>
            <a href="https://tiki.vn/nuoc-uong-tang-luc-lipovitan-thung-thuong-24-lon-24-x-250ml-p72292412.html" target="_blank">
              <img src={asset("/images/logo-tiki-desktop.png")} alt="" />
            </a>
          </div>
      
      </div>
      <style jsx>{`
        .slideBanner{
          img{
            width: 100%;
          }
        }
        .logoTiki{
          position: absolute;
          bottom :20%;
          left : 50%;
          transform: translate(-50%,0);
          display: flex;
          justify-content: center;
          width: 45%;
          max-width: 500px;
          min-width: 200px;
          cursor: pointer;
          img{
            transition: all .3s;
            height: 100%;
          }
          &:hover {
            img {
              transform: scale(1.1);
            }
          }
        }

        @media screen and (max-width:1023px) {
          .logoTiki{
            img{
              height: 100%;
            }
          }
        }
        
        @media screen and (max-width: 599px) {
          .logoTiki{
            width: 40%;
            bottom :10%;
            min-width: 120px;
            img{
              height: 100%;
            }
          }
          .description{
            position : absolute;
            display: flex;
            justify-content: center;
            text-align: center;
            width: 70%;
            top : 60%;
            left :50%;
            transform: translate(-50%, -50%);
            color: #fff;
          }
        }
        @media screen and (max-width: 420px) {
          .logoTiki{
            width: 70%;
            bottom : 30%;
            min-width: 120px;
          }
          .description{
            position : absolute;
            display: flex;
            justify-content: center;
            text-align: center;
            width: 85%;
            top : 60%;
            left :50%;
            transform: translate(-50%, -50%);
            color: #fff;
          
          }
        }
        @media screen and (max-width: 360px) {
         
          .description{
            font-size : 14px;
          
          }
        }
      `}</style>
      </section>
    );
}