import ContainerTitle from "components/website/titles/containerTitle";
import LargeTitle from "components/website/titles/LargeTitle";
import SmallTitle from "components/website/titles/SmallTitle";
import useWindowSize from "components/website/hooks/useWindowsSize";
import { MainContent } from "components/website/contexts/MainContent";
import { useContext } from "react";

export default function TitleStyle1({
     
    textLine1="E-commerce",
    textLine2="Chanel",
    description=""
    
}){
      // detect screen size
    const windowSize = useWindowSize();

    const valueLanguageContext = useContext(MainContent);

    return (<>

        {
          windowSize.width < 600 
          ? (<>

                <div className={"copy mobile " + valueLanguageContext.languageCurrent}>
                    <div className="titleBannerBottom">
                        <ContainerTitle lineLeft={false} lineRight={false} 
                            style={{
                                letterSpacing: "0px",
                                display: "flex",
                            
                            }}
                        >
                            <LargeTitle
                                    style={{
                                        letterSpacing: "2px",
                                        color:"#FFE600",
                                        paddingRight: "10px",
                                       
                                    }}
                                >
                                    {textLine1}
                            </LargeTitle>
                        </ContainerTitle>
                        <ContainerTitle lineLeft={false} lineRight={true} 
                            style={{
                                justifyContent: "center",
                                display: "flex",
                            
                            }}
                        >
                            <LargeTitle
                                    style={{
                                        color:"#fff", 
                                        paddingLeft: "10px",
                                    }}
                                >
                                    {textLine2}
                            </LargeTitle>
                        </ContainerTitle>
                    </div>
                     
                </div>

          </>)
          :(
          <>

              <div className={"copy " + valueLanguageContext.languageCurrent}>
                <div className="titleBannerBottom">
                    <ContainerTitle style={{width: "100%"}} lineLeft={true} lineRight={true}>
                        <LargeTitle
                            style={{
                                letterSpacing: "5px",
                                color:"#FFE600",
                                paddingRight: "10px",
                               
                            }}
                        >
                            {textLine1}
                        </LargeTitle>
                        <LargeTitle
                            style={{
                                color:"#fff", 
                                paddingLeft: "10px",
                            }}
                        >
                            {textLine2}
                        </LargeTitle>
                    </ContainerTitle>
                   
            </div>
           
        </div>
          </>)
        }

        
        <style jsx>{`
            .copy{
                position: absolute;
                width: 100%;
                top: 25%;
                left: 50%;
                transform: translate(-50%, 0);
                display: flex;
                justify-content: center;
           }
           .titleBannerBottom{
               display:flex;
           }
           .mobile{
               width: 90%;
                top:22%;
                .titleBannerBottom{
                    display : flex;
                    flex-direction: column;   
                }
                .titleBannerBottom{
                    width: 100%;
                }
           }
          `}</style>
    </>)
}