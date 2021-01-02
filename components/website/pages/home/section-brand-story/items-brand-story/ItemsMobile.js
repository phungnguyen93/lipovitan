import { useCallback, useState, useEffect, useRef } from 'react'
// import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import asset from "plugins/assets/asset";
import { TweenMax, TimelineLite } from 'gsap';

// const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
// const trans1 = (x, y) => `translate3d(${x / 50}px,${y / 50}px,0)`;

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
    descriptionLeft,
    descriptionRight,
    descriptionTop,
    descriptionStyle,
    yearStyle,
    
}){

    // const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }));

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

    useEffect(()=>{
        // if(statusShow===true){
        //   TweenMax.fromTo(
        //     [scaleRef.current],
        //     timeShow + 0.6 + timeRandom + getRandomIntInclusive(0.5, 0.9),
        //     { y: -10 },
        //     { y: 10, repeat: -1, yoyo: true }
        //   );
        // }
      },[statusShow])
  
      function getRandomIntInclusive(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
      }

    // useEffect(()=>{
    //     if(statusShow===true){
    //         // console.log("show ", statusShow)
    //     }
    // },[statusShow]);

    return (<>

        <div className="itemEffect itemBrandStory mobile" ref={ref} style={style}>
            <div className="contentEffect" ref={scaleRef}>

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
                    bottom : ${descriptionBottom ? descriptionBottom + "%" : "unset"};
                    text-align: center;
                    line-height: 1.4;
                    right : ${descriptionRight ? descriptionRight + "%" : "unset"};
                    left : ${descriptionLeft ? descriptionLeft + "%" : "unset"};
                    top : ${descriptionTop ? descriptionTop + "%" : "unset"};
                    padding-left:15px;
                    padding-right: 15px;
                }

                .contentEffect{
                    width: 100%;
                    height: 100%;
                }
                @media screen and (max-width: 1024px) {
                
                    .year{
                        font-size: 3vmax;
                        left: 10%;
                    }
                    .description {
                        font-size: 1vmax;
                        i {
                            font-size: 1.5vmax;
                        }
                    }
                }
                @media screen and (max-width: 767px) {
                
                    .year{
                        font-size: 3vmax;
                        left: 0;
                    }
                    .description {
                        font-size: 1.8vmax;
                        i {
                            font-size: 2.5vmax;
                        }
                    }
                }
            `}</style>
        </div>
    </>)
}