import CONFIG from "web.config";
import MasterPage from "components/website/master/MasterPage";
import BasicLayout from "components/diginext/layout/BasicLayout";
import { useRouter } from "next/router";
import Header from "components/website/elements/Header";
import DashkitButton from "components/dashkit/Buttons";
import { BS } from "components/diginext/elements/Splitters";
import BannerWhereToBuy from "components/website/pages/where-to-buy/section-banner/Banner";
import BannerTop from "components/website/pages/where-to-buy/section-banner-top/BannerTop";
import SectionGTChannel from "components/website/pages/where-to-buy/section-channel/GTChannel";
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

export default function WhereToBuy(props) {

  const router = useRouter();

  const valueLanguageContext =  useContext(MainContent);
  const [dataGTChannel, setDataGTChannel] = useState();
  const [dataMTChannel, setDataMTChannel] = useState();

  if (typeof window == "undefined") {
    console.log("This code is on server-side");
  }

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
      "https://api.lipovitan.zii.vn/api/v1/gt-stores?limit=10&page=1",
      setDataGTChannel
    )
    callAPI(
      "https://api.lipovitan.zii.vn/api/v1/mt-stores?limit=10&page=1",
      setDataMTChannel
    )
  }, []);

  useEffect(() => {

    callAPI(
      "https://api.lipovitan.zii.vn/api/v1/gt-stores?limit=10&page=1",
      setDataGTChannel
    )

    callAPI(
      "https://api.lipovitan.zii.vn/api/v1/mt-stores?limit=10&page=1",
      setDataMTChannel
    )

  }, [valueLanguageContext.languageCurrent]);

  // useEffect(() => {
  //   if(dataMTChannel){
  //     console.log(dataMTChannel.data)
  //   }
  // }, [dataMTChannel]);

  return (
    <MasterPage pageName={"Where to buy"}>
    <Header hideButtons></Header>
      <main id="whereToBuyPage">
        {dataMTChannel ?<BannerTop data={dataMTChannel}></BannerTop> : <></>}
        {dataGTChannel ? <SectionGTChannel data={dataGTChannel}></SectionGTChannel>:<></>}
        <BannerWhereToBuy></BannerWhereToBuy>
      </main>
    <Footer></Footer>
  </MasterPage>
  );
}
