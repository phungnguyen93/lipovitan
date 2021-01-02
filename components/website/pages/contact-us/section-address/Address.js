import ItemsAddress from  "components/website/pages/contact-us/section-address/items/ItemsAddress";
// import {useEffect} from "react"
export default function Address (
    data
){

    // useEffect(() => {
    //    console.log(data);
    // }, [])
    
    return (
        <section>
            <div className="sectionAddress">

                {
                data.data ? ( 
                    <>
                        {
                            data.data.data.list.map((value, index) => (
                                <ItemsAddress
                                    key = {index}
                                    name={value.title}
                                    address={value.address}
                                    tel={value.phone}
                                    fax={value.fax}
                                    email={value.email}
                                ></ItemsAddress>
                            ))
                        }
                    </> 
                ):(
                    <>
                        <ItemsAddress></ItemsAddress>
                        <ItemsAddress name="HCM Office"></ItemsAddress>
                        <ItemsAddress></ItemsAddress>
                    </>
                )}
                
            
            </div>
            
            <style jsx>{`
                section{
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: center
                }
                .sectionAddress{
                    width: 100%;
                    padding: 50px 5vw;
                    display: flex;
                    justify-content: center;
                    position: relative;
                   
                }    
                @media screen and (max-width:767px) {
                    .sectionAddress{
                        width: 100%;
                        flex-wrap: wrap;
                    }
                   
                }  
            `}</style>
        </section>
    )
}