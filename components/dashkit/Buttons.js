import Button from "components/diginext/button/Button";
import { DefaultStyles } from "components/dashkit/style/DashkitGlobalStyle";
import Color from "plugins/utils/Color";

const ButtonType = {
  get PRIMARY() {
    return "PRIMARY";
  },
  get SECONDARY() {
    return "SECONDARY";
  },
  get SUCCESS() {
    return "SUCCESS";
  },
  get DANGER() {
    return "DANGER";
  },
  get WARNING() {
    return "WARNING";
  },
  get INFO() {
    return "INFO";
  },
  get LIGHT() {
    return "LIGHT";
  },
  get DARK() {
    return "DARK";
  },
  get TRANSPARENT() {
    return "TRANSPARENT";
  },
};

const ButtonSize = {
  get NORMAL() {
    return "NORMAL";
  },
  get SMALL() {
    return "SMALL";
  },
  get LARGE() {
    return "LARGE";
  },
};

const ButtonShape = {
  get RECT() {
    return "RECT";
  },
  get DEFAULT() {
    return ButtonShape.RECT;
  },
  get ROUND_RECT() {
    return "ROUND_RECT";
  },
  get ROUND_RECT_LEFT() {
    return "ROUND_RECT_LEFT";
  },
  get ROUND_RECT_RIGHT() {
    return "ROUND_RECT_RIGHT";
  },
  get ROUND() {
    return "ROUND";
  },
  get ROUND_LEFT() {
    return "ROUND_LEFT";
  },
  get ROUND_RIGHT() {
    return "ROUND_RIGHT";
  },
  get CIRCLE() {
    return "CIRCLE";
  },
};

const DashkitButton = ({
  children,
  onClick,
  href,
  disabled = false,
  active = false,
  outline = false,
  size = ButtonSize.NORMAL,
  type = ButtonType.PRIMARY,
  shape = ButtonShape.ROUND_RECT,
  ...rest
}) => {
  let padding;
  let fontSize;
  let bgColor;
  let bgColorActive;
  let textColor;
  let textColorActive;
  let borderRadius;
  let border;
  let typeClassName = "btn-type-primary",
    shapeClassName = "btn-shape-round-rect",
    sizeClassName = "btn-size-normal";

  switch (size) {
    case ButtonSize.LARGE:
      padding = ".75rem 1.25rem";
      fontSize = "1.2rem";
      borderRadius = ".5rem";
      sizeClassName = "btn-zie-large";
      break;
    case ButtonSize.SMALL:
      padding = ".25rem .5rem";
      fontSize = "0.9rem";
      borderRadius = ".25rem";
      sizeClassName = "btn-size-small";
      break;
  }

  switch (type) {
    case ButtonType.SECONDARY:
      bgColor = DefaultStyles.colors.secondary;
      textColor = textColorActive = "white";
      break;

    case ButtonType.SUCCESS:
      bgColor = DefaultStyles.colors.success;
      textColor = textColorActive = "white";

      break;

    case ButtonType.DANGER:
      bgColor = DefaultStyles.colors.danger;
      textColor = textColorActive = "white";
      break;

    case ButtonType.WARNING:
      bgColor = DefaultStyles.colors.warning;
      textColor = textColorActive = "black";
      break;

    case ButtonType.LIGHT:
      bgColor = DefaultStyles.colors.brightest;
      textColor = textColorActive = "black";
      break;

    case ButtonType.DARK:
      bgColor = DefaultStyles.colors.darkest;
      textColor = textColorActive = "white";
      break;

    case ButtonType.INFO:
      bgColor = DefaultStyles.colors.info;
      textColor = textColorActive = "white";
      break;

    case ButtonType.TRANSPARENT:
      bgColor = "rgba(0,0,0,0)";
      textColor = textColorActive = DefaultStyles.colors.primary;
      break;

    // PRIMARY
    default:
      bgColor = DefaultStyles.colors.primary;
      textColor = textColorActive = "white";
      break;
  }

  typeClassName = "btn-type-" + type.toLowerCase();

  switch (shape) {
    case ButtonShape.ROUND_RECT:
      borderRadius = ".375rem";
      shapeClassName = "btn-size-round-rect";
      break;
    case ButtonShape.ROUND_RECT_LEFT:
      borderRadius = ".375rem 0 0 .375rem";
      shapeClassName = "btn-size-round-rect-left";
      break;
    case ButtonShape.ROUND_RECT_RIGHT:
      borderRadius = "0 .375rem .375rem 0";
      shapeClassName = "btn-size-round-rect-right";
      break;
    case ButtonShape.ROUND:
      borderRadius = "20rem";
      shapeClassName = "btn-size-round";
      break;
    case ButtonShape.ROUND_LEFT:
      borderRadius = "20rem 0 0 20rem";
      shapeClassName = "btn-size-round-left";
      break;
    case ButtonShape.ROUND_RIGHT:
      borderRadius = "0 20rem 20rem 0";
      shapeClassName = "btn-size-round-right";
      break;
    case ButtonShape.CIRCLE:
      borderRadius = "50%";
      shapeClassName = "btn-size-circle";
      break;
    case ButtonShape.RECT:
      borderRadius = "0";
      shapeClassName = "btn-size-rect";
      break;
    default:
      borderRadius = "0";
      shapeClassName = "btn-size-rect";
      break;
  }

  bgColorActive = Color.hexDarken(bgColor, 0.4);

  // if (disabled) {
  //   textColor = DefaultStyles.colors.disabled;
  //   textColorActive = textColor;
  //   const tmpColor = Color.hexToRgb(bgColor);
  //   // bgColor = `rgba(${tmpColor.r}, ${tmpColor.b}, ${tmpColor.g}, 0.2)`;
  //   // bgColorActive = bgColor;
  // }

  if (outline == true) {
    border = `1px solid ${bgColor}`;
    textColor = bgColor;
    bgColor = type == ButtonType.TRANSPARENT ? "rgba(0,0,0,0)" : "white";
  }

  // console.log(bgColorActive);

  return (
    <Button
      className={[typeClassName, sizeClassName, shapeClassName].join(" ")}
      href={href}
      disabled={disabled}
      active={active}
      padding={padding}
      onClick={onClick}
      textColor="white"
      fontSize={fontSize}
      bgColor={bgColor}
      bgColorActive={bgColorActive}
      textColor={textColor}
      textColorActive={textColorActive}
      borderRadius={borderRadius}
      border={border}
      borderActive={border}
      {...rest}
    >
      {children}
    </Button>
  );
};

export { ButtonType, ButtonSize, ButtonShape };

export default DashkitButton;
