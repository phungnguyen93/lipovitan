import { Spin } from "antd";
import {useState, useEffect} from "react";

export default function Preloader({

    handleStatus,
    status, 
    size="large",
    fullScreen = false,

}){

    const [sizeSpin, setSize] = useState(size);

    useEffect(()=>{
        if(handleStatus){
            handleStatus();
        }
    },[status])

    return(
        <>
        {
            status ? (
                <>  
                    {fullScreen === true 
                        ? (<div 
                            style={{
                                display:"flex", 
                                position:"fixed", 
                                zIndex:"999", width: "100%", height:"100%", 
                                justifyContent:"center", alignItems:"center",
                                top:"0",
                                left:"0",
                                backgroundColor: "rgba(255,255,255,0.8)"
                            }}>
                                <Spin size={sizeSpin}></Spin>
                            </div>)
                        : (<Spin size={sizeSpin}></Spin>)
                    }
                </>
                
            ) : <></>
        }

        </>
    )
}