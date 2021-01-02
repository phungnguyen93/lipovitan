import CONFIG from "web.config";
import MasterPage from "components/website/master/MasterPage";
import { useRouter } from "next/router";
import Header from "components/website/elements/Header";
import { BS } from "components/diginext/elements/Splitters";
import Footer from "components/website/elements/Footer";
import { ListNews } from "components/website/pages/news/list-news/ListNews";
import asset from "plugins/assets/asset";
import { Row, Wrapper } from "components/website/pages/news/NewsElements";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { MainContent } from "components/website/contexts/MainContent";
import Axios from "axios";
import ReactHtmlParser from 'react-html-parser';
import { useNextResponsive } from "plugins/next-reponsive";
import Head from "next/head";
import {
  FacebookShareButton,
  FacebookIcon,
} from "react-share";

export async function getServerSideProps(context) {

  const callAPI = async (url, callbackFn) => {

    let config = {
      headers: {
        "X-localization": "vi",
      },
    };

    await Axios.get(`${url}`, config)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  };

  const params = context.params;
  const query = context.query;
  const slug = context.params.slug;
  let res1;

  let postDetail;
  let postDetailVn;
  // context.req.session,
  // context.res
  // console.log("query222",context.query);
  // console.log("params",context.params);
  // console.log("ress", context)
  //
  // console.log("SERVER CODE 1111");

  let configEn = {
    headers: {
      "X-localization": "en",
    },
  };

  let configVi = {
    headers: {
      "X-localization": "vi",
    },
  };


  const res2 = await fetch(
    `https://api.lipovitan.zii.vn/api/v1/posts/${context.query.slug}`,
    configEn
  );

  postDetail = await res2.json();

  if( !postDetail.data || postDetail.data === null){

    res1 = await fetch(
      `https://api.lipovitan.zii.vn/api/v1/posts/${context.query.slug}`,
      configVi
    );

    postDetail = await res1.json();

  }

  // console.log("POST",postDetail);
 
  // console.log("SERVER CODE 2222");
 
    return {
      props: {
        params,
        query,
        slug,
        postDetail
      },
    };
}



