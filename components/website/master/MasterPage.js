import Head from "next/head";
import Header from "components/website/elements/Header";
import Footer from "components/website/elements/Footer";
import CONFIG from "web.config";
// import MainContent from "../contexts/MainContent"
import { useRouter } from "next/router";
// import { NextSeo } from 'next-seo';

function MasterPage({ 
  pageName, 
  children, 
  hideFooter = false, 
  linkImgShare,
  descriptionMeta = CONFIG.site.description,
  noneHead = false, 
  }) {

  const router = useRouter();

  //  a configuration for next-seo
  // const DEFAULT_SEO = {
  //   title: 'Next.js SEO Plugin',
  //   description: 'SEO made easy for Next.js projects',
  //   openGraph: {
  //     type: 'website',
  //     locale: 'en_IE',
  //     url: 'https://www.garymeehan.ie',
  //     title: 'Next.js Seo',
  //     description: 'SEO made easy for Next.js projects',
  //     image:
  //       'https://prismic-io.s3.amazonaws.com/gary-blog%2F3297f290-a885-4cc6-9b19-3235e3026646_default.jpg',
  //     site_name: 'GaryMeehan.ie',
  //     imageWidth: 1200,
  //     imageHeight: 1200
  //   },
  //   twitter: {
  //     handle: '@garmeeh',
  //     cardType: 'summary_large_image'
  //   }
  // };
  if(noneHead === true){
    return(
      <>
         <div className="showLandscape">
              Vui lòng xoay màn hình lại!
          </div>
          {children}
      </>
    )
  }else{

  }
  return (
    <>
      <Head>
        <title>
          {CONFIG.site.title} | {pageName || "Trang chủ"}
        </title>

        <meta name="description" content={CONFIG.site.description}></meta>
        <link rel="shortcut icon" href={`${CONFIG.getBasePath()}/favicon.ico`} />

        <meta property="og:title" content={CONFIG.site.title} />
        <meta property="og:description" content={descriptionMeta} />
        <meta property="og:url" content={CONFIG.getBasePath() + router.asPath} />
        <meta property="og:image" content={ linkImgShare ? linkImgShare : `${CONFIG.NEXT_PUBLIC_BASE_URL}/share.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="fb:app_id" content={CONFIG.NEXT_PUBLIC_FB_APP_ID} />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0"></meta>

        {/* <link
          href="https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,700;1,400;1,700&family=Lora:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        /> */}
        {/* <NextSeo
          title={pageName || "Trang chủ"}
          description={CONFIG.site.description}
        /> */}
      </Head>

        <div className="showLandscape">
            Vui lòng xoay màn hình lại!
        </div>
        {children}
        
    </>
  );
}

export default MasterPage;
