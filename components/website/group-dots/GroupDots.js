import asset from "plugins/assets/asset";

export default function GroupDots ({
    linkImage,
    position="left",
    bottom=-5,
    
}){
    const Left = (
        <div className="groupDots">
            <img src={ linkImage ? linkImage : asset("/images/group-dots-left.jpg")} />
            <style jsx>{`
                .groupDots{
                    left : 0;
                    bottom :${bottom + "%"};
                }
            `}
            </style>
        </div>
    )
    const Right = (
        <div className="groupDots">
            <img src={ linkImage ? linkImage : asset("/images/group-dots-right.png")} />
            <style jsx>{`
                .groupDots{
                    right : 0;
                    bottom :${bottom + "%"};
                }
            `}
            </style>
        </div>
    )
    return (<>
        {
            position == "left" ? Left : Right
        }
    </>)
}