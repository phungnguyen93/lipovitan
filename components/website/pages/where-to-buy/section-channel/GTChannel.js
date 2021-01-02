import asset from "plugins/assets/asset";
import TitleStyle1 from "components/website/pages/where-to-buy/section-channel/title/TitleStyle1.js";
import Slider from "react-slick";
import ItemBanner from "components/website/pages/home/section-banner/item-banner/ItemBanner.js";
import Link from "next/link";
import { useEffect, useRef, useState, useContext } from "react";
import useWindowSize from "components/website/hooks/useWindowsSize";
import { MainContent } from "components/website/contexts/MainContent";

export default function GTChannel({

  urlBackground = asset("/images/bg-session-gt-channel.png"),
  data

}) {


  const Language = {
    en: {
      name: "en",
      title: ["GT ChanNel"],
      description: "",
      textM:["GT", "ChanNel"],
    },
    vi: {
        name: "vi",
        title: ["KÊNH", "TRUYỀN THỐNG"],
        description: "",
        textM:["KÊNH", "TRUYỀN THỐNG"],

    }
  }

  const valueLanguageContext = useContext(MainContent);

  const [dataBannerTop, setDataBannerTop] = useState();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

    // detect screen size
  const windowSize = useWindowSize();

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
    <section>
      <div className="sectionGTChannel">

        {
          windowSize.width < 600 
          ? (<>
            <img className="bgGTChannel" src={asset("/images/bg-session-gt-channel-m.png")} />
          </>)
          :(<>
              <img className="bgGTChannel" src={urlBackground} />
          </>)
        }
        
        {
          dataBannerTop 
            ?<TitleStyle1
              textLine1={dataBannerTop.title[0]}
              textLine2={dataBannerTop.title[1]}
              // textM={dataBannerTop.textM}
              /> 
            :<></>
        }

        {/* <TitleStyle1></TitleStyle1> */}

        <div className="containerGTChannel">
          <div className="slideBanner">
            <div>
              {
                data
                ? (

                  // SliderComponent(settings, data)
                  <Slider {...settings}>
                      {
                        data.data.list.map((value, index)=>(
                          <ItemBanner key={index} urlImage={value.image}>
                            <h4>
                              <a href={value.link} target="_blank">{value.title}</a>
                            </h4>
                          </ItemBanner>
                        )) 
                      }
                  </Slider>
                )
                :(
                  <p>Loadding</p>
                )
              }
              {/* <Slider {...settings}>
                  
                <ItemBanner urlImage={asset("/images/gt-channel-1.png")}>
                  <h4>
                    <Link href={""}>Coffee Shop</Link>
                  </h4>
                </ItemBanner>
                <ItemBanner urlImage={asset("/images/gt-channel-2.png")}>
                  <h4>
                    <Link href={""}>GROCERY</Link>
                  </h4>
                </ItemBanner>
                <ItemBanner urlImage={asset("/images/gt-channel-3.png")}>
                  <h4>
                    <Link href={""}>WHOLESALER</Link>
                  </h4>
                </ItemBanner>
                <ItemBanner urlImage={asset("/images/gt-channel-2.png")}>
                  <h4>
                    {" "}
                    <Link href={""}>GROCERY</Link>
                  </h4>
                </ItemBanner>
              </Slider> */}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .bgGTChannel {
          width: 100%;
          opacity: 0;
        }

        .sectionGTChannel {
          position: relative;
          min-height: 50vh;
        }

        .containerGTChannel {
          position: absolute;
          width: 100%;
          max-width: 1260px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -40%);
          display: inline;

          justify-content: space-between;
        }
        h4 {
          font-family: Montserrat-BlackItalic;
          text-align: center;
          padding: 20px 5px;
          font-size: 30px;
          color: #757575;
          text-transform: uppercase;
        }
        h4 a {
          color: #757575;
        }
        @media only screen and (max-width: 1366px) {
          .containerGTChannel {
            width: calc(100% - 200px);
          }
        }

        @media only screen and (max-width: 599px) {
          section{
            padding-top: 30px
          }
        }

        @media only screen and (max-width: 520px) {
          .containerGTChannel {
            width:75%;
          }
        }

      `}</style>
    </section>
  );
}
