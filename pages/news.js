import CONFIG from "web.config";
import MasterPage from "components/website/master/MasterPage";
import { useRouter } from "next/router";
import Header from "components/website/elements/Header";
import { BS } from "components/diginext/elements/Splitters";
import Footer from "components/website/elements/Footer";
import { ListNews } from "components/website/pages/news/list-news/ListNews";
import asset from "plugins/assets/asset";
import { Row, Wrapper } from "components/website/pages/news/NewsElements";
import Axios from "axios";
import { Input } from "components/website/forms/Input";
import { Menu, Dropdown, Button, message, Tooltip } from "antd";
import { useNextResponsive } from "plugins/next-reponsive";
import { MainContent } from "components/website/contexts/MainContent";
import { useEffect, useRef, useState, useContext } from "react";
import useWindowSize from "components/website/hooks/useWindowsSize";
import ButtonCustom from "components/website/button/Button";

import { DatePicker, Space } from "antd";
import Link from "next/link";

export async function getServerSideProps(context) {
  // const params = context.params;
  // const query = context.query;
  // context.req.session ,
  // context.res
  // console.log(context.query);
  //
  console.log("SERVER CODE");

  // var json = { data: [1, 2, 3, 4, 5] };

  return {
    props: {
      // params
    },
  };
}

