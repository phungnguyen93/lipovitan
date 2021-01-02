import asset from "plugins/assets/asset";
// import GroupDots from "components/website/group-dots/GroupDots";
import Items from "components/website/pages/about-us/section-serise-in-japan/items/Items.js";

import Button from "components/website/button/Button";
import { MainContent } from "components/website/contexts/MainContent";
import { useEffect, useRef, useState, useContext } from "react";
import useWindowSize from "components/website/hooks/useWindowsSize";



export default function SeriseInJapan({

  urlBackground = asset("/images/bg-none-890.jpg"),

}) {

  const listName = ["OUR MISSION", "VISION & POLICY", "CORE VALUE"];

  const Language = {
    en: {
      name: "en",
      title: "",
      introduce: [
        // "Taisho Group was born in 1912 in Japan, with a history of existence and development over 100 years. Currently, Taisho is one of the largest pharmaceutical corporations in Japan with nearly 280 medical products, non-prescription drugs and other health and beauty care products. Taisho has also expanded its business and have subsidiaries in 12 other countries around the world.",
        "Taisho Vietnam Co., Ltd. is a subsidiary of Japan Taisho Group, established in 1999 with the mission of manufacturing and introducing Lipovitan energy drinks to Vietnamese consumers."
      ],
      listNameBtn: ["OUR MISSION", "VISION & POLICY", "CORE VALUE"],
      textTop: "Enrich people's lives by improving health and beauty in socially responsible ways",
      listItemText2 : [
        "Become the most trusted company by and rooted in Vietnam local community",
        "Be shinsho Do gentlemanly business Sharing gains with society and partners",
      ],
      listItemText3 : [
        {
          title : "Value 1",
          listValue: [
            "Long term perspective",
            "Overall optiomization",
            "Consumer focus"
          ]
        },
        {
          title : "Value 2",
          listValue: [
            "Ownership",
          ]
        },
        {
          title : "Value 3",
          listValue: [
            "Honesty",
            "Diligence",
            "Passion"
          ]
        },
        {
          title : "Value 4",
          listValue: [
            "Growth mindset",
          ]
        }
      ]

    },
    vi: {
      name: "vi",
      title: "",
      introduce: [
        // "Tập đoàn Taisho ra đời năm 1912 tại Nhật Bản, có lịch sử tồn tại và phát triển hơn 100 năm. Hiện nay, Taisho là một trong những tập đoàn dược phẩm lớn nhất Nhật Bản với gần 280 sản phẩm y tế, thuốc không kê đơn và các sản phẩm chăm sóc sức khỏe, sắc đẹp khác Taisho cũng đã mở rộng hoạt động kinh doanh của mình và có mặt tại 12 quốc gia khác trên thế giới.",
        "Công ty TNHH Taisho Việt Nam là công ty con của Tập đoàn dược phẩm Taisho Nhật Bản, được thành lập vào năm 1999 với sứ mệnh sản xuất và giới thiệu sản phẩm nước tăng lực Lipovitan tới người tiêu dùng Việt Nam."
      ],
      
      textTop: "Làm giàu hơn cho cuộc sống bằng cách cải thiện sức khỏe, sắc đẹp của mọi người theo những cách có trách nhiệm với xã hội",
      listNameBtn: ["SỨ MỆNH", "TẦM NHÌN VÀ CHÍNH SÁCH ", "GIÁ TRỊ CỐT LÕI"],
      listItemText2 : [
          "Trở thành một doanh nghiệp đáng tin cận, và gắn bó với cộng đồng địa phương",
          "Kinh doanh nghiêm túc. Chia sẻ lợi ích với Xã hội và đối tác",
      ],
      listItemText3 : [
        {
          title : "Giá trị 1",
          listValue: [
            "Góc nhìn dài hạn", "Tối ưu hóa tổng quan", "Tập trung vào khách hàng"
          ]
        },
        {
          title : "Giá trị 2",
          listValue: [
            "Làm chủ hoạt động kinh doanh",
          ]
        },
        {
          title : "Giá trị 3",
          listValue: [
            "Trung thực",
             "Siêng năng",
             "Đam mê"
          ]
        },
        {
          title : "Giá trị 4",
          listValue: [
            "Tư duy phát triển",
          ]
        }
      ]
    }
  }

  const valueLanguageContext = useContext(MainContent);

  const [dataSeriseInJapan, setDataSeriseInJapan] = useState();

    // detect screen size
  const windowSize = useWindowSize();
  const [responsiveMaxScreen, setResponsiveMaxScreen] = useState(false);
  const [responsiveMobile, setResponsiveMobile] = useState(false);
  const [responsiveTablet, setResponsiveTablet] = useState(false);

  useEffect(() => {

    if (valueLanguageContext.languageCurrent) {

      setDataSeriseInJapan(Language[`${valueLanguageContext.languageCurrent}`])

    }

  }, [])


  useEffect(() => {

    if (valueLanguageContext.languageCurrent) {

      setDataSeriseInJapan(Language[`${valueLanguageContext.languageCurrent}`])

    }

  }, [valueLanguageContext.languageCurrent]);

      //check responsive
  useEffect(() => {

    if (windowSize.width <= 1024) {

      setResponsiveTablet(true);

      if (windowSize.width <= 520) {
        setResponsiveTablet(false);
        setResponsiveMobile(true);
      }

    } else {

      setResponsiveTablet(false);
      setResponsiveMobile(false);

    }

  }, [windowSize]);

  return (

    <section className={"wrap"}>
      <div className="sectionSeriseInJapan">

        <img className="bgSeriseInJapan" src={urlBackground} />
        
        {
          responsiveMobile === true 
          
          ?(<>
            
            <Items
              urlImage={asset("/images/item-about-us-layer-dot.png")}
              timeShow={0.6}
              width={100}
              height={65}
              bottom={"0"}
              left={3}
            ></Items>
            <Items
              urlImage={asset("/images/item-about-us-layer-1.png")}
              timeShow={0.6}
              width={120}
              height={43}
              bottom={7.86}
              right={"-10"}
              name={"layer-1"}
            ></Items>
            <Items
              urlImage={asset("/images/item-about-us-layer-2.png")}
              timeShow={0.6}
              width={120}
              height={43}
              bottom={7.86}
              right={"-10"}
            // name={"layer-2"}
            // backgroundButton={"#00AB66"}
            ></Items>
            <Items
              urlImage={asset("/images/item-about-us-layer-3.png")}
              timeShow={0.6}
              width={120}
              height={43}
              bottom={7.86}
              right={"-10"}
            // name={"layer-3"}
            // backgroundButton={"ED1C24"}
            ></Items>
            <Items
              urlImage={asset("/images/item-about-us-layer-4.png")}
              timeShow={0.6}
              width={120}
              height={43}
              bottom={7.86}
              right={"-10"}
            // name={"layer-4"}
            // backgroundButton={"#ED1C24"}
            ></Items>
            <Items
              urlImage={asset("/images/item-about-us-layer-5.png")}
              timeShow={0.6}
              width={120}
              height={43}
              bottom={7.86}
              right={"-10"}
            // name={"layer-5"}
            // backgroundButton={"#ED1C24"}
            ></Items>
    
          </>)
          :(<>
          
            <Items
              urlImage={asset("/images/item-about-us-layer-dot.png")}
              timeShow={0.6}
              width={51.52}
              height={83.37}
              bottom={"0"}
              left={23}
            ></Items>
            <Items
              urlImage={asset("/images/item-about-us-layer-1.png")}
              timeShow={0.6}
              width={71.09}
              height={66.17}
              bottom={7.86}
              left={10.77}
              name={"layer-1"}
            ></Items>
            <Items
              urlImage={asset("/images/item-about-us-layer-2.png")}
              timeShow={0.6}
              width={71.09}
              height={66.17}
              bottom={7.86}
              left={10.77}
            // name={"layer-2"}
            // backgroundButton={"#00AB66"}
            ></Items>
            <Items
              urlImage={asset("/images/item-about-us-layer-3.png")}
              timeShow={0.6}
              width={71.09}
              height={66.17}
              bottom={7.86}
              left={10.77}
            // name={"layer-3"}
            // backgroundButton={"ED1C24"}
            ></Items>
            <Items
              urlImage={asset("/images/item-about-us-layer-4.png")}
              timeShow={0.6}
              width={71.09}
              height={66.17}
              bottom={7.86}
              left={10.77}
            // name={"layer-4"}
            // backgroundButton={"#ED1C24"}
            ></Items>
            <Items
              urlImage={asset("/images/item-about-us-layer-5.png")}
              timeShow={0.6}
              width={71.09}
              height={66.17}
              bottom={7.86}
              left={10.77}
            // name={"layer-5"}
            // backgroundButton={"#ED1C24"}
            ></Items>
        
          
          </>)
        }
        <div className="itemSeriseInJapan none">
          <img src={asset("/images/item-about-us-layer-none.png")} alt="" />
          {
            //bg-none-about-us-in-m
          }
          <div className="listItems">
            <div className={"content"}>
              {
              //bg-none-about-us-in-m
                responsiveMobile === true 
                ?(<>
                  <img
                    src={asset("/images/bg-none-about-us-in-m.png")}
                    alt=""
                  />
                </>)
                :(<>
                  <img
                  src={asset("/images/item-about-us-layer-none-2.png")}
                  alt=""
              />
                </>)
              }
              
              <div className="textValue">
                <div className={"textValue1"}>

                  {

                    dataSeriseInJapan

                      ? (
                        <>
                          <div className={"btnSeriseInJapan " + dataSeriseInJapan.name}>

                          {
                              windowSize.width <= 599
                              ? (<>
                                   <Button
                                    hasArrow={false}
                                    color={"#fff"}
                                    background={"#00AB66"}
                                    height={20}
                                  >
                                    {" "}
                                    {dataSeriseInJapan.listNameBtn[0]}
                                  </Button>
                              </>)
                              :(<>
                              
                                    <Button
                                    hasArrow={false}
                                    color={"#fff"}
                                    background={"#00AB66"}
                                  >
                                    {" "}
                                    {dataSeriseInJapan.listNameBtn[0]}
                                  </Button>
                              
                              </>)
                            }
                            
                          </div>
                        </>
                      )

                      : <></>

                    }

                  <div className={"text"}>
                    <p>

                      {
                        dataSeriseInJapan 
                        ? <i>{dataSeriseInJapan.textTop}</i> 
                        :<i> 
                            Enrich people's lives <br /> by improving health and
                      beauty <br /> in socially responsible ways
                        </i>
                      }
                    
                    </p>
                  </div>

                </div>
                <div className={"textValue2"}>
                    {

                      dataSeriseInJapan

                        ? (
                          <>
                          <div className={"btnSeriseInJapan " + dataSeriseInJapan.name}>
                            {
                              windowSize.width <= 599
                              ? (<>
                                   <Button
                                      hasArrow={false}
                                      color={"#fff"}
                                      background={"#ED1C24"}
                                      height={20}
                                    >
                                      {" "}
                                      {dataSeriseInJapan.listNameBtn[1]}
                                    </Button>
                              </>)
                              :(<>
                              
                                <Button
                                  hasArrow={false}
                                  color={"#fff"}
                                  background={"#ED1C24"}
                                >
                                  {" "}
                                  {dataSeriseInJapan.listNameBtn[1]}
                                </Button>
                              
                              </>)
                            }
                             
                            </div>
                          </>
                        )

                        : <></>

                    }
                   

                  <div className={"text"}>

                    {
                      dataSeriseInJapan ? dataSeriseInJapan.listItemText2.map((value, index)=>(
                         <p key={index}>
                           <i>
                            {value}
                           </i>
                           
                        </p>
                      )) : <></>
                    }
                  
                  </div>
                </div>
                <div className={"textValue3"}>

                    {

                      dataSeriseInJapan

                        ? (
                          <>
                           <div className={"btnSeriseInJapan " +  dataSeriseInJapan.name}>
                           {
                              windowSize.width <= 599
                              ? (<>
                                  <Button
                                      hasArrow={false}
                                      color={"#fff"}
                                      background={"#004FC5"}
                                      height={20}
                                    >
                                      {" "}
                                      {dataSeriseInJapan.listNameBtn[2]}
                                    </Button>
                              </>)
                              :(<>
                              
                                  <Button
                                      hasArrow={false}
                                      color={"#fff"}
                                      background={"#004FC5"}
                                    >
                                      {" "}
                                      {dataSeriseInJapan.listNameBtn[2]}
                                    </Button>
                              
                              </>)
                            }
                            
                            </div>
                          </>
                        )

                        : <></>

                    }

                  <div className={"text"}>

                    <div>
                      {
                        dataSeriseInJapan 
                        ? (
                            <>
                              <ul>

                                <h5 className={"titleItems " + dataSeriseInJapan.name}>
                                  <i>{dataSeriseInJapan.listItemText3[0].title}</i>
                                </h5>

                                {
                                  dataSeriseInJapan.listItemText3[0].listValue.map((value,index)=>(
                                    <p key={index}>{value}</p>
                                  ))
                                }
                                
                              </ul>

                              <ul>
                                <h5 className={"titleItems " + dataSeriseInJapan.name}><i>{dataSeriseInJapan.listItemText3[1].title}</i></h5>
                                {
                                  dataSeriseInJapan.listItemText3[1].listValue.map((value,index)=>(
                                    <p key={index}><i>{value}</i></p>
                                  ))
                                }
                              </ul>
                            </>
                          )

                        : <></>
                      }
                      

                    </div>

                    <div>

                    {
                        dataSeriseInJapan 
                        ? (
                            <>
                              <ul>

                                <h5 className={"titleItems " + dataSeriseInJapan.name}>
                                  <i>{dataSeriseInJapan.listItemText3[2].title}</i>
                                </h5>

                                {
                                  dataSeriseInJapan.listItemText3[2].listValue.map((value,index)=>(
                                    <p key={index}><i>{value}</i></p>
                                  ))
                                }
                                
                              </ul>

                              <ul>
                                <h5 className={"titleItems " + dataSeriseInJapan.name}>
                                  <i>{dataSeriseInJapan.listItemText3[3].title}</i>
                                </h5>

                                {
                                  dataSeriseInJapan.listItemText3[3].listValue.map((value,index)=>(
                                    <p key={index}>{value}</p>
                                  ))
                                }
                              </ul>
                            </>
                          )

                        : <></>
                      }

                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="containerSeriseInJapan">

          {

            dataSeriseInJapan

              ? (
                <>
                  <p>
                    {dataSeriseInJapan.introduce[0]}
                  </p>
                  <p>
                    {dataSeriseInJapan.introduce[1]}
                  </p>
                </>
              )

              : <></>

          }

        </div>
      </div>

      <style jsx>{`
        .wrap {
          margin-top: -50px;
        }
        section {
          display: flex;
          justify-content: center;
          z-index: 1;
          background-color: #f3f3f3;
          padding-top:50px;
        }
        .bgSeriseInJapan {
          width: 100%;
          opacity: 0;
          
        }

        .sectionSeriseInJapan {
          position: relative;
          max-width: 1440px;
          width: 100%;
          background-color: #f3f3f3;
        }
        .containerSeriseInJapan {
          right: 5%;
          top: 0;
          position: absolute;
          width: 90%;
          height: auto;
          max-width: 1266px;
          max-height: 178px;
          p {
            text-align: center;
            padding: 0 20px;
            line-height: 1.8;
            color: #000;
            font-size: 1.2vmax ;
          }
        }
        .itemSeriseInJapan.none {
          z-index: 2;
          position: absolute;
          width: 71.09%;
          height: 66.17%;
          bottom: 7.86%;
          left: 7.77%;
          font-size: 0.7vmax;
          img {
            width: 100%;
          }
          .listItems {
            width: 100%;
            height: auto;
            position: absolute;
            bottom: 5%;
            left: 0;
          }
          .content {
            position: relative;
            height: auto;
            .textValue {
              color: #fff;
            }
          }
          .textValue {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
          }
          .textValue > div {
            display: flex;
            height: 33.33%;
            position: relative;

            .text {
              position: absolute;
              top: 50%;
              transform: translate(0, -50%);
            }
            .btnSeriseInJapan {
              position: absolute;
            }
          }
          .textValue1 {
            .text {
              width: 26.64%;
              left: 45.5%;
              text-align: center;
              p {
                padding: 5px;
              }
            }
            .btnSeriseInJapan {
              top: 5%;
              left: 24%;
            }
          }
          .textValue2 {
            .text {
              width: 40%;
              left: 38.5%;
              top: 38% !important;
              text-align: center;
              display: flex;
              justify-content: center;
              p {
                padding: 5px 10px;
                max-width: 50%;
              }
            }
            .btnSeriseInJapan {
              left: 120px;
              &.vi {
                left: 30px;
              }
            }
          }
          .textValue3 {

            .text {
              font-size: 15px;
              top: 30% !important;
              width: 60%;
              left: 29%;
              text-align: center;
              display: flex;
              justify-content: center;

              p {
                padding: 4px 0px;
              }
              span {
                font-size: 0.7vmax;
                display: inherit;
                padding: 5px 0;
              }
            }

            .text > div {
              display: flex;
              flex-direction: row;
              margin: 0 5px;
              width: 50%;
              justify-content: center;
              ul {
                padding: 0 10px;
                p {
                  position: relative;
                  font-size: 0.7vmax;
                }
                p::after {
                  content: "";
                  position: absolute;
                  width: 5px;
                  height: 5px;
                  background-color: #fff;
                  border-radius: 50%;
                  right: 102%;
                  top: 40%;
                  transform: translate(-50%, 0);
                }
              }
            }
            .btnSeriseInJapan {
              left: 4%;
            }
          }

          .text {
            ul {
              text-align: left;
            }
            .titleItems {
              padding: 4px 0;
              text-align: center;
              font-size: 15px;
              color: #fff;
              font-family: Montserrat-BoldItalic;
            }
          }
        }
        @media only screen and (min-width: 1441px) {
          .itemSeriseInJapan.none {
            font-size: 10px;
            .textValue3 {
              .text {
                font-size: 15px;
                span {
                  font-size: 10px;
                }
              }
              .text > div {
                ul {
                  p {
                    font-size: 10px;
                  }
                }
              }
            }

          }
        }
        @media only screen and (max-width: 1440px) {
          .wrap {
            margin-top: -20px;
          }
        }

        @media only screen and (max-width: 520px) {
          .itemSeriseInJapan.none{
            width: 90%;
            left: 3%;
            bottom: 0;
            height: 12.5%;
          }
          .text {
            ul {
              text-align: left;
            }
          }
        
        }
        
      `}</style>

    </section>
  );
}
