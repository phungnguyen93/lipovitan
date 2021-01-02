import Button from "components/website/button/Button";
import asset from "plugins/assets/asset";
import Title from "components/website/pages/home/section-news/title/TitleStyle1";
import { useRouter } from "next/router";
import { ListNews } from "components/website/pages/news/list-news/ListNews";
import { Row, Wrapper } from "components/website/pages/news/NewsElements";
import { MainContent } from "components/website/contexts/MainContent";
import { useEffect, useRef, useState, useContext } from "react";

export default function News({
  urlBackground = asset("/images/bg-session-news-home.jpg"),
}) {


  const valueLanguageContext = useContext(MainContent);
  const [dataSectionNews, setDataSectionNews] = useState()

  const Language = {
    en: {
      name: "en",
      title : "News",
      nameButton:"VIEW ALL NEWS"
    },
    vi: {
      name: "vi",
      title : "Tin Tức",
      nameButton:"Xem tất cả"
    }
  }

  const router = useRouter();
  
  const getLink = ()=>{
    router.push("/news");
  }

  useEffect(() => {

    if (valueLanguageContext.languageCurrent) {

      setDataSectionNews(Language[`${valueLanguageContext.languageCurrent}`])

    }

  }, [])


  useEffect(() => {

    if (valueLanguageContext.languageCurrent) {

      setDataSectionNews(Language[`${valueLanguageContext.languageCurrent}`])

    }
  }, [valueLanguageContext.languageCurrent]);

  return (
    <section>
      <div
        className="sectionNewsHome"
        style={{
          background: `url(${asset(
            "/images/bg-session-news-home.jpg"
          )}) no-repeat center top/100% 100%`,
        }}
      >
        {/* <img className="bgNewsHome" src={urlBackground}/> */}

        {/* <Title textLine1={"news"} style={{ position: " relative" }}></Title> */}
        {
          dataSectionNews ? (
            <Title
              textLine1={dataSectionNews.title}
              style={{ position: " relative" }}
            />
          ) :<Title textLine1={"news"} style={{ position: " relative" }}></Title>

        }

        <div className="containerNewsHome">
          <Wrapper>
            <Row>
              <ListNews
                title={"OTHER NEWS"}
                color="#004FC4"
                linkData={`https://api.lipovitan.zii.vn/api/v1/posts?limit=3`}
              ></ListNews>
            </Row>
            <div className="center">

              {
                dataSectionNews 
                ? <Button cbFunction={getLink}>{dataSectionNews.nameButton}</Button>
                : <Button cbFunction={getLink}>view all news</Button>
              }
            
            </div>
          </Wrapper>
        </div>
      </div>

      <style jsx>{`
        .bgNewsHome {
          width: 100%;
        }

        .sectionNewsHome {
          position: relative;
          padding:  50px 0;
        }

        .containerNewsHome {
          width: 100%;
          //position: absolute;
          //width: 100%;
          //left: 50%;
          //top: 50%;
          //transform: translate(-50%, -40%);
          display: flex;
          justify-content: center;
        }
        .center {
          display: flex;
          justify-content: center;
        }
        @media screen and (max-width: 1440px) {
          .containerBannerTop {
            bottom: 7%;
          }
        }
      `}</style>
    </section>
  );
}
