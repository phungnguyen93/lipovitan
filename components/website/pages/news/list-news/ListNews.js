import asset from "plugins/assets/asset";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import News from "components/website/pages/news/list-news/News";
import { Pagination } from "antd";
import {MainContent} from "components/website/contexts/MainContent";
import useWindowSize from "components/website/hooks/useWindowsSize";
import Axios from "axios";
import Console from "plugins/utils/Console";
import { Row, Wrapper } from "components/website/pages/news/NewsElements";

export const ListNews = (props, title) => {

  const valueLanguageContext =  useContext(MainContent);

  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(3);

  const [currentPosts, setCurrentPosts] = useState()

  // const [indexOfLastPost, setIndexOfLastPost] = useState();
  //  const [indexOfFirstPost, setIndexOfFirstPost] = useState();

  const [total, setTotal] = useState();

  useEffect(() => {

    callAPI(

      props.linkData,
      setPosts

    )
   
  }, [props.linkData]);

  const callAPI = async (url, callbackFn)=>{

    let config = {
      headers: {
          'X-localization': valueLanguageContext.languageCurrent,
      }
    }
    
    await Axios
         .get(`${url}`, config)
         .then((response) => callbackFn(response.data))
         .catch((error) => console.log(error));
  }

   // Get current posts
   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;

  useEffect(() => {

    if(posts){

      // console.log(posts)
      // const indexOfLastPost = currentPage * postsPerPage;
      // const indexOfFirstPost = indexOfLastPost - postsPerPage;
      
      setTotal(posts.data.total)
      setCurrentPosts(posts.data.list);

    }

  }, [posts]);

  useEffect(() => {

    // console.log(props.linkData)
    callAPI(props.linkData,
      setPosts
    )

  }, [valueLanguageContext]);

  // Change page
  const paginate = (pageNumber) =>{
   
    callAPI(`${props.linkData}&page=${pageNumber}`,
      setPosts
    )

    setCurrentPage(pageNumber);

  } ;
 
  // detect screen size
  const [responsiveMaxScreen, setResponsiveMaxScreen] = useState(false);

  const windowSize = useWindowSize();
  //check responsive
  useEffect(() => {
    if (windowSize.width > 768) {
      setResponsiveMaxScreen(true);
    } else {
      setResponsiveMaxScreen(false);
    }
  }, [windowSize]);
  return (
    <>
    {
      posts
      ? <>
         <div className={"NewsInfo"}>
            {
              posts.data.list.length !== 0
              ? <h2 style={{color: props.color}}><i>{props.title}</i></h2> 
              : <></>
            }
            {
              responsiveMaxScreen === true 
              ? (
                <div className={'WrapPaging'}>
                  {
                    posts.data.pages > 1 ? 
                        (<Pagination
                          defaultCurrent={posts.data.currentPage}
                          total={posts.data.total}
                          defaultPageSize={props.limitData || 3 }
                          onChange={paginate}
                        />)
                    : <></>
                  }
                </div>
              )
              :<></>
            }
            
          </div>
      </>
      :<> <span>Loading...</span></>
    }

    {
      currentPosts 
      ? <News data={currentPosts}></News>
      : <h2 style={{color: props.color}}>None Posts</h2> 
    }
      
      {/* <div className={"NewsInfo"}>
        <h2 style={{color: props.color}}>{props.title}</h2>
          {
            responsiveMaxScreen === true ? <div className={'WrapPaging'}>
            {
              posts ? (
                <Pagination
                  defaultCurrent={0}
                  total={ posts ? posts.data.list.length : 1}
                  onChange={paginate}
                />
              ) : <>
                <span>Loading...</span>
              </>
            }
            </div> : ""
          }
        
      </div> */}
      {/* <News data={currentPosts ? currentPosts : []}></News> */}
      {
        responsiveMaxScreen === false ? <div className={'WrapPaging'}>
          {
            posts ? (<>
                {
                  posts.data.pages > 1 ? 
                      (<Pagination
                        defaultCurrent={posts.data.currentPage}
                        total={posts.data.total}
                        defaultPageSize={props.limitData || 3 }
                        onChange={paginate}
                      />)
                  : <></>
                }
            </>
            ) : <>
              <span>Loading...</span>
            </>
          }
        </div> : ""
      }
      <style jsx>{`
        h2 {
          font-family: "Montserrat-BlackItalic";
          text-transform: uppercase;
          font-size: 3vmax;
          i{
            font-family: "Montserrat-BlackItalic";
          }
        }

        .NewsInfo {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .ant-pagination {

        }
      `}</style>
    </>
  );
};
