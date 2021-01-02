import { DefaultStyles } from "components/dashkit/style/DashkitGlobalStyle";
import DashkitButton, { ButtonSize } from "./Buttons";

import { HorizontalList, HorizontalListAlign } from "components/diginext/layout/ListLayout";
import { Children } from "react";

const NavItem = ({
  children,
  type = "default",
  href,
  className,
  active = false,
  disabled = false,
  size = ButtonSize.NORMAL,
  onClick,
  ...rest
}) => {
  const clickHandler = (e) => {
    if (disabled) return;
    if (onClick) onClick(e);
  };

  let fontSize = "1.15rem";
  switch (size) {
    case ButtonSize.SMALL:
      fontSize = "1rem";
      break;
    case ButtonSize.LARGE:
      fontSize = "1.3rem";
      break;
  }

  const item = (
    <li
      className={`nav-item ${className ? className : ""} ${active ? "active" : ""} ${disabled ? "disabled" : ""}`}
      onClick={clickHandler}
      {...rest}
    >
      <style jsx>{`
        .nav-item {
          cursor: pointer;
          display: inline-block;
          transition: all 0.25s;
          padding: 2rem 0;
          margin-right: 1.5rem;
          border-bottom: 1px solid transparent;
          font-size: 1.25rem;

          a {
            color: ${DefaultStyles.colors.secondary};
            font-size: ${fontSize};
          }
        }
        .nav-item:hover,
        .nav-item.active {
          border-bottom: 1px solid ${DefaultStyles.colors.primary};
        }
        .nav-item:hover a,
        .nav-item.active a {
          color: ${DefaultStyles.colors.primary};
        }
        .nav-item.disabled {
          cursor: default;
          border-bottom: 1px solid transparent;
          a {
            cursor: default;
            color: ${DefaultStyles.colors.disabled};
          }
        }
      `}</style>
      <a href={href}>{children}</a>
    </li>
  );

  return item;
};

const Nav = ({ children, borderBottom = false, size = ButtonSize.NORMAL, ...rest }) => {
  // const amountChildren = Children.count(props.children);
  const childrenWithProps = Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      let newProps = { ...child.props };
      
      if (child.type == DashkitButton || child.type == NavItem) {
        // pass style type from group to children props
        // if (!newProps.type) newProps.type = props.type ?? ButtonType.PRIMARY;
        if (!newProps.size) newProps.size = size;
      }

      return React.cloneElement(child, newProps);
    }
    return child;
  });

  return (
    <HorizontalList
      className="navs"
      align={HorizontalListAlign.MIDDLE}
      style={{
        borderBottom: borderBottom ? `1px solid ${DefaultStyles.colors.border}` : `none`,
      }}
    >
      {childrenWithProps}
    </HorizontalList>
  );
};

export { NavItem };

export default Nav;
