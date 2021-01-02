import asset from "plugins/assets/asset";
import TitleStyle1 from "components/website/pages/home/section-energy-cycle/title/TitleStyle1";
import TitleStyleVi from "components/website/pages/home/section-energy-cycle/title/TitleStyleVi";
import Item from "components/website/pages/home/section-energy-cycle/items/Items";
import TextBold from "components/website/pages/home/section-energy-cycle/text-style/TextBold";
import { MainContent } from "components/website/contexts/MainContent";
import { useEffect, useRef, useState, useContext } from "react";
const { detect } = require('detect-browser');

import useWindowSize from "components/website/hooks/useWindowsSize";

export default function EnergyCycle({

  urlBackground = asset("/images/bg-session-energy.png"),

}) {

  const Language = {
    en: {
      name: "en",
      title: ["Energy", "Cycle"],
      listKeys: [
        
        {
          name: "b6",
          description: "Vitamin B6 is the key to convert proteins into fuel for the energy cycle"
        },
        {
          name: "b1",
          description: "Vitamin B1 is the key to convert Sugar to Acetyl-COA"
        },
        {
          name: "b2",
          description: "Vitamin B2 is the key to burn fat"
        },
        {
          name: "taurin",
          description: "Taurine is involved in burning fat"
        },
        {
          name: "Acetyl-COA",
          description: "Acetyl-COA is the key and starting point for ATP Energy"
        },
      ]
    },
    vi: {
      name: "vi",
      title: ["CHUYỂN HOÁ", "năng lượng"],
      listKeys: [
        {
          name: "b6",
          description: "Vitamin B6 là chìa khóa để chuyển đổi protein thành nhiên liệu cho chu trình năng lượng"
        },
        {
          name: "b1",
          description: "Vitamin B1 là chìa khóa để chuyển đổi Đường thành Acetyl-COA"
        },
        {
          name: "b2",
          description: "Vitamin B2 là chìa khóa để đốt cháy chất béo"
        },
        {
          name: "taurin",
          description: "Taurine tham gia đốt cháy chất béo"
        },
        {
          name: "Acetyl-COA",
          description: "Acetyl-COA là chìa khóa và điểm khởi đầu cho Năng lượng ATP"
        },
      ]
    }
  }

  const browser = detect();
  const [nameBrowser, setNameBrowser] = useState()
 
  // handle the case where we don't detect the browser
  

  const valueLanguageContext = useContext(MainContent);

  const [dataSectionEnergyCycle, setDataSectionEnergyCycle] = useState();

        // detect screen size
    const windowSize = useWindowSize();
    const [responsiveMaxScreen, setResponsiveMaxScreen] = useState(false);
    const [responsiveMobile, setResponsiveMobile] = useState(false);
    const [responsiveTablet, setResponsiveTablet] = useState(false);


  const listItemsEN = (<>
  <Item
      urlImage={asset("/images/item-energy-b6.png")}
      timeShow={0.5}
      width={17.85}
      top={32.5}
      left={25.56}
      name={"key"}
      descriptionKey={Language.en.listKeys[0].description}
    ></Item>
    
    <Item
      urlImage={asset("/images/item-energy-b1.png")}
      timeShow={0.5}
      width={17.85}
      top={20}
      left={41.86}
      name={"key"}
      descriptionKey={Language.en.listKeys[1].description}
    ></Item>

    <Item
      urlImage={asset("/images/item-energy-b2.png")}
      timeShow={0.5}
      width={17.85}
      top={32.5}
      left={57.56}
      name={"key"}
      descriptionKey={Language.en.listKeys[2].description}
    ></Item>

    <Item
      urlImage={asset("/images/item-energy-taurin.png")}
      timeShow={0.5}
      width={17.85}
      top={27}
      left={73.56}
      name={"key"}
      descriptionKey={Language.en.listKeys[3].description}
    ></Item>
    <Item
      urlImage={asset("/images/item-energy-acetyl.png")}
      timeShow={0.5}
      width={21}
      top={33}
      left={40.1}
      name={"key"}
      descriptionKey={Language.en.listKeys[4].description}
    ></Item>
  </>)

  const listItemsVI = (<>
      <Item
      urlImage={asset("/images/item-energy-b6.png")}
      timeShow={0.5}
      width={17.85}
      top={32.5}
      left={25.56}
      name={"key"}
      descriptionKey={Language.vi.listKeys[0].description}
    ></Item>
    <Item
      urlImage={asset("/images/item-energy-b1.png")}
      timeShow={0.5}
      width={17.85}
      top={20}
      left={41.86}
      name={"key"}
      descriptionKey={Language.vi.listKeys[1].description}
    ></Item>
    <Item
      urlImage={asset("/images/item-energy-b2.png")}
      timeShow={0.5}
      width={17.85}
      top={32.5}
      left={57.56}
      name={"key"}
      descriptionKey={Language.vi.listKeys[2].description}
    ></Item>
    <Item
      urlImage={asset("/images/item-energy-taurin.png")}
      timeShow={0.5}
      width={17.85}
      top={27}
      left={73.56}
      name={"key"}
      descriptionKey={Language.vi.listKeys[3].description}
    ></Item>

    <Item
      urlImage={asset("/images/item-energy-acetyl.png")}
      timeShow={0.5}
      width={21}
      top={33}
      left={40.1}
      name={"key"}
      descriptionKey={Language.vi.listKeys[4].description}
    ></Item>
  </>)

  const listItems = (Language) => {

    let component;

    switch (Language) {

      case "vi":

        component = listItemsVI
        break;

      default:

        component = listItemsEN
        break;

    }

    return component;

  }


  // if (browser) {
  //   console.log(browser.name);
  //   console.log(browser.version);
  //   console.log(browser.os);
  // }

  useEffect(() => {

    if (valueLanguageContext.languageCurrent) {

      setDataSectionEnergyCycle(Language[`${valueLanguageContext.languageCurrent}`])

    }
    if (browser) {
      setNameBrowser(browser.name.toString());
    }

  }, []);

  useEffect(()=>{
    if(nameBrowser !== "firefox" || 
        nameBrowser !== "chrome" || 
        nameBrowser !== "opera")
      {
        // setNameBrowser();
        console.log(nameBrowser);
      }
  },[nameBrowser])


  useEffect(() => {

    if (valueLanguageContext.languageCurrent) {

      setDataSectionEnergyCycle(Language[`${valueLanguageContext.languageCurrent}`])

    }

  }, [valueLanguageContext.languageCurrent]);


       //check responsive
    useEffect(() => {

        if (windowSize.width <= 1024) {

        setResponsiveTablet(true);

        if (windowSize.width <= 599) {
            setResponsiveTablet(false);
            setResponsiveMobile(true);
        }

        } else {

        setResponsiveTablet(false);
        setResponsiveMobile(false);

        }

    }, [windowSize]);


  return (
    <section>
      <div className={ nameBrowser + " sectionEnergy" }>
        <img  className={ nameBrowser + " bgEnergy" }  src={urlBackground} />
        {
          dataSectionEnergyCycle ? (

            dataSectionEnergyCycle.name === "vi" ? (
              <TitleStyleVi
                textLine1={Language.vi.title[0]}
                textLine2={Language.vi.title[1]}
              />

            ) : (
                <TitleStyle1
                  textLine1={dataSectionEnergyCycle.title[0]}
                  textLine2={dataSectionEnergyCycle.title[1]}
                />
              )

          ) : <TitleStyle1></TitleStyle1>

        }

        <div className={"containerEnergy"}>
          <div className="fixItems">
            <Item
              urlImage={asset("/images/item-energy-dot.png")}
              timeShow={0.5}
              width={60}
              top={47}
              left={20}
              name={"dot"}
              animation={false}
            ></Item>
            {/* <Item
              urlImage={asset("/images/item-energy-acetyl.png")}
              timeShow={0.5}
              width={21}
              top={33}
              left={40.1}
              name={"acetyl"}
            ></Item> */}
            <Item
              urlImage={asset("/images/item-energy-protein.png")}
              timeShow={0.5}
              width={17.85}
              top={14.67}
              left={"0"}
              name={"protein"}
            ></Item>
            <Item
              urlImage={asset("/images/item-energy-fat.png")}
              timeShow={0.5}
              width={17.85}
              top={14.67}
              right={"0"}
              name={"fat"}
            ></Item>
            <Item
              urlImage={asset("/images/item-energy-sugar.png")}
              timeShow={0.5}
              width={17.85}
              top={5}
              left={41.56}
              name={"sugar"}
            ></Item>

            {/* {List items key} */}

            { valueLanguageContext ? listItems(valueLanguageContext.languageCurrent) : listItems("en")}

            {/* {List items key} */}
           
            {/* <Item
              urlImage={asset("/images/item-energy-cycle-blue.png")}
              timeShow={0.5}
              width={50}
              top={55}
              left={50}
              name={"sugar"}
              style={{
                transform: "translateX(-50%)"
              }}
            ></Item> */}
            {/* <Item
              urlImage={asset("/images/item-energy-cycle-yellow.png")}
              timeShow={0.5}
              width={50}
              top={55}
              left={50}
              name={"sugar"}
              style={{
                transform: "translateX(-50%)"
              }}
            ></Item> */}
            {/* <Item
              urlImage={asset("/images/item-energy-arrow-cycle.png")}
              timeShow={0.5}
              width={50}
              top={55}
              left={50}
              name={"sugar"}
              style={{
                transform: "translateX(-50%)"
              }}
            ></Item> */}
            <Item
              urlImage={asset("/images/item-energy-cycle-all-1.png")}
              timeShow={0.5}
              width={50}
              top={55}
              left={50}
              name={"sugar"}
              style={{
                transform: "translateX(-50%)"
              }}
            ></Item>
          </div>
          <div className={"energyProduct"}>

            <div className="description">

            { valueLanguageContext 
              ? (
                  valueLanguageContext.languageCurrent === "vi" 
                  ? <>
                    <h4>
                        Lipovitan chứa{" "}
                        <TextBold>Vitamin B1, B2, B6 và Axit Citric</TextBold>{" "}
                        giúp chu trình tái tạo năng lượng hoạt động hiệu quả.
                    </h4>
                  </>

                  : <>
                    <h4>
                        Lipovitan contains{" "}
                        <TextBold>Taurine, Vitamin B1, B2, B6 and Acid Citric</TextBold>{" "}
                        which the energy cycle need to run efficiently.
                    </h4>
                  </>
                ) 

              : (
                  <>
                    <h4>
                      Lipovitan contains{" "}
                      <TextBold>Taurine, Vitamin B1, B2, B6 and Acid Citric</TextBold>{" "}
                      which the energy cycle need to run efficiently.
                    </h4>
                  </>
                )
            
            }
             
          </div>
            {
              responsiveMobile === true
              ? (<>

                <Item
                  urlImage={asset("/images/item-energy-lon.png")}
                  timeShow={0.5}
                  width={77.9}
                  height={76.18}
                  top={"0"}
                  right={"0"}
                  name={"lon"}
                  animation={true}
                  style={{
                    transform: "rotate(2.84deg)",
                  }}
                ></Item>
                <Item
                  urlImage={asset("/images/item-energy-shadow-lon.png")}
                  timeShow={0.5}
                  width={58.22}
                  height={13.61}
                  bottom={27}
                  left={13}
                  name={"shadowlon"}
                  style={{
                    transform: "rotate(1.84deg)",
                  }}
                ></Item>
                <Item
                  urlImage={asset("/images/item-energy-taurin-round.png")}
                  timeShow={0.5}
                  width={24.48}
                  height={24.57}
                  top={14.29}
                  right={60.06}
                  name={"b6"}
                ></Item>
                <Item
                  urlImage={asset("/images/item-energy-b1-round.png")}
                  timeShow={0.5}
                  width={17}
                  height={17.38}
                  top={40}
                  right={63.24}
                  name={"b1"}
                  style={{
                    transform: "rotate(-8deg)",
                  }}
                ></Item>
                <Item
                  urlImage={asset("/images/item-energy-b6-round.png")}
                  timeShow={0.5}
                  width={16.85}
                  height={16.37}
                  top={5}
                  left={41.56}
                  name={"b6"}
                  style={{
                    transform: "rotate(-5.14deg)",
                  }}
                ></Item>
                <Item
                  urlImage={asset("/images/item-energy-b2-round.png")}
                  timeShow={0.5}
                  width={15.85}
                  height={15.37}
                  top={55.25}
                  left={70}
                  name={"b6"}
                  style={{
                    transform: "rotate(6.32deg)",
                  }}
                ></Item>
                <Item
                  urlImage={asset("/images/item-energy-inositon-round.png")}
                  timeShow={0.5}
                  width={26.85}
                  height={26.37}
                  top={35.25}
                  left={80}
                  name={"b6"}
                  style={{
                    transform: "rotate(23.14deg)",
                  }}
                ></Item>
              
              </>)
              : (<>

              <Item
                urlImage={asset("/images/item-energy-lon.png")}
                timeShow={0.5}
                width={77.9}
                height={76.18}
                top={"0"}
                right={"0"}
                name={"lon"}
                animation={true}
                style={{
                  transform: "rotate(2.84deg)",
                }}
              ></Item>
              <Item
                urlImage={asset("/images/item-energy-shadow-lon.png")}
                timeShow={0.5}
                width={58.22}
                height={13.61}
                bottom={10}
                left={13}
                name={"shadowlon"}
                style={{
                  transform: "rotate(1.84deg)",
                }}
              ></Item>
              <Item
                urlImage={asset("/images/item-energy-taurin-round.png")}
                timeShow={0.5}
                width={24.48}
                height={24.57}
                top={14.29}
                right={60.06}
                name={"b6"}
              ></Item>
              <Item
                urlImage={asset("/images/item-energy-b1-round.png")}
                timeShow={0.5}
                width={17}
                height={17.38}
                top={40}
                right={63.24}
                name={"b1"}
                style={{
                  transform: "rotate(-8deg)",
                }}
              ></Item>
              <Item
                urlImage={asset("/images/item-energy-b6-round.png")}
                timeShow={0.5}
                width={16.85}
                height={16.37}
                top={5}
                left={41.56}
                name={"b6"}
                style={{
                  transform: "rotate(-5.14deg)",
                }}
              ></Item>
              <Item
                urlImage={asset("/images/item-energy-b2-round.png")}
                timeShow={0.5}
                width={15.85}
                height={15.37}
                top={55.25}
                left={70}
                name={"b6"}
                style={{
                  transform: "rotate(6.32deg)",
                }}
              ></Item>
              <Item
                urlImage={asset("/images/item-energy-inositon-round.png")}
                timeShow={0.5}
                width={26.85}
                height={26.37}
                top={35.25}
                left={80}
                name={"b6"}
                style={{
                  transform: "rotate(23.14deg)",
                }}
              ></Item>
                
              </>)
            }

          </div>
        </div>
      </div>

      <style jsx>{`

        .sectionEnergy {
          position: relative;
          min-height: 50vh;
          padding-top: 60px;
          display: flex;
          justify-content: center;
          .description {
            position: absolute;
            width: 80%;
            bottom: 100%;
            right: 0;
            text-align: center;
          }
        }

        .bgEnergy {
          z-index: 1;
          width: 100%;
          max-width: 872px;
          max-height: 884px;
          margin: 100px  0 50px 0;
        }

        .containerEnergy {
          position: absolute;
          left: 50%;
          bottom: 6.5%;
          transform: translate(-50%, 0);
          z-index: 2;
          max-width: 872px;
          width: 100%;
          height: 80%;
        }
        .fixItems {
          position: relative;
          width: 100%;
          height: 100%;
          > div:nth-child(5) {
            .descriptionKey {
              background: red;
            }
          }
        }
        .energyProduct {
          position: absolute;
          width: 70%;
          height: 50.59%;
          bottom: -30px;
          right: -35%;
        }
        @media only screen and (max-width: 1440px) {

          .energyProduct {
            width: 40vw;
            right: -18vw;
          }

          .sectionEnergy {
            .description {
              width: 100%;
              padding: 0 5% 0  25%;
            }
          }
        }

        @media only screen and (max-width: 1024px) {
         
          .energyProduct {
            width: 40%;
          }
          .bgEnergy {
            max-width: 872px;
            max-height: 100%;
            display: block;
            margin: 100px  0 50px 0;
          }
          .safari.bgEnergy{
            height: 100%;
          }
        }
        
        @media screen and (max-width: 1025px) and (min-width: 769px){
        
          .energyProduct {
            width: 30vw;
            right: -4vw;
            height: 30.59%;
          }
          .safari.bgEnergy{
            height: 100%;
          }
              
        }
        @media screen and (max-width: 710px) and (min-width:590px){
         
          .bgEnergy {
            min-height: 700px;
            height: 100%;
          }
          .containerEnergy{
            height: 77.5%;
          }
             
       }
        @media only screen and (max-width : 599px){
          .safari.bgEnergy{
            height: 100%;
          }
          .sectionEnergy{
            padding-top: 60px;
            padding-bottom: 450px;
          }
          .energyProduct{
            position: relative;
            width : 100%;
            left: 40%;
            bottom : 1%;
            transform : translate(-50%, 30%);
          }
          .fixItems{
            height: 50%;
          }
        }
        @media only screen and (max-width : 516px){
          .sectionEnergy {
            display: block;
            margin-top: -60px;
          }
        }
        
      `}</style>
    </section>
  );
}
