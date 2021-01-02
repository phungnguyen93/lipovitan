// import { Image } from "antd";
// import DashkitButton, { ButtonType } from "components/dashkit/Buttons";
// import DashkitIcon from "components/dashkit/Icon";
// import { LS } from "components/diginext/elements/Splitters";
// import { HorizontalList, HorizontalListAlign, ListItem, ListItemSize } from "components/diginext/layout/ListLayout";
import { useRouter } from "next/router";
import Logo from "components/website/logo/Logo";
import Link from "next/link";
import asset from "plugins/assets/asset";
import { TweenMax, TimelineLite } from "gsap";
import useWindowSize from "components/website/hooks/useWindowsSize";
import SelectLanguage from "components/website/elements/Language";
import { MainContent } from "components/website/contexts/MainContent";
import {
  useEffect,
  useRef,
  useState,
  useContext,
  useLayoutEffect,
} from "react";
import { Affix, Button } from "antd";
import useScroll from "components/website/hooks/useScroll";
import Preloader from "components/website/elements/Spin";
// import useScrollPosition from '@react-hook/window-scroll';

// const listItemsMenu= {
//   en: [
//     { route : "/", name : "HomePage"},
//     { route: "/our-product",  name : "Our Product"},
//     { route: "/about-us", name : "About Us"},
//     { route: "/news",  name : "News"},
//     { route: "/where-to-buy",  name : "Where to buy"},
//     { route: "/contact-us",  name : "Contact Us"},
//   ],
//   vi: [
//     { route : "/", name : "Trang chủ"},
//     { route: "/our-product",  name : "Sản phẩm"},
//     { route: "/about-us", name : "Về chúng tôi"},
//     { route: "/news",  name : "Tin tức"},
//     { route: "/where-to-buy",  name : "Nơi mua"},
//     { route: "/contact-us",  name : "Liên hệ"},
//   ]
// }

const Language = {
  en: {
    name: "en",
    listMenu: [
      { route: "/", name: "HomePage" },
      { route: "/about-us", name: "About Us" },
      { route: "/our-product", name: "Our Product" },
      { route: "/news", name: "News" },
      { route: "/where-to-buy", name: "Where to buy" },
      { route: "/contact-us", name: "Contact Us" },
    ],
  },

  vi: {
    name: "vi",
    listMenu: [
      { route: "/", name: "Trang chủ" },
      { route: "/about-us", name: "Về chúng tôi" },
      { route: "/our-product", name: "Sản phẩm" },
      { route: "/news", name: "Tin tức" },
      { route: "/where-to-buy", name: "Điểm mua hàng" },
      { route: "/contact-us", name: "Liên hệ" },
    ],
  },
};

