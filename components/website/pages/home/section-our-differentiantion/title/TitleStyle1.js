import ContainerTitle from "components/website/titles/containerTitle";
import LargeTitle from "components/website/titles/LargeTitle";
// import SmallTitle from "components/website/titles/SmallTitle";
import { useEffect, useRef, useState, useContext } from "react";
import { MainContent } from "components/website/contexts/MainContent";
export default function TitleStyle1({
  textLine1 = "Our",
  textLine2 = "Differentiation",
  textLine3 = "3 Cans",
}) {

  const valueLanguageContext = useContext(MainContent);

  return (
    <>
      <div className={"copy " +valueLanguageContext.languageCurrent}>
        <div className="titleBrandStory">
          <ContainerTitle lineLeft={false} lineRight={false}>
            <LargeTitle
              style={{
                letterSpacing: "5px",
                color: "#FFE600",
              }}
            >
              {textLine1}
            </LargeTitle>
          </ContainerTitle>
          <ContainerTitle
            lineLeft={false}
            lineRight={true}
            style={{ justifyContent: "flex-end" }}
          >
            <LargeTitle style={{ color: "#fff"}}>
              {textLine2}
            </LargeTitle>
          </ContainerTitle>
        </div>
        {/* //004FC5 */}
      </div>
      <style jsx>{`
        .copy {
          position: absolute;
          max-width: 970px;
          width: 100%;
          top: 10.5%;
          left: 50%;
          transform: translate(-50%, 0);
        }
        .titleBrandStory {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        @media screen and (max-width: 520px) {
          .copy {
            top: 5%;
            width: 100%;
           
          }
        }
      `}</style>
    </>
  );
}
