import ContainerTitle from "components/website/titles/containerTitle";
import LargeTitle from "components/website/titles/LargeTitle";
import SmallTitle from "components/website/titles/SmallTitle";
import Buttom from "components/website/button/Button";
import asset from "plugins/assets/asset";
import { MainContent } from "components/website/contexts/MainContent";
import { useContext } from "react";

export default function TitleStyle1({
  textLine1 = "LIPOVITAN",
  textLine2 = "Honey",
  nameBtn="Where to buy",
  fnOutsite=null,
  styleCopy,
  description,
}) {
  
  const valueLanguageContext = useContext(MainContent);
  return (
    <>
      <div style={styleCopy} className={"copy " + valueLanguageContext.languageCurrent}>
        <ContainerTitle lineLeft={false} lineRight={false}>
          <LargeTitle
            color="#ED1C24"
            fontFamily="Montserrat-ExtraBold"
            fontSize={80}
          >
            <img src={asset("/images/logo.svg")}  className="logoLipo"/>
            {/* {textLine1} */}
          </LargeTitle>
        </ContainerTitle>
        <ContainerTitle lineLeft={false} lineRight={true}>
          <LargeTitle color={"#FFE500"} fontSize={80}>
            {textLine2}
          </LargeTitle>
        </ContainerTitle>

        {description}

        <Buttom
          cbFunction={fnOutsite}
        >{nameBtn}</Buttom>
      </div>
      <style jsx>{`
        .logoLipo {
          width: 30vw;
          margin-bottom: 20px;
        }
        .copy {
          top: 18%;
          left: 10%;
          position: absolute;
          z-index: 2;
        }
        @media only screen and (max-width: 1024px) {
          .copy {
            left: 50px;
          }
        }
        @media only screen and (max-width: 768px) {
          .copy {
            left: 0;
            padding: 0 20px; 
          }
        }
        @media only screen and (max-width: 520px) {
          .copy {
            top: 12%;
           
          }
        }
      `}</style>
    </>
  );
}