export default function Header({ children }) {
  const router = useRouter();
  const headerRef = useRef();
  const listRef = useRef();
  const navRef = useRef();

  const [statusLoader, setStatusLoader] = useState();

  const valueLanguageContext = useContext(MainContent);
  const [dataHeader, setDataHeader] = useState();
  const [top, setTop] = useState(0.01);

  const scrollOption = useScroll();

  // const [classFix, setClassFix] = useState("");

  // useEffect(()=>{

  //   if(scrollOption.scrollDirection === "up"){
  //     console.log("UP", scrollOption.scrollY);
  //     setClassFix("");
  //     setTop(100)
  //   }else{
  //     console.log("DOWN", scrollOption.scrollY);
  //     setClassFix("affix");
  //     setTop(0.1)
  //     if(scrollOption.scrollY < 200 ){
  //         setClassFix("")
  //     }
  //   }

  // },[scrollOption.scrollY, scrollOption.scrollDirection])

  // detect screen size
  const [responsiveMobile, setResponsiveMobile] = useState(false);
  const [responsiveTablet, setResponsiveTablet] = useState(false);

  const windowSize = useWindowSize();

  useEffect(() => {
    setStatusLoader(true);
  }, []);

  useEffect(() => {
    if (statusLoader === true) {
      setTimeout(() => {
        setStatusLoader(false);
      }, 5000);
    }
  }, [statusLoader]);

  //check responsive
  useEffect(() => {
    if (windowSize.width <= 1025) {
      setResponsiveTablet(true);

      if (windowSize.width <= 480) {
        setResponsiveTablet(false);
        setResponsiveMobile(true);
      }
    } else {
      setResponsiveTablet(false);
      setResponsiveMobile(false);
    }
  }, [windowSize]);

  const [statusShow, setStatusShow] = useState(false);

  useEffect(() => {
    if (listRef.current) {
      statusShow ? animationIn() : animationIn2();
      // animationIn2();
    }
  }, [statusShow]);

  const setStatus = () => setStatusShow(!statusShow);

  useEffect(() => {
    if (valueLanguageContext.languageCurrent) {
      setDataHeader(Language[`${valueLanguageContext.languageCurrent}`]);
    }
  }, []);

  useEffect(() => {
    if (valueLanguageContext.languageCurrent) {
      setDataHeader(Language[`${valueLanguageContext.languageCurrent}`]);
    }
  }, [valueLanguageContext.languageCurrent]);

  const animationIn2 = function () {
    const tl = new TimelineLite();
    TweenMax.set(listRef.current, { autoAlpha: 0 });
    tl.add(TweenMax.staggerTo(listRef.current, 0.3, { autoAlpha: 1 }));
  };

  const animationIn = function () {
    const tl = new TimelineLite();
    TweenMax.set(listRef.current.getElementsByTagName("li"), {
      y: 50,
      autoAlpha: 0,
    });
    tl.add(
      TweenMax.staggerTo(
        listRef.current.getElementsByTagName("li"),
        0.4,
        { y: 0, autoAlpha: 1 },
        0.1
      )
    );
  };

  const Mobile = (
    <>
      <div
        ref={navRef}
        className={`${
          statusShow ? "headerContainer mobile open" : "headerContainer mobile"
        }`}
      >
        <Logo></Logo>
        <ul>
          <SelectLanguage></SelectLanguage>
          <li className="item social">
            <Link href={"#"}>
              <img src={asset("/images/youtube.png")} alt="" />
            </Link>
          </li>
          <li className="item social">
            <Link href={"#"}>
              <img src={asset("/images/FB.png")} alt="" />
            </Link>
          </li>
          <li className="item social openNav" onClick={setStatus}>
            {statusShow ? (
              <img
                className="close"
                src={asset("/images/icon-close.png")}
                alt=""
              />
            ) : (
              <img
                className="open"
                src={asset("/images/icon-menu.png")}
                alt=""
              />
            )}
          </li>
        </ul>
        <div className="menuMobile" ref={listRef}>
          {dataHeader ? (
            dataHeader.listMenu.map((value, index) => (
              <li 
                key={index} 
                // className={"item"}
                className={
                  router.asPath === value.route ? "active item" : "item"
                }
              >
                <Link href={value.route}>{value.name}</Link>
              </li>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );

  const Desktop = (
    <>
      <div className="headerContainer">
        <Logo></Logo>

        <ul className="menu">
          {dataHeader ? (
            dataHeader.listMenu.map((value, index) => (
              <li
                key={index}
                className={
                  router.asPath === value.route ? "active item" : "item"
                }
              >
                <Link href={value.route}>{value.name}</Link>
              </li>
            ))
          ) : (
            <></>
          )}

          {children}
        </ul>
        <ul>
          <SelectLanguage></SelectLanguage>
          <li className="item social">
            <Link href={"#"}>
              <img src={asset("/images/youtube.png")} alt="" />
            </Link>
          </li>
          <li className="item social">
            <a href={"https://www.facebook.com/LipovitanVN"} target="_blank">
              <img src={asset("/images/FB.png")} alt="" />
            </a>
          </li>
        </ul>
      </div>
    </>
  );

  return (
    <>
      <Preloader size="large" status={statusLoader} fullScreen={true} />
      <header ref={headerRef}>
        <Affix offsetTop={top}>
          <div className={"affix"}>
            {responsiveMobile || responsiveTablet ? Mobile : Desktop}
          </div>
        </Affix>

        <style jsx>{`
          .fix {
            transition: 0.2s;
            background-color: rgba(0, 0, 0, 0);
            position: unset;
          }

          .affix {
            //position: fixed;
            //top:0;
            //left:0;
            transition: 0.2s;
            background-color: #005ae18f;
            max-width: 100vw;
          }
        `}</style>
      </header>
    </>
  );
}
