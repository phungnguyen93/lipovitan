import { MainContent } from "components/website/contexts/MainContent";
import { useEffect, useRef, useState, useContext } from "react";
export default function Title(
    {
        color = "#FFE600",
        children,
        style,
        fontFamily = "Montserrat-BlackItalic",
        fontSize = 92
    }
){

    const valueLanguageContext = useContext(MainContent);


    return (<>
        <h1 className={"titleLarge " + valueLanguageContext.languageCurrent} style={style}>
            {children}
        </h1>
        <style jsx>{`

            .titleLarge{
                font-family: ${fontFamily};
                //font-size: ${fontSize + "px"};
                font-size: 80px;
                color : ${color};
                text-transform: uppercase;
            }
            @media screen and (max-width: 1919px) {
                .titleLarge{
                    font-size: 75px;
                }
            }

            @media screen and (max-width: 1440px) {
                .titleLarge{
                    font-size: 67px;
                }
            }

            @media screen and (max-width: 1366px) {
                .titleLarge{
                    font-size: 60px;
                }
            }

            @media screen and (max-width: 1280px) {
                .titleLarge{
                    font-size: 55px;
                }
            }

            @media screen and (max-width: 1024px) {
                .titleLarge{
                    font-size: 6vmax;
                    line-height: 1.3;
                }
            }

            @media screen and (max-width: 768px) {
                .titleLarge{
                    
                    font-size: 30px;
                }
            }
            @media screen and (max-width: 600px) {
                .titleLarge{
                    
                    font-size: 5vmax;
                }
            }
            @media screen and (max-width:520px) {
                .titleLarge{
                    font-size: 34px;
                }
            }
            @media screen and (max-width: 374px) {
                .titleLarge{
                    font-size: 27px;
                }
            }
            
        `}</style>
    </>)
}