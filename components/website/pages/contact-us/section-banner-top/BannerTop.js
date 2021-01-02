import asset from "plugins/assets/asset";
import TitleStyle from "components/website/pages/contact-us/section-banner-top/title/TitleStyle2";
import ItemForm from "components/website/pages/contact-us/section-banner-top/items/Items";
import useWindowSize from "components/website/hooks/useWindowsSize";
import FromContact from "components/website/forms/Contact";
import { MainContent } from "components/website/contexts/MainContent";
import { useEffect, useRef, useState, useContext } from "react";

export default function BannerTop (
    {
        urlBackground=asset("/images/bg-session-banner-contact-us.jpg"),
    }
){

    const Language = {
        en: {
          name: "en",
          title: ["COMPANY","TAISHO VIET NAM "],
          nameForm : "Contact Us",
          description: "Lipovitan is a brand of Taisho Pharmaceutical company - one of the largest pharmaceutical corporations in Japan. Taisho has also expanded its business and has subsidiaries in 12 other countries around the world.",
        },
        vi: {
          name: "vi",
          title: ["CÔNG TY TNHH","TAISHO VIỆT NAM "],
          nameForm : "Liên hệ",
          description: "Lipovitan là thương hiệu của công ty Taisho Pharmaceutical - một trong những tập đoàn dược phẩm lớn nhất Nhật Bản. Taisho cũng đã mở rộng hoạt động kinh doanh và có các công ty con tại 12 quốc gia khác trên thế giới."
    
        }
    }

    const valueLanguageContext = useContext(MainContent);

    const [dataBannerTop, setDataBannerTop] = useState();

    const settings = {

        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        adaptiveHeight: true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            }
        ]
    
    };
    
    let description = (description) => (
        <>
          <div className="desOurProduct">
            <p>
                {/* {description} */}
            </p>
          </div>

            <style jsx>{`

              .desOurProduct{
                max-width: 500px;
                margin: 0;
                p{
                  padding: 10px 0;
                  font-size : 16px;
                  line-height: 30px;
                  color : #fff;
                  padding-bottom: 30px;
                }
              }
            `}</style>
        </>
    )

        // detect screen size
    const [responsiveMaxScreen, setResponsiveMaxScreen] = useState(false);
       
    const windowSize = useWindowSize();
        //check responsive
     useEffect(()=>{
        if(windowSize.width > 1440){
            setResponsiveMaxScreen(true);
        }else{
            setResponsiveMaxScreen(false);
        }
    },[windowSize]);


    useEffect(() => {

        if (valueLanguageContext.languageCurrent) {
    
          setDataBannerTop(Language[`${valueLanguageContext.languageCurrent}`])
    
        }
    
      }, [])
    
    
      useEffect(() => {
    
        if (valueLanguageContext.languageCurrent) {
    
          setDataBannerTop(Language[`${valueLanguageContext.languageCurrent}`])
    
        }
    
    }, [valueLanguageContext.languageCurrent]);

    return<section>
        <div className="sectionBannerTop">

            {
                windowSize.width < 1023
                ? (<>
                    <img className="bgBannerTop" src={asset("/images/bg-session-banner-contact-us-m.jpg")}/>
                </>)
                :(<>
                    <img className="bgBannerTop" src={urlBackground}/>
                </>)
            }

            {
                dataBannerTop 
                ?<TitleStyle
                    textLine1={dataBannerTop.title[0]}
                    textLine2={dataBannerTop.title[1]}
                    description={description(dataBannerTop.description)}
                
                    /> 
                :<></>
            }
            
             {
                windowSize.width < 1023
                ? (<>
                    <ItemForm
                            width={96}
                            height={45}
                            bottom= {"1"}
                            right={2}
                            animation={true}
                            name={dataBannerTop ? dataBannerTop.nameForm :"Contact Us"}
                            nameStyle={{width: "100%"}}
                            urlImage={asset("/images/bg-from-session-banner-contact-us-m.jpg")}
                        >
                            <FromContact></FromContact>
                    </ItemForm>
                   
                </>)
                :(<>
                     <ItemForm
                        width={43.47}
                        height={75.21}
                        top= {17.75}
                        right={3.47}
                        animation={true}
                        name={dataBannerTop ? dataBannerTop.nameForm :"Contact Us"}
                        nameStyle={{width: "100%"}}
                        urlImage={asset("/images/bg-from-session-banner-contact-us.png")}
                    >
                        <FromContact></FromContact>
                    </ItemForm>
                </>)
            }

            <div className="containerBannerTop" >
            </div>

        </div>
        
        <style jsx>{`
            .bgBannerTop{
                width: 100%;
                height: 100%;
            }

            .sectionBannerTop{
                position: relative;
            }

            .containerBannerTop{
                position: absolute;
                width: 80%;
                left:50%;
                top : 50%;
                transform: translate(-50%, -50%);
                display: inline;
                
                justify-content: space-between;
                
            }

            @media screen and (max-width: 1440px) {
                .containerBannerTop{
                    bottom : 7%;
                }
            }

        `}</style>
    </section>
}