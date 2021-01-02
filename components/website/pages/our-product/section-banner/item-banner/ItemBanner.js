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
                .lineBanner{
                    bottom: 0;
                    position: absolute;
                    display:block;
                    width : 100%;
                }
            `}</style>
        </>
    )
}