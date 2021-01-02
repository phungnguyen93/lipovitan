import ContainerTitle from "components/website/titles/containerTitle";
import LargeTitle from "components/website/titles/LargeTitle";
import SmallTitle from "components/website/titles/SmallTitle";
import Button from "components/website/button/Button"
import useWindowSize from "components/website/hooks/useWindowsSize";
export default function TitleStyle1({
     
    textLine1="Corporate",
    textLine2="Information",
    textLine3=".",
    styleCopy,
    description,
    textButton="Taisho GROUP",
    cbFunctionBtn,
    
}){
    const windowSize = useWindowSize();

    return (<>
        <div style={styleCopy} className="copy">
            <ContainerTitle lineLeft={false} lineRight={false}
                style={{display:"flex", alignItems:"flex-start", flexDirection:"column"}}
            >
                <LargeTitle
                    color="#FFE600"
                  
                >
                    {textLine1}
                </LargeTitle>
            </ContainerTitle>
            {
                windowSize.width <600 ? (<>
                    <ContainerTitle lineLeft={false} lineRight={true} >
                        <LargeTitle 
                            color={"#fff"}
                            style={{
                                lineHeight: "90px", 
                            
                            }}
                        >
                            {textLine2}
                        </LargeTitle>
                    </ContainerTitle>
                </>) 
                : (<>
                    <ContainerTitle lineLeft={false} lineRight={false} >
                        <LargeTitle 
                            color={"#fff"}
                            style={{
                                lineHeight: "90px", 
                            
                            }}
                        >
                            {textLine2}
                        </LargeTitle>
                    </ContainerTitle>
                </>)
            }
            
            <ContainerTitle lineLeft={true} lineRight={false} 
            >
                <LargeTitle 
                    color={"rgba(0,0,0,0)"}
                    fontSize={20}
                    style={{
                        lineHeight: "50px", 
                    }}
                >
                    {textLine3}
                </LargeTitle>
            </ContainerTitle>

                {description}

                {/* <Button
                    cbFunction={cbFunctionBtn}
                >{textButton}</Button> */}

        </div>
        <style jsx>{`
           .copy{
                top: 18.5%;
                left: 5%;
                position: absolute;
           }
           @media screen and (max-width:599px) {
                .copy{
                    top: 15%;
                    left: 5%;
                    position: absolute;
            }
           }

          `}</style>
    </>)
}