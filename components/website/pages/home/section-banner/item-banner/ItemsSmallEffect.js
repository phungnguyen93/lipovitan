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
    ani="ani",
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
    
    return (
      <div className={"itemEffect "+ani} ref={ref}  style={style}>
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
        }
        .itemEffect.ani{
            animation: floating 3.5s ease-in-out infinite;
            animation-delay: ${timeShow+"s"};
            animation-duration: (random(6) + 3) * 0.5s;
        }
        
        span{
            position: absolute;
            text-align: center;
            left : 50%;
            top: 50%;
            z-index: 1;
            transform: translate(-50%, -50%);
        }
        @keyframes floating {
          0% {
            transform: translatey(0px);
          }
          50% {
            transform: translatey(-20px);
          }
          100% {
            transform: translatey(0px);
          }
        }
        `}</style>
    </div>
    )
}