import CONFIG from "web.config";
import MasterPage from "components/website/master/MasterPage";
import { useState, useEffect, useRef, useContext } from "react";
import {useRouter} from "next/router";
import Header from "components/website/elements/Header";
import { BS } from "components/diginext/elements/Splitters";
import BannerJoinUs from "components/website/pages/join-us/section-banner-top/BannerTop";
import SectionContentJob from "components/website/pages/join-us/section-content-job/ContentJob";
import Footer from "components/website/elements/Footer";
import Axios from "axios";
import {MainContent} from "components/website/contexts/MainContent";

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
  

export default function JoinUS(props) {

  // if (typeof window == "undefined") {
  //   console.log("This code is on server-side");
  // }

  
  const router = useRouter();

  const [job, setJob] = useState();

  const valueLanguageContext =  useContext(MainContent);

  

  const callAPI = async (url, callbackFn)=>{
    let config = {
      headers: {
          'X-localization': valueLanguageContext.languageCurrent,
      }
    }
    await Axios
         .get(`${url}`, config)
         .then((response) => callbackFn(response.data))
         .catch((error) => console.log(error));
  }

  

  useEffect(() => {
    callAPI(
        `https://api.lipovitan.zii.vn/api/v1/jobs/${router.query.slug}`,
        setJob
    );
  }, []);

  // useEffect(() => {
  //   console.log(job);
  
  // }, [job]);

  useEffect(() => {
    callAPI(
      `https://api.lipovitan.zii.vn/api/v1/jobs/${router.query.slug}`,
      setJob
    );
  }, [valueLanguageContext]);


  return (
    <MasterPage pageName={"Join us"}>
      <Header hideButtons></Header>
      <main id="joinUsPage">
        <BannerJoinUs></BannerJoinUs>
        {
          job 
          ?  (<SectionContentJob dataAPI={job}/>)
          : <><span>Loading...</span></>
        }
        
      </main>
      <Footer></Footer>
    </MasterPage>
  );
}
