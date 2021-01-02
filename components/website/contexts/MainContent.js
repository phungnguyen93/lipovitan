import {useState, useEffect} from "react"
export const MainContent = React.createContext();

export default function MainContentProvider( {children}){

    const Language = {
        
        ListName : [
            "en", "vi"
        ],

        ListFlags : [
            "/images/language-en.png",
            "/images/language-vn.png",
        ],

        "EN" : {
            name : "en",
            flag : "/images/language-en.png",
            data : [
                {
                    namePage : "home",
                    
                }
            ]
        },

        "VI" : {
            name : "vi",
            flag : "/images/language-vn.png",
            data : [
                {   
                    namePage: "Trang chủ",                  
                }
            ],
        }
    }

    const [dataLanguage, setDataLanguage] =  useState(Language.VI.name);

    const [languageCurrent, setLanguageDefault] = useState(Language.VI.name);
    
    const setLanguage = (value) => {

        setLanguageDefault(value);
        localStorage.setItem('LANGUAGE', value);
       
    }

    const [listNameLanguage, setListNameLanguage] = useState(Language.ListName);
    const [listFlags, setListFlags] = useState(Language.ListFlags);


    useEffect(()=>{

        if(localStorage.getItem("LANGUAGE")){

            // console.log("has");
            setLanguageDefault(localStorage.getItem("LANGUAGE"));
            setDataLanguage(Language[`${localStorage.getItem("LANGUAGE").toUpperCase()}`]);

        }else{
            // console.log("none");
            localStorage.setItem('LANGUAGE', Language.VI.name);
           
        }

    },[])

    useEffect(()=>{
        
        const data  = Language[`${languageCurrent.toUpperCase()}`];
        setDataLanguage(data);
        console.log("set data language" , data);

    },[languageCurrent]);

    return(
        <MainContent.Provider
            value = {{
                languageCurrent : languageCurrent,
                setLanguage : setLanguage,
                listNameLanguage : listNameLanguage,
                listFlags : listFlags,
                dataLanguage : dataLanguage,
            }}
        >
            {children}
        </MainContent.Provider>
    )
} 