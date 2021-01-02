import ContainerTitle from "components/website/titles/containerTitle";
import LargeTitle from "components/website/titles/LargeTitle";
import SmallTitle from "components/website/titles/SmallTitle";

export default function TitleStyle1({
     
    textLine1="Our",
    textLine2="Differentiation",
    textLine3="3 Cans"
    
}){
    return (<>
        <div className="copy">
            <div className="titleBrandStory">
            <ContainerTitle lineLeft={false} lineRight={false}>
                <LargeTitle
                    style={{
                        letterSpacing: "5px",
                        color:"#FFE600",
                        fontSize: "80px" 
                    }}
                >
                    {textLine1}
                </LargeTitle>
            </ContainerTitle>
            <ContainerTitle lineLeft={false} lineRight={true} style={{ justifyContent: "flex-end"}}>
                <LargeTitle
                    style={{color:"#fff", fontSize: "80px"}}
                >{textLine2}</LargeTitle>
            </ContainerTitle>
            </div>
            {/* //004FC5 */}
        </div>
        <style jsx>{`
            .copy{
                position: absolute;
                max-width: 970px;
                width: 100%;
                top: 10.5%;
                left: 50%;
                transform: translate(-50%, 0);
           }
           .titleBrandStory{
               display:flex;
               flex-direction: column;
               justify-content: flex-start
           }
          `}</style>
    </>)
}