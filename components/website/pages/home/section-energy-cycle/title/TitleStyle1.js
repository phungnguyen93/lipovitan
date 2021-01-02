import ContainerTitle from "components/website/titles/containerTitle";
import LargeTitle from "components/website/titles/LargeTitle";
import SmallTitle from "components/website/titles/SmallTitle";
import { useEffect, useRef, useState, useContext } from "react";
import useWindowSize from "components/website/hooks/useWindowsSize";
import { MainContent } from "components/website/contexts/MainContent";

export default function TitleStyle1({
     
    textLine1="Energy",
    textLine2="Cycle",
    textLine3="3 Cans"
    
}){

    const valueLanguageContext = useContext(MainContent);

        // detect screen size
    const windowSize = useWindowSize();
    const [responsiveMaxScreen, setResponsiveMaxScreen] = useState(false);
    const [responsiveMobile, setResponsiveMobile] = useState(false);
    const [responsiveTablet, setResponsiveTablet] = useState(false);

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
  
    return (<>

        <div className={responsiveMobile === true 
            ? `copy mobile ${valueLanguageContext.languageCurrent}`
            : `copy  ${valueLanguageContext.languageCurrent}` }>
            <div className={responsiveMobile === true ? "titleEnergy mobile ": "titleEnergy" }>

                {
                    responsiveMobile === true
                    ? (<>

                        <ContainerTitle style={{width: "100%"}} lineLeft={true} lineRight={false}>
                            <LargeTitle
                                style={{
                                    letterSpacing: "5px",
                                    color:"#fff",
                                    paddingRight: "10px",
                                    textShadow: "2px 0 0 #004FC5, -2px 0 0 #004FC5, 0 2px 0 #004FC5, 0 -2px 0 #004FC5, 1px 1px #004FC5, -1px -1px 0 #004FC5, 1px -1px 0 #004FC5, -1px 1px 0 #004FC5"
                                }}
                            >
                                {textLine1}
                            </LargeTitle>
                        </ContainerTitle>
                        <ContainerTitle style={{width: "100%"}} lineLeft={false} lineRight={true}>
                            <LargeTitle
                                style={{
                                    color:"#004FC5", 
                                    paddingLeft: "10px",
                                }}
                            >{textLine2}
                            </LargeTitle>
                        </ContainerTitle>
                    </>)
                    : (<>
                        <ContainerTitle style={{width: "100%"}} lineLeft={true} lineRight={true}>
                            <LargeTitle
                                style={{
                                    letterSpacing: "5px",
                                    color:"#fff",
                                    paddingRight: "10px",
                                    textShadow: "2px 0 0 #004FC5, -2px 0 0 #004FC5, 0 2px 0 #004FC5, 0 -2px 0 #004FC5, 1px 1px #004FC5, -1px -1px 0 #004FC5, 1px -1px 0 #004FC5, -1px 1px 0 #004FC5"
                                }}
                            >
                                {textLine1}
                            </LargeTitle>
                            <LargeTitle
                                style={{
                                    color:"#004FC5", 
                                    paddingLeft: "10px",
                                }}
                            >{textLine2}
                            </LargeTitle>
                        </ContainerTitle>
                    </>)
                }

                
            </div>
            {/* //004FC5 */}
        </div>

        <style jsx>{`
            .copy{
                position: absolute;
                max-width: 900px;
                width: 100%;
                top: 7%;
                left: 50%;
                transform: translate(-50%, 0);
           }

           .titleEnergy{
               display:flex;
           }

           .titleEnergy.mobile{
                display : flex;
                flex-direction : column;
           }

          `}</style>
    </>)
}