import ContainerTitle from "components/website/titles/containerTitle";
import LargeTitle from "components/website/titles/LargeTitle";
import SmallTitle from "components/website/titles/SmallTitle";

export default function TitleStyle1({
     
    textLine1="Quality and technology",
    textLine2="certifications",
    description,
    textLine3="3 Cans"
    
}){
    return (<>
        <div className="copy">
            <div className="titleCertifications">
                <ContainerTitle lineLeft={false} lineRight={false} 
                    style={{
                        display: "flex", 
                        justifyContent : "center", 
                        alignItems: "center", 
                        flexDirection :"column",
                        letterSpacing: "0px"
                    }}
                >
                    <LargeTitle
                            style={{
                                letterSpacing: "0px",
                                color:"#fff", 
                                
                            }}
                        >
                            {textLine1}
                    </LargeTitle>
                    <LargeTitle
                        style={{
                            color:"#FFE600",
                           
                        }}
                    >
                        {textLine2}
                    </LargeTitle>
                        {description ? description : <></>}
                </ContainerTitle>
            </div>
           
        </div>
        <style jsx>{`
            .copy{
                position: absolute;
                max-width: 1366px;
                width: 100%;
                top: -5%;
                left: 50%;
                transform: translate(-50%, 0);
           }
           .titleCertifications{
               display:flex;
               flex-direction: column;
               justify-content: flex-start
           }
           @media screen and (max-width:599px) {
            .copy{
               
                top: 0%;
               
           }
           }
          `}</style>
    </>)
}