import asset from "plugins/assets/asset";

export default function ItemBanner({ urlImage, children, style, linkLine }) {
  return (
    <>
      <div className="itemBanner" style={style}>
        <img
          className={"imgBanner"}
          src={urlImage ? urlImage : asset("/images/home/slide00.jpg")}
        />
        {linkLine ? <img src={linkLine} className="lineBanner"></img> : <></>}

        {children}
      </div>

      <style jsx>{`
        .itemBanner {
          position: relative;
          &::after {
            content: none;
            position: absolute;
            bottom: 0;
            background: #333;
            transform: rotate(-3deg);
            height: 10vh;
            width: 150%;
            z-index: 1;
          }
        }
        .lineBanner {
          bottom: -0vh;
          position: absolute;
          display: block;
          width: 100%;
          z-index: 2;
        }
      `}</style>
    </>
  );
}
