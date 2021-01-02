import styles from "./Container.module.scss";

export default function Container({
  children = "",
  gutter = 30,
  fluid = false,
  ...rest
}) {
  const classNames = ["container", styles.container];

  const _padding = fluid ? "0" : `${gutter / 2}px`;

  if (fluid) classNames.push(styles["container-fluid"]);

  return (
    <div className={classNames.join(" ")} {...rest}>
      <style jsx>{`
        .container {
          padding-left: ${_padding};
          padding-right: ${_padding};
        }
      `}</style>
      {children}
    </div>
  );
}
