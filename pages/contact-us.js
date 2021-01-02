import CONFIG from "web.config";
import MasterPage from "components/website/master/MasterPage";
import BasicLayout from "components/diginext/layout/BasicLayout";
import { useRouter } from "next/router";
import Header from "components/website/elements/Header";
import DashkitButton from "components/dashkit/Buttons";
import { BS } from "components/diginext/elements/Splitters";
import BannerTop from "components/website/pages/contact-us/section-banner-top/BannerTop";
import SectionAddress from "components/website/pages/contact-us/section-address/Address";
import Footer from "components/website/elements/Footer";
import Axios from "axios";
import {useEffect, useRef, useState, useContext } from "react";
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

export default function ContactUs(props) {
  const router = useRouter();

  if (typeof window == "undefined") {
    console.log("This code is on server-side");
  }

  const valueLanguageContext =  useContext(MainContent);
 
  const [dataOffice, setDataOffice] = useState();


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
      "https://api.lipovitan.zii.vn/api/v1/offices?limit=3&page=1",
      setDataOffice
    )
  
  }, []);

  useEffect(() => {
    callAPI(
      "https://api.lipovitan.zii.vn/api/v1/offices?limit=3&page=1",
      setDataOffice
    )
  }, [valueLanguageContext.languageCurrent]);

  useEffect(() => {

    if(dataOffice){
      console.log(dataOffice.data.list);
    }
  }, [dataOffice]);

  return (
    <MasterPage pageName={"Contact us"}>
      <Header hideButtons></Header>
      <main id="contactPage">
        <BannerTop></BannerTop>

        { 
          dataOffice 
          ? <SectionAddress data={ dataOffice }></SectionAddress>
          : <> </>
        }
       
      </main>
      <Footer></Footer>
    </MasterPage>
  );
}
