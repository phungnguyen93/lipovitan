import asset from "plugins/assets/asset";
import { useState, useEffect, useRef, useContext } from "react";
// import ItemForm from "components/website/pages/contact-us/section-banner-top/items/Items";
import useWindowSize from "components/website/hooks/useWindowsSize";
import ButtonCustom from "components/website/button/Button";
import {Input} from "components/website/forms/Input";
import { Menu, Dropdown, Button, message, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import Link from "next/link";
import Axios from "axios";
import {MainContent} from "components/website/contexts/MainContent";

export default function Career (){

    const Language = {
        en: {
          name: "en",
          title : "Career",
          placeholderSeacrh: "Job title",
          placeholderDepartment: "Department",
          placeholderPlace: "Working place",
          placeholderJobType: "Job type",
          textBtnSearch: "Search job",
          listNameTable: [
           "Job opening",
           "Department",
           "working place",
           "job type",
           "date",
          ],
          data: [
          
          ]
        },
        vi: {
          name: "vi",
          title :"Cơ Hội Nghề Nghiệp",
          placeholderSeacrh: "Tên công việc",
          placeholderDepartment: "Phòng ban",
          placeholderPlace: "Nơi làm việc",
          placeholderJobType: "Loại công việc",
          textBtnSearch: "Tìm kiếm",
          listNameTable: [
            "Công việc",
            "Bộ Phận",
            "Nơi làm việc",
            "Loại công việc",
            "Thời gian",
           ],
          data: [
        
          ]
        }
      }
    
        // detect screen size
    const [responsiveMaxScreen, setResponsiveMaxScreen] = useState(false);
       
    const windowSize = useWindowSize();

        //check responsive
     useEffect(()=>{
        if(windowSize.width > 1440){
            setResponsiveMaxScreen(true);
        }else{
            setResponsiveMaxScreen(false);
        }
    },[windowSize]);

        const [jobs, setJobs] = useState(); // list jobs data
        const [departmentsData, setDepartmentsData] = useState();
        const [jobLocationData, setJobLocaltionData] = useState();
        const [jobContractsData, setJobContractsData] = useState();

        const [valueDepartment, setValueDepartments] = useState("");
        const [valueWorkingPlace, setValueWorkingPlace] = useState("");
        const [valueJobType, setValueJobType] = useState("");
        const [valueNameJob, setValueNameJob] =  useState("");

        const [currentPageListJobs, setCurrentPageListJobs] = useState(1); // page jobs data

        const [hasNextPageListJobs, setHasNextPageListJobs] = useState() // status Next page jobs
        const [hasPrevPageListJobs, setHasPrevPageListJobs] = useState() // status Prev page jobs

        const [limit, setLimit] = useState(4);
        
        const valueLanguageContext =  useContext(MainContent);
        const [dataLangCareer, setDataLangCareer] = useState() // data change language

        const callAPI = async (url, callbackFn)=>{
          
            setDataLangCareer(Language[`${valueLanguageContext.languageCurrent}`]);

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

        useEffect(() => {

                callAPI(
                    "https://api.lipovitan.zii.vn/api/v1/job-departments",
                    setDepartmentsData
                );

                callAPI(
                    "https://api.lipovitan.zii.vn/api/v1/job-locations",
                    setJobLocaltionData
                );

                callAPI(
                    "https://api.lipovitan.zii.vn/api/v1/job-contracts",
                    setJobContractsData
                );

                callAPI(
                    `https://api.lipovitan.zii.vn/api/v1/jobs?limit=${
                        limit
                    }&currentPage=${
                        currentPageListJobs}`
                    ,

                    setJobs
                );

        }, []);

        useEffect(() => {

            setDataLangCareer(Language[`${valueLanguageContext.languageCurrent}`]);

            // api department
            callAPI(
                "https://api.lipovitan.zii.vn/api/v1/job-departments",
                setDepartmentsData
            );
            
            // api job-locations
            callAPI(
                "https://api.lipovitan.zii.vn/api/v1/job-locations",
                setJobLocaltionData
            );

            // api job-contracts
            callAPI(
                "https://api.lipovitan.zii.vn/api/v1/job-contracts",
                setJobContractsData
            );

            // api all jobs
            callAPI(
                `https://api.lipovitan.zii.vn/api/v1/jobs?limit=${
                    limit
                }&currentPage=${
                    currentPageListJobs}`
                ,

                setJobs
            );

        }, [valueLanguageContext.languageCurrent]);
   
    const handelSearch = (e) => {
        let name = valueNameJob;
        let jobContract = valueJobType.id;
        let jobDepartment = valueDepartment.id;
        let jobLocation = valueWorkingPlace.id;
        // console.log(`https://api.lipovitan.zii.vn/api/v1/jobs?name=${
        //     name ? name : "" 
        //     }&jobContract=${
        //         jobContract ? jobContract : ""
        //     }&jobDepartment=${
        //         jobDepartment ? jobDepartment : ""}&limit=${limit}`);
        callAPI(
            `https://api.lipovitan.zii.vn/api/v1/jobs?name=${
                name ? name : "" 
                }&jobContract=${
                    jobContract ? jobContract : ""
                }&jobDepartment=${
                    jobDepartment ? jobDepartment : ""
                }&jobLocation=${
                    jobLocation ? jobLocation : "" 
                }&limit=${limit}`,
            setJobs
        )
        // console.log(e)
    }

    const handleNext = () => {

        if(hasNextPageListJobs === true){

            let currentPage = currentPageListJobs + 1;
            let name = valueNameJob;
            let jobContract = valueJobType.id;
            let jobDepartment = valueDepartment.id;
            let jobLocation = valueWorkingPlace.id;
            setCurrentPageListJobs(currentPage);

            callAPI(

                `https://api.lipovitan.zii.vn/api/v1/jobs?name=${
                    name ? name : "" 
                    }&jobContract=${
                        jobContract ? jobContract : ""
                    }&jobDepartment=${
                        jobDepartment ? jobDepartment : ""
                    }&jobLocation=${
                        jobLocation ? jobLocation : "" 
                    }&page=${
                        currentPage ? currentPage : 1
                    }&limit=${limit}`
                ,
                setJobs

            )
        }
        
    }
    
    const handleBack = () => {
       
        if(hasPrevPageListJobs === true){

            let currentPage = currentPageListJobs - 1;
            let name = valueNameJob;
            let jobContract = valueJobType.id;
            let jobDepartment = valueDepartment.id;
            let jobLocation = valueWorkingPlace.id;

            setCurrentPageListJobs(currentPage);

            callAPI(

                `https://api.lipovitan.zii.vn/api/v1/jobs?name=${
                    name ? name : "" 
                    }&jobContract=${
                        jobContract ? jobContract : ""
                    }&jobDepartment=${
                        jobDepartment ? jobDepartment : ""
                    }&jobLocation=${
                        jobLocation ? jobLocation : "" 
                    }&&page=${
                        currentPage ? currentPage : 1
                    }&limit=${limit}`
                ,
                setJobs
                
            )
        }
        
    }
    
        // Select value filter
    function handleMenuClick(e) {
       
        e.item.props.selectitem(e.item.props.value);
       
    }


    useEffect(() => {

        if(jobs){

            setCurrentPageListJobs(jobs.data.currentPage);
            setHasNextPageListJobs(jobs.data.hasNextPage);
            setHasPrevPageListJobs(jobs.data.hasPrevPage); 

        }
        
    }, [jobs]);

    const handleOnChange = (value) => {
        setValueNameJob(value)
    }


    const menu =(value, callBack) => (
        <Menu onClick={handleMenuClick}>
            {
                value.length === 0 
                    ?   (   <Menu.Item key="1" icon={<UserOutlined />} >
                                null
                            </Menu.Item>
                    )
                    :   value.map((val, index) => (
                            <Menu.Item key={index} value={val} selectitem={callBack} >
                                {val.name}
                            </Menu.Item>
                    ))
            }
        </Menu>
    );

    const revertDate = (data)=>{
        let date = data.toString();
        let dateCover = "";
        for (let i = 0; i < date.length; i++) {
            if (date[i] !== " ") {
            dateCover += date[i].toString();
            } else {
            break;
            }
        }
        return dateCover;
    }

    return<section>
        <div className="sectionContentJob">

            <div className="contentJob" >

                {
                    dataLangCareer 

                    ? <h2>{dataLangCareer.title}</h2>
                
                    :  <h2>Career</h2>

                }

                <div className="filter">
                    
                    {
                        windowSize.width < 600 
                        ?(<>
                            <div>
                               <Input
                                    handleOutSide={handleOnChange}
                                    label=""
                                    value=""
                                    placeholder={dataLangCareer ? dataLangCareer.placeholderSeacrh : "Job title"}
                                    name="jobTitle"
                                    heightInput={"30px"}
                               />
                            </div>
                            <div>
                            <Dropdown  overlay={ departmentsData ? menu(departmentsData.data.list, setValueDepartments) : menu([])}>
                                <Button>
                                    {  
                                        valueDepartment !== "" 
                                        ? valueDepartment.name 
                                        : (dataLangCareer ? dataLangCareer.placeholderDepartment : "Department") 
                                    }
                                </Button>
                            </Dropdown>
                            </div>
                            <div className={"doubleItems"}>
                                <div>
                                    <Dropdown  overlay={ jobLocationData ? menu(jobLocationData.data.list, setValueWorkingPlace) : menu([])}>
                                        <Button>
                                            {   valueWorkingPlace !== "" 
                                                ? valueWorkingPlace.name 
                                                : (dataLangCareer ? dataLangCareer.placeholderPlace :"Working Place") 
                                            }
                                        </Button>
                                    </Dropdown>
                                </div>
                                <div>
                                    <Dropdown  overlay={ jobContractsData ? menu(jobContractsData.data.list, setValueJobType) : menu([])}>
                                        <Button>
                                            {   valueJobType !== "" 
                                                ? valueJobType.name 
                                                : (dataLangCareer ? dataLangCareer.placeholderJobType :"Job Type")
                                            }
                                        </Button>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="btnSearch">
                                <ButtonCustom
                                    cbFunction={handelSearch}
                                    color={"#fff"}
                                    imgArrow={asset("/images/icon-arrow-next-white.png")}
                                    background={"#004FC5"}
                                    style={{marginRight:"auto"}}
                                >
                                    {   dataLangCareer
                                        ? dataLangCareer.textBtnSearch
                                        : "Search"
                                    }
                                </ButtonCustom>
                               {/* <p onClick={handelSearch}>
                                   
                                </p> */}
                            </div>
                            <div className="listItems">
                                {
                                    jobs 
                                        ? jobs.data.list.map((value, index)=>(
                                            <div className="item" key={index}>
                                                
                                                <div className="jobDepartment">
                                                    <i>
                                                        {   
                                                            value.jobDepartment.name
                                                        }
                                                    </i>
                                                    
                                                </div>
                                                <div className="jobName">
                                                    <h4>
                                                        <Link href={"/join-us/"+value.id}><b><i>{value.name}</i></b></Link>
                                                    </h4>
                                                    <span className="jobLocation">
                                                        <i>
                                                            {
                                                                value.jobLocation.name
                                                            }
                                                        </i>
                                                    </span>

                                                </div>
                                                <div className="jobContract">
                                                    <span>
                                                        <i>
                                                            {
                                                                value.jobContract.name
                                                            }
                                                        </i>
                                                        
                                                    </span>
                                                    
                                                    <span className="createdAt">
                                                        <i>

                                                        {

                                                            revertDate(value.createdAt)

                                                        }

                                                        </i>
                                                        
                                                    </span>
                                                    
                                                </div>
                                               
                                            </div>
                                        ))
                                        : <></>
                                    }
                            </div>
                        </>)
                        :(<>
                            <table>
                                <tbody>
                                <tr>
                                    <td>
                                    <Input
                                            handleOutSide={handleOnChange}
                                            label=""
                                            value=""
                                            placeholder={dataLangCareer ? dataLangCareer.placeholderSeacrh : "Job title"}
                                            name="jobTitle"
                                            heightInput={"30px"}
                                    />
                                    </td>
                                    <td>
                                    <Dropdown  overlay={ departmentsData ? menu(departmentsData.data.list, setValueDepartments) : menu([])}>
                                        <Button>
                                            
                                            {  
                                                valueDepartment !== "" 
                                                ? valueDepartment.name 
                                                : (dataLangCareer ? dataLangCareer.placeholderDepartment : "Department") 
                                            }
                                        </Button>
                                    </Dropdown>
                                    </td>
                                    <td>
                                        <Dropdown  overlay={ jobLocationData ? menu(jobLocationData.data.list, setValueWorkingPlace) : menu([])}>
                                            <Button>
                                                {   valueWorkingPlace !== "" 
                                                    ? valueWorkingPlace.name 
                                                    : (dataLangCareer ? dataLangCareer.placeholderPlace :"Working Place") 
                                                }
                                            </Button>
                                        </Dropdown>
                                    </td>
                                    <td>
                                        <Dropdown  overlay={ jobContractsData ? menu(jobContractsData.data.list, setValueJobType) : menu([])}>
                                            <Button>
                                                {   valueJobType !== "" 
                                                    ? valueJobType.name 
                                                    : (dataLangCareer ? dataLangCareer.placeholderJobType :"Job Type")
                                                }
                                            </Button>
                                        </Dropdown>
                                    </td>
                                    <td>
                                    <p onClick={handelSearch}>
                                        <i>
                                            {   dataLangCareer
                                                ? dataLangCareer.textBtnSearch
                                                : "Search"
                                            }
                                        </i>
                                        
                                        </p>
                                    </td>
                                </tr>
                                {
                                    dataLangCareer 

                                    ?   <tr>
                                            {dataLangCareer.listNameTable.map((value,index)=>{
                                                return (
                                                <th key={index}>{value}</th>
                                                )
                                            })}
                                        </tr>
                                
                                    :   <tr>
                                            <th>Job opening</th>
                                            <th>Department</th>
                                            <th>working place</th>
                                            <th>job type</th>
                                            <th>date</th>
                                        </tr>

                                }
                            
                                    {
                                        jobs 
                                        ? jobs.data.list.map((value, index)=>(
                                            <tr key={index}>
                                                <td>
                                                    <i>
                                                    <Link href={"/join-us/"+value.id}>{value.name}</Link>
                                                    </i>
                                                    
                                                </td>
                                                <td>
                                                    <i>
                                                        {   
                                                            value.jobDepartment.name
                                                        }
                                                    </i>
                                                    
                                                </td>
                                                <td>
                                                    <i>
                                                        {
                                                            value.jobLocation.name
                                                        }
                                                    </i>
                                                    
                                                
                                                </td>
                                                <td>
                                                    <i>
                                                        {
                                                            value.jobContract.name
                                                        }
                                                    </i>
                                                    
                                                    
                                                </td>
                                                <td>
                                                    <i>
                                                        {revertDate(value.createdAt)}
                                                    </i>
                                                    
                                                </td>
                                            </tr>
                                        ))
                                        : <></>
                                    }
                                </tbody>
                            </table>
                        </>)
                    }

                </div>
                
               {
                    hasPrevPageListJobs || hasNextPageListJobs 
                    ?
                        (
                            <div style={{paddingTop: "30px"}} className="btnCareer">
                                <img src={asset("/images/icon-back-carrer-white.png")} 
                                onClick={handleBack}
                                style ={hasPrevPageListJobs === false ? {opacity:"0.6"}:{opacity :1}}></img>
                                <img src={asset("/images/icon-back-carrer-blue.png")} 
                                onClick={ handleNext}
                                style ={hasNextPageListJobs === false ? {opacity:"0.6"}:{opacity :1}}></img>
                            </div>
                        )
                    :
                        (
                            <div style={{paddingTop: "30px"}} className="btnCareer">
                                <></>
                            </div>
                        )
                }

                    {/* <div style={{paddingTop: "30px"}} className="btnCareer">
                        <img src={asset("/images/icon-back-carrer-white.png")} onClick={handleBack} ></img>
                        <img src={asset("/images/icon-back-carrer-blue.png")} onClick={ handleNext}></img>
                    </div> */}
                {/* <div style={{paddingTop: "30px"}} className="btnCareer">
                   <img src={asset("/images/icon-back-carrer-white.png")} 
                    onClick={handleBack}
                   style ={hasPrevPageListJobs === false ? {opacity:"0.6"}:{opacity :1}}></img>
                   <img src={asset("/images/icon-back-carrer-blue.png")} 
                   onClick={ handleNext}
                   style ={hasNextPageListJobs === false ? {opacity:"0.6"}:{opacity :1}}></img>
                </div> */}
                
            </div>
        </div>
        <style jsx>{`
            .bgBannerTop{
                width: 100%;
            }
            .btnCareer{
               
                display: flex;
                flex-direction: row;
                justify-content: flex-start;

                img{
                    display: block;
                    width: 35px;
                    margin-right: 10px;
                    cursor: pointer;
                }
            }
            .sectionContentJob{
               width: 100%;
               display: flex;
               justify-content: center;
               align-items: center;
               padding: 50px;
               background: #fff;
            }

            .itemInfoJob{
                padding: 15px 0;
            }

            .contentJob{
               width: 100%;
               max-width: 1300px;
               h2{
                   font-size: 80px;
                   font-family: 'Montserrat-BlackItalic';
                   color: #004FC5;
                   padding-bottom: 20px;
                   text-transform: uppercase;
               }
                h4{
                    display: flex;
                    justify-content: flex-start;
                    font-size: 18px;
                    margin: 5px 0;
                    span{
                        display: flex;
                        width: 250px;
                        padding : 5px 20px; 
                        background-image: url(${asset("/images/bg-input.png")});
                        background-position: center;
                        background-size: 100%;
                        background-repeat: no-repeat;
                        font-family: 'Montserrat-BoldItalic';
                        color: #003A92;
                    }
                }
            }
            .filter{
                width: 100%;
            }
            table{
                overflow: scroll;
                width: 100%;
                th{
                    padding: 7px 10px;
                    color: #004FC5;
                    font-family: 'Montserrat-BlackItalic';
                    font-size: 18px;
                    text-align: left;
                    text-transform: uppercase;
                }
                tr:first-child{
                    border-bottom: 20px solid #fff;
                    td{
                        padding: 0;
                        text-align: left;
                        padding-left:  20px;
                        padding-bottom: 20px;
                        padding-right: 15px;
                        margin: 0 10px;
                        margin-right: 20px;
                        padding: 0;
                        background-image: url(${asset("/images/bg-input.png")});
                        background-position: center;
                        background-size: 100%;
                        font-family: Montserrat-Italic;
                        color: #004FC5;
                        border-left: 5px solid #fff;
                    }
                    td:last-child{
                        background-image: url(${asset("/images/bg-btn-search-job.png")});
                        background-position: center;
                        background-size: 100%;
                        
                        p{
                            padding-left: 30px;
                            font-size: 18px;
                            color: #fff;
                            position: relative;
                            font-family: 'Montserrat-BoldItalic';
                            cursor: pointer;
                        }
                        p::after{
                            z-index: 2;
                            content: "";
                            width: 9px;
                            height:10px;
                            position: absolute;
                            top: 50%;
                            left: 80%;
                            background-image: url(${asset("/images/icon-arrow-next-white.png")});
                            background-position: center;
                            background-size: 100%;
                            background-repeat: no-repeat;
                            transform: translate(0, -50%);
                        }
                    }
                    td:first-child{
                        border-left: 0 solid #fff;
                        p{
                            padding-left: 15px;
                            
                        }
                    }
                    
                }
                    
                td{

                    padding: 7px 10px;
                    color: #757575;
                }
                tr:nth-child(2n){
                    background-color: #F1F1F1;
                    color: #757575;
                }
                td:last-child{
                  text-align: right;
                  padding-right: 10px;
                }
                th:last-child{
                  text-align: right;
                  padding-right: 10px;
                  width: 16%
                }
                td:first-child{
                    width: 30%;
                    text-align: left;
                    font-family: 'Montserrat-BoldItalic';
                }
            }

            @media screen and (max-width: 1440px) {
                .containerBannerTop{
                    bottom : 7%;
                }
            }

            @media screen and (max-width: 1025px) and (min-width: 769px){
                
                .sectionContentJob{
                    .contentJob h2 {
                        font-size: 55px;
                    }
                }
            }
            @media screen and ( max-width : 769px) and (min-width: 600px){
                .sectionContentJob{
                    .contentJob h2 {
                        font-size: 45px;
                    }
                }
            }
            @media screen and (max-width: 599px) {
                .containerBannerTop{
                   
                }
                .sectionContentJob{
                    padding: 50px 15px;
                }
                .contentJob{
                    width: 100%;
                    padding: 10px 20px;
                    h2{
                        font-size: 5vmax;
                        
                    }
                    .filter{
                        div{
                            margin: 15px 0;
                        }
                    }
                    .doubleItems{
                        display: flex;
                        justify-content: space-between;
                        div{
                            width: 49%;
                            margin: 0;
                        }
                    }
                    .btnSearch{
                        display: flex;
                        justify-content: center;
                        
                    }
               }
               .listItems{
                   .item{

                   }
               }
               .jobName{
                    display : flex;
                    justify-content: space-between;
                    align-items: center;
                    h4{
                        color : "#757575";
                    }
               }
               .jobContract{
                    display : flex;
                    justify-content: space-between;
               }
               
            }

        `}</style>
    </section>
}