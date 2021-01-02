import ContainerTitle from "components/website/titles/containerTitle";
import LargeTitle from "components/website/titles/LargeTitle";
import SmallTitle from "components/website/titles/SmallTitle";
import { MainContent } from "components/website/contexts/MainContent";
import { useEffect, useRef, useState, useContext } from "react";

export default function TitleStyle1({
  textLine1 = "Brand",
  textLine2 = "Story",
  textLine3 = "3 Cans",
}) {

  const valueLanguageContext = useContext(MainContent);
  const [maxWitdthTitle, setMaxWidthTitle] = useState();

  useEffect(() => {

    if (valueLanguageContext.languageCurrent) {

      if(valueLanguageContext.languageCurrent === "en"){
        setMaxWidthTitle("726px")
      }else{
        
        setMaxWidthTitle("1000px")
      }

    }
  }, [valueLanguageContext.languageCurrent]);

  return (
    <>
      <div className={valueLanguageContext ?  "copy " + valueLanguageContext.languageCurrent  : "copy"}>
        <div className={valueLanguageContext ?  "titleBrandStory " + valueLanguageContext.languageCurrent  : "titleBrandStory"}>
          <ContainerTitle lineLeft={true} lineRight={false}>
            <LargeTitle
              style={{
                letterSpacing: "5px",
                color: "#fff",
                textShadow:
                  "2px 0 0 #004FC5, -2px 0 0 #004FC5, 0 2px 0 #004FC5, 0 -2px 0 #004FC5, 1px 1px #004FC5, -1px -1px 0 #004FC5, 1px -1px 0 #004FC5, -1px 1px 0 #004FC5",
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
            <LargeTitle style={{ color: "#004FC5"}}>
              {textLine2}
            </LargeTitle>
          </ContainerTitle>
        </div>
        {/* //004FC5 */}
      </div>
      <style jsx>{`
        
        .copy {
          position: absolute;
          max-width: ${maxWitdthTitle};
          width: 100%;
          top: 0;
          left: 50%;
          transform: translate(-50%, -10%);
        }
        .titleBrandStory {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        @media screen and (max-width: 1025px) and (min-width: 769px){
          .copy.vi{
              width: 70%;
          }
          .copy.en{
            max-width: 50%;
          }
        }

      `}</style>
    </>
  );
}
