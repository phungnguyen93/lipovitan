import CONFIG from "web.config";
import MasterPage from "components/website/master/MasterPage";
import { useRouter } from "next/router";
import Header from "components/website/elements/Header";
import { BS } from "components/diginext/elements/Splitters";
import BannerAboutUs from "components/website/pages/about-us/section-banner/Banner";
import SeriseInJapan from "components/website/pages/about-us/section-serise-in-japan/SeriseInJapan";
import SectionCareer from "components/website/pages/about-us/section-career/Career";
import Footer from "components/website/elements/Footer";
import asset from "plugins/assets/asset";
import { useEffect, useRef, useState, useContext } from "react";
import useWindowSize from "components/website/hooks/useWindowsSize";

export async function getServerSideProps(context) {

  // const params = context.params;
  // const query = context.query;
  // context.req.session ,
  // context.res
  // console.log(context.query);

  console.log("SERVER CODE");

  // var json = { data: [1, 2, 3, 4, 5] };

  return {
    props: {
      // params
    },
  };
}

export default function AboutUs(props) {
  const router = useRouter();

  if (typeof window == "undefined") {
    console.log("This code is on server-side");
  }
  const bgSectionInJapan = {
    desktop: asset("/images/bg-none-890.jpg"),
    mobile: asset("/images/bg-none-about-us-m2.jpg"),
  }

    // detect screen size
  const windowSize = useWindowSize();
  const [responsiveMaxScreen, setResponsiveMaxScreen] = useState(false);
  const [responsiveMobile, setResponsiveMobile] = useState(false);
  const [responsiveTablet, setResponsiveTablet] = useState(false);

    //check responsive
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

  return (
    <MasterPage pageName={"About us"}>
      <Header hideButtons></Header>
      <main id="aboutUsPage"  style={{' background': '#F3F3F3'}}>
      {
          responsiveMobile === true 

          ? (<>

            <BannerAboutUs></BannerAboutUs>
            <SeriseInJapan urlBackground={bgSectionInJapan.mobile}></SeriseInJapan>
            <SectionCareer></SectionCareer>

          </>) 
          :(<>
            <BannerAboutUs></BannerAboutUs>
            <SeriseInJapan urlBackground={bgSectionInJapan.desktop}></SeriseInJapan>
            <SectionCareer></SectionCareer>
          </>) 
      }
        
      </main>
      <Footer></Footer>
    </MasterPage>
  );
}
