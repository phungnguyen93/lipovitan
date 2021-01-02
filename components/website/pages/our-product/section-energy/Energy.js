import asset from "plugins/assets/asset";
// import GroupDots from "components/website/group-dots/GroupDots";
import Items from "components/website/pages/our-product/section-energy/items/Items";
// import { Table, Typography } from 'antd';
import { MainContent } from "components/website/contexts/MainContent";
import { useEffect, useRef, useState, useContext } from "react";
import useWindowSize from "components/website/hooks/useWindowsSize";

export default function Energy (
    {
        urlBackground=asset("/images/bg-session-energy-our-product-3.png"),
    }
){


    const valueLanguageContext = useContext(MainContent);

        // detect screen size
    const windowSize = useWindowSize();
    const [responsiveMaxScreen, setResponsiveMaxScreen] = useState(false);
    const [responsiveMobile, setResponsiveMobile] = useState(false);
    const [responsiveTablet, setResponsiveTablet] = useState(false);

    const [dataEnergy, setDataEnergy] = useState();

    const dataSource = [
        {
          key: '1',
          name: 'Taurine',
          info: "1.000 mg"
        },
        {
          key: '2',
          name: 'Mật ong',
          info: "500 mg"
        },
        {
            key: '3',
            name: 'Inositol',
            info: "50 mg"
        },
        {
            key: '4',
            name: 'Vitamin B3',
            info: "20 mg"
        },
        {
            key: '5',
            name: 'Vitamin B6',
            info: "4.0 mg"
        },
        {
            key: '4',
            name: 'Vitamin B2',
            info: "3.2 mg"
        },
        {
            key: '5',
            name: 'Vitamin B1',
            info: "0.5 mg"
        }
        
    ];

    const Language = {
        en: {
          name: "en",
          title: ["Lipovitan","Honney"],
          description: "Each 250ml can contains:",
        },
        vi: {
          name: "vi",
          title: ["Lipovitan","Mật ong"],
          description: "Mỗi lon 250ml chứa:",
        }
    }

    useEffect(() => {

        if (valueLanguageContext.languageCurrent) {
    
          setDataEnergy(Language[`${valueLanguageContext.languageCurrent}`])
    
        }
    
    }, [])
    
    
    useEffect(() => {
    
        if (valueLanguageContext.languageCurrent) {
    
          setDataEnergy(Language[`${valueLanguageContext.languageCurrent}`])
    
        }
    
    }, [valueLanguageContext.languageCurrent]);


        //check responsive
    useEffect(() => {

        if (windowSize.width <= 1024) {

        setResponsiveTablet(true);

        if (windowSize.width <= 599) {
            setResponsiveTablet(false);
            setResponsiveMobile(true);
        }

        } else {

        setResponsiveTablet(false);
        setResponsiveMobile(false);

        }

    }, [windowSize]);

    return<section>
        <div className="sectionEnergy">
            
            <img className="bgEnergy" src={urlBackground}/>

            {
                responsiveMobile === true 
                ?(<>
                    <Items
                        urlImage={asset("/images/item-our-product-energy-cycle-layer-1.png")}
                        timeShow={0.3}
                        width={95}
                        height={32}
                        bottom={12}
                        left={"0"}
                        name={"rotate"}
                    >
                    </Items>

                    <Items
                        urlImage={asset("/images/item-our-product-energy-cycle-layer-2.png")}
                        timeShow={0.3}
                        width={95}
                        height={32}
                        bottom={12}
                        left={"0"}
                    >
                    </Items>
                    <Items
                        urlImage={asset("/images/item-our-product-energy-cycle-layer-3.png")}
                        timeShow={0.3}
                        width={95}
                        height={32}
                        bottom={12}
                        left={"0"}
                        name={"rotate"}
                    
                    >
                    </Items>
                    
                    <Items
                        urlImage={asset("/images/item-our-product-energy-cycle-layer-4-b1.png")}
                        timeShow={0.3}
                        width={95}
                        height={32}
                        bottom={12}
                        left={"0"}
                        name={"layer-4"}
                        animation={true}
                    >
                    </Items>
                    <Items
                        urlImage={asset("/images/item-our-product-energy-cycle-layer-4-b2.png")}
                        timeShow={0.3}
                        width={95}
                        height={32}
                        bottom={12}
                        left={"0"}
                        name={"layer-4"}
                        animation={true}
                    >
                    </Items>
                    <Items
                        urlImage={asset("/images/item-our-product-energy-cycle-layer-4-b3.png")}
                        timeShow={0.3}
                        width={95}
                        height={32}
                        bottom={12}
                        left={"0"}
                        name={"layer-4"}
                        animation={true}
                    >
                    </Items>
                    <Items
                        urlImage={asset("/images/item-our-product-energy-cycle-layer-4-b6.png")}
                        timeShow={0.3}
                        width={95}
                        height={32}
                        bottom={12}
                        left={"0"}
                        name={"layer-4"}
                        animation={true}
                    >
                    </Items>
                    <Items
                        urlImage={asset("/images/item-our-product-energy-cycle-layer-4-taurine.png")}
                        timeShow={0.3}
                        width={95}
                        height={32}
                        bottom={12}
                        left={"0"}
                        name={"layer-4"}
                        animation={true}
                    >
                    </Items>
                    <Items
                        urlImage={asset("/images/item-our-product-energy-cycle-layer-4-inositol.png")}
                        timeShow={0.3}
                        width={95}
                        height={32}
                        bottom={12}
                        left={"0"}
                        name={"layer-4"}
                        animation={true}
                    
                    >
                    </Items>
                    <Items
                        urlImage={asset("/images/item-our-product-energy-cycle-layer-4-honey.png")}
                        timeShow={0.3}
                        width={95}
                        height={32}
                        bottom={12}
                        left={"0"}
                        name={"layer-4"}
                        animation={true}
                    >
                    </Items>
                </>)
                :(<>

                    <Items
                        urlImage={asset("/images/item-our-product-energy-cycle-layer-1.png")}
                        timeShow={0.8}
                        width={50.19}
                        height={59.51}
                        top={8.33}
                        left={"0"}
                        name={"rotate"}
                    >
                    </Items>

                    <Items
                        urlImage={asset("/images/item-our-product-energy-cycle-layer-2.png")}
                        timeShow={0.6}
                        width={50.19}
                        height={59.51}
                        top={8.33}
                        left={"0"}
                    >
                    </Items>
                    <Items
                        urlImage={asset("/images/item-our-product-energy-cycle-layer-3.png")}
                        timeShow={0.9}
                        width={50.19}
                        height={59.51}
                        top={8.33}
                        left={"0"}
                        name={"rotate"}
                    
                    >
                    </Items>
                    <Items
                        urlImage={asset("/images/item-our-product-energy-cycle-layer-4-b1.png")}
                        timeShow={0.7}
                        width={50.19}
                        height={59.51}
                        top={8.33}
                        left={"0"}
                        name={"layer-4"}
                        animation={true}
                    >
                    </Items>
                    <Items
                        urlImage={asset("/images/item-our-product-energy-cycle-layer-4-b2.png")}
                        timeShow={0.9}
                        width={50.19}
                        height={59.51}
                        top={8.33}
                        left={"0"}
                        name={"layer-4"}
                        animation={true}
                    >
                    </Items>
                    <Items
                        urlImage={asset("/images/item-our-product-energy-cycle-layer-4-b3.png")}
                        timeShow={0.8}
                        width={50.19}
                        height={59.51}
                        top={8.33}
                        left={"0"}
                        name={"layer-4"}
                        animation={true}
                    >
                    </Items>
                    <Items
                        urlImage={asset("/images/item-our-product-energy-cycle-layer-4-b6.png")}
                        timeShow={0.9}
                        width={50.19}
                        height={59.51}
                        top={8.33}
                        left={"0"}
                        name={"layer-4"}
                        animation={true}
                    >
                    </Items>
                    <Items
                        urlImage={asset("/images/item-our-product-energy-cycle-layer-4-taurine.png")}
                        timeShow={0.7}
                        width={50.19}
                        height={59.51}
                        top={8.33}
                        left={"0"}
                        name={"layer-4"}
                        animation={true}
                    >
                    </Items>
                    <Items
                        urlImage={asset("/images/item-our-product-energy-cycle-layer-4-inositol.png")}
                        timeShow={0.9}
                        width={50.19}
                        height={59.51}
                        top={8.33}
                        left={"0"}
                        name={"layer-4"}
                        animation={true}
                    
                    >
                    </Items>
                    <Items
                        urlImage={asset("/images/item-our-product-energy-cycle-layer-4-honey.png")}
                        timeShow={1}
                        width={50.19}
                        height={59.51}
                        top={8.33}
                        left={"0"}
                        name={"layer-4"}
                        animation={true}
                    >
                    </Items>
                
                </>)
            }
            
            <div className="containerEnergy" >
               <div className="listItems">
                   <div>
                       { 
                            dataEnergy  
                            ? <>
                                {/* <h3>{dataEnergy.title[0]}</h3> */}
                                <h3><img src={asset("/images/logo.svg")}  className="logoLipo"/></h3>
                                <h4><i>{dataEnergy.title[1]}</i></h4>
                                <h5><i>{dataEnergy.description}</i></h5>
                            </>
                            : <>
                                <h3><i>Lipovitan </i> </h3>
                                <h4><i> Honey </i></h4>
                                <h5><i>Each 250ml can contains: </i></h5>
                            </>
                       }
                       
                   </div>
                   <div className="items">
                        <table>
                            <tbody>
                                {
                                    dataSource.map((value, index)=>(
                                        <tr key={index}>
                                            <td>
                                                {value.name}
                                            </td>
                                            <td>
                                                {value.info}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                   </div>
                    
               </div>
     
                
            </div>

        </div>

        <style jsx>{`
            .logoLipo {
                width: 20vw;
            }
            .bgEnergy{
                width: 100%;
            }

            .sectionEnergy{
                position: relative;
                min-height: 50vh;
            }
            .containerEnergy{
                left: 55%;
                top: 3%;
                position: absolute;
                width: 50%;
                height: auto;
                max-width: 600px;
                max-height: 650px;
                
                h3{
                    font-size : 70px;
                    color : #ED1C24;
                    font-family: Montserrat-Black;
                    text-transform: uppercase;

                }
                h4{
                    font-size : 60px;
                    color : #004FC5;
                    font-family: Montserrat-BoldItalic;
                    text-transform: uppercase;
                    padding : 20px 0;
                    
                }
                h5{
                    padding : 10px 0;
                    padding-bottom: 20px;
                    font-size : 26px;
                    color : #757575;
                    font-family : Montserrat-BoldItalic;
                }
            }

            .listItems{
                table{
                    width: 100%;
                }
                .items{
                    overflow-y: scroll;
                    overflow-y: hidden;
                    max-height: 360px;
                }
            }

            table{
                overflow: scroll;
                td{
                    font-size:24px;
                    padding: 7px 10px;
                }
                tr:nth-child(2n){
                    background-color: #E1F4FF;
                    color: #004FC5;
                }
                td:nth-child(2n){
                  text-align:right;
                }
            }

            @media screen and (max-width: 1023px) {
                .containerEnergy{
                    width: 45%;
                    left: 53%;
                    h3{
                        font-size : 50px;
                    }
                    h4{
                        font-size : 40px;
                        padding : 5px 0;
                        
                    }
                    h5{
                    
                        font-size : 17px;
                        padding : 5px;
                    
                    }
                }
                
                table{
                  
                    td{
                        font-size:17px;
                        padding: 5px 10px;
                    }
                    
                }
            }

            @media screen and (max-width: 599px) {
                .containerEnergy{
                    left: 50%;
                    top: 3%;
                    width: 90%;
                    transform: translate(-50%, 0);
                    h3{
                        font-size : 50px;
                        text-align :center;
                    }
                    h4{
                        font-size : 40px;
                        padding : 20px 0;
                        text-align :center;
                    }
                    h5{
                        font-size : 16px;
                        text-align :center;
                    }
                }
                
                table{
                  
                    td{
                        font-size:16px;
                        padding: 7px 10px;
                    }
                    
                }
            }

            @media screen and (max-width: 599px) {
                .containerEnergy{
                    left: 50%;
                    top: 3%;
                    width: 90%;
                    transform: translate(-50%, 0);
                    h3{
                        font-size : 50px;
                        text-align :center;
                    }
                    h4{
                        font-size : 40px;
                        padding : 20px 0;
                        text-align :center;
                    }
                    h5{
                        font-size : 16px;
                        text-align :center;
                    }
                }
                
                table{
                  
                    td{
                        font-size:16px;
                        padding: 7px 10px;
                    }
                    
                }
            }

        `}</style>
    </section>
}