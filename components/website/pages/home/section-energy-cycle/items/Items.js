import { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer';
import { TweenMax, TimelineLite } from 'gsap';
import asset from "plugins/assets/asset";

export default function ItemOurDff ({
    urlImage=asset("/images/public/images/bg-item-our-df-white.png"),
    name,
    timeShow=0.5,
    height,
    width,
    top,
    bottom,
    left,
    right,
    children,
    style,
    description,
    descriptionKey="Vitamin B6 is the key to convert proteins into fuel for the energy cycle",
    descriptionBottom,
    descriptionStyle,
    nameStyle,
    animation = false,
    nameAnimation,
}){

    const [statusShow, setStatusShow] = useState(false);
    const [animationState, setNameAnimation] = useState(nameAnimation ? nameAnimation : "");

    const timeRandom = getRandomIntInclusive(0.5, 0.9);

    const scaleRef = useRef();

    const { ref, inView, entry } = useInView({
      /* Optional options */
      threshold: 0,
    });
  
    const setAnimation = (nameAnimation) => {

      switch (key) {
        case value:

          break;
      
        default:

          break;
      }

    }

    useEffect(()=>{

      if(inView === true && animation === true ){

        TweenMax.to(scaleRef.current, timeShow, { scale : 1, autoAlpha: 1});

        setStatusShow(true);

      }

      if(inView === false && animation === true){

        TweenMax.to(scaleRef.current, 0.2, {scale : 0.4, autoAlpha: 0});

        setStatusShow(false);

      }

    },[inView]);
  
    useEffect(()=>{

      if(statusShow===true && animation === true){

        TweenMax.fromTo(

          [scaleRef.current],

          timeShow + 0.6 + timeRandom + getRandomIntInclusive(0.5, 0.9),

          { y: -10 },

          { y: 10, repeat: -1, yoyo: true }

        );

      }

    },[statusShow])

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
    }

    return (<>
        <div className={`itemEffect itemEnergy ${name === "route" ? "route" : name}`} ref={ref} style={style}>

            <div className="contentEffect" ref={scaleRef}>
                <h3 style={nameStyle} className="name">{children}</h3>
                <img src={urlImage} className="imageItem"/>
                {name === "key" ? <span className={"descriptionKeyHover"}></span> : <></>}
                {name === "key" ? <span className={"descriptionKey"}>{descriptionKey}</span> : <></>}
            </div>

            <style jsx>{`
                .descriptionKey{
                  opacity : 0;
                  z-index : -1;
                  position: relative;
                  display : flex;
                  justify-content: center;
                  padding: 10px 5px;
                  align-items: center;
                  background-color: #E1F4FF;
                  color: #757575;
                  text-align: center;
                  font-size: 11px;
                  line-height: 1.5;
                  max-width: 200px;
                  min-height: 80px;
                  width : 100%;
                  transform: translate(0%, -42%);
                  z-index: 9;
                  top: 20px;
                  &::after{
                    content: "";
                    position :absolute;
                    left: 0;
                    top: 100%;
                    border-bottom: 10px solid transparent;
                    border-top: 0px solid transparent;
                    border-left: 5px solid #E1F4FF;
                  }
                }
                .descriptionKeyHover{
                  width: 50%;
                  height: 100%;
                  top: 84%;
                  z-index: 3;
                }
                .descriptionKeyHover:hover ~ .descriptionKey{
                    transition : 0.3s;
                    z-index : 1;
                    opacity : 1;
                    top: 0;
                }

                .itemEnergy{
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
                .name{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: "Montserrat-ExtraBold";
                    font-size : 28px;
                    color: #ED1C24;
                    position: absolute;
                    z-index: 3;
                   
                    text-align: center;
                    padding: 10px 20px;
                    padding-top: 20px;
                    line-height: 42px;
                    text-transform: unset;
                    top: 55%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    letter-spacing: 2px;
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
                .route img{
                  animation: circle 30s linear infinite;
                }
                @keyframes circle{
                  0%{
                    transform:rotate(0deg)
                  }
                  100%{
                    transform:rotate(360deg)
                            
                  }
                }
                @media only screen and (max-width: 1024px) {
                  .descriptionKey, .descriptionKeyHover {
                    display: none;
                  }
                 }
            `}</style>
        </div>
    </>)
}