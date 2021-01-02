import { useState, useEffect, useRef } from "react";
import { useInView } from 'react-intersection-observer';
import { TweenMax, TimelineLite } from 'gsap';
import asset from "plugins/assets/asset";
export default function Scale({
    srcImage=asset("/images/3-lon.png"),
    timeShow=0.5,
    width,
    top,
    bottom,
    left,
    right,
    children,
    style,
}) {

  const scaleRef = useRef();
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(()=>{
    if(inView === true){
      TweenMax.to(scaleRef.current, 0.5, { x: 0, scale : 1, autoAlpha: 1})
    }
    if(inView === false){
      TweenMax.to(scaleRef.current, 0.2, {x: 30, scale : 0.7, autoAlpha: 0}) 
    }
  },[inView]);
    
    return (
      <div ref={ref} style={style}>
      <img ref={scaleRef}  style={{width: "100%",height :"auto",}} 
        src={srcImage}/>
      <style jsx>{`
        div{
            position : absolute;
            width:${width ? width + "%" : "unset"};
            top : ${top ? top + "%" : "unset"};
            bottom : ${bottom ? bottom + "%" : "unset"};
            right : ${right ? right + "%" : "unset"};
            left : ${left ? left + "%" : "unset"};
        }
        `}
      </style>
    </div>
    )
}