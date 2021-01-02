import ContainerTitle from "components/website/titles/containerTitle";
import LargeTitle from "components/website/titles/LargeTitle";
import SmallTitle from "components/website/titles/SmallTitle";

export default function TitleStyle1({
     
    textLine1="Modern ChanNel",
    textLine2="",
    description,
    textLine3=""
    
}){
    return (<>
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
                                fontSize: "80px" ,
                                lineHeight: "100px",
                            }}
                        >
                            {textLine1}
                    </LargeTitle>
                </ContainerTitle>
            </div>
           
        </div>
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
          `}</style>
    </>)
}