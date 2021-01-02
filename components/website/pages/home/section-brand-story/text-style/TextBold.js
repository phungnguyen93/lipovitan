export default function TextBold (
    {
        children,
        color="#004FC5",
        fontSize=16,
    }
){

    const boldColor = (<>
        <b>
            <i>
                {children}
            </i>
            
        </b>
        <style jsx>{`
            b{
                color : ${color};
                font-family: Montserrat-BoldItalic;
            }  
            @media screen and (max-width: 1024px) {
                b {
                    font-size: 1.2vmax;
                    font-family: Montserrat-BoldItalic;
                }
            }  
            @media screen and (max-width: 767px) {
                b {
                    font-size: 1.7vmax;
                    font-family: Montserrat-BoldItalic;
                }
            }  
        `}</style>
    </>)
    
    return (
        boldColor
    )
}