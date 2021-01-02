import Head from 'next/head'
import CONFIG from "web.config";
const Meta = (props) => (
    <Head>
        <title>
            {CONFIG.site.title} | {pageName || "Trang chủ"}
        </title>

        <meta name="description" content={CONFIG.site.description}></meta>
        <link rel="shortcut icon" href={`${CONFIG.getBasePath()}/favicon.ico`} />

        <meta property="og:title" content={CONFIG.site.title} />
        <meta property="og:description" content={descriptionMeta} />
        <meta property="og:url" content={CONFIG.getBasePath() + router.asPath} />
        <meta property="og:image" content={linkImgShare ? linkImgShare : `${CONFIG.NEXT_PUBLIC_BASE_URL}/share.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="fb:app_id" content={CONFIG.NEXT_PUBLIC_FB_APP_ID} />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0"></meta>

        <link
            href="https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,700;1,400;1,700&family=Lora:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap"
            rel="stylesheet"
        />
        {/* <NextSeo
          title={pageName || "Trang chủ"}
          description={CONFIG.site.description}
        /> */}
    </Head>
)
export default Meta