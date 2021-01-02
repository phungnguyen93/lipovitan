import ContainerTitle from "components/website/titles/containerTitle";
import LargeTitle from "components/website/titles/LargeTitle";
import SmallTitle from "components/website/titles/SmallTitle";

export default function TitleStyle1(
    {
        textLine1="Năng Lượng",
        textLine2="cho",
        textLine3="Cuộc sống"
    }
){
    return (<>
        <div className="copy">
            <ContainerTitle lineLeft={false} lineRight={false}>
                <LargeTitle>{textLine1}</LargeTitle>
            </ContainerTitle>

            <ContainerTitle lineLeft={false} lineRight={false} style={{display:"flex", alignItems:"flex-start", flexDirection:"column"}}>
                <SmallTitle >{textLine2}</SmallTitle>
                <LargeTitle 
                    color={"#fff"}
                    style={{lineHeight: "90px", padding : "0 20px"}}
                >
                    {textLine3}
                </LargeTitle>
            </ContainerTitle>
        </div>
        <style jsx>{`
           .copy{
            top: 15%;
            left: 5%;
            position: absolute;
           }
          `}</style>
    </>)
}