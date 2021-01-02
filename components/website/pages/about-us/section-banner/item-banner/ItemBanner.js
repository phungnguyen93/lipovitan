import asset from "plugins/assets/asset";

export default function ItemBanner (
    {
        urlImage,
        children,
        style,
        linkLine,
    }
){
    return (
        <>
            <div className="itemBanner" style={style}>

                <img className={"imgBanner"} src={urlImage ? urlImage : asset("/images/slide-banner.png")} />
                {
                    linkLine ? <img src={linkLine} className="lineBanner"></img> : <></>
                }

                {children}

                
                
            </div>

            <style jsx>{`
                .itemBanner {
                    min-height: 100vh;
                }
                .lineBanner{
                    bottom: 0;
                    position: absolute;
                    display:block;
                    width : 100%;
                }
                @media screen and (max-width: 1025px) and (min-width: 769px){
                    .itemBanner {
                        min-height: 50vh;
                    }
                }
                @media screen and (max-width: 769px) and (min-width: 600px){
                    .itemBanner {
                        min-height: 20vh;
                    }
                }
            `}</style>
        </>
    )
}