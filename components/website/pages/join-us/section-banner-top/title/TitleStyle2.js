import ContainerTitle from "components/website/titles/containerTitle";
import LargeTitle from "components/website/titles/LargeTitle";
import SmallTitle from "components/website/titles/SmallTitle";
import Button from "components/website/button/Button"

export default function TitleStyle1({
     
    textLine1="join us",
    textLine2="TAISHO VIETNAM CO., LTD",
    textLine3=".",
    styleCopy,
    description,
    textButton="Taisho GROUP",
    cbFunctionBtn,
    
}){
    return (<>
        <div style={styleCopy} className="copy">
            <ContainerTitle lineLeft={true} lineRight={true}
                style={{justifyContent :"center"}}
            >
                <LargeTitle
                    color="#fff"
                    fontSize={80}
                >
                    {textLine1}
                </LargeTitle>
            </ContainerTitle>
            <ContainerTitle lineLeft={false} lineRight={false} >
                <LargeTitle 
                    color={"#ED1C24"}
                    fontSize={50}
                    style={{
                        lineHeight: "80px", 
                      
                    }}
                >
                    {textLine2}
                </LargeTitle>
            </ContainerTitle>
            <ContainerTitle lineLeft={false} lineRight={false} 
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
                top: 30%;
                left: 5%;
                position: absolute;
                display: flex;
                justify-content: center;
                flex-direction: column;
           }
           @media screen and (max-width: 520px) {
               .copy{
                   top: 20%;
               }
           }
          `}</style>
    </>)
}