import ContainerTitle from "components/website/titles/containerTitle";
import LargeTitle from "components/website/titles/LargeTitle";
import SmallTitle from "components/website/titles/SmallTitle";
import useWindowSize from "components/website/hooks/useWindowsSize"
export default function TitleStyle1({
     
    textLine1="Modern ChanNel",
    textM=["Modern", "ChanNel"],
    textLine2="",
    description,
    textLine3=""
    
}){

    const windowSize = useWindowSize();

    return (<>

    {
        windowSize.width <=520 
        ?(<>
        
        <div className="copy mobile">
            <div className="titleCertifications">
                <ContainerTitle lineLeft={false} lineRight={false} 
                    style={{
                        letterSpacing: "0px",
                        display: "flex",
                       
                    }}
                >
                    <LargeTitle
                            style={{
                               
                                color:"#fff", 
                            }}
                        >
                            {textM[0]}
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
                            }}
                        >
                            {textM[1]}
                    </LargeTitle>
                </ContainerTitle>
            </div>
           
        </div>
            
        </>)
        :(<>
            <div className="copy">
            <div className="titleCertifications">
                <ContainerTitle lineLeft={true} lineRight={true} 
                    style={{
                        letterSpacing: "0px",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <LargeTitle
                            style={{
                                letterSpacing: "0px",
                                color:"#fff", 
                              
                                lineHeight: "100px",
                            }}
                        >
                            {textLine1}
                    </LargeTitle>
                </ContainerTitle>
            </div>
           
        </div>
        </>)
    }
        
        <style jsx>{`
            .copy{
                position: absolute;
                max-width: 1366px;
                width: 100%;
                top: 15%;
                left: 50%;
                transform: translate(-50%, 0);
           }
           .titleCertifications{
               display:flex;
               flex-direction: column;
               justify-content: flex-start
           }
           @media screen and (max-width:599px) {
            
            .copy.mobile{
                top: 20%;
                .titleCertifications{

                }
           }
           }
          `}</style>
    </>)
}