export default function PageNews(props) {
  // if (typeof window == "undefined") {
  //   console.log("This code is on server-side");
  // }

  const Language = {
    en: {
      name: "en",
      title: "NEWS",
      nameFilterDate: "Date",
      nameFilterOrder: "Sort by",
      orderByList: [
        { name: "Top", value: -1 },
        { name: "Down", value: 1 },
      ],
      placeholderSearch: "Enter your keyword",
      nameBtn: "Send",
    },
    vi: {
      name: "vi",
      title: "TIN TỨC",
      nameFilterDate: "Thời gian",
      nameFilterOrder: "Sắp xếp",
      orderByList: [
        { name: "Mới nhất", value: -1 },
        { name: "Cũ nhất", value: 1 },
      ],
      placeholderSearch: "Nhập từ tìm kiếm",
      nameBtn: "TÌM KIẾM",
    },
  };

  const router = useRouter();

  const windowSize = useWindowSize();

  const valueLanguageContext = useContext(MainContent);

  const [dataPageNews, setDataPageNews] = useState();

  const [dataPostCategory, setDataPostCategory] = useState();

  const [valueStartDate, setValueStartDate] = useState("");
  const [valueEndDate, setValueEndDate] = useState("");
  const [valueOrderBy, setValueOrderBy] = useState(-1);
  const [valueSearchSend, setSearchSend] = useState("");
  const [valueSearch, setValueSearch] = useState("");
  const limitData = 3;

  // const [nameOrderBy, setNameOrderBy] = useState();

  const orderByList = [
    { name: "Top", value: -1 },
    { name: "Down", value: 1 },
  ];

  // const [valueTopic, setValueTopic] = useState("");
  // const [valueType, setValueType] = useState("");
  // const [valueSort, setValueSort] =  useState("");

  const datePickerRef = useRef();

  const apiURL = `https://api.lipovitan.zii.vn/api/v1/post-categories?limit=5&page=1`;

  const callAPI = async (url, callbackFn) => {
    let config = {
      headers: {
        "X-localization": valueLanguageContext.languageCurrent,
      },
    };

    await Axios.get(`${url}`, config)
      .then((response) => callbackFn(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    callAPI(apiURL, setDataPostCategory);
  }, [valueLanguageContext]);

  useEffect(() => {
    setDataPageNews(Language[`${valueLanguageContext.languageCurrent}`]);

    callAPI(
      apiURL,

      setDataPostCategory
    );
  }, []);

  const handelSearch = (e) => {
    setValueSearch(valueSearchSend);
    // setSearchSend("");
  };

  useEffect(() => {
    if (valueLanguageContext.languageCurrent) {
      setDataPageNews(Language[`${valueLanguageContext.languageCurrent}`]);
    }
  }, [valueLanguageContext.languageCurrent]);

  // Set data Date
  const onChangeDate = (date, dateString) => {
    if (date) {
      // console.log(date, dateString);

      setValueStartDate(dateString);
      setValueEndDate(dateString);
    }
  };

  const handleOnChange = (value) => {
    setSearchSend(value);
  };

  function handleMenuClick(e) {
    // console.log( e.item.props);
    e.item.props.selectItem(e.item.props.value.value);
  }

  const menu = (value, callBack) => (
    <Menu onClick={handleMenuClick}>
      {value.length === 0 ? (
        <Menu.Item key="1">null</Menu.Item>
      ) : (
        value.map((val, index) => (
          <Menu.Item key={index} value={val} selectItem={callBack}>
            {val.name}
          </Menu.Item>
        ))
      )}
    </Menu>
  );

  const LayoutDesktop = {
    background: `url(${asset(
      "/images/news/bg_top.jpg"
    )}) no-repeat center top/100% auto #F3F3F3`,
    paddingTop: "120px",
  };
  const LayoutMobile = {
    background: `url(${asset(
      "/images/mb/news/banner.jpg"
    )}) no-repeat center top/100% auto #F3F3F3`,
    paddingTop: "80px",
  };

  const [layout, setLayout] = useState(LayoutDesktop);

  return (
    <>
      <MasterPage pageName={"NEWS"}>
        <Header hideButtons></Header>
        <main
          id="newsPage"
          style={windowSize.width < 600 ? LayoutMobile : LayoutDesktop}
        >
          <h2>
            {dataPageNews ? (
              <span>{dataPageNews.title}</span>
            ) : (
              <span>NEWS</span>
            )}
          </h2>
          {/* style={{display:"none"}} */}
          <div className="filter">
            <Wrapper>
              <Row>
                <div className="contentFilter">
                  <div>
                    <div className="contentDate">
                      <p className="date">
                        {valueStartDate
                          ? valueStartDate
                          : dataPageNews
                          ? dataPageNews.nameFilterDate
                          : "Date"}
                      </p>

                      <div>
                        <DatePicker
                          onChange={onChangeDate}
                          format={"DD-MM-YYYY"}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Dropdown
                      overlay={
                        dataPostCategory
                          ? menu(
                              dataPageNews
                                ? dataPageNews.orderByList
                                : orderByList,
                              setValueOrderBy
                            )
                          : menu([])
                      }
                    >
                      <Button>
                        {dataPageNews
                          ? dataPageNews.nameFilterOrder
                          : "Sort by"}
                      </Button>
                    </Dropdown>
                  </div>
                </div>
                <div className={"btnSend"}>
                  <Input
                    handleOutSide={handleOnChange}
                    label=""
                    value=""
                    placeholder={
                      dataPageNews
                        ? dataPageNews.placeholderSearch
                        : "Enter your keyword"
                    }
                    name="keyWord"
                    heightInput={"36px"}
                  />
                  <p onClick={handelSearch}>
                    {dataPageNews ? dataPageNews.nameBtn : "Send"}
                  </p>
                  {/* <ButtonCustom cbFunction={handelSearch}>{ dataPageNews ? dataPageNews.nameBtn : "Send"}</ButtonCustom> */}
                </div>
              </Row>
            </Wrapper>
          </div>

          <Wrapper>
            {dataPostCategory ? (
              dataPostCategory.data.list.map((value, index) => (
                <Row key={index}>
                  <ListNews
                    key={index}
                    title={value.title}
                    color={index === 0 ? "#fff" : "#004FC4"}
                    startDate={valueStartDate}
                    endDate={valueEndDate}
                    valueSearch={valueSearch}
                    orderBy={valueOrderBy}
                    limitData={limitData}
                    // linkData={`https://api.lipovitan.zii.vn/api/v1/posts?postCategory=${value.id}&limit=5&page=1`}
                    linkData={`https://api.lipovitan.zii.vn/api/v1/posts?startDate=${valueStartDate}&endDate=${valueEndDate}&postCategory=${value.id}&order=${valueOrderBy}&title=${valueSearch}&limit=${limitData}`}
                  ></ListNews>
                </Row>
              ))
            ) : (
              <></>
            )}
          </Wrapper>
          <img
            src={asset("/images/news/bg_bottom.jpg")}
            className={"bgBottom"}
          />
        </main>
        <Footer></Footer>
      </MasterPage>

      <style jsx>{`
        .contentDate {
          position: relative;
          p {
            text-transform: uppercase;
            color: #004fc4;
            font-family: "Montserrat-BlackItalic";
            font-size: 14px;
            padding-left: 15%;
          }
          p::after {
            content: "";
            width: 9px;
            height: 10px;
            position: absolute;
            top: 50%;
            left: 70%;
            background-image: url(${asset("/images/arrow-down-blue.png")});
            background-position: center;
            background-repeat: no-repeat;
            background-size: 100%;
            -webkit-transform: translate(0, -50%);
            transform: translate(0, -50%);
            z-index: 1;
          }
        }
        .contentDate > div {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 50%;
          left: 0;
          opacity: 0;
          z-index: 2;
          transform: translate(0, -50%);
        }

        h2 {
          display: flex;
          align-items: baseline;
          justify-content: center;
          &:after,
          &:before {
            content: "";
            width: 5vw;
            height: 8px;
            background: #ed1c24;
            display: inline-block;
          }
          span {
            font-family: "Montserrat-BlackItalic";
            text-transform: uppercase;
            font-size: 5.5vmax;
            color: #fff;
            text-align: center;
            position: relative;
            display: inline-block;
            padding: 0 10px;
          }
        }
        #newsPage {
          position: relative;
        }
        .bgBottom {
          position: absolute;
          width: 100%;
          bottom: 0;
          left: 0;
        }
        .filter {
          width: 100%;
          background-color: rgba(0, 0, 0, 0);
          padding-top: 35px;
        }
        .contentFilter {
          width: 30%;
          position: relative;
          display: flex;
          flex-direction: row;
          align-items: center;

          > div {
            width: 50%;
          }

          &::after {
            content: "";
            z-index: -1;
            background-color: #fff;
            width: 102%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            -webkit-transform: skewX(-5deg);
            transform: skewX(-5deg);
          }
        }
        .btnSend {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          width: 30%;
          text-align: center;

          p {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 45%;
            text-align: center;
            height: 100%;
            color: #fff;
            font-family: "Montserrat-BlackItalic";
            background-image: url(${asset("/images/bg-btn-search-job.png")});
            background-position: center;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            position: relative;
            padding-right: 20px;
          }
          p::after {
            z-index: 2;
            content: "";
            width: 9px;
            height: 10px;
            position: absolute;
            top: 50%;
            left: 80%;
            background-image: url(${asset(
              "/images/icon-arrow-next-white.png"
            )});
            background-position: center;
            background-size: 100%;
            background-repeat: no-repeat;
            transform: translate(0, -50%);
          }
        }
      `}</style>
    </>
  );
}
