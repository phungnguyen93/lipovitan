import CONFIG from "web.config";
import MasterPage from "components/website/master/MasterPage";
// import BasicLayout from "components/diginext/layout/BasicLayout";
// import FullscreenLayout from "components/diginext/layout/FullscreenLayout";
import { useRouter } from "next/router";
import SessionBrandStory from "components/website/pages/home/section-brand-story/BrandStory";
import BannerHome from "components/website/pages/home/section-banner/Banner";
import Header from "components/website/elements/Header";
import Footer from "components/website/elements/Footer";
import SessionOurDifferentiantion from "components/website/pages/home/section-our-differentiantion/OurDifferentiantion";
import SessionEnergyCycle from "components/website/pages/home/section-energy-cycle/EnergyCycle";
import SessionNews from "components/website/pages/home/section-news/News";
// import GroupDots from "components/website/group-dots/GroupDots";

import asset from "plugins/assets/asset";
import { useEffect, useRef, useState, useContext } from "react";
import useWindowSize from "components/website/hooks/useWindowsSize";
// import Preloader from "components/website/elements/Spin";

// import DeviceOrientation, { Orientation } from 'react-screen-orientation'


// import DashkitButton from "components/dashkit/Buttons";
// import { BS } from "components/diginext/elements/Splitters";

import Link from "next/link";
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

export default function Home(props) {
  
  // if (typeof window == "undefined") {
  //   console.log("This code is on server-side");
  // } else {
  //   console.log('Test lqt');
  // }
  
  //asset("/images/bg-session-brand-story.png"),
  
  const bgSessionBrandStory = {
    desktop: asset("/images/bg-session-brand-story.png"),
    mobile: asset("/images/bg-session-brand-story-m.png"),
  }
  const bgSessionOurDifferentiantion = {
    desktop: asset("/images/bg-session-our-differentiantion-2.png"),
    mobile: asset("/images/bg-session-our-differentiantion-m.jpg"),
  }

  const router = useRouter();

    // detect screen size
  const windowSize = useWindowSize();
  const [responsiveMaxScreen, setResponsiveMaxScreen] = useState(false);
  const [responsiveMobile, setResponsiveMobile] = useState(false);
  const [responsiveTablet, setResponsiveTablet] = useState(false);

    //check responsive
  useEffect(() => {

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
    <MasterPage>
      <Header hideButtons></Header>
      <main id="homePage">
        {
          responsiveMobile === true 

          ? (<>
              <BannerHome></BannerHome>
              <SessionBrandStory
                urlBackground={bgSessionBrandStory.mobile}
              />
              <SessionOurDifferentiantion
                urlBackground={bgSessionOurDifferentiantion.mobile}
              />

              <SessionEnergyCycle></SessionEnergyCycle>

              <SessionNews></SessionNews>
          </>) 

          : (<>

            <BannerHome></BannerHome>

            <SessionBrandStory
                  urlBackground={bgSessionBrandStory.desktop}
            />
            <SessionOurDifferentiantion
              
            ></SessionOurDifferentiantion>

            <SessionEnergyCycle></SessionEnergyCycle>

            <SessionNews></SessionNews>
          </>)
          
        }

        
     
      </main>
      
      <Footer></Footer>
      
    </MasterPage>
  );
}
