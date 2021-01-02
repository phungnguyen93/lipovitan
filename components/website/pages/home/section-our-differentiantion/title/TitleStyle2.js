import ContainerTitle from "components/website/titles/containerTitle";
import LargeTitle from "components/website/titles/LargeTitle";
import SmallTitle from "components/website/titles/SmallTitle";

export default function TitleStyle2({
     
    textLine1="ENerGY",
    textLine2="Nutrient",
    textLine3=""
    
}){
    return (<>
        <div className="copy">
            <div className="titleBrandStory">
            <ContainerTitle lineLeft={false} lineRight={false}>
                <LargeTitle
                    style={{
                        fontFamily: "Montserrat-BlackItalic",
                        letterSpacing: "15px",
                        color:"rgba(255,255,255,0)",
                        webkitTextStroke: "3px rgba(255, 242, 0, 0.8)",
                        webkitTextFillColor: "rgba(255,255,255,0)",
                        fontSize: "90px", 
                    }}
                >
                    {textLine1}
                </LargeTitle>
            </ContainerTitle>
            <ContainerTitle lineLeft={false} lineRight={false} style={{ justifyContent: "flex-end"}}>
                <LargeTitle
                    style={{
                        fontFamily:"Montserrat-BlackItalic",
                        letterSpacing: "15px",
                        color:"rgba(255,255,255,0)",
                        webkitTextStroke: "3px rgba(255, 242, 0, 0.8)",
                        webkitTextFillColor: "rgba(255,255,255,0)",
                        fontSize: "90px", 
                    }}
                >
                    {textLine2}
                </LargeTitle>
            </ContainerTitle>
            </div>
        </div>
        <style jsx>{`
            .copy{
                position: absolute;
                width: 85%;
                top: 31.5%;
                left: 50%;
                transform: translate(-50%, 0);
           }
           .titleBrandStory{
               display:flex;
               flex-direction: row-reverse;
               justify-content: space-between;
           }
          `}</style>
    </>)
}