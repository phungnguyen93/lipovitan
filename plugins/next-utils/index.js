import Router from "next/router";

export const redirect = (url) => {
  Router.push(url);
};
