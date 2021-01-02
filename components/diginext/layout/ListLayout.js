import { Children, Fragment } from "react";
import CONFIG from "web.config";

const ListItemSize = {
  get AUTO() {
    return "AUTO";
  }, // default
  get STRETCH() {
    return "STRETCH";
  },
};

const VerticalListAlign = {
  get LEFT() {
    return "LEFT";
  }, // default
  get CENTER() {
    return "CENTER";
  },
  get RIGHT() {
    return "RIGHT";
  },
};

const HorizontalListAlign = {
  get TOP() {
    return "TOP";
  }, // default
  get MIDDLE() {
    return "MIDDLE";
  },
  get BOTTOM() {
    return "BOTTOM";
  },
};

const ListType = {
  get STRETCH() {
    return "STRETCH";
  }, // default
  get SPACE_BETWEEN() {
    return "SPACE_BETWEEN";
  },
  get SPACE_AROUND() {
    return "SPACE_AROUND";
  },
  get START() {
    return "START";
  },
  get CENTER() {
    return "CENTER";
  },
  get END() {
    return "END";
  },
};

function ListItem({
  key,
  children,
  size,
  background,
  padding,
  margin,
  border,
  borderRadius,
  style,
  className,
  ...rest
}) {
  let flexValue = "";

  if (typeof size != "undefined") {
    switch (size) {
      case ListItemSize.STRETCH:
        flexValue = "flex: 1;";
        break;
      case ListItemSize.AUTO:
        flexValue = "flex: auto;";
        break;
      default:
        flexValue = `flex: ${size};`;
        // console.warn(`ListItemSize of "${size}" is not valid.`);
        break;
    }
  }

  return (
    <>
      <style jsx>{`
        .list-item {
          position: relative;
          ${flexValue}
          ${padding ? `padding: ${padding};` : ""}
          ${margin ? `margin: ${margin};` : ""}
          ${background ? `background: ${background};` : ""}
          ${border ? `border: ${border};` : ""}
          ${borderRadius ? `border-radius: ${borderRadius};` : ""}
        }
        .list-item.stretch {
          flex: auto;
        }
      `}</style>
      <div className={`list-item ${className ? className : ""}`} key={key} style={style} {...rest}>
        {children}
      </div>
    </>
  );
}

function HorizontalList({ children, type, itemSize, wrap, align, scrollable = true, style, ...rest }) {
  const wrapContent = wrap ? `flex-wrap: wrap;` : `flex-wrap: nowrap;`;

  let justifyContent = "";

  if (typeof type !== "undefined") {
    switch (type) {
      case ListType.SPACE_BETWEEN:
        justifyContent = "justify-content: space-between;";
        break;
      case ListType.SPACE_AROUND:
        justifyContent = "justify-content: space-around;";
        break;
      case ListType.CENTER:
        justifyContent = "justify-content: center;";
        break;
      case ListType.END:
        justifyContent = "justify-content: flex-end;";
        break;
      default:
        // START
        justifyContent = "justify-content: flex-start;";
        break;
    }
  }

  let alignConfig = "";
  if (typeof align !== "undefined") {
    switch (align) {
      case HorizontalListAlign.TOP:
        alignConfig = "align-items: flex-start;";
        break;
      case HorizontalListAlign.MIDDLE:
        alignConfig = "align-items: center;";
        break;
      case HorizontalListAlign.BOTTOM:
        alignConfig = "align-items: flex-end;";
        break;
      default:
        console.warn(`HorizontalListAlign of "${align}" is not valid.`);
        break;
    }
  }

  const scrollConfig = scrollable ? `overflow-x: auto;` : "";

  const orgChildren = children && children.type == Fragment ? children.props.children : children;
  const childrenWithProps = Children.map(orgChildren, (child, index) => {
    if (React.isValidElement(child)) {
      let newProps = { ...child.props };

      if (child.type == ListItem) {
        newProps.size = itemSize ? itemSize : newProps.size;
      }

      return React.cloneElement(child, newProps);
    }
    return child;
  });

  return (
    <>
      <style jsx>{`
        .layout-list {
          display: flex;
          flex-direction: row;
          ${scrollConfig}
          ${justifyContent}
          ${wrapContent}
          ${alignConfig}
        }
      `}</style>
      <div className="layout-list" style={style} {...rest}>
        {childrenWithProps}
      </div>
    </>
  );
}

function VerticalList({ children, type, itemSize, wrap, align, scrollable = true, style, ...rest }) {
  const wrapContent = wrap ? `flex-wrap: wrap;` : `flex-wrap: nowrap;`;

  let alignConfig = "";
  if (typeof align !== "undefined") {
    switch (align) {
      case VerticalListAlign.LEFT:
        alignConfig = "align-items: flex-start;";
        break;
      case VerticalListAlign.CENTER:
        alignConfig = "align-items: center;";
        break;
      case VerticalListAlign.RIGHT:
        alignConfig = "align-items: flex-end;";
        break;
      default:
        console.warn(`VerticalListAlign of "${align}" is not valid.`);
        break;
    }
  }

  const scrollConfig = scrollable ? `overflow-y: auto;` : "";

  const orgChildren = children && children.type == Fragment ? children.props.children : children;
  const childrenWithProps = Children.map(orgChildren, (child, index) => {
    if (React.isValidElement(child)) {
      let newProps = { ...child.props };

      if (child.type == ListItem) {
        newProps.size = itemSize ? itemSize : newProps.size;
      }

      return React.cloneElement(child, newProps);
    }
    return child;
  });

  return (
    <>
      <style jsx>{`
        .layout-list {
          display: flex;
          flex-direction: column;
          ${wrapContent}
          ${alignConfig}
          ${scrollConfig}
        }
      `}</style>
      <div className="layout-list" style={style} {...rest}>
        {childrenWithProps}
      </div>
    </>
  );
}

function GridList({ children, col = 4 }) {
  const wrapContent = `flex-wrap: wrap;`;
  const itemSize = `0 0 ${Math.round((100 / (col + 0.001)) * 100) / 100}%;`;

  const orgChildren = children && children.type == Fragment ? children.props.children : children;
  const childrenWithProps = Children.map(orgChildren, (child, index) => {
    if (React.isValidElement(child)) {
      let newProps = { ...child.props };

      if (child.type == ListItem) {
        newProps.size = itemSize ? itemSize : newProps.size;
      }

      return React.cloneElement(child, newProps);
    }
    return child;
  });

  return (
    <>
      <style jsx>{`
        .layout-list {
          display: flex;
          ${wrapContent}
        }
      `}</style>
      <div className="layout-list">{childrenWithProps}</div>
    </>
  );
}

export {
  HorizontalList,
  VerticalList,
  GridList,
  ListItem,
  ListItemSize,
  ListType,
  VerticalListAlign,
  HorizontalListAlign,
};
