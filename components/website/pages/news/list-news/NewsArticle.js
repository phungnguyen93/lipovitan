import CONFIG from "web.config";
import Link from "next/link";
import asset from "plugins/assets/asset";
import Button from "components/website/button/Button";

import { useState, useEffect, useContext, useRef } from "react";
import { MainContent } from "components/website/contexts/MainContent";

function NewsArticle({ data }) {

  const Language = {
    en: {
      nameBtn: "Readmore",
    },
    vi: {
      nameBtn: "Xem thêm",
    }
  }

  let date = data.createdAt.toString();

  let dateCover = "";

  for (let i = 0; i < date.length; i++) {
    if (date[i] !== " ") {
      dateCover += date[i].toString();
    } else {
      break;
    }
  }

  const valueLanguageContext = useContext(MainContent);

  const handleScroll = (e) => {
    document.getElementById("__next").scrollTo(0,0);
  }

  // console.log(dateCover);

  return (
    <>
      {" "}

      {
        data ? (

          <div className="News">
            <p className="Thumb">
              <img src={data.image} alt={data.metaImage ? data.metaImage : ""} />
            </p>
            <h2 className="Title"><i>{data.title}</i></h2>
            <p className="Date"><i>{dateCover}</i></p>
            <p className="Desc"><i>{data.shortDescription}</i></p>
            <p className="Link" onClick={handleScroll}>
              <i>
                <Link href={`/news/${data.slug}`}>
                  { Language[`${valueLanguageContext.languageCurrent}`].nameBtn.toString() }
                </Link>
              </i>
            </p>
          </div>

        ) : (

          <span>Loading... </span>

      )}

      <style jsx>{`
        .News {
          background: #fff;
          padding: 20px 20px 40px 20px;
          position: relative;
          transition: all 0.5s ease-in-out;
          &:hover {
            box-shadow: 5px 10px 20px rgba($color: #0345a6, $alpha: 0.4);
          }
        }
        .Thumb {
          height: 30vh;
          margin: -20px -20px 20px -20px;
          > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .Title {
          font-family: "Montserrat-BoldItalic";
          color: #0345a6;
          text-transform: uppercase;
          font-size: 1.2vmax;
          margin-bottom: 10px;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .Date {
          background: #e2e2e2;
          font-family: "Montserrat-BoldItalic";
          font-size: 0.8vmax;
          line-height: 2;
          padding: 0 15px;
          display: inline-block;
          color: #757575;
          margin-bottom: 10px;
        }
        .Desc {
          font-family: "Montserrat-Italic";
          font-size: 1vmax;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 20px;
          color: #757575;
        }
        .Link {
          font-family: "Montserrat-BoldItalic";
          position: absolute;
          left: 20px;
          bottom: 20px;
          text-transform: uppercase;
          font-size: 1vmax;
          text-decoration: underline;
          a {
            color: #004fc5;
            transition: all 0.3s ease-in-out;
            &:hover {
              color: #0345a6;
              text-shadow: 0 10px 10px rgba($color: #0345a6, $alpha: 0.5);
            }
          }
        }
        @media only screen and (max-width: 1024px) {
          .Title {
            font-size: 2vmax;
            margin-bottom: 10px;
          }
          .Date {
            font-size: 1vmax;
          }
          .Desc {
            font-size: 1.1vmax;
          }
          .Link {
            font-size: 1.2vmax;
          }
        }
        @media only screen and (max-width: 768px) {
          .News {
            margin-bottom: 30px;
          }
          .Title {
            font-size: 2.5vmax;
            margin-bottom: 10px;
          }
          .Date {
            font-size: 1.5vmax;
          }
          .Desc {
            font-size: 1.8vmax;
          }
          .Link {
            font-size: 2vmax;
          }
        }
        @media screen and (max-width: 767px) {
          .Thumb {
            height: 20vh;
            margin: -20px -20px 20px -20px;
            > img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          .News {
            margin-bottom: 20px;
          }
          .Title {
            font-size: 2vmax;
            margin-bottom: 10px;
          }
          .Date {
            font-size: 1.5vmax;
          }
          .Desc {
            font-size: 1.4vmax;
          }
          .Link {
            font-size: 1.6vmax;
          }
        }
      `}</style>
    </>
  );
}

export default NewsArticle;
