import { useEffect, useRef, useState, useContext } from "react";
// import { useInView } from "react-intersection-observer";
import Slider from "react-slick";
// import Button from "components/website/button/Button";
import TitleStyle1 from "components/website/pages/home/section-banner/title-banner/TitleStyle1";
import TitleStyle2 from "components/website/pages/home/section-banner/title-banner/TitleStyle2";
import asset from "plugins/assets/asset";
// import GroupDots from "components/website/group-dots/GroupDots";
import ItemsScaleEffect from "components/website/pages/home/section-banner/item-banner/ItemsEffect.js";
import ItemsSmallEffect1 from "components/website/pages/home/section-banner/item-banner/ItemsSmallEffect";
import ItemsInfo from "components/website/pages/home/section-banner/item-banner/ItemsInfo";
import ItemsMouse from "components/website/pages/home/section-banner/item-banner/ItemMouse";
import ItemBanner from "components/website/pages/home/section-banner/item-banner/ItemBanner.js";
import useWindowSize from "components/website/hooks/useWindowsSize";
import { MainContent } from "components/website/contexts/MainContent";

import {
  Breakpoints,
  useNextOrientation,
  useNextResponsive,
} from "plugins/next-reponsive";

export default function BannerHome() {
  const Language = {
    en: {
      name: "en",
      title: ["Brand", "Story"],
      data: [
        {
          title: ["Conquering you", "after", "3 cans"],
          description: "",
          linkImg: "",
        },
        {
          title: ["Energy", "for", "life"],
          description: "",
          linkImg: "",
        },
      ],
      listOurDifferent: [
        "JAPANESE TECHNOLOGY",
        "JAPANESE QUALITY",
        "VIETNAMESE PRICE",
        "JAPANESE BRAND",
        "VIETNAMESE TASTE",
      ],
    },
    vi: {
      name: "vi",
      title: ["Câu chuyện", "thương hiệu"],
      data: [
        {
          title: ["Chinh phục bạn", "chỉ sau", "3 lon"],
          linkImg: "",
          description: "",
        },
        {
          title: ["Năng lượng ", "cho", "cuộc sống"],
          linkImg: "",
          description: "",
        },
      ],
      listOurDifferent: [
        "CÔNG NGHỆ NHẬT BẢN",
        "CHẤT LƯỢNG NHẬT BẢN",
        "GIÁ VIỆT NAM",
        "THƯƠNG HIỆU NHẬT BẢN",
        "MÓN NGON VIỆT NAM",
      ],
    },
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  // detect screen size
  const windowSize = useWindowSize();
  const [responsiveMaxScreen, setResponsiveMaxScreen] = useState(false);
  const [responsiveMobile, setResponsiveMobile] = useState(false);
  const [responsiveTablet, setResponsiveTablet] = useState(false);

  const valueLanguageContext = useContext(MainContent);
  const [dataSectionBanner, setDataSectionBanner] = useState();

  let responsive = useNextResponsive();

  //const LayoutDesktop = asset("/images/slide-banner-1-size-m.png");
  const LayoutDesktop = asset("/images/home/slide00.jpg");
  const LayoutMobile = asset("/images/mb/slider/bn_00.png");
  const [layout, setLayout] = useState();
  // const [layout, setLayout] = useState(LayoutDesktop);

  //const LayoutDesktop2 = asset("/images/slide-banner-2-size-m.png");
  const LayoutDesktop2 = asset("/images/home/slide01.jpg");
  const LayoutMobile2 = asset("/images/mb/slider/bn_01.png");
  // const [layout2, setLayout2] = useState();
  const [layout2, setLayout2] = useState(LayoutDesktop2);

  useEffect(() => {
    switch (responsive.device) {
      case "mobile":
        setLayout(LayoutMobile);
        setLayout2(LayoutMobile2);
        break;
      default:
        setLayout(LayoutDesktop);
        setLayout2(LayoutDesktop2);
        break;
    }
  }, [JSON.stringify(responsive)]);

  useEffect(() => {
    if (valueLanguageContext.languageCurrent) {
      setDataSectionBanner(Language[`${valueLanguageContext.languageCurrent}`]);
    }
  }, []);

  useEffect(() => {
    if (valueLanguageContext.languageCurrent) {
      setDataSectionBanner(Language[`${valueLanguageContext.languageCurrent}`]);
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


  const listItemsEN = (
    <>
      {responsiveMobile === true ? (
        <>
          <ItemsInfo
            urlImage={asset("/images/bg-item-our-df-white.png")}
            timeShow={0.4}
            width={35}
            height={10}
            top={26}
            left={2}
            name={"JAPANESE TECHNOLOGY"}
            nameStyle={
              {
                textShadow: "unset"
              }
            }
          >
            JAPANESE <br /> TECHNOLOGY
          </ItemsInfo>
          <ItemsInfo
            urlImage={asset("/images/bg-item-our-df-white.png")}
            timeShow={0.4}
            height={14}
            width={44}
            top={32}
            right={28.5}
            name={"JAPANESE QUALITY"}
            nameStyle={
              {
                textShadow: "unset"
              }
            }
          >
            JAPANESE <br /> QUALITY
          </ItemsInfo>
          <ItemsInfo
            urlImage={asset("/images/bg-item-our-df-yellow.png")}
            timeShow={0.4}
            height={12}
            width={35}
            top={41}
            right={2}
            name={"VIETNAMESE PRICE"}
            nameStyle={
              {
                //textShadow: "rgb(255, 255, 255) 0px -1px 0px, rgb(255, 255, 255) -2px 3px 0px, rgb(255, 255, 255) -4px 0px 0px, rgb(255, 255, 255) 2px 0px 0px, rgb(255, 255, 255) 4px 2px, rgb(255, 255, 255) 2px 3px 0px, rgb(255, 255, 255) -2px -2px 0px, rgb(255, 255, 255) 0px -3px 0px"
              }
            }
          >
            VIETNAMESE <br /> PRICE
          </ItemsInfo>
          <ItemsInfo
            urlImage={asset("/images/bg-item-our-df-yellow-large.png")}
            timeShow={0.4}
            height={12}
            width={35}
            top={26}
            right={2}
            nameStyle={
              {
                //textShadow: "rgb(255, 255, 255) 0px -1px 0px, rgb(255, 255, 255) -2px 3px 0px, rgb(255, 255, 255) -4px 0px 0px, rgb(255, 255, 255) 2px 0px 0px, rgb(255, 255, 255) 4px 2px, rgb(255, 255, 255) 2px 3px 0px, rgb(255, 255, 255) -2px -2px 0px, rgb(255, 255, 255) 0px -3px 0px"
              }
            }
          >
            VIETNAMESE <br /> TASTE
          </ItemsInfo>
          <ItemsInfo
            urlImage={asset("/images/bg-item-our-df-white-large.png")}
            timeShow={0.5}
            height={12}
            width={35}
            top={41}
            left={2}
            name={"VIETNAMESE BRAND"}
            nameStyle={
              {
                textShadow: "unset"
              }
            }
          >
            JAPANESE <br /> BRAND
          </ItemsInfo>
        </>
      ) : (
        <></>
      )}
    </>
  );

  const listItemsVI = (
    <>
      {responsiveMobile === true ? (
        <>
          <ItemsInfo
            urlImage={asset("/images/bg-item-our-df-white.png")}
            timeShow={0.4}
            width={35}
            height={10}
            top={28}
            left={2}
            nameStyle={
              {
                textShadow: "unset"
              }
            }
            name={"JAPANESE TECHNOLOGY"}
          >
            CÔNG NGHỆ <br /> NHẬT BẢN
          </ItemsInfo>
          <ItemsInfo
            urlImage={asset("/images/bg-item-our-df-white.png")}
            timeShow={0.4}
            height={12}
            width={44}
            top={34}
            right={28.5}
            nameStyle={
              {
                textShadow: "unset"
              }
            }
            name={"JAPANESE QUALITY"}
          >
            CHẤT LƯỢNG
            <br />
            NHẬT BẢN
          </ItemsInfo>
          <ItemsInfo
            urlImage={asset("/images/bg-item-our-df-yellow.png")}
            timeShow={0.4}
            height={10}
            width={35}
            top={43}
            right={2}
            name={"VIETNAMESE PRICE"}
            nameStyle={
              {
                //textShadow: "rgb(255, 255, 255) 0px -1px 0px, rgb(255, 255, 255) -2px 3px 0px, rgb(255, 255, 255) -4px 0px 0px, rgb(255, 255, 255) 2px 0px 0px, rgb(255, 255, 255) 4px 2px, rgb(255, 255, 255) 2px 3px 0px, rgb(255, 255, 255) -2px -2px 0px, rgb(255, 255, 255) 0px -3px 0px"
              }
            }
          >
            GIÁ thành VIỆT
          </ItemsInfo>
          <ItemsInfo
            urlImage={asset("/images/bg-item-our-df-yellow-large.png")}
            timeShow={0.4}
            height={10}
            width={35}
            top={28}
            right={2}
            nameStyle={
              {
                //textShadow: "rgb(255, 255, 255) 0px -1px 0px, rgb(255, 255, 255) -2px 3px 0px, rgb(255, 255, 255) -4px 0px 0px, rgb(255, 255, 255) 2px 0px 0px, rgb(255, 255, 255) 4px 2px, rgb(255, 255, 255) 2px 3px 0px, rgb(255, 255, 255) -2px -2px 0px, rgb(255, 255, 255) 0px -3px 0px"
              }
            }
          >
            HƯƠNG VỊ VIỆT
          </ItemsInfo>
          <ItemsInfo
            urlImage={asset("/images/bg-item-our-df-white-large.png")}
            timeShow={0.5}
            height={10}
            width={35}
            top={43}
            left={2}
            name={"VIETNAMESE BRAND"}
            nameStyle={
              {
                textShadow: "unset"
              }
            }
          >
            THƯƠNG HIỆU NHẬT BẢN
          </ItemsInfo>
        </>
      ) : (
        <></>
      )}
    </>
  );

  const listItems = (Language) => {
    let component;

    switch (Language) {
      case "vi":
        component = listItemsVI;
        break;

      default:
        component = listItemsEN;
        break;
    }

    return component;
  };


  return (
    <section>
      <div className="slideBanner">
        <div>
          <Slider {...settings}>
            <ItemBanner urlImage={layout2}>
              {responsiveMobile === true ? (
                <>
                  <ItemsScaleEffect
                    srcImage={asset("/images/3-lon-m.png")}
                    width={55}
                    bottom={6}
                    right={4.4}
                    timeShow={1.4}
                  ></ItemsScaleEffect>
                  <ItemsSmallEffect1
                    srcImage={asset("/images/effect-small-item-honey-m.png")}
                    width={22}
                    top={32}
                    left={25}
                    timeShow={0.4}
                  ></ItemsSmallEffect1>
                  <ItemsSmallEffect1
                    srcImage={asset("/images/effect-small-item-b1-m.png")}
                    width={10}
                    top={30}
                    left={10}
                    timeShow={0.8}
                  ></ItemsSmallEffect1>
                  <ItemsSmallEffect1
                    srcImage={asset("/images/effect-small-item-taurine-m.png")}
                    width={18}
                    top={20}
                    right={10}
                    timeShow={1}
                  ></ItemsSmallEffect1>
                </>
              ) : (
                <>
                  <ItemsScaleEffect
                    width={24.51}
                    top={57.4}
                    right={4.4}
                    timeShow={1.4}
                  ></ItemsScaleEffect>
                  <ItemsSmallEffect1
                    srcImage={asset("/images/effect-small-item-b6.png")}
                    width={6}
                    top={10.89}
                    right={5.9}
                    timeShow={0.4}
                  ></ItemsSmallEffect1>
                  <ItemsSmallEffect1
                    srcImage={asset("/images/effect-small-item-b1.png")}
                    width={9.72}
                    top={58.2}
                    right={57.5}
                    timeShow={0.8}
                  ></ItemsSmallEffect1>
                  <ItemsSmallEffect1
                    srcImage={asset("/images/effect-small-item-taurine.png")}
                    width={6.25}
                    top={52}
                    right={66.2}
                    timeShow={1}
                  ></ItemsSmallEffect1>
                </>
              )}

              {dataSectionBanner ? (
                <TitleStyle2
                  textLine1={dataSectionBanner.data[1].title[0]}
                  textLine2={dataSectionBanner.data[1].title[1]}
                  textLine3={dataSectionBanner.data[1].title[2]}
                />
              ) : (
                <TitleStyle2 />
              )}
            </ItemBanner>
            <ItemBanner urlImage={layout}>
              {dataSectionBanner ? (
                <TitleStyle1
                  textLine1={dataSectionBanner.data[0].title[0]}
                  textLine2={dataSectionBanner.data[0].title[1]}
                  textLine3={dataSectionBanner.data[0].title[2]}
                />
              ) : (
                <TitleStyle1 />
              )}

              <div className={"EffectBanner"}>
                {responsiveMobile === true ? (
                  <>

                    {
                      valueLanguageContext
                      ? listItems(valueLanguageContext.languageCurrent)
                      : listItems("en")
                    }

                    {/* <ItemsSmallEffect1
                      srcImage={asset(
                        "/images/effect-small-item-janpan-tech-m.png"
                      )}
                      timeShow={0.3}
                      width={30}
                      top={30}
                      right={65}
                      ani=""
                    />
                    <ItemsInfo
                      urlImage={asset("/images/bg-item-our-df-white.png")}
                      timeShow={0.5}
                      width={30}
                      height={8}
                      top={30}
                      right={65}
                      name={"JAPANESE TECHNOLOGY"}
                    >
                      CÔNG NGHỆ <br /> NHẬT BẢN
                    </ItemsInfo>
                    <ItemsSmallEffect1
                      srcImage={asset(
                        "/images/effect-small-item-janpan-quanlity-m.png"
                      )}
                      timeShow={0.3}
                      width={39}
                      top={36}
                      right={30}
                      ani=""
                    />
                    <ItemsSmallEffect1
                      srcImage={asset(
                        "/images/effect-small-item-janpan-brand-m.png"
                      )}
                      timeShow={0.3}
                      width={30}
                      top={45}
                      right={65}
                      ani=""
                    />
                    <ItemsSmallEffect1
                      srcImage={asset(
                        "/images/effect-small-item-vietnam-taste-m.png"
                      )}
                      timeShow={0.3}
                      width={30}
                      top={30}
                      right={6}
                      ani=""
                    />
                    <ItemsSmallEffect1
                      srcImage={asset(
                        "/images/effect-small-item-vietnam-taste-m.png"
                      )}
                      timeShow={0.3}
                      width={30}
                      top={45}
                      right={6}
                      ani=""
                    /> */}

                    <ItemsSmallEffect1
                      srcImage={asset("/images/effect-small-item-honey-m.png")}
                      timeShow={0.3}
                      width={17}
                      top={60}
                      right={66}
                    ></ItemsSmallEffect1>
                    <ItemsSmallEffect1
                      srcImage={asset(
                        "/images/effect-small-item-inositol-m.png"
                      )}
                      timeShow={0.2}
                      width={12}
                      top={62}
                      right={22}
                    ></ItemsSmallEffect1>
                    <ItemsSmallEffect1
                      srcImage={asset("/images/effect-small-item-b2-m.png")}
                      timeShow={0.3}
                      width={15}
                      top={55}
                      right={42}
                      ani=""
                    ></ItemsSmallEffect1>
                  </>
                  
                ) : (
                  <>
                    <ItemsSmallEffect1
                      srcImage={asset("/images/effect-small-item-honey.png")}
                      timeShow={1.4}
                      width={10.2}
                      top={13.72}
                      right={5.76}
                    ></ItemsSmallEffect1>
                    <ItemsSmallEffect1
                      srcImage={asset("/images/effect-small-item-inositol.png")}
                      timeShow={0.4}
                      width={8}
                      top={42}
                      right={69.2}
                    ></ItemsSmallEffect1>
                    <ItemsSmallEffect1
                      srcImage={asset("/images/effect-small-item-b2.png")}
                      timeShow={1}
                      width={6.25}
                      top={58.9}
                      right={76.2}
                    ></ItemsSmallEffect1>
                  </>
                )}
              </div>
            </ItemBanner>
          </Slider>
        </div>
        {responsiveMobile === true ? (
          <></>
        ) : (
          <>
            {
              valueLanguageContext.languageCurrent === "vi" 
              ? (
                <ItemsMouse
                  urlImage={asset("/images/icon-mouse-scroll-vi.png")}
                  timeShow={1}
                  width={5}
                  top={65}
                  right={90}
                ></ItemsMouse>
              )
              :(
                <ItemsMouse
                urlImage={asset("/images/icon-mouse-scroll.png")}
                timeShow={1}
                width={5}
                top={65}
                right={90}
              ></ItemsMouse>
              )
            }
            <ItemsMouse
              urlImage={asset("/images/icon-scroll-mouse.png")}
              timeShow={0.1}
              width={5}
              top={65}
              right={90}
              animation={true}
            ></ItemsMouse>
            {/* <GroupDots position={"RIGHT"} /> */}
          </>
        )}
      </div>

      <style jsx>{`
        .slideBanner {
          min-height: 90vh;
          min-width: 100vw;
        }
      `}</style>
    </section>
  );
}
