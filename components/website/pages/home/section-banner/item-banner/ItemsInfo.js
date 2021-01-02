import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { TweenMax, TimelineLite } from "gsap";
import asset from "plugins/assets/asset";

export default function ItemInfo({
  urlImage = asset("/images/public/images/bg-item-our-df-white.png"),
  name,
  timeShow = 0.5,
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
  nameStyle,
}) {
  const [statusShow, setStatusShow] = useState(false);
  const timeRandom = Math.random();
  const scaleRef = useRef();
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    if (inView === true) {
      TweenMax.to(scaleRef.current, timeShow, { scale: 1, autoAlpha: 1 });
      //setStatusShow(true);
    }
    if (inView === false) {
      TweenMax.to(scaleRef.current, 0.2, { scale: 0.4, autoAlpha: 0 });
      //setStatusShow(false);
    }
  }, [inView]);

  useEffect(() => {
    if (statusShow === true) {
      TweenMax.fromTo(
        [scaleRef.current],
        timeShow + 0.6 + timeRandom + getRandomIntInclusive(0.5, 0.9),
        { y: -10 },
        { y: 10, repeat: -1, yoyo: true }
      );
    }
  }, [statusShow]);

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

  return (
    <>
      <div className="itemEffect itemBrandStory" ref={ref} style={style}>
        <div className="contentEffect" ref={scaleRef}>
          <h3 style={nameStyle} className="name">
            {children}
          </h3>
          <img src={urlImage} className="imageItem" />
        </div>

        <style jsx>{`
          .itemBrandStory {
            z-index: 2;
          }
          .itemEffect {
            position: absolute;
            width: ${width ? width + "%" : "unset"};
            top: ${top ? top + "%" : "unset"};
            bottom: ${bottom ? bottom + "%" : "unset"};
            right: ${right ? right + "%" : "unset"};
            left: ${left ? left + "%" : "unset"};
            height: ${height ? height + "%" : "auto"};
          }

          .name {
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: "Montserrat-ExtraBold";
            font-size: 14px;
            color: #ed1c24;
            position: absolute;
            z-index: 3;

            text-align: center;
            padding-top: 20px;
            text-transform: unset;
            top: 55%;
            left: 50%;
            transform: translate(-50%, -50%);
            letter-spacing: 2px;
            text-transform: uppercase;
            text-shadow: -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff;
          }

          .description {
            position: absolute;
            width: 100%;
            font-size: 16px;
            z-index: 3;
            bottom: ${descriptionBottom ? descriptionBottom + "%" : "10%"};
            text-align: center;
            line-height: 1.4;
          }

          .contentEffect {
            width: 100%;
            height: 100%;
          }

          @media only screen and (max-width: 520px) {
            
            .name {
              font-size: 12px;
              text-shadow: rgb(255, 255, 255) 1px 0px 0px, rgb(255, 255, 255) 0.540302px 0.841471px 0px, rgb(255, 255, 255) -0.416147px 0.909297px 0px, rgb(255, 255, 255) -0.989992px 0.14112px 0px, rgb(255, 255, 255) -0.653644px -0.756802px 0px, rgb(255, 255, 255) 0.283662px -0.958924px 0px, rgb(255, 255, 255) 0.96017px -0.279415px 0px;
            }

          }
          @media only screen and (max-width: 375px) {
            .name {
              font-size: 10px;
            }
          }
        `}</style>
      </div>
    </>
  );
}
