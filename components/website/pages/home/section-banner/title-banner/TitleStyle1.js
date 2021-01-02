import ContainerTitle from "components/website/titles/containerTitle";
import LargeTitle from "components/website/titles/LargeTitle";
import SmallTitle from "components/website/titles/SmallTitle";
import { useEffect, useRef, useState, useContext } from "react";
import { MainContent } from "components/website/contexts/MainContent";
export default function TitleStyle1({
  textLine1 = "Conquering you",
  textLine2 = "After",
  textLine3 = "3 Cans",
  styleCopy,
}) {

  const valueLanguageContext = useContext(MainContent);

  return (
    <>
      <div style={styleCopy} className={"copy " +valueLanguageContext.languageCurrent}>
        <ContainerTitle lineLeft={false} lineRight={false}>
          <LargeTitle>{textLine1}</LargeTitle>
        </ContainerTitle>
        <ContainerTitle
          lineLeft={false}
          lineRight={false}
          style={{ display: "flex", alignItems: "flex-start" }}
        >
          <SmallTitle>{textLine2}</SmallTitle>
          <LargeTitle
            color={"#fff"}
            style={{ lineHeight: "90px", padding: "0 10px" }}
          >
            {textLine3}
          </LargeTitle>
        </ContainerTitle>
      </div>
      <style jsx>{`
        .copy {
          top: 11.5%;
          left: 5%;
          position: absolute;
        }
        @media screen and (max-width: 1440px) {
            
        }
        @media screen and (max-width: 1024px) {
            .copy {
                top: 15%
            }
        }
      `}</style>
    </>
  );
}
/*
  .containerTitle
      display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    margin-top: -48px;

    h1.style {
    line-height: 40px;
    padding: 0 10px;
}
}
*/