import CONFIG from "web.config";
import MasterPage from "components/website/master/MasterPage";
import BasicLayout from "components/diginext/layout/BasicLayout";
import { useRouter } from "next/router";
import Header from "components/website/elements/Header";
import DashkitButton from "components/dashkit/Buttons";
import { BS } from "components/diginext/elements/Splitters";
import BannerProduct from "components/website/pages/our-product/section-banner/Banner";
import Certification from "components/website/pages/our-product/section-technology-certification/TechnologyCertification";
import Ennergy from "components/website/pages/our-product/section-energy/Energy";
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

export default function OurProduct(props) {
  const router = useRouter();

  if (typeof window == "undefined") {
    console.log("This code is on server-side");
  }

  const bgSessionBrandStory = {
    desktop: asset("/images/bg-session-brand-story.png"),
    mobile: asset("/images/bg-session-brand-story-m.png"),
  }
  const bgSessionEnergy = {
    desktop: asset("/images/bg-session-energy-our-product-3.png"),
    mobile: asset("/images/bg-session-energy-our-product-m.png"),
  }


  const bgSessionCertification = {
    desktop1: asset("/images/bg-session-certifications-our-product-cut-1.png"),
    desktop2: asset("/images/bg-session-certifications-our-product-cut-2.jpg"),
    mobile1:  asset("/images/bg-session-certifications-our-product-cut-1-m.jpg"),
    mobile2: asset("/images/bg-session-certifications-our-product-cut-2-m.jpg"),
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
    <MasterPage pageName={"Our product"}>
      <Header hideButtons></Header>
      <main id="ourProductPage">
        {
          responsiveMobile === true 

          ? (<>
              <BannerProduct></BannerProduct>
              <Ennergy
                 urlBackground={bgSessionEnergy.mobile}
              ></Ennergy>
              <Certification
                urlBackground1={bgSessionCertification.mobile1}
                urlBackground2={bgSessionCertification.mobile2}
              />
          </>) 
          : (<>
            <BannerProduct></BannerProduct>
            <Ennergy
              urlBackground={bgSessionEnergy.desktop}
            ></Ennergy>
            <Certification
              urlBackground1={bgSessionCertification.desktop1}
              urlBackground2={bgSessionCertification.desktop2}
            />
          </>)
        }
      </main>
      <Footer></Footer>
    </MasterPage>
  );
}
