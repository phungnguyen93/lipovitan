// /**
//  * fix: "Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?"
//  * https://github.com/vercel/next.js/issues/7915
//  */

import { forwardRef } from "react";
import Link from "next/link";

const CustomComponent = forwardRef((props, ref) => (
  <a className="app-link" href={props.link} ref={ref} {...props}>
    <style jsx>{`
      .app-link {
        display: ${props.display};
      }
    `}</style>
    {props.children}
  </a>
));

const AppLink = ({ children, directLink = false, href, display = "inline-block", ref, ...props }) => {
  const useA = (
    <CustomComponent link={href} display={display} ref={ref}>
      {children}
    </CustomComponent>
  );

  const useLink = (
    <Link href={href} passHref {...props}>
      <CustomComponent display={display} ref={ref}>
        {children}
      </CustomComponent>
    </Link>
  );

  return directLink ? useA : useLink;
};

export default AppLink;
