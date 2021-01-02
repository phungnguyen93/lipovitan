export default function TextBold (
    {
        children,
        color="#004FC5",
        fontSize=16,
    }
){

    const boldColor = (<>
        <i>
            {children}
        </i>
        <style jsx>{`
            i{
                color : ${color};
                font-family: "Montserrat-BoldItalic";
                font-size: ${fontSize + "px"};
            }    
        `}</style>
    </>)
    
    return (
        boldColor
    )
}