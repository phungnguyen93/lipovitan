import React from "react";

export const Wrapper = ({ props, children }) => {
  return (
    <>
      <style jsx>{`
        .Wrapper {
          width: calc(100% - 10vw);
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        @media only screen and (max-width: 1024px) {
          .Wrapper {
            width: calc(100% - 40px);
          }
        }
      `}</style>
      <div className={"Wrapper"}>{children}</div>
    </>
  );
};

export const Row = ({ props, children }) => {
  return (
    <>
      <style jsx>{`
        .Row {
          padding-bottom: 8vh;

          &:nth-child(even) {
            
          }
        }
      `}</style>
      <div className={"Row"}>{children}</div>
    </>
  );
};
