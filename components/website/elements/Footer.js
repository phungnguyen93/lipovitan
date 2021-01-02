import Logo from "components/website/logo/Logo";
import Link from "next/link";
import SelectLanguage from "components/website/elements/Language";
import asset from "plugins/assets/asset";

import { MainContent } from "components/website/contexts/MainContent";
import { useEffect, useRef, useState, useContext } from "react";

const listItemsMenu= [

  { route : "/", name : "HomePage"},
  { route: "/about-us", name : "About Us"},
  { route: "/our-product",  name : "Our Product"},
  { route: "/news",  name : "News"},
  { route: "/where-to-buy",  name : "Where to buy"},
  { route: "/contact-us",  name : "Contact Us"},
  
]

const Language = {

  en: {

    name: "en",
    listMenu: [
      { route: "/", name: "HomePage" },
      { route: "/about-us", name: "About Us" },
      { route: "/our-product", name: "Our Product" },
      { route: "/news", name: "News" },
      { route: "/where-to-buy", name: "Where to buy" },
      { route: "/contact-us", name: "Contact Us" },
    ],
    footer: {
      textCopyright : "© Copyright @Lipovitan. All rights reserved.",
      textFollowUs : "Follow us"
    }

  },

  vi: {

    name: "vi",
    listMenu: [
      { route: "/", name: "Trang chủ" },
      { route: "/about-us", name: "Về chúng tôi" },
      { route: "/our-product", name: "Sản phẩm" },
      { route: "/news", name: "Tin tức" },
      { route: "/where-to-buy", name: "Điểm mua hàng" },
      { route: "/contact-us", name: "Liên hệ" },
    ],
    footer: {
      textCopyright : "© Bản quyền @Lipovitan. Bản quyền đã được đăng ký.",
      textFollowUs : "Theo dõi chúng tôi"
    }
  }
}

function Footer() {

  const valueLanguageContext = useContext(MainContent);
  const [dataFooter, setDataFooter] = useState();

  useEffect(() => {

    if (valueLanguageContext.languageCurrent) {

      setDataFooter(Language[`${valueLanguageContext.languageCurrent}`])

    }

  }, [])


  useEffect(() => {

    if (valueLanguageContext.languageCurrent) {

      setDataFooter(Language[`${valueLanguageContext.languageCurrent}`])

    }

  }, [valueLanguageContext.languageCurrent]);

  return <footer>
    <div className="footerContainer">
      <Logo></Logo>
      <ul className="menu">
        {/* {
          listItemsMenu.map((value, index) => (
            <li key={index} className="item" >
              <Link href={value.route}>{value.name}</Link>
            </li>
          ))
        } */}
        {
            dataFooter 
            ? 
              dataFooter.listMenu.map((value, index) => (
                <li key={index} className="item" >
                  <Link href={value.route}>{value.name}</Link>
                </li>
              ))
            :<></>
          }
      </ul>
    </div>
    <div className="footerContainer copyright">
      {
        dataFooter 
        ?<>
          <h5><i>{dataFooter.footer.textCopyright}</i> </h5>
          <ul>
            <li><p><i> {dataFooter.footer.textFollowUs} </i> </p></li>
            <li className="item social">
              <Link href={"#"}><img src={asset("/images/youtube.png")} alt="" /></Link>
            </li>
            <li className="item social">
              <a href={"https://www.facebook.com/LipovitanVN"} target="_blank"><img src={asset("/images/FB.png")} alt="" /></a>
            </li>
          </ul>
        </>
        :<>
          <h5><i>© Copyright @Lipovitan. All rights reserved.</i> </h5>
          <ul>
            <li><p><i> Follow us </i> </p></li>
            <li className="item social">
              <Link href={"#"}><img src={asset("/images/youtube.png")} alt="" /></Link>
            </li>
            <li className="item social">
              <a href={"https://www.facebook.com/LipovitanVN"} target="_blank"><img src={asset("/images/FB.png")} alt="" /></a>
            </li>
          </ul>
        </>
      }
      
    </div>
    <style jsx>{`
      .menu{
        justify-content: space-between;
        margin-right:0;
        padding-left: 5%;
        li{
          padding: 5px;
        }
      }
     
    `}</style>
  </footer>;
}

export default Footer;
