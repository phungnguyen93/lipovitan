import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { TweenMax, TimelineLite } from "gsap";
import asset from "plugins/assets/asset";

export default function ItemOurDff({
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
            font-size: 28px;
            color: #ed1c24;
            position: absolute;
            z-index: 3;

            text-align: center;
            padding-top: 20px;
            line-height: 42px;
            text-transform: unset;
            top: 55%;
            left: 50%;
            transform: translate(-50%, -50%);
            letter-spacing: 2px;
            text-transform: uppercase;
            text-shadow: rgb(255, 255, 255) 3px 0px 0px, rgb(255, 255, 255) 2.83487px 0.981584px 0px, rgb(255, 255, 255) 2.35766px 1.85511px 0px, rgb(255, 255, 255) 1.62091px 2.52441px 0px, rgb(255, 255, 255) 0.705713px 2.91581px 0px, rgb(255, 255, 255) -0.287171px 2.98622px 0px, rgb(255, 255, 255) -1.24844px 2.72789px 0px, rgb(255, 255, 255) -2.07227px 2.16926px 0px, rgb(255, 255, 255) -2.66798px 1.37182px 0px, rgb(255, 255, 255) -2.96998px 0.42336px 0px, rgb(255, 255, 255) -2.94502px -0.571704px 0px, rgb(255, 255, 255) -2.59586px -1.50383px 0px, rgb(255, 255, 255) -1.96093px -2.27041px 0px, rgb(255, 255, 255) -1.11013px -2.78704px 0px, rgb(255, 255, 255) -0.137119px -2.99686px 0px, rgb(255, 255, 255) 0.850987px -2.87677px 0px, rgb(255, 255, 255) 1.74541px -2.43999px 0px, rgb(255, 255, 255) 2.44769px -1.73459px 0px, rgb(255, 255, 255) 2.88051px -0.838247px 0px;
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

          @media screen and (max-width: 1439px)  and (min-width: 1300px){
            .name {
              text-shadow: rgb(255, 255, 255) 2px 0px 0px, rgb(255, 255, 255) 1.75517px 0.958851px 0px, rgb(255, 255, 255) 1.0806px 1.68294px 0px, rgb(255, 255, 255) 0.141474px 1.99499px 0px, rgb(255, 255, 255) -0.832294px 1.81859px 0px, rgb(255, 255, 255) -1.60229px 1.19694px 0px, rgb(255, 255, 255) -1.97998px 0.28224px 0px, rgb(255, 255, 255) -1.87291px -0.701566px 0px, rgb(255, 255, 255) -1.30729px -1.5136px 0px, rgb(255, 255, 255) -0.421592px -1.95506px 0px, rgb(255, 255, 255) 0.567324px -1.91785px 0px, rgb(255, 255, 255) 1.41734px -1.41108px 0px, rgb(255, 255, 255) 1.92034px -0.558831px 0px;
            }
          }

          @media screen and (max-width: 1300px)  and (min-width: 1026px){
            .name {
              font-size: 19px;
              line-height: 1.2;
              margin-top: -10px;
              text-shadow: rgb(255, 255, 255) 1px 0px 0px, rgb(255, 255, 255) 0.540302px 0.841471px 0px, rgb(255, 255, 255) -0.416147px 0.909297px 0px, rgb(255, 255, 255) -0.989992px 0.14112px 0px, rgb(255, 255, 255) -0.653644px -0.756802px 0px, rgb(255, 255, 255) 0.283662px -0.958924px 0px, rgb(255, 255, 255) 0.96017px -0.279415px 0px;
            }
          }

          @media only screen and (max-width: 1024px) {
            .name {
              font-size: 1.6vmax;
              line-height: 1.2;
              text-shadow: rgb(255, 255, 255) 1px 0px 0px, rgb(255, 255, 255) 0.540302px 0.841471px 0px, rgb(255, 255, 255) -0.416147px 0.909297px 0px, rgb(255, 255, 255) -0.989992px 0.14112px 0px, rgb(255, 255, 255) -0.653644px -0.756802px 0px, rgb(255, 255, 255) 0.283662px -0.958924px 0px, rgb(255, 255, 255) 0.96017px -0.279415px 0px;
            }
          }
          @media only screen and (max-width: 520px) {
            .name {
              font-size: 2vmax;
            }
          }
          @media only screen and (max-width: 345px) {
            .name {
              font-size: 1.7vmax;
            }
          }
        `}</style>
      </div>
    </>
  );
}
