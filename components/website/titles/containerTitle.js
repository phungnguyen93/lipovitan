import asset from "plugins/assets/asset";
import { MainContent } from "components/website/contexts/MainContent";
import { useEffect, useRef, useState, useContext } from "react";

export default function ContainerTitle ({
    children,
    style,
    lineLeft=true,
    lineRight=true,
    translateLine=-20,
    marginLine=20
}){

    const valueLanguageContext = useContext(MainContent);
    
    return (<div className={"containerTitle " + valueLanguageContext.languageCurrent} style={style}>
        { lineLeft ? <img className="lineLeft" src={asset("/images/line-title-red.png")}/>  :<></> }
        { children }
        { lineRight ? <img className="lineRight" src={asset("/images/line-title-red.png")}/> :<></> }
        <style jsx>{`
            .containerTitle{
                display : flex;
                align-items: flex-end;
            }    
            .lineLeft,.lineRight{
                width: auto;
                height: 8px;
                width: 90px;
                transform: translate(0%,${translateLine + "px"});
            }
            .lineLeft{
                margin-right: ${marginLine + "px"};
            }
            .lineRight{
                margin-left: ${marginLine + "px"};
            }
            
            @media only screen and (max-width: 768px) {
               
               .lineLeft,.lineRight{
                   height: 4px;
                   width: 5vw;
                   transform: translate(0, 20px);
               }
           }
        `}</style>
    </div>)
}