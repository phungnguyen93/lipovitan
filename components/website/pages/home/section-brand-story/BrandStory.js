import asset from "plugins/assets/asset";
import Items from "components/website/pages/home/section-brand-story/items-brand-story/Items";
import ItemsMobile from "components/website/pages/home/section-brand-story/items-brand-story/ItemsMobile";
import ItemsNoneAni from "components/website/pages/home/section-brand-story/items-brand-story/ItemsNoneAnimation";
import TitleStyle1 from "components/website/pages/home/section-brand-story/title-brand-story/TitleStyle1.js";
import TextBold from "components/website/pages/home/section-brand-story/text-style/TextBold.js";
import { MainContent } from "components/website/contexts/MainContent";
import { useEffect, useRef, useState, useContext } from "react";
import useWindowSize from "components/website/hooks/useWindowsSize";

export default function BrandStore({

  urlBackground = asset("/images/bg-session-brand-story.png"),

}) {

  const Language = {
    en: {
      name: "en",
      title: ["Brand", "Story"],
      content: [
        {
          title: ["Conquering you", "after", "3 cans"],
          description: "",
          linkImg: ""
        }

      ]
    },
    vi: {
      name: "vi",
      title: ["Câu chuyện", "thương hiệu"],
      content: [
        {
          title: ["Chinh phục bạn", "sau", "3 lon"],
          linkImg: "",
          description: ""
        }
      ]
    }
  }

  const valueLanguageContext = useContext(MainContent);

  const [dataSectionBrandStore, setDataSectionBrandStore] = useState();

  // detect screen size
  const windowSize = useWindowSize();
  const [responsiveMaxScreen, setResponsiveMaxScreen] = useState(false);
  const [responsiveMobile, setResponsiveMobile] = useState(false);
  const [responsiveTablet, setResponsiveTablet] = useState(false);


  const listItemsEN = (
    <div className={"WrapItem"}>
      {
        responsiveMobile === true 
        ? (<>
            <ItemsMobile
              urlImage={asset("/images/item-brand-story-1962.png")}
              timeShow={0.6}
              width={44}
              height={10}
              top={12}
              left={"0"}
              year={1962}
              description={""}
              descriptionLeft={118}
              descriptionTop={20}
            >
              <p>
                The <TextBold> No.1 </TextBold> nutrition drink in Japan.
                <TextBold>One of first energy drink in the world</TextBold>
              </p>
            </ItemsMobile>
            <ItemsMobile
              urlImage={asset("/images/item-brand-story-1999.png")}
              timeShow={0.6}
              width={43}
              height={12}
              top={26}
              right={3}
              year={1999}
              description={""}
              descriptionRight={120}
              descriptionBottom={"0"}
            >
              <p>
                <TextBold>Come to Viet Nam</TextBold> <br />
                -Taisho Factory <br /> in Khanh Hoa
              </p>
            </ItemsMobile>
            <ItemsMobile
              urlImage={asset("/images/item-brand-story-2016.png")}
              timeShow={0.6}
              width={45}
              height={8}
              top={43}
              left={2}
              year={"2016"}
              description={""}
              descriptionLeft={120}
              descriptionTop={"30"}
             
             
            >
              <p>
                {" "}
                Continuous efforts to{" "}
                <TextBold>
                  {" "}
                  <br /> improve Japan quality and local taste
                </TextBold>
                . 2016 renewal is a great success{" "}
              </p>
            </ItemsMobile>
            <ItemsMobile
              urlImage={asset("/images/item-brand-story-2.png")}
              timeShow={0.6}
              width={40}
              height={15}
              top={77}
              left={4}
              description={""}
              descriptionLeft={125}
              descriptionTop={45}
            >
              <TextBold>
                Factory Expansion <br /> Under Planning
              </TextBold>
            </ItemsMobile>
            
            <ItemsMobile
              urlImage={asset("/images/item-brand-story.png")}
              timeShow={0.6}
              width={40}
              height={15}
              top={60}
              right={4}
              description={""}
              descriptionRight={130}
              descriptionTop={45}
            >
              <TextBold>
                3 cans for <br /> brand love
              </TextBold>
            </ItemsMobile>

        </>) 
        : (
          <>
          <Items
            urlImage={asset("/images/item-brand-story-1962.png")}
            timeShow={0.6}
            width={19.5}
            height={33.33}
            top={29}
            right={78}
            year={1962}
            description={""}
          >
            <p>
              The <TextBold> No.1 </TextBold> nutrition drink in Japan.
              <TextBold>One of first energy drink in the world</TextBold>
            </p>
          </Items>
          <Items
            urlImage={asset("/images/item-brand-story-2016.png")}
            timeShow={0.6}
            width={21.5}
            height={31.5}
            top={27}
            left={42}
            year={"2016"}
            description={""}
            descriptionBottom={-7}
            yearStyle={{ left: "5%" }}
          >
            <p>
              {" "}
              Continuous efforts to{" "}
              <TextBold>
                {" "}
                <br /> improve Japan quality and local taste
              </TextBold>
              . 2016 renewal is a great success{" "}
            </p>
          </Items>
          <Items
            urlImage={asset("/images/item-brand-story-2.png")}
            timeShow={0.6}
            width={18.5}
            height={33.78}
            top={27}
            right={2}
            description={""}
            descriptionBottom={12}
          >
            <TextBold>
              Factory Expansion <br /> Under Planning
            </TextBold>
          </Items>
          <Items
            urlImage={asset("/images/item-brand-story-1999.png")}
            timeShow={0.6}
            width={19.5}
            height={33.33}
            top={70.7}
            left={23.1}
            year={1999}
            description={""}
          >
            <p>
              <TextBold>Come to Viet Nam</TextBold> <br />
              -Taisho Factory <br /> in Khanh Hoa
            </p>
          </Items>
          <Items
            urlImage={asset("/images/item-brand-story.png")}
            timeShow={0.6}
            width={18.3}
            height={33.78}
            top={67}
            left={60}
            description={""}
            descriptionBottom={6}
          >
            <TextBold>
              3 cans for <br /> brand love
            </TextBold>
          </Items>

          </>
        )
      }
    </div>
  )

  const listItemsVI = (
    <div className={"WrapItem"}>
      {
        responsiveMobile === true 
        ? (
          <>
            <ItemsMobile
              urlImage={asset("/images/item-brand-story-1962.png")}
              timeShow={0.6}
              width={44}
              height={10}
              top={12}
              left={"0"}
              year={1962}
              description={""}
              descriptionLeft={118}
              descriptionTop={20}
            >
              <p>
                Thức uống dinh dưỡng <TextBold> số 1</TextBold> tại Nhật Bản.{" "}
                <TextBold>Một trong những thức uống năng lượng</TextBold> đầu tiên trên thế giới.
              </p>
            </ItemsMobile>
            <ItemsMobile
              urlImage={asset("/images/item-brand-story-1999.png")}
              timeShow={0.6}
              width={43}
              height={12}
              top={26}
              right={3}
              year={1999}
              description={""}
              descriptionRight={120}
              descriptionBottom={"0"}
            >
              <p>
                <TextBold>Đến từ Việt Nam</TextBold> <br />
                Nhà máy Taisho<br /> ở Khánh Hòa.
              </p>
            </ItemsMobile>
            <ItemsMobile
              urlImage={asset("/images/item-brand-story-2016.png")}
              timeShow={0.6}
              width={45}
              height={8}
              top={43}
              left={2}
              year={"2016"}
              description={""}
              descriptionLeft={120}
              descriptionTop={"30"}
            >
              <p>
                {" "}
                Nỗ lực không ngừng để{" "}
                <br />nâng cao <TextBold>hương vị </TextBold> địa phương và <TextBold>chất lượng Nhật Bản</TextBold>
                . 2016 đổi mới thành công tốt đẹp.{" "}
              </p>
            </ItemsMobile>
            <ItemsMobile
              urlImage={asset("/images/item-brand-story-2.png")}
              timeShow={0.6}
              width={40}
              height={15}
              top={81}
              left={4}
              description={""}
              descriptionLeft={125}
              descriptionTop={45}
            >
              <TextBold>
                Mở rộng nhà máy <br /> theo kế hoạch.
              </TextBold>
            </ItemsMobile>
            
            <ItemsMobile
              urlImage={asset("/images/item-brand-story.png")}
              timeShow={0.6}
              width={40}
              height={15}
              top={62}
              right={4}
              description={""}
              descriptionRight={130}
              descriptionTop={45}
            >
              <TextBold>
                3 lon cho <br /> tình yêu thương hiệu.
              </TextBold>
            </ItemsMobile>
          </>
        )
        :(
          <>
            <Items
              urlImage={asset("/images/item-brand-story-1962.png")}
              timeShow={0.6}
              width={19.5}
              height={33.33}
              top={29}
              right={78}
              year={1962}
              description={""}
              descriptionBottom={3}
            >
              <p>
                Nước tăng lực <TextBold> số 1</TextBold> tại Nhật Bản.{" "}
                <TextBold>Một trong những thương hiệu nước tăng lực </TextBold> đầu tiên trên thế giới.
              </p>
            </Items>
            <Items
              urlImage={asset("/images/item-brand-story-2016.png")}
              timeShow={0.6}
              width={21.6}
              height={31.5}
              top={27}
              left={42}
              year={"2016"}
              description={""}
              descriptionBottom={-10}
              yearStyle={{ left: "5%" }}
            >
              <p>
                {" "}
                Cải thiện chất lượng và hương vị không ngừng để{" "}
                <br /><TextBold>phù hợp với khẩu vị người Việt. </TextBold>
                2016, cải tiến đã tạo nên thành công lớn.{" "}
              </p>
            </Items>
            <Items
              urlImage={asset("/images/item-brand-story-2.png")}
              timeShow={0.6}
              width={18.5}
              height={33.78}
              top={27}
              right={2}
              description={""}
              descriptionBottom={12}
            >
              <TextBold>
              Chuẩn bị mở rộng nhà máy công suất lớn
              </TextBold>
            </Items>
            <Items
              urlImage={asset("/images/item-brand-story-1999.png")}
              timeShow={0.6}
              width={19.5}
              height={33.33}
              top={70}
              left={23.1}
              year={1999}
              description={""}
              descriptionBottom={14}
            >
              <p>
                <TextBold>Có mặt tại Việt Nam.</TextBold> <br />
                Nhà máy sản xuất tại Khánh Hoà. 
              </p>
            </Items>
            <Items
              urlImage={asset("/images/item-brand-story.png")}
              timeShow={0.6}
              width={18.3}
              height={33.78}
              top={67}
              left={60}
              description={""}
              descriptionBottom={5}
            >
              Chinh Phục khách hàng khó tính 
              <TextBold>
              &nbsp;chỉ trong vòng 3 lon. 
              </TextBold>
            </Items>
          </>
        )
      }
      
    </div>
  )

  const listItems = (Language) => {

    let component;

    switch (Language) {
      case "vi":
        component = listItemsVI
        break;

      default:
        component = listItemsEN
        break;

    }

    return component;

  }

  useEffect(() => {

    if (valueLanguageContext.languageCurrent) {

      setDataSectionBrandStore(Language[`${valueLanguageContext.languageCurrent}`])

    }

  }, [])


  useEffect(() => {

    if (valueLanguageContext.languageCurrent) {

      setDataSectionBrandStore(Language[`${valueLanguageContext.languageCurrent}`])

    }

  }, [valueLanguageContext.languageCurrent]);

  //check responsive
  useEffect(() => {

    if (windowSize.width <= 1024) {

      setResponsiveTablet(true);

      if (windowSize.width <= 599) {
        setResponsiveTablet(false);
        setResponsiveMobile(true);
      }

    } else {

      setResponsiveTablet(false);
      setResponsiveMobile(false);

    }

  }, [windowSize]);


  return (

    <section className={"sectionBrandStory " + valueLanguageContext.languageCurrent}>
      <div className="brandStory">
        <img className={"bgBrandStory"} src={urlBackground} />
          {
            responsiveMobile == true 
            ? (
              <>
                <ItemsNoneAni
                urlImage={asset("/images/line-brand-story-m.png")}
                timeShow={0.6}
                width={6}
                height={70}
                top={19}
                left={48}
              ></ItemsNoneAni>
              </>
            )
            :(<>
              <ItemsNoneAni
                urlImage={asset("/images/line-brand-story.png")}
                timeShow={0.6}
                width={78.9}
                top={63}
                left={10}
              ></ItemsNoneAni>
            </>)
          }
        

        {
          dataSectionBrandStore ? (
            <TitleStyle1
              textLine1={dataSectionBrandStore.title[0]}
              textLine2={dataSectionBrandStore.title[1]}
            />
          ) : <TitleStyle1></TitleStyle1>

        }

        {valueLanguageContext ? listItems(valueLanguageContext.languageCurrent) : listItems("en")}

      </div>

      <style jsx>{`

        .sectionBrandStory {
          min-height: 50vh;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .bgBrandStory {
          width: 100%;
          max-height: 900px;
        }

        .brandStory {
          position: relative;
          width: 100%;
          max-width: 1270px;
          display: flex;
          justify-content: center;
          padding: 50px 0;
        }

        img {
          z-index: -1;
        }

        @media screen and (max-width: 1024px) {
          .sectionBrandStory {
            width: 90%;
            margin: 0 auto;

          }
          
        }
        @media screen and (max-width: 1023px) {
          .bgBrandStory {
            max-height: 100%;
            height: 100%;
          }
        }
        @media screen and (max-width: 599px) {

          .sectionBrandStory {
            max-height: 100%;
            width: 100%;
            margin: 0 auto;
          }

          .bgBrandStory{
            width:90%
          }

        }
      `}</style>
    </section>
  );
}
