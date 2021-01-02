import { useState, useEffect, useContext, useRef } from "react";
import { MainContent } from "components/website/contexts/MainContent";
import asset from "plugins/assets/asset";
// import gsap from "gsap";
import { TweenMax, TimelineLite } from "gsap";
export default function Language() {
  const valueLanguageContext = useContext(MainContent);
  // const [value, setValue] = useState("");
  const [statusOpen, setStatusOpen] = useState(false);

  const listLanguageRef = useRef();

  const setValues = (e) => {
    setStatusOpen(!statusOpen);
    valueLanguageContext.setLanguage(e.target.innerText.toLowerCase());
  };

  useEffect(() => {
    if (listLanguageRef.current) {
      // console.log(valueLanguageContext.dataLanguage)
      TweenMax.to(listLanguageRef.current, 0.1, {
        y: 10,
        autoAlpha: 0,
        zIndex: 0,
      });
    }
  }, []);

  useEffect(() => {
    statusOpen
      ? TweenMax.to(listLanguageRef.current, 0.3, {
          y: 10,
          autoAlpha: 1,
          zIndex: 2,
        })
      : TweenMax.to(listLanguageRef.current, 0.3, { y: 0, autoAlpha: 0 });
  }, [statusOpen]);

  const setStatus = () => setStatusOpen(!statusOpen);

  return (
    <li className="languageContent">
      <div onClick={setStatus}>
        {
          valueLanguageContext.dataLanguage 
          ? (
            <img
            className={"flatLanguage"}
            src={asset(valueLanguageContext.dataLanguage.flag)}
          />)
          : ( 
          <img
            className={"flatLanguage"}
            src={asset("/images/language-en.png")}
          />)
        }
       
        <span> {valueLanguageContext.languageCurrent || ""} </span>
        <img className="arrow" src={asset("/images/arrow-down.png")} />
      </div>
      <ul ref={listLanguageRef} className="listLanguage">
        {valueLanguageContext.listNameLanguage.map((value, index) => (
          <div key={index} className={"itemsLanguage"}>
            <img
              className={"flatLanguage"}
              src={asset(valueLanguageContext.listFlags[index])}
            />
            {/* {value} */}
            <span onClick={setValues}>{value}</span>
          </div>
        ))}
      </ul>
      <style jsx>{`
        .itemsLanguage{
          position: relative;
          
        }
        .itemsLanguage span::after{
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            left : 0;
            top: 0;
          }
        .flatLanguage {
          width: 30px;
          height: 30px;
        }
        .listLanguage {
          background: linear-gradient(
            160.19deg,
            #004ab9 0%,
            #004dc1 36.87%,
            #0066ff 99.47%
          );
          padding: 10px;
          div {
            padding: 10px 10px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            text-transform: uppercase;
            
          }
          img {
            margin-right: 10px;
          }
        }
        .languageContent {
          padding: 0 20px;
          font-size: 0.8vmax;
          color: #fff;
          position: relative;
          cursor: pointer;
          ul {
            position: absolute;
            flex-direction: column;
            width: 100%;
            left: 0;
          }
        }
        .languageContent > div {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            padding: 0 10px;
            text-transform: uppercase;
          }
        }
        .arrow {
          width: 17px;
          height: 11px;
        }
        @media screen and (max-width: 767px) {
          .flatLanguage {
            width: 24px;
            height: 24px;
          }
          .languageContent {
            font-size: 12px;
          }
          .arrow {
            width: 10px;
            height: 6px;
          }
        }
      `}</style>
    </li>
  );
}
