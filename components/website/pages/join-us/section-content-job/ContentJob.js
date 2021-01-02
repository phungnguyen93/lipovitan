import asset from "plugins/assets/asset";
import { useState, useEffect, useRef } from "react";
// import TitleStyle from "components/website/pages/join-us/section-banner-top/title/TitleStyle2";
// import ItemForm from "components/website/pages/contact-us/section-banner-top/items/Items";
import useWindowSize from "components/website/hooks/useWindowsSize";
import Button from "components/website/button/Button";


export default function BannerTop (
    {
        dataAPI
    }
){
    
        // detect screen size
    const [responsiveMaxScreen, setResponsiveMaxScreen] = useState(false);
    const [dataState, setDataState] = useState();
       
    const windowSize = useWindowSize();
        //check responsive
     useEffect(()=>{
        if(windowSize.width > 1440){
            setResponsiveMaxScreen(true);
        }else{
            setResponsiveMaxScreen(false);
        }
    },[windowSize]);


    const formatData = ( data ) =>{

        let arrayDescription = [];
        let newString = [];
        let dataCover = [];
        let special = /[\n]/;

        for(let i = 0; i <= data.length; i++){

            if( special.test(data[i]) || data[i] === undefined){

                let newArr = [...newString]

                arrayDescription.push(newArr);

                newString = [];

            }else{

                newString.push(data[i]);

            }
        }

        dataCover = [...arrayDescription.map(value=> value.join(""))];

        return dataCover.map((value, index)=>(
                <p 
                    key={index}
                >
                    {value}
                    <style jsx>{`

                        p{
                            padding: 5px 25px;
                            position: relative;
                            &::before{
                                content: "";
                                position: absolute;
                                background-color: #C4C4C4;
                                width: 6px;
                                height: 6px;
                                right: 99.4%;
                                top: 50%;
                                transform: translate( 0, -50%);
                            }
                        } 

                    `}</style>
                </p>
            ));
        
    }

    return<section>

        <div className="sectionContentJob">

            <div className="contentJob" >

                {
                    dataAPI.data 
                        ?   ( <>

                                <h2>
                                    {dataAPI.data.name}
                                </h2>

                                <h3>
                                    Quantity : {dataAPI.data.quantity}
                                </h3>

                                {
                                    dataAPI.data.content.dataSource.map((value)=>(

                                        <div key={value.key} className={"itemInfoJob"}>

                                            <h4><span>{value.name}</span></h4>
                                           
                                            {formatData(value.info)}

                                        </div>
                                    ))
                                }

                                <div style={{paddingTop: "30px"}}>
                                    <Button
                                        background={"#003A92"}
                                        color="#fff"
                                        imgArrow={asset("/images/icon-arrow-next-white.png")}
                                    >
                                        Apply Now
                                    </Button>
                                </div>

                            </>)

                        : <span>Loading...</span>
                }
            
                
            </div>

        </div>

        <style jsx>{`
            .bgBannerTop{
                width: 100%;
            }

            .sectionContentJob{
               width: 100%;
               display: flex;
               justify-content: center;
               align-items: center;
               padding: 50px;
            }

            .itemInfoJob{
                padding: 15px 0;
            }

            .contentJob{
               width: 100%;
               max-width: 1300px;
               h2{
                   font-size: 50px;
                   font-family: 'Montserrat-BoldItalic';
                   color: #004FC5;
                   padding-bottom: 20px;
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
                h3{
                    font-family: 'Montserrat-BoldItalic';
                    font-size: 24px;
                    color: #757575;
                }
            }

            @media screen and (max-width: 1440px) {
                .containerBannerTop{
                    bottom : 7%;
                }
            }

            @media screen and (max-width: 520px) {
                .sectionContentJob{
                    padding: 50px 20px;
                }
                .contentJob{
               width: 100%;
               max-width: 1300px;
               h2{
                   font-size: 35px;
                  
                   padding-bottom: 10px;
               }
                h4{
                 
                    font-size: 14px;
                    margin: 5px 0;
                    span{
                      
                        width: 250px;
                        padding : 5px 20px; 
                        
                      
                    }
                }
                h3{
                   
                    font-size: 16px;
                   
                }
            }
            }

        `}</style>
    
    </section>
}