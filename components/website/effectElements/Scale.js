import { useState, useEffect, useRef } from "react";
import { useInView } from 'react-intersection-observer';
import { TweenMax, TimelineLite } from 'gsap';
export default function Scale({
    children,
    style,
}) {

    const scaleRef = useRef();
    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: 0,
      });
    
      useEffect(()=>{
        if( inView === true){
          console.log("in views");
          TweenMax.to(scaleRef.current, 0.3, {scale : 1}) 
        }
        if( inView === false){
          console.log("not in views");
          TweenMax.to(scaleRef.current, 0.2, {scale : 1.2}) 
        }
      },[inView])
    
    return (
        <div className="scaleEffect" ref={ref} ref={scaleRef} style={style}>
            {children}
        </div>
    )
}