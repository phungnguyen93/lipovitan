export default function Title(
    {
        color="#FFF",
        children,
        style,
    }
){
    return (<>
        <h3 className="titleSmall" style={style}>
            {children}
        </h3>
        <style jsx>{`
            .titleSmall{
                font-family: "Montserrat-BlackItalic";
                font-size: 40px;
                color : ${color};
                text-transform: uppercase;
            }
            
            @media screen and (max-width: 1900px) {
                .titleSmall{
                    font-size: 38px;
                }
            }

            @media screen and (max-width: 1440px) {
                .titleSmall{
                    font-size: 35px;
                }
            }

            @media screen and (max-width: 1366px) {
                .titleSmall{
                    font-size: 30px;
                }
            }

            @media screen and (max-width: 1280px) {
                .titleSmall{
                    font-size: 3vmax;
                }
            }

            @media screen and (max-width: 1024px) {
                .titleSmall{
                    font-size: 3vmax;
                }
                
            }

        `}</style>
    </>)
}