export default function PasgeNews( 
  props
  ) {

  const router = useRouter();

  // if (typeof window == "undefined") {
  //   console.log("datatat",postList)
  //   console.log("This code is on server-side");
  // }

  const valueLanguageContext = useContext(MainContent);

  const [dataDetail, setDataDetail] = useState();
  const [idCategory, setDataCategory] = useState();
  const [contentDetail, setContentDetail] = useState();
  const [contentDetailHTML, setContentDetailHTML] = useState();

  const callAPI = async (url, callbackFn) => {

    let config = {
      headers: {
        "X-localization": valueLanguageContext.languageCurrent,
      },
    };

    await Axios.get(`${url}`, config)
      .then((response) => callbackFn(response.data))
      .catch((error) => console.log(error));
  };

  const HtmlComponent = (html) => {
    return <>{ReactHtmlParser(html)}</>;
  };

  useEffect(() => {
    // console.log(router.query.slug);
    // console.log(CONFIG.getBaseURL());

    // callAPI(
    //   `https://api.lipovitan.zii.vn/api/v1/posts/${props.query.slug.toString()}`,
    //   setDataDetail
    // );
    setDataDetail(props.postDetail)

  }, []);

  useEffect(() => {
    // callAPI(
    //   `https://api.lipovitan.zii.vn/api/v1/posts/${props.query.slug.toString()}`,
    //   setDataDetail
    // );
    setDataDetail(props.postDetail)
    // console.log("da12222",dataDetail)
  },[router.query.slug]);

  useEffect(() => {
    if (dataDetail) {

      setDataCategory(dataDetail.data.postCategory.id);

      if (valueLanguageContext.languageCurrent === "en") {
        setContentDetail(dataDetail.data.content.en);
      } else {
        setContentDetail(dataDetail.data.content.vi);
      }
      console.log("da12222",dataDetail)
    }
   
  }, [dataDetail]);
  
  useEffect(() => {
    console.log( router.asPath);
  }, [idCategory]);

  useEffect(() => {
    setContentDetailHTML(HtmlComponent(contentDetail))
  }, [contentDetail, valueLanguageContext]);

  const contentData = (language) => {
    switch (language) {
      case language === "vi":
        return (
          <>
            <div>
              <h5>
                <span>
                  <Link href="/">Homepage</Link>
                </span>
                <span>
                  <Link href={"/news"}>news</Link>
                </span>
                <span>
                  <Link href="">{dataDetail.data.slug.vi || ""}</Link>
                </span>
              </h5>
              <h3>{dataDetail.data.title.vi}</h3>
              <div className={"tag"}>
                <span className={"date"}>{dataDetail.data.createdAt.vi}</span>
                {dataDetail.data.active.vi ? (
                  <span className={"status"}>active</span>
                ) : (
                  <></>
                )}
              </div>

              <p className="introduce">{dataDetail.data.shortDescription.vi}</p>

              <img
                src={
                  dataDetail.data.image.iv ||
                  asset("/images/news-detail-demo.png")
                }
              />

              <div className="content">
                {contentDetailHTML ? contentDetailHTML : <p>None content</p>}

                {/* <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sodales mi vel nisi suscipit maximus. Quisque ultricies quam vitae urna pretium, eu aliquet dolor accumsan. Donec scelerisque nisi commodo, elementum metus sed, tristique ante. Praesent urna ipsum, iaculis et tincidunt in, mattis eget sapien. Etiam tempus augue eget augue ornare aliquam. Integer id sagittis enim. 
                              Nam orci leo, facilisis in porta et, faucibus vitae lacus. Donec non est non tortor convallis posuere eu at justo. Sed venenatis, risus et facilisis tempor, nibh libero ultricies ligula, eget mollis felis nibh non diam. Pellentesque pulvinar, libero non blandit condimentum, quam sapien laoreet sapien, a luctus massa turpis vel enim. Nullam eu scelerisque odio. 
                              Phasellus fringilla turpis sit amet arcu porta, non vulputate libero mollis. Maecenas non nibh sed lorem tristique rhoncus. Donec risus ante, tincidunt vel condimentum placerat, egestas sed orci. Ut pharetra quam vel facilisis convallis. 
                          </p> */}
              </div>
              <div className="share">
                <p>Chia sẻ bài viết</p>
                <Link href="">
                  <img src={asset("/images/icon-fb-blue.png")} />
                </Link>
                <Link href="">
                  <img src={asset("/images/icon-google-blue.png")} />
                </Link>
              </div>
            </div>
          </>
        );
      default:
        break;
    }
  };

  let responsive = useNextResponsive();

  const LayoutDesktop = {
    background: `url(${asset(
      "/images/news/bg_top.jpg"
    )}) no-repeat center top/100% auto #F3F3F3`,
    "padding-top": "120px",
  };
  const LayoutMobile = {
    background: `url(${asset(
      "/images/mb/news/banner.jpg"
    )}) no-repeat center top/100% auto #F3F3F3`,
    "padding-top": "80px",
  };
  const [layout, setLayout] = useState(LayoutDesktop);

  useEffect(() => {
    switch (responsive.device) {
      case "mobile":
        setLayout(LayoutMobile);
        break;
      default:
        setLayout(LayoutDesktop);
        break;
    }
  }, [JSON.stringify(responsive)]);
  return (
    <>
      <MasterPage 
        // pageName={dataDetail ? props.query.slug : "news"}
        noneHead={true}
      >
        <Head>
          <title>
              {"Lipovitan | News"}
          </title>

          <meta name="description" 
            content={
              props.postDetail.data.metaDescription[`${valueLanguageContext.languageCurrent}`]} />

          <meta name="keywords" content={
            props.postDetail.data.metaKeyword[`${valueLanguageContext.languageCurrent}`]
          } />

          <meta name="author" content="Lipovitan" />
          <link rel="shortcut icon" href={`${CONFIG.getBasePath()}/favicon.ico`} />
          <meta property="og:title" content={
            props.postDetail.data.title[`${valueLanguageContext.languageCurrent}`]
          } />

          <meta property="og:description" content={
            props.postDetail.data.metaDescription[`${valueLanguageContext.languageCurrent}`]
          } />

          <meta property="og:url" content={""} />

          <meta property="og:image" content={props.postDetail.data.image} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="fb:app_id" content={CONFIG.NEXT_PUBLIC_FB_APP_ID} />

          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0"></meta>

        </Head>
        <Header hideButtons></Header>
        <main id="newsDetailPage" style={layout}>
          <Wrapper>
            <Row>
              {dataDetail ? (
                <div>
                  <h5>
                    <span>

                      <i>
                        <Link href="/">
                          {
                              valueLanguageContext.languageCurrent === "en"
                              ? "Homepage"
                              : "Trang chủ"
                          }
                        </Link>
                      </i>
                      
                    </span>
                    <span>
                      <i>
                        <Link href={"/news"}>
                          {
                              valueLanguageContext.languageCurrent === "en"
                              ? "new"
                              : "Tin tức"
                          }
                        </Link>
                      </i>
                    </span>
                    <span>
                      <i>
                        <a>
                          {
                            valueLanguageContext.languageCurrent === "en"
                            ? dataDetail.data.slug.en
                            : dataDetail.data.slug.vi
                          }
                        </a>
                      </i>
                    </span>
                  </h5>
                  <h3>
                    <i>
                      {valueLanguageContext.languageCurrent === "en"
                      ? dataDetail.data.title.en
                      : dataDetail.data.title.vi}
                    </i>
                    
                  </h3>
                  <div className={"tag"}>
                    <p className={"date"}>
                      <span><i>{dataDetail.data.createdAt}</i></span>
                    </p>
                    {dataDetail.data.active ? (
                      <p className={"status"}>
                        <span>
                          <i>
                            {
                              valueLanguageContext.languageCurrent === "en" 
                              ? "Activities" 
                              : "Hoạt động" 
                            }
                          </i>
                        </span>
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                  
                  <p className="introduce">
                    {
                      valueLanguageContext.languageCurrent === "en" 
                      ? dataDetail.data.shortDescription.en 
                      : dataDetail.data.shortDescription.vi  
                    }
                  </p>
                  <div className="img">
                    <img src={
                      dataDetail.data.image
                    }/>
                  </div>

                  <div className="content">
                    {contentDetail ? (
                      <> {HtmlComponent(contentDetail)} </>
                    ) : (
                      <p>Loading...</p>
                    )}

                    {/* <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sodales mi vel nisi suscipit maximus. Quisque ultricies quam vitae urna pretium, eu aliquet dolor accumsan. Donec scelerisque nisi commodo, elementum metus sed, tristique ante. Praesent urna ipsum, iaculis et tincidunt in, mattis eget sapien. Etiam tempus augue eget augue ornare aliquam. Integer id sagittis enim. 
                          Nam orci leo, facilisis in porta et, faucibus vitae lacus. Donec non est non tortor convallis posuere eu at justo. Sed venenatis, risus et facilisis tempor, nibh libero ultricies ligula, eget mollis felis nibh non diam. Pellentesque pulvinar, libero non blandit condimentum, quam sapien laoreet sapien, a luctus massa turpis vel enim. Nullam eu scelerisque odio. 
                          Phasellus fringilla turpis sit amet arcu porta, non vulputate libero mollis. Maecenas non nibh sed lorem tristique rhoncus. Donec risus ante, tincidunt vel condimentum placerat, egestas sed orci. Ut pharetra quam vel facilisis convallis. 
                      </p> */}
                  </div>

                  <div className="share">

                    <p>
                      <i>
                        {
                              valueLanguageContext.languageCurrent === "en"
                              ? "Share post"
                              : "Chia sẻ bài viết"
                        }
                      
                      </i>
                    </p>

                    <span style={{position:"relative"}}>

                      <img src={asset("/images/icon-fb-blue.png")} />
                      <div className={"contentFB"}>

                        <FacebookShareButton  url={ dataDetail ? `${CONFIG.getBaseURL()}${router.asPath}` : ""} >
                            <FacebookIcon size={32} round={true}></FacebookIcon>
                        </FacebookShareButton>

                      </div>
                    </span>

                    <span style={{position:"relative", display:"none"}}>

                      <img src={asset("/images/icon-google-blue.png")} />

                      <div className={"contentFB"}>

                        <FacebookShareButton url={ dataDetail ? `${CONFIG.getBaseURL()}/${router.asPath}` : ""} >
                            <FacebookIcon size={32} round={true}></FacebookIcon>
                        </FacebookShareButton>

                      </div>
                    </span>
                    
                   
                  </div>
                </div>
              ) : (
                <>
                  <p>Loading...</p>
                </>
              )}
            </Row>
           
            <Row>
              {
                idCategory 
                ? 
                  (
                    <ListNews
                      title={valueLanguageContext.languageCurrent === "en"
                      ? "OTHER NEWS"
                      : "Tin tức khác"}
                      color="#004FC4"
                      linkData={`https://api.lipovitan.zii.vn/api/v1/posts?postCategory=${idCategory}&limit=3`}
                    ></ListNews>
                  )
              : (
                    <span>Loading...</span>
                  )}
            </Row>
          </Wrapper>
          <img
            src={asset("/images/news/bg_bottom.jpg")}
            className={"bgBottom"}
          />
        </main>
        <Footer></Footer>
      </MasterPage>
      <style jsx>{`
        .contentFB{
          position:absolute;
          top: 0;
          left: 0;
          width:100%;
          height:100%;
          opacity:0;
          display: flex;
          align-items: center;
        }
        .share {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          p {
            font-family: Montserrat-BoldItalic;
            font-size: 16px;
            color: #757575;
            padding-right: 15px;
          }
          
          img{
              width: 100%;
              margin: 25px 0;
              max-width: 32px;
             
          }
        }
        .img{
              width: 100%;
              height: 60vh;
              padding-bottom: 20px;
              img{
                object-fit: cover;
                height: 100%;
              }
          }
        img {
          width: 100%;
          margin: 25px 0;
        }
        .content {
          p {
            margin: 20px 0;
          }
        }
        .introduce {
          color: #fff;
          padding: 10px 0;
        }
        .tag {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          p {
            text-align: center;
            padding: 8px 10px;
            margin: 15px;
            margin-left: 0;
            text-transform: uppercase;
            position: relative;
            font-size: 12px;
            font-family: Montserrat-BoldItalic;
            span {
              display: block;
              position: relative;
              z-index: 2;
            }
            &:after {
              content: "";
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              transform: skewX(-5deg);
            }
          }
          .date {
            color: #757575;
            display: flex;
            &:after {
              background-color: #e2e2e2;
            }
          }
          .status {
            color: #fff;
            &:after {
              background-color: #03ac6e;
            }
          }
        }
        h3 {
          font-size: 36px;
          color: #fff;
          font-family: Montserrat-BoldItalic;
          text-transform: uppercase;
          padding: 10px 0;
        }
        h5 {
          padding: 10px 0;
          span {
            font-size: 12px;
            font-family: Montserrat-BoldItalic;
            text-transform: uppercase;
            margin: 25px;
            margin-left: 0;
            padding-right: 15px;
            position: relative;
            a {
              color: #fff;
            }
          }
          span::after {
            content: "";
            position: absolute;
            width: 6px;
            height: 7px;
            top: 50%;
            left: 100%;
            transform: translate(0, -50%);
            background-image: url(${asset(
              "/images/icon-arrow-next-white.png"
            )});
            background-size: 100%;
            background-position: center;
          }
          span:last-child {
            color: #ffe600;
          }
          span:last-child::after {
            display: none;
          }
        }
        #newsDetailPage {
          position: relative;
        }
        .bgBottom {
          position: absolute;
          width: 100%;
          bottom: 0;
          left: 0;
          margin: 0;
        }

        @media screen and (max-width: 768px) {
          h3 {
            font-size: 3vmax;
          }
          .introduce{
            padding-bottom: 20px;
          }
          p {
            font-size: 1.7vmax;
          }
          img {
            margin:0 0 20px 0;
          }
          .content {
            font-size: 2vmax;
            margin-bottom: 20px;
            p {
              font-size: 2vmax;
            }
          }
          h5 {
          span {
            font-size: 10px;
            padding-right: 10px;
            margin-right: 15px;
            a {
              color: #fff;
            }
          }
        }
        }
      `}</style>
    </>
  );
}

