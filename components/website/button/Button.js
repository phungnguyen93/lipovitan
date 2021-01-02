import {useState, useEffect, useRef} from "react";
import asset from "plugins/assets/asset";
import { TweenMax, TimelineLite } from 'gsap';

export default function Button(
    {
        padding=30,
        color="#004FC5",
        background="#fff",
        backgroundHover="#004FC5",
        children,
        width="auto",
        height=40,
        cbFunction = null,
        hasArrow=true, 
        imgArrow=asset("/images/icon-arrow-next-blue.png")
    }){
    
    const arrowRef = useRef();
    const textRef = useRef();

    const [statusHover, setStatusHover] = useState();

    const cb = () => { cbFunction !== null ? cbFunction() : null };

    const handleMouseOver  = () => setStatusHover(true);
    const handleMouseLeave  = () => setStatusHover(false);

    useEffect(()=>{
        if(arrowRef.current && hasArrow === true){
            if(statusHover === true)
            {
                TweenMax.to(arrowRef.current, 0.2, { autoAlpha: 0, x: 5})
                TweenMax.to(textRef.current, 0.2, { x: 15 } )
            }else{
                TweenMax.to(textRef.current, 0.2,  { x: 0 } )
                TweenMax.to(arrowRef.current, 0.2, { autoAlpha: 1, x: -5})
            }
        }
    },[statusHover])
    

    return (<>

        <button onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} className={`btn ${statusHover ? "hover":""}`} type="button" onClick={cb}> 
            <p ref={textRef}>{children}</p>
           { hasArrow === true ? <img ref={arrowRef} src={imgArrow}/> : <></> }
        </button>

        <style jsx>{`

            button{
                color:${color};
                text-transform: uppercase;
                background-color: ${background};
                height: ${height + "px"};
                min-width: 50px;
                width: ${width === "auto" ? "auto" : width + "px"};
                display: flex;
                align-items: center;
                font-family: "Montserrat-BlackItalic";
                border: none;
                padding: 0 ${padding+"px"};
                font-size: 18px;
                line-height: 18px;
                outline: none;
                cursor: pointer;
                position: relative;
                transition: 0.3s;
                
            }

            img{
                width: 12px;
                height: 15px;
                margin-left: 30px;
            }

            button::after{
                position: absolute;
                content: "";
                height: 100%;
                top: 0;
                left: 100%;
                border-bottom: ${height + "px solid transparent"};
                border-top: 0px solid transparent;
                border-left: 10px solid ${background};
            }

            button::before{
                position: absolute;
                content: "";
                width: 20px;
                height: 100%;
                top: 0;
                right: 100%;
                border-bottom: 0px solid transparent;
                border-top: ${height + "px solid transparent"};
                border-right: 10px solid ${background};
            }
            .hover{
                transition: 0.3s;
            }
            @media screen and (max-width: 1366px)  and (min-width: 1026px){
                button{
                    text-transform: uppercase;
                    padding: 10px;
                    font-size: 16px;
                    line-height: 16px;
                    height : 40px;
                }
                button::after{
                    border-bottom: ${40 + "px solid transparent"};
                }

                button::before{
                    border-top: ${40 + "px solid transparent"};
                }
            }
            @media screen and (max-width: 1025px) and (min-width: 769px){
                button{
                    text-transform: uppercase;
                    padding: 5px;
                    font-size: 15px;
                    line-height: 15px;
                    height : 35px;
                }
                button::after{
                    border-bottom: ${35 + "px solid transparent"};
                }

                button::before{
                    border-top: ${35 + "px solid transparent"};
                }
            }
            @media screen and ( max-width : 768px) and (min-width: 600px){
                button{
                    min-width: 30px;
                    padding: 10px;
                    font-size: 12px;
                    line-height: 10px;
                    height : 30px;
                }
                img{
                    width: 11px;
                    height: 12px;
                }
                button::after{
                    border-bottom: ${30 + "px solid transparent"};
                }

                button::before{
                    border-top: ${30 + "px solid transparent"};
                }
            }
            
        `}</style>
    </>   
    )

}