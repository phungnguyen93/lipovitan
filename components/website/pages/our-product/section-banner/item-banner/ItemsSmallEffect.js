import { useState, useEffect, useRef } from "react";
import { useInView } from 'react-intersection-observer';
import { TweenMax, TimelineLite } from 'gsap';
import asset from "plugins/assets/asset";
export default function EffectItemSmall({
    text="B6",
    srcImage=asset("/images/effect-small-item-b6.png"),
    timeShow=0.5,
    width,
    top,
    bottom,
    left,
    right,
    children,
    style,
    className
}) {

  const [statusShow, setStatusShow] = useState(false);
  const timeRandom = Math.random()
  const scaleRef = useRef();
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(()=>{
    if(inView === true){
      TweenMax.to(scaleRef.current, timeShow, { scale : 1, autoAlpha: 1});
      setStatusShow(true);
    }
    if(inView === false){
      TweenMax.to(scaleRef.current, 0.2, {scale : 0.4, autoAlpha: 0});
      setStatusShow(false);
    }
  },[inView]);

  // useEffect(()=>{
  //   if(statusShow===true){
  //     TweenMax.fromTo(
  //       [scaleRef.current],
  //       timeShow + 0.5 + timeRandom + Math.random(),
  //       { y: -10 },
  //       { y: 10, repeat: -1, yoyo: true }
  //     );
  //   }
  // },[statusShow])
  const classNames = ['itemEffect', className].join(" ");

  
    return (
      <div className={classNames} ref={ref}  style={style}>
        <div ref={scaleRef}>
            {children}
            <img  style={{width: "100%",height :"auto"}} 
                src={srcImage}/>
        </div>
        <style jsx>{`
        .itemEffect{
            position : absolute;
            width:${width ? width + "%" : "unset"};
            top : ${top ? top + "%" : "unset"};
            bottom : ${bottom ? bottom + "%" : "unset"};
            right : ${right ? right + "%" : "unset"};
            left : ${left ? left + "%" : "unset"};
            animation: floating 4s ease-in-out infinite;
            animation-delay: ${1 + timeShow +"s"};
        }
        span{
            position: absolute;
            text-align: center;
            left : 50%;
            top: 50%;
            z-index: 1;
            transform: translate(-50%, -50%);
        }

        @media screen and (max-width: 768px) {
              /*.LonLipo{
                  width: 100% ;
                  bottom: 0;
                  top: auto;
                  right: 10%;
              }
              .ItemHoney{
                  width: 20% ;
                  right: 5%;
              }
              .ItemB3{
                  width: 10% ;
              }*/
          }
        @keyframes floating {
          0% {
            transform: translatey(0px);
          }
          50% {
            transform: translatey(-25px);
          }
          100% {
            transform: translatey(0px);
          }
        }
        `}</style>
    </div>
    )
}