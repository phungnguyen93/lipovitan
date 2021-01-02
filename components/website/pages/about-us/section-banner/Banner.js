// import { useInView } from 'react-intersection-observer';
import Slider from "react-slick";
// import Button from "components/website/button/Button";
import TitleStyle1 from "components/website/pages/about-us/section-banner/title-banner/TitleStyle1";
import TitleStyleVi from "components/website/pages/about-us/section-banner/title-banner/TitleStyleVi";
import asset from "plugins/assets/asset";
// import ItemsScaleEffect from "components/website/pages/about-us/section-banner/item-banner/ItemsEffect.js";
import ItemsSmallEffect1 from "components/website/pages/about-us/section-banner/item-banner/ItemsSmallEffect";
import ItemBanner from "components/website/pages/about-us/section-banner/item-banner/ItemBanner.js";
import useWindowSize from "components/website/hooks/useWindowsSize";
import { useNextResponsive } from "plugins/next-reponsive";
import { MainContent } from "components/website/contexts/MainContent";
import { useEffect, useRef, useState, useContext } from "react";
import { useRouter } from "next/router";

export default function BannerOurProduct() {

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
      title: ["Your health","Is our","Specialty"],
      description: "Lipovitan is a brand of Taisho Pharmaceutical company - one of the largest pharmaceutical corporations in Japan. Taisho has also expanded its business and has subsidiaries in 12 other countries around the world.",
    },
    vi: {
      name: "vi",
      title: ["Sức khỏe của bạn","là SỨ MỆNH", "của chúng tôi"],
      description: "Lipovitan là thương hiệu của công ty Taisho Pharmaceutical - một trong những tập đoàn dược phẩm lớn nhất Nhật Bản. Taisho cũng đã mở rộng hoạt động kinh doanh và có các công ty con tại 12 quốc gia khác trên thế giới."

    }
  }

  const valueLanguageContext = useContext(MainContent);

  const [dataBannerOurProduct, setDataBannerOurProduct] = useState();

  const route = useRouter()

  const getLink = (link = "https://www.taisho.co.jp/global") => {
    if(window){
      window.open(link,'_blank');
    }
    // route.push(link)
  };


  // detect screen size
  const [responsiveMaxScreen, setResponsiveMaxScreen] = useState(false);
  const windowSize = useWindowSize();
  let responsive = useNextResponsive();

  const LayoutDesktop = asset("/images/slide-banner-about-us-1-size-m.jpg");
  const LayoutMobile = asset("/images/mb/aboutus/banner.png");
  const [layout, setLayout] = useState(LayoutDesktop);


  let description = (description) => (
    <>

      <div className="desOurProduct">

        <p>

          {description}

        </p>

      </div>

      <style jsx>{`

        .desOurProduct {
          max-width: 500px;
          margin: 0;
          p {
            padding: 20px 0;
            font-size: 22px;
            line-height: 1.8;
            color: #fff;
            padding-bottom: 30px;
          }
        }

        @media screen and (max-width: 768px) {
          .desOurProduct {
            p {
              font-size: 2vmax;
            }
          }
        }

      `}</style>

    </>
  );


  const itemsDescription = (language) => {

    let component;

    switch (language) {
      
      case "vi":

        component = description(Language.vi.description)

        break;

      default:

        component =  description(Language.en.description)

        break;

    }

    return component;

  }


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

    if (windowSize.width > 600) {

      setResponsiveMaxScreen(true);

    } else {

      setResponsiveMaxScreen(false);

    }

  }, [windowSize]);


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


  return (
    <section className="sectionBanner">
      <div className={"slideBanner " + valueLanguageContext.languageCurrent}>
        <div>

          <Slider {...settings}>

            <ItemBanner urlImage={layout}>

              {
                dataBannerOurProduct ? (

                  dataBannerOurProduct.name === "vi" ? (
                    <TitleStyleVi
                        textLine1={dataBannerOurProduct.title[0]}
                        textLine2={dataBannerOurProduct.title[1]}
                        textLine3={dataBannerOurProduct.title[2]}
                        description={description(dataBannerOurProduct.description)}
                        cbFunctionBtn={getLink}
                    />

                  ) : (
                      <TitleStyle1
                      textLine1={dataBannerOurProduct.title[0]}
                      textLine2={dataBannerOurProduct.title[1]}
                      textLine3={dataBannerOurProduct.title[2]}
                      description={description(dataBannerOurProduct.description)}
                      cbFunctionBtn={getLink}
                      />
                    )

                ) : <></>

              }

              {responsiveMaxScreen === true ? (

                <ItemsSmallEffect1

                  srcImage={asset("/images/item-about-us-banner-house.png")}
                  timeShow={0.4}
                  width={64}
                  top={25}
                  right={"0"}
                  animation={false}

                ></ItemsSmallEffect1>

              ) : (
                  ""
                )}

            </ItemBanner>

          </Slider>

        </div>

      </div>

      <style jsx>{`

        .sectionBanner{
          z-index: 2;
        }
        .slideBanner{
          z-index: 2;
        }
          
      `}</style>

    </section>
  );
}
