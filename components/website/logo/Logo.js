import asset from "plugins/assets/asset";
import LogoStyle from "./Logo.module.scss";
import Link from "next/link";

export default function Logo ({
    src = asset("/images/logo.png"), 
    alt="lipovitan", 
    children, 
    style
}){
    return <>
        <Link href="/"><img className={LogoStyle.logo} src={src} alt={alt} style={style}/></Link>
        {children}
    </>
}