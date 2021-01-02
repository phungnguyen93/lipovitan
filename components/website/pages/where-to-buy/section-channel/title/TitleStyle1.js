import ContainerTitle from "components/website/titles/containerTitle";
import LargeTitle from "components/website/titles/LargeTitle";
import SmallTitle from "components/website/titles/SmallTitle";
import useWindowSize from "components/website/hooks/useWindowsSize";
export default function TitleStyle1({
     
    textLine1="GT",
    textLine2="ChanNel",
    textLine3="3 Cans"
    
}){
      // detect screen size
    const windowSize = useWindowSize();
    return (<>

        {

          windowSize.width < 600 
          
          ? (<>

                <div className="copy mobile">
                    <div className="titleChannel">
                        <ContainerTitle lineLeft={false} lineRight={false} 
                            style={{
                                letterSpacing: "0px",
                                display: "flex",
                            
                            }}
                        >
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
                        <ContainerTitle lineLeft={false} lineRight={true} 
                            style={{
                                justifyContent: "center",
                                display: "flex",
                            
                            }}
                        >
                            <LargeTitle
                                    style={{
                                        color:"#004FC5", 
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

              <div className="copy">
                <div className="titleChannel">
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
                top: 7%;
                left: 50%;
                transform: translate(-50%, 0);
                display: flex;
                justify-content: center;
           }
           .titleChannel{
               display:flex;
           }
           .mobile{
                top:-3%;
                .titleChannel{
                    display : flex;
                    flex-direction: column;   
                }
           }
          `}</style>
          
    </>)
}
//max-width: 900px;