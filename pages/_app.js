import "antd/dist/antd.css";
import "styles/global.scss";
import "styles/table-editable.scss";
import "styles/common.scss";
import "styles/responsive.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainContent from "../components/website/contexts/MainContent";
function MyApp({ Component, pageProps }) {
  return <MainContent>
       <Component {...pageProps} />
  </MainContent>
}
export default MyApp;
