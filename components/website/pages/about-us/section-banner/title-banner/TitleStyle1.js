import ContainerTitle from "components/website/titles/containerTitle";
import LargeTitle from "components/website/titles/LargeTitle";
import SmallTitle from "components/website/titles/SmallTitle";
import Button from "components/website/button/Button";
import { MainContent } from "components/website/contexts/MainContent";
import { useContext } from "react";

export default function TitleStyle1({
  textLine1 = "Your health",
  textLine2 = "Is our",
  textLine3 = "Specialty",
  styleCopy,
  description,
  textButton = "Taisho GROUP",
  cbFunctionBtn,
}) {

  const valueLanguageContext = useContext(MainContent);
  
  
  return (
    <>
      <div style={styleCopy} className={"copy " + valueLanguageContext.languageCurrent}>
        <ContainerTitle
          lineLeft={false}
          lineRight={false}
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <LargeTitle color="#FFE600" fontSize={80}>
            {textLine1}
          </LargeTitle>
          <SmallTitle fontSize={40}>{textLine2}</SmallTitle>
        </ContainerTitle>
        <ContainerTitle
          lineLeft={true}
          lineRight={false}
          style={{
            position: "relative",
            bottom: "50px",
            left: "50px",
          }}
        >
          <LargeTitle
            color={"#fff"}
            fontSize={80}
            style={{
              lineHeight: "90px",
              padding: "0 20px",
            }}
          >
            {textLine3}
          </LargeTitle>
        </ContainerTitle>

        {description}
          
        <Button cbFunction={cbFunctionBtn}>{textButton}</Button>
      </div>
      <style jsx>{`
        .copy {
          top: 18.5%;
          left: 10%;
          position: absolute;
        }
        @media only screen and (max-width: 1440px) {
          .copy {
           left: 5vw;
          }
        }
        @media only screen and (max-width: 1024px) {
          .copy {
           left: 50px
          }
        }
        @media only screen and (max-width: 768px) {
          .copy {
           left: 0;
           top: 100px;
           padding: 0 20px;
          }
        }
      `}</style>
    </>
  );
}
