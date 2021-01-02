// import { useInView } from 'react-intersection-observer';
import Slider from "react-slick";
import Button from "components/website/button/Button";
import TitleStyle1 from "components/website/pages/our-product/section-banner/title-banner/TitleStyle1";
// import TitleStyle2 from "components/website/pages/our-product/section-banner/title-banner/TitleStyle2";
import asset from "plugins/assets/asset";
// import GroupDots from "components/website/group-dots/GroupDots";
// import ItemsScaleEffect from "components/website/pages/our-product/section-banner/item-banner/ItemsEffect.js";
import ItemsSmallEffect1 from "components/website/pages/our-product/section-banner/item-banner/ItemsSmallEffect";
import ItemBanner from "components/website/pages/our-product/section-banner/item-banner/ItemBanner.js";
import useWindowSize from "components/website/hooks/useWindowsSize"
import { useNextResponsive } from "plugins/next-reponsive";
import { MainContent } from "components/website/contexts/MainContent";
import { useEffect, useRef, useState, useContext } from "react";
import { useRouter } from "next/router";


export default function BannerOurProduct () {
  
  const settings = {

    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,

  };

  const Language = {
    en: {
      name: "en",
      title: ["Lipovitan","Honney"],
      description: [
        "Supplement Food: Energy drinks ",
        "Not only provides Taurine and essential vitamins to promote the regeneration of energy for the body, the product also adds Inositol to help the mind more focusing, alertness and refreshing.",
      ],
      
      nameBtn:"Where to buy",
    },
    vi: {
      name: "vi",
      title: ["Lipovitan","Mật ong"],
      description: [
        "Thực phẩm bổ sung: Nước tăng lực",
        "Không chỉ cung cấp Taurine và các Vitamin cần thiết để thúc đẩy quá trình tái tạo năng lượng cho cơ thể, sản phẩm còn bổ sung Inositol giúp tập trung sự tỉnh táo và sảng khoái cho trí lực.",
      ],
      nameBtn:"Đến nơi mua",
    }
  }


  const valueLanguageContext = useContext(MainContent);

  const [dataBannerOurProduct, setDataBannerOurProduct] = useState();

  const router = useRouter();

  let description = (value) => (

    <>
      <div className="desOurProduct">
        <p>
          {value ? value[0] : ""}
         <br/>
         {value ? value[1] : ""}
        </p>
      </div>
        <style jsx>{`
          .desOurProduct{
            max-width: 500px;
            margin: 0;
            p{
              padding: 20px 0;
              font-size : 22px;
              line-height: 1.8;
              color : #fff;
              padding-bottom: 30px;
            }
          }

          @media screen and (max-width: 768px) {
            .desOurProduct {
              p {
                font-size: 1.8vmax;
                line-height: 2;
              }
            }
          }
        `}</style>
    </>
    )

    // detect screen size
    const [responsiveMaxScreen, setResponsiveMaxScreen] = useState(false);
    const [responsiveMobile, setResponsiveMobile] = useState(false);
    const [responsiveTablet, setResponsiveTablet] = useState(false);
  
    const windowSize = useWindowSize();
    //check responsive
   

    let responsive = useNextResponsive();
    const LayoutDesktop = asset("/images/slide-banner-our-product-1.jpg");
    const LayoutMobile = asset("/images/mb/product/banner.jpg");
    const [layout, setLayout] = useState(LayoutDesktop);


    useEffect(() => {

      switch (responsive.device) {
        case "mobile":
          setLayout(LayoutMobile);
          break;
        default:
          setLayout(LayoutDesktop);
          break;
      }

    }, [JSON.stringify(responsive)]);


    useEffect(() => {

      if (valueLanguageContext.languageCurrent) {
  
        setDataBannerOurProduct(Language[`${valueLanguageContext.languageCurrent}`])
  
      }
  
    }, [])
  
  
    useEffect(() => {
  
      if (valueLanguageContext.languageCurrent) {
  
        setDataBannerOurProduct(Language[`${valueLanguageContext.languageCurrent}`])
  
      }
  
    }, [valueLanguageContext.languageCurrent]);

      //check responsive
  useEffect(() => {

    if (windowSize.width > 1440) {

      setResponsiveMaxScreen(true);

    } else {

      setResponsiveMaxScreen(false);

    }

    if (windowSize.width <= 1024) {

      setResponsiveTablet(true);

      if (windowSize.width <= 599) {
        setResponsiveTablet(false);
        setResponsiveMobile(true);
      }

    } else {

      setResponsiveTablet(false);
      setResponsiveMobile(false);

    }

  }, [windowSize]);


    return (
      <section>
      <div className="slideBanner">
        <div >
          <Slider {...settings}>
            <ItemBanner 
              // urlImage={asset(`${responsiveMaxScreen === true ? "/images/slide-banner-our-product-1.jpg" : "/images/slide-banner-our-product-1.jpg"}`)}
              urlImage={layout}
            >
              {
                dataBannerOurProduct 
                ? (
                    <TitleStyle1
                      textLine1={dataBannerOurProduct.title[0]}
                      textLine2={dataBannerOurProduct.title[1]}
                      description={description(dataBannerOurProduct.description)}
                      nameBtn={dataBannerOurProduct.nameBtn}
                      fnOutsite={()=>router.push("/where-to-buy")}
                    />
                  ) 
                :(
                  <></>
                )
              }

              {
                responsiveMobile === true 
                ? (<>

                <ItemsSmallEffect1
                  srcImage={asset("/images/item-our-product-banner-1.png")}
                  timeShow={0.5}
                  width={100}
                  bottom={2}
                  left={5}
                  className={'LonLipo'}
                 
                >
                </ItemsSmallEffect1>
                <ItemsSmallEffect1
                  srcImage={asset("/images/effect-small-item-b1-m.png")}
                  timeShow={0.6}
                  width={15}
                  top={65}
                  left={10}
                  className={'ItemB3'}
                ></ItemsSmallEffect1>

                 <ItemsSmallEffect1
                  srcImage={asset("/images/effect-small-item-b6-m.png")}
                  timeShow={0.6}
                  width={8}
                  top={60}
                  left={10}
                  className={'ItemB6'}
                ></ItemsSmallEffect1>

                <ItemsSmallEffect1
                  srcImage={asset("/images/effect-small-item-taurine-m.png")}
                  timeShow={0.2}
                  width={15}
                  top={48}
                  right={7}
                  className={'ItemHoney'}
                ></ItemsSmallEffect1>

                
                </>) 
                : (<>
                  <ItemsSmallEffect1
                    srcImage={asset("/images/effect-small-item-honey.png")}
                    timeShow={0.2}
                    width={10.2}
                    top={65}
                    right={46}
                    className={'ItemHoney'}
                  ></ItemsSmallEffect1>
                  <ItemsSmallEffect1
                    srcImage={asset("/images/item-our-product-banner-b3.png")}
                    timeShow={0.6}
                    width={5.5}
                    top={12}
                    right={10.2}
                    className={'ItemB3'}
                  ></ItemsSmallEffect1>
                  <ItemsSmallEffect1
                    srcImage={asset("/images/item-our-product-banner-1.png")}
                    timeShow={0.6}
                    width={48}
                    top={8}
                    right={7}
                    className={'LonLipo'}
                  >

                  </ItemsSmallEffect1>
                </>)
              }
              
              
              
            </ItemBanner>
          </Slider>
        </div>
        {/* <GroupDots
            position={"RIGHT"}
          /> */}
        
      </div>
        <style jsx>{`
          .section{
            min-height: 60vh;
          }
        `}</style>
      </section>
    );
}