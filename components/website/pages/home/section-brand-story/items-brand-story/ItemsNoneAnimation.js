import { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer';
import asset from "plugins/assets/asset";

export default function ItemBrandStory ({
    urlImage=asset("/images/item-brand-story-1962.png"),
    year,
    timeShow=0.5,
    description,
    height,
    width,
    top,
    bottom,
    left,
    right,
    children,
    style,
    descriptionBottom,
    descriptionStyle,
    yearStyle,
    animation = false,
}){

    const [statusShow, setStatusShow] = useState(false);
   
    const scaleRef = useRef();
    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: 0,
    });

    useEffect(()=>{
        if(inView === true && animation === true ){
       
        setStatusShow(true);
        }
        if(inView === false && animation === true ){

        setStatusShow(false);
        
        }
    },[inView]);

    useEffect(()=>{
        if(statusShow===true){
            // console.log("show ", statusShow)
        }
    },[statusShow]);

    return (<>
        <div className="itemEffect itemBrandStory" ref={ref} style={style}>
            <div className="contentEffect">

                {year ? <i style={yearStyle} className="year">{year}</i> : <></>} 
                <img src={urlImage} className="imageItem" />
                <h4 style={descriptionStyle} className="description">
                    {description ? description : <></>}
                    {children}
                </h4>

            </div>
            <style jsx>{`
                .itemBrandStory{
                    z-index:2;
                }
                .itemEffect{
                    position : absolute;
                    width:${width ? width + "%" : "unset"};
                    top : ${top ? top + "%" : "unset"};
                    bottom : ${bottom ? bottom + "%" : "unset"};
                    right : ${right ? right + "%" : "unset"};
                    left : ${left ? left + "%" : "unset"};
                    height: ${height ? height + "%" : "auto"};
                }

                .year{
                    font-family: "Montserrat-ExtraBold";
                    font-size : 40px;
                    color: #004FC5;
                    position: absolute;
                    z-index: 3;
                    text-align: right;
                    width: 100%;
                    line-height: 40px;
                }

                .description{
                    position: absolute;
                    width: 100%;
                    font-size:16px;
                    z-index: 3;
                    bottom : ${descriptionBottom ? descriptionBottom + "%" : "10%"};
                    text-align: center;
                    line-height: 1.4;
                }
                .contentEffect{
                    width: 100%;
                    height: 100%;
                }
            `}</style>
        </div>
    </>)
}