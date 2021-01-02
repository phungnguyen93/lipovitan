import asset from "plugins/assets/asset";
import { useContext, useState, useEffect } from "react";
import { MainContent } from "components/website/contexts/MainContent";
export default function ItemsAddress (
    {
        name="Headquarter",
        address="6/4B Nguyen U Di, Thao Dien Ward, District 2, Ho Chi Minh City",
        tel="(84.28) 3519 4690/91/92", 
        fax="(84.28) 3519 4693", 
        email="mm-sales@taishovn.com"
    }

){

    const Language = {
        en: {
          name: "en",
          title: ["Address","tel","fax", "email"],
       
        },
        vi: {
          name: "vi",
          title: ["Địa chỉ","ĐT","Fax", "Email"],
    
        }
    }

    const valueLanguageContext = useContext(MainContent);

    const [dataTitleAddress, setDataTitleAddress] = useState();

    useEffect(() => {

        if (valueLanguageContext.languageCurrent) {
    
          setDataTitleAddress(Language[`${valueLanguageContext.languageCurrent}`])
    
        }
    
    }, [])
    
    
    useEffect(() => {
    
        if (valueLanguageContext.languageCurrent) {
    
          setDataTitleAddress(Language[`${valueLanguageContext.languageCurrent}`])
    
        }
    
    }, [valueLanguageContext.languageCurrent]);


    return (
        <div className="item">
            <h3>
                {name}
            </h3>
            <ul>
                <li className="address">
                    <h4>
                        {
                            dataTitleAddress 
                                ? dataTitleAddress.title[0] + ":"
                                : "Address:"
                        }
                     </h4>
                    <img src={asset("/images/icon-address.png")} className="icon"/>
                    <p>{address}</p>
                </li>
                <li className="tel">
                    <h4>
                        {   
                            dataTitleAddress 
                                ? dataTitleAddress.title[1] + ":"
                                : "Tel:"
                        }
                     </h4>
                    <img  src={asset("/images/icon-phone.png")} className="icon"/>
                    <p>{tel}</p>
                    
                </li>
                <li className="fax">
                    <h4>
                        {   
                            dataTitleAddress 
                                ? dataTitleAddress.title[2] + ":"
                                : "Fax:"
                        }
                     </h4>
                    <img  src={asset("/images/icon-fax.png")} className="icon"/>
                    <p> {fax}</p>
                   
                </li> 
                <li className="email">
                    <h4>
                        {   
                            dataTitleAddress 
                                ? dataTitleAddress.title[3] + ":"
                                : "Email:"
                        }
                     </h4>
                    <img  src={asset("/images/icon-mail.png")} className="icon"/>
                    <p> {email}</p>
                   
                </li>
            </ul>
            <style jsx>{`
                
                .item{
                    width: 50%;
                    padding-right: 20px;
                    h3{
                        font-family: Montserrat-Black;
                        font-size: 2.5vmax;
                        text-transform: uppercase;
                        color: #004FC4;
                    }
                    ul{
                        display: flex;
                        flex-direction: column;
                        padding-top: 20px;
                        li{
                            display: flex;
                            flex-direction: row;
                            padding: 10px 25px;
                            position: relative;
                            
                            h4{
                                font-size: 1vmax;
                                font-family: Montserrat-Black;
                                color: #5D5D5D;
                                text-transform: capitalize;
                                padding-right: 10px;
                                width: 20%;
                            }
                            p{
                                font-size: 1vmax;
                                flex: 1;
                                line-height: 20px;
                            }
                            img{
                                position: absolute;
                                left: 0;
                                top: 12px;
                            }
                        }
                    }
                } 
                @media screen and (max-width:1023px) {
                    .item{
                        padding-bottom: 10px;
                        width: 100%;
                        ul{
                            li{
                               
                                h4{
                                    font-size: 1.5vmax;
                                }
                                p{
                                    font-size: 1.5vmax;
                                }
                               
                            }
                        }
                    }
                }   
            `}</style>
        </div>
       
    )
}