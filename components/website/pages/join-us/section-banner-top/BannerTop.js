import asset from "plugins/assets/asset";
import { useState, useEffect, useRef } from "react";
import TitleStyle from "components/website/pages/join-us/section-banner-top/title/TitleStyle2";
import ItemForm from "components/website/pages/contact-us/section-banner-top/items/Items";
import useWindowSize from "components/website/hooks/useWindowsSize";
import FromContact from "components/website/forms/Contact";


export default function BannerTop (
    {
        urlBackground=asset("/images/bg-session-banner-join-us-detail-1.png"),
    }
){

    const settings = {

        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        adaptiveHeight: true,
    
    };
    
    let description = (
        <>
          <div className="desOurProduct">
            <p>
              Lipovitan is a brand of Taisho Pharmaceutical company - one of the largest pharmaceutical corporations in Japan. Taisho has also expanded its business and have subsidiaries in 12 other countries around the world.
            </p>
          </div>
            <style jsx>{`
              .desOurProduct{
                max-width: 500px;
                margin: 0;
                p{
                  padding: 10px 0;
                  font-size : 16px;
                  line-height: 30px;
                  color : #fff;
                  padding-bottom: 30px;
                }
              }
            `}</style>
        </>
    )

        // detect screen size
        // detect screen size
    const windowSize = useWindowSize();
    const [responsiveMaxScreen, setResponsiveMaxScreen] = useState(false);
    const [responsiveMobile, setResponsiveMobile] = useState(false);
    const [responsiveTablet, setResponsiveTablet] = useState(false);
       
        //check responsive
     useEffect(()=>{
        if(windowSize.width > 1440){
            setResponsiveMaxScreen(true);
        }else{
            setResponsiveMaxScreen(false);
        }
    },[windowSize]);

    useEffect(() => {

        if (windowSize.width <= 1024) {
    
          setResponsiveTablet(true);
    
          if (windowSize.width <= 520) {
            setResponsiveTablet(false);
            setResponsiveMobile(true);
          }
    
        } else {
    
          setResponsiveTablet(false);
          setResponsiveMobile(false);
    
        }
    
      }, [windowSize]);

    return<section>
        <div className="sectionBannerTop">
            {
                responsiveMobile  
                ? (<>
                     <img className="bgBannerTop" src={asset("/images/bg-session-banner-join-us-detail-1-m.jpg")}/>
                </>)
                :(<>
                    <img className="bgBannerTop" src={urlBackground}/>
                </>)
            }
           

            <TitleStyle
                // description={description}
            />

            <div className="containerBannerTop" >
            </div>
        </div>
        <style jsx>{`
            .bgBannerTop{
                width: 100%;
            }

            .sectionBannerTop{
                position: relative;
                min-height: 70vh;
            }

            .containerBannerTop{
                position: absolute;
                width: 80%;
                left:50%;
                top : 50%;
                transform: translate(-50%, -50%);
                display: inline;
                
                justify-content: space-between;
                
            }

            @media screen and (max-width: 1440px) {
                .containerBannerTop{
                    bottom : 7%;
                }
            }

        `}</style>
    </section>
}