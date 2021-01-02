import _ from "lodash";

const DashkitIcon = function ({ name, style, fill, size, width, height, ...rest }) {
  let svgContent = require(`./icons/${name}.svg`);

  let attrs = svgContent.split(" ");
  let sizes = {};
  let ratio = 1;

  attrs.map((attr) => {
    if (_.startsWith(attr, "viewBox")) {
      let r = attr.split(" ");
      let h = r[r.length - 1];
      let w = r[r.length - 2];
      ratio = h / w;
    }
    if (_.startsWith(attr, "width")) {
      sizes.width = parseFloat(attr.replace(/"/g, "").split("=")[1]);
      svgContent = svgContent.replace(attr, "");
    }
    if (_.startsWith(attr, "height")) {
      sizes.height = parseFloat(attr.replace(/"/g, "").split("=")[1]);
      svgContent = svgContent.replace(attr, "");
    }
  });
  // console.log(sizes);

  let iconWidth = 16;
  let iconHeight = 16 * ratio;

  if (sizes.width) iconWidth = sizes.width + "px";
  if (sizes.height) iconHeight = sizes.height + "px";

  if (width) iconWidth = width;
  if (height) iconHeight = height;
  if (width && !height) iconHeight = iconWidth * ratio;

  if (size) {
    iconWidth = size;
    iconHeight = iconWidth * ratio;
  }

  return (
    <>
      <style jsx>{`
        .svg {
          ${fill ? `color: ${fill};` : ""}
          line-height: 0;
          display: inline-block;
          vertical-align: middle;
          ${iconWidth ? `width: ${isNaN(iconWidth) ? iconWidth : iconWidth + "px"};` : ""}
          ${iconHeight ? `height: ${isNaN(iconHeight) ? iconHeight : iconHeight + "px"};` : ""}
        }
      `}</style>
      <span style={style} className="admin-icon svg" dangerouslySetInnerHTML={{ __html: svgContent }} {...rest} />
    </>
  );
};

export default DashkitIcon;
