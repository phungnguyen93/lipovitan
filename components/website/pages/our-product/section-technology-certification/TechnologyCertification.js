import asset from "plugins/assets/asset";

import TitleStyle1 from "components/website/pages/our-product/section-technology-certification/title/TitleStyle1";
import Item  from "components/website/pages/our-product/section-technology-certification/items/Items";
import { MainContent } from "components/website/contexts/MainContent";
import { useEffect, useRef, useState, useContext } from "react";

export default function Certification (
    {
        urlBackground2=asset("/images/bg-session-certifications-our-product-cut-2.png"),
        urlBackground1=asset("/images/bg-session-certifications-our-product-cut-1.png")

    }
){

    const valueLanguageContext = useContext(MainContent);

    const [dataCertification, setDataCertification] = useState();

    const Language = {
        en: {
          name: "en",
          title: ["Quality and technology","certifications"],
          description: [
            "Lipovitan iss manufactured under the aproval and quality control of Taisho Japanese pharmaceutical company",
            "",
          ],
          nameBtn:"Where to buy",
        },
        vi: {
          name: "vi",
          title: ["giấy chứng nhận","Chất lượng và công nghệ"],
          description: [
            "Lipovitan được sản xuất dưới sự cho phép và kiểm tra chất lượng của công ty dược phẩm Taisho Nhật bản",
            "",
          ],
          nameBtn:"Đến nơi mua",
        }
    }

    let descriptionTitle = (description) => (
        <>
            <h4>{description}</h4>
            
            <style jsx>{`
                    h4{
                        padding: 15px;
                        padding-top: 20px;
                        color : #fff;
                        font-size: 16px;
                    }
                `}
            </style>
        </>
    )

    useEffect(() => {

        if (valueLanguageContext.languageCurrent) {
    
          setDataCertification(Language[`${valueLanguageContext.languageCurrent}`])
    
        }
    
      }, [])
    
    
    useEffect(() => {
    
        if (valueLanguageContext.languageCurrent) {
    
          setDataCertification(Language[`${valueLanguageContext.languageCurrent}`])
    
        }
    
    }, [valueLanguageContext.languageCurrent]);

    return<section>
        <div className="sectionCertification">

            <img className="absolute" src={urlBackground1}/>
            <img className="bgCertification" src={urlBackground2}/>

            {
                dataCertification 

                ?   <TitleStyle1
                        textLine1={dataCertification.title[0]}
                        textLine2={dataCertification.title[1]}
                        description={descriptionTitle(dataCertification.description)}

                    ></TitleStyle1>

                : <></>

            }
            {/* <TitleStyle1

                description={descriptionTitle}

            ></TitleStyle1> */}

            <div className="containerCertification" >
                <Item
                    urlImage={asset("/images/item-our-product-certifications-1.png")}
                    timeShow={0.5}
                    width={42.27}
                    height={59.51}
                    top={"0"}
                    left={"0"}
                    name={"certifications-1"}
                ></Item>
                <Item
                    urlImage={asset("/images/item-our-product-certifications-2.png")}
                    timeShow={0.5}
                    width={22.06}
                   
                    top={"0"}
                    right={"0"}
                    name={"certifications-2"}
                ></Item>
            </div>

        </div>

        <style jsx>{`

            .bgCertification{
                width: 100%;
            }

            .sectionCertification{
                position: relative;
                min-height: 50vh;
                .absolute{
                    position: absolute;
                    bottom : 100%;
                    left : 0;
                    width: 100%;
                }
            }
            .containerCertification{
                position: absolute;
                width: 52.57%;
                height : 42.23%;
                left:50%;
                transform: translate(-50%, 0);
                display: inline;
                bottom : 13.98%;
               
                justify-content: space-between;
                
            }

            @media screen and (max-width: 1440px) {
                .containerCertification{
                    bottom : 7%;
                }
            }
            @media screen and ( max-width : 768px) and (min-width: 600px){
                .sectionCertification{
                    min-height: 30vh;
                }
            }
            @media screen and (max-width: 599px) {
                .containerCertification{
                    width: 90%;
                    height : 35%;
                    bottom : 3%;
                    display : flex;
                    justify-content :center;
                }
            }

        `}</style>
    </section>
}