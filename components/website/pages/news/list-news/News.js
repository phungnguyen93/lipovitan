import React, { useContext } from "react";
import NewsArticle from "components/website/pages/news/list-news/NewsArticle";

function News(props) {
  // const { data } = useContext(NewsContext);
  // console.log("NEW",props.data);
  return (
    <>
      <style jsx>{`
        .AllNews {
          display: grid;
          grid-template-columns: calc(50% - 4vw) 25% 25%;
          column-gap: 2vw;
        }

        @media only screen and (max-width: 768px) {
          .AllNews {
            display: block;
          }

        }
      `}</style>
      <div className="AllNews">
        {props.data
          ? props.data.map((value, index) => <NewsArticle data={value} key={index} />)
          : "Loading"}
      </div>
    </>
  );
}

export default News;
