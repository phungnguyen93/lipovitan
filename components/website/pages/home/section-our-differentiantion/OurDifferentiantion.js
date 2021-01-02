import asset from "plugins/assets/asset";
import GroupDots from "components/website/group-dots/GroupDots";
import TitleStyle1 from "components/website/pages/home/section-our-differentiantion/title/TitleStyle1";
import Item from "components/website/pages/home/section-our-differentiantion/items-our-differentiation/Items";
import { MainContent } from "components/website/contexts/MainContent";
import { useEffect, useRef, useState, useContext } from "react";

import useWindowSize from "components/website/hooks/useWindowsSize";

export default function OurDifferentiantion({
  urlBackground = asset("/images/bg-session-our-differentiantion-2.jpg"),
}) {
  const valueLanguageContext = useContext(MainContent);

  const [dataSectionOurDif, setDataSectionOurDif] = useState();

  // detect screen size
  const windowSize = useWindowSize();
  const [responsiveMaxScreen, setResponsiveMaxScreen] = useState(false);
  const [responsiveMobile, setResponsiveMobile] = useState(false);
  const [responsiveTablet, setResponsiveTablet] = useState(false);

  const Language = {
    en: {
      name: "en",
      title: ["Our", "Differentiation"],
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
      title: ["Khác biệt", "của chúng tôi"],
      listOurDifferent: [
        "CÔNG NGHỆ NHẬT BẢN",
        "CHẤT LƯỢNG NHẬT BẢN",
        "GIÁ VIỆT NAM",
        "THƯƠNG HIỆU NHẬT BẢN",
        "MÓN NGON VIỆT NAM",
      ],
    },
  };

  const listItemsEN = (
    <>
      {responsiveMobile === true ? (
        <>
          <Item
            urlImage={asset("/images/bg-item-our-df-white.png")}
            timeShow={0.5}
            width={60}
            height={25}
            top={"0"}
            left={"0"}
            name={"JAPANESE TECHNOLOGY"}
          >
            JAPANESE <br /> TECHNOLOGY
          </Item>
          <Item
            urlImage={asset("/images/bg-item-our-df-white.png")}
            timeShow={0.5}
            width={60}
            height={25}
            top={22}
            right={"0"}
            name={"JAPANESE QUALITY"}
          >
            JAPANESE <br /> QUALITY
          </Item>
          <Item
            urlImage={asset("/images/bg-item-our-df-yellow.png")}
            timeShow={0.5}
            width={60}
            height={27}
            top={56}
            right={"0"}
            name={"VIETNAMESE PRICE"}
            nameStyle={
              {
                //textShadow: "rgb(255, 255, 255) 0px -1px 0px, rgb(255, 255, 255) -2px 3px 0px, rgb(255, 255, 255) -4px 0px 0px, rgb(255, 255, 255) 2px 0px 0px, rgb(255, 255, 255) 4px 2px, rgb(255, 255, 255) 2px 3px 0px, rgb(255, 255, 255) -2px -2px 0px, rgb(255, 255, 255) 0px -3px 0px"
              }
            }
          >
            VIETNAMESE <br /> PRICE
          </Item>
          <Item
            urlImage={asset("/images/bg-item-our-df-yellow-large.png")}
            timeShow={0.5}
            width={60}
            height={28}
            top={78}
            left={"0"}
            nameStyle={
              {
                //textShadow: "rgb(255, 255, 255) 0px -1px 0px, rgb(255, 255, 255) -2px 3px 0px, rgb(255, 255, 255) -4px 0px 0px, rgb(255, 255, 255) 2px 0px 0px, rgb(255, 255, 255) 4px 2px, rgb(255, 255, 255) 2px 3px 0px, rgb(255, 255, 255) -2px -2px 0px, rgb(255, 255, 255) 0px -3px 0px"
              }
            }
          >
            VIETNAMESE <br /> TASTE
          </Item>
          <Item
            urlImage={asset("/images/bg-item-our-df-white-large.png")}
            timeShow={0.5}
            width={55}
            height={25}
            top={40}
            left={"0"}
            name={"VIETNAMESE PRICE"}
          >
            JAPANESE <br /> BRAND
          </Item>
        </>
      ) : (
        <>
          <Item
            urlImage={asset("/images/bg-item-our-df-white.png")}
            timeShow={0.5}
            width={25.36}
            height={53.7}
            top={"0"}
            left={"0"}
            name={"JAPANESE TECHNOLOGY"}
          >
            JAPANESE <br /> TECHNOLOGY
          </Item>
          <Item
            urlImage={asset("/images/bg-item-our-df-white.png")}
            timeShow={0.5}
            width={25.36}
            height={53.7}
            top={"0"}
            left={37.38}
            name={"JAPANESE QUALITY"}
          >
            JAPANESE <br /> QUALITY
          </Item>
          <Item
            urlImage={asset("/images/bg-item-our-df-yellow.png")}
            timeShow={0.5}
            width={25}
            height={56.56}
            top={"0"}
            right={"0"}
            name={"VIETNAMESE PRICE"}
            nameStyle={
              {
                //textShadow: "rgb(255, 255, 255) 0px -1px 0px, rgb(255, 255, 255) -2px 3px 0px, rgb(255, 255, 255) -4px 0px 0px, rgb(255, 255, 255) 2px 0px 0px, rgb(255, 255, 255) 4px 2px, rgb(255, 255, 255) 2px 3px 0px, rgb(255, 255, 255) -2px -2px 0px, rgb(255, 255, 255) 0px -3px 0px"
              }
            }
          >
            VIETNAMESE <br /> PRICE
          </Item>
          <Item
            urlImage={asset("/images/bg-item-our-df-yellow-large.png")}
            timeShow={0.5}
            width={30.5}
            height={66.45}
            bottom={"0"}
            left={53.3}
            nameStyle={
              {
                //textShadow: "rgb(255, 255, 255) 0px -1px 0px, rgb(255, 255, 255) -2px 3px 0px, rgb(255, 255, 255) -4px 0px 0px, rgb(255, 255, 255) 2px 0px 0px, rgb(255, 255, 255) 4px 2px, rgb(255, 255, 255) 2px 3px 0px, rgb(255, 255, 255) -2px -2px 0px, rgb(255, 255, 255) 0px -3px 0px"
              }
            }
          >
            VIETNAMESE <br /> TASTE
          </Item>
          <Item
            urlImage={asset("/images/bg-item-our-df-white-large.png")}
            timeShow={0.5}
            width={31}
            height={66.67}
            bottom={"0"}
            left={15.8}
            name={"VIETNAMESE PRICE"}
          >
            JAPANESE <br /> BRAND
          </Item>
        </>
      )}
    </>
  );

  const listItemsVI = (
    <>
      {responsiveMobile === true ? (
        <>
          <Item
            urlImage={asset("/images/bg-item-our-df-white.png")}
            timeShow={0.5}
            width={60}
            height={25}
            top={"0"}
            left={"0"}
            name={"JAPANESE TECHNOLOGY"}
          >
            CÔNG NGHỆ <br /> NHẬT BẢN
          </Item>
          <Item
            urlImage={asset("/images/bg-item-our-df-white.png")}
            timeShow={0.5}
            width={60}
            height={25}
            top={22}
            right={"0"}
            name={"JAPANESE QUALITY"}
          >
            CHẤT LƯỢNG
            <br />
            NHẬT BẢN
          </Item>
          <Item
            urlImage={asset("/images/bg-item-our-df-yellow.png")}
            timeShow={0.5}
            width={60}
            height={27}
            top={56}
            right={"0"}
            name={"VIETNAMESE PRICE"}
            nameStyle={
              {
                //textShadow: "rgb(255, 255, 255) 0px -1px 0px, rgb(255, 255, 255) -2px 3px 0px, rgb(255, 255, 255) -4px 0px 0px, rgb(255, 255, 255) 2px 0px 0px, rgb(255, 255, 255) 4px 2px, rgb(255, 255, 255) 2px 3px 0px, rgb(255, 255, 255) -2px -2px 0px, rgb(255, 255, 255) 0px -3px 0px"
              }
            }
          >
            GIÁ thành VIỆT
          </Item>
          <Item
            urlImage={asset("/images/bg-item-our-df-yellow-large.png")}
            timeShow={0.5}
            width={60}
            height={28}
            top={78}
            left={"0"}
            nameStyle={
              {
                //textShadow: "rgb(255, 255, 255) 0px -1px 0px, rgb(255, 255, 255) -2px 3px 0px, rgb(255, 255, 255) -4px 0px 0px, rgb(255, 255, 255) 2px 0px 0px, rgb(255, 255, 255) 4px 2px, rgb(255, 255, 255) 2px 3px 0px, rgb(255, 255, 255) -2px -2px 0px, rgb(255, 255, 255) 0px -3px 0px"
              }
            }
          >
            HƯƠNG VỊ VIỆT
          </Item>
          <Item
            urlImage={asset("/images/bg-item-our-df-white-large.png")}
            timeShow={0.5}
            width={55}
            height={25}
            top={40}
            left={"0"}
            name={"VIETNAMESE PRICE"}
          >
            THƯƠNG HIỆU NHẬT BẢN
          </Item>
        </>
      ) : (
        <>
          <Item
            urlImage={asset("/images/bg-item-our-df-white.png")}
            timeShow={0.5}
            width={25.36}
            height={53.7}
            top={"0"}
            left={"0"}
            name={"JAPANESE TECHNOLOGY"}
          >
            CÔNG NGHỆ NHẬT BẢN
          </Item>
          <Item
            urlImage={asset("/images/bg-item-our-df-white.png")}
            timeShow={0.5}
            width={25.36}
            height={53.7}
            top={"0"}
            left={37.38}
            name={"JAPANESE QUALITY"}
          >
            CHẤT LƯỢNG NHẬT BẢN
          </Item>
          <Item
            urlImage={asset("/images/bg-item-our-df-yellow.png")}
            timeShow={0.5}
            width={25}
            height={56.56}
            top={"0"}
            right={"0"}
            name={"VIETNAMESE PRICE"}
            nameStyle={
              {
                //textShadow: "rgb(255, 255, 255) 0px -1px 0px, rgb(255, 255, 255) -2px 3px 0px, rgb(255, 255, 255) -4px 0px 0px, rgb(255, 255, 255) 2px 0px 0px, rgb(255, 255, 255) 4px 2px, rgb(255, 255, 255) 2px 3px 0px, rgb(255, 255, 255) -2px -2px 0px, rgb(255, 255, 255) 0px -3px 0px"
              }
            }
          >
            GIÁ thành VIỆT
          </Item>
          <Item
            urlImage={asset("/images/bg-item-our-df-yellow-large.png")}
            timeShow={0.5}
            width={30.5}
            height={66.45}
            bottom={"0"}
            left={53.3}
            nameStyle={
              {
                //textShadow: "rgb(255, 255, 255) 0px -1px 0px, rgb(255, 255, 255) -2px 3px 0px, rgb(255, 255, 255) -4px 0px 0px, rgb(255, 255, 255) 2px 0px 0px, rgb(255, 255, 255) 4px 2px, rgb(255, 255, 255) 2px 3px 0px, rgb(255, 255, 255) -2px -2px 0px, rgb(255, 255, 255) 0px -3px 0px"
              }
            }
          >
            HƯƠNG VỊ VIỆT
          </Item>
          <Item
            urlImage={asset("/images/bg-item-our-df-white-large.png")}
            timeShow={0.5}
            width={31}
            height={66.67}
            bottom={"0"}
            left={15.8}
            name={"VIETNAMESE PRICE"}
          >
            THƯƠNG HIỆU
            <br />
            NHẬT BẢN
          </Item>
        </>
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

  useEffect(() => {
    if (valueLanguageContext.languageCurrent) {
      setDataSectionOurDif(Language[`${valueLanguageContext.languageCurrent}`]);
    }
  }, []);

  useEffect(() => {
    if (valueLanguageContext.languageCurrent) {
      setDataSectionOurDif(Language[`${valueLanguageContext.languageCurrent}`]);
    }
  }, [valueLanguageContext.languageCurrent]);

  //check responsive
  useEffect(() => {
    if (windowSize.width <= 1024) {
      setResponsiveTablet(true);
      setResponsiveMaxScreen(false);
      if (windowSize.width <= 599) {
        setResponsiveTablet(false);
        setResponsiveMobile(true);
      }
    } else {
      setResponsiveTablet(false);
      setResponsiveMobile(false);
      setResponsiveMaxScreen(true);
    }

    console.log(windowSize, setResponsiveMaxScreen);
  }, [windowSize]);

  return (
    <section>
      {responsiveMaxScreen === true ? (

        <div className="sectionOurDifferentiantion">
          <img className="bgOurDff" src={urlBackground} />

          {dataSectionOurDif ? (
            <TitleStyle1
              textLine1={dataSectionOurDif.title[0]}
              textLine2={dataSectionOurDif.title[1]}
            />
          ) : (
            <TitleStyle1 />
          )}

          {responsiveMobile === true ? (
            <></>
          ) : (
            <>
              <GroupDots
                position={"left"}
                bottom={-19}
                style={{
                  transform: "translate(-50%,0)",
                }}
              />
            </>
          )}

          <div className={"containerOurDff"}>
            <div className="fixItems">
              {valueLanguageContext
                ? listItems(valueLanguageContext.languageCurrent)
                : listItems("en")}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <style jsx>{`
        .sectionOurDifferentiantion {
          position: relative;
          min-height: 50vh;
        }

        .bgOurDff {
          z-index: 1;
          width: 100%;
        }

        .containerOurDff {
          position: absolute;
          left: 50%;
          bottom: 10.5%;
          transform: translate(-50%, 0);
          z-index: 2;
          width: 100%;
          height: 51.8%;
          padding: 0 50px;
          max-width: 1440px;
          max-height: 456.5px;
        }

        .fixItems {
          position: relative;
          width: 100%;
          height: 100%;
        }
        @media screen and (max-width: 599px) {
          .containerOurDff {
            height: 72%;
            max-height: unset;
            padding: 0 5px;
          }
        }
      `}</style>
    </section>
  );
}
