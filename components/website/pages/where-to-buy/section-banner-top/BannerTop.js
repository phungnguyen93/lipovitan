import asset from "plugins/assets/asset";
import { useState, useEffect, useRef, useContext } from "react";
// import { useInView } from 'react-intersection-observer';
import TitleStyle1 from "components/website/pages/where-to-buy/section-banner-top/title/TitleStyle1";
import Slider from "react-slick";
import ItemBanner from "components/website/pages/home/section-banner/item-banner/ItemBanner.js";
import useWindowSize from "components/website/hooks/useWindowsSize"
import { MainContent } from "components/website/contexts/MainContent";

export default function BannerTop (
    {
        urlBackground=asset("/images/bg-session-banner-where-to-buy-1.jpg"),
        data
    }
){

    const Language = {
        en: {
          name: "en",
          title: ["Modern ChanNel"],
          description: "",
          textM:["Modern", "ChanNel"],
        },
        vi: {
          name: "vi",
          title: ["KÊNH HIỆN ĐẠI", ""],
          description: "",
          textM:["KÊNH", "HIỆN ĐẠI"],
    
        }
    }

    const valueLanguageContext = useContext(MainContent);

    const [dataBannerTop, setDataBannerTop] = useState();



    const settings = {

        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        adaptiveHeight: true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            }
        ]
    
    };
    
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
        if(data){
            console.log(data)
        }
        if (valueLanguageContext.languageCurrent) {
    
            setDataBannerTop(Language[`${valueLanguageContext.languageCurrent}`])
         
          }
        
    }, []);

    
    useEffect(() => {
        console.log(dataBannerTop)
        if (valueLanguageContext.languageCurrent) {
    
          setDataBannerTop(Language[`${valueLanguageContext.languageCurrent}`])
    
        }
    
    }, [valueLanguageContext.languageCurrent]);

    return<section>
        <div className="sectionBannerTop">

            {
                windowSize.width < 600
                ?(<>
                    <img className="bgBannerTop" src={asset("/images/bg-session-banner-where-to-buy-1-m.jpg")}/>
                </>) 
                : (<>
                    <img className="bgBannerTop" src={urlBackground}/>
                </>)
            }
            
            {
                dataBannerTop 
                ?<TitleStyle1
                    textLine1={dataBannerTop.title[0]}
                    textLine2={dataBannerTop.title[1]}
                    textM={dataBannerTop.textM}
                    /> 
                :<></>
            }

            {/* <TitleStyle1>

            </TitleStyle1> */}

            <div className="containerBannerTop" >
              
                <div className="slideBanner">
                    <div >
                    {
                        data
                        ? 
                        (
                            <Slider {...settings}>
                                {
                                    data.data.list.map((value, index)=>(
                                        <ItemBanner key={index} urlImage={value.image}></ItemBanner>
                                    )) 
                                }
                            </Slider>
                        )
                        :(
                            <p>Loadding</p>
                        )
                    }
                    {/* <Slider {...settings}>
                        <ItemBanner 
                            urlImage={asset("/images/modern-logo-1.png")}
                        >
                        </ItemBanner>
                        <ItemBanner 
                            urlImage={asset("/images/modern-logo-2.png")}
                        >
                        </ItemBanner>
                        <ItemBanner 
                            urlImage={asset("/images/modern-logo-3.png")}
                        >
                        </ItemBanner><ItemBanner 
                            urlImage={asset("/images/modern-logo-4.png")}
                        >
                        </ItemBanner><ItemBanner 
                            urlImage={asset("/images/modern-logo-5.png")}
                        >
                        </ItemBanner>
                        <ItemBanner 
                            urlImage={asset("/images/modern-logo-1.png")}
                        >
                        </ItemBanner>
                    </Slider> */}
                    </div>
                </div>

            </div>

        </div>
        <style jsx>{`
            .bgBannerTop{
                width: 100%;
            }

            .sectionBannerTop{
                position: relative;
                min-height: 50vh;
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
            @media screen and (max-width: 600px) {
                .containerBannerTop{
                   width: 75%;
                   top : 60%;
                }
            }

        `}</style>
    </section>